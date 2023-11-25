// Third Party Packages
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

// Custom packages
const utils = require("./utils/utils");
const trendQuery2 = require("./queries/trend_query_2/passenger_preferences");
const utilQueries = require("./queries/utils");

// Global Setup
require("dotenv").config();

// Setup
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
let _db = null;
const getConnection = async () => {
  if (_db) {
    return _db;
  }

  const connConfig = {
    user: process.env.AIRLINE_ANALYSIS_DATABASE_USERNAME,
    password: process.env.AIRLINE_ANALYSIS_DATABASE_PASSWORD,
    connectionString: process.env.AIRLINE_ANALYSIS_DATABASE_CONNECTION_STRING,
    poolMin: 2,
    poolMax: 10,
  };

  _db = await oracledb.getConnection(connConfig);
  return _db;
};

app.get("/api", async (req, res) => {
  const dbConnection = await getConnection();
  const result = await dbConnection.execute("SELECT * FROM states");
  const data = result.rows;
  res.status(200).send({ result: data });
});

app.post("/raw_query", async (req, res) => {
  let query = req.body.query;
  query = query.trim(";").toLowerCase();
  let pageNum = req.body.pageNum;
  let pageLimit = req.body.pageLimit;

  if (!query.startsWith("select")) {
    res.status(403).send({
      pageNum: 0,
      pageLimit: 0,
      totalPages: 0,
      totalRows: 0,
      columnNames: [],
      queryResponse: [],
    });
  }

  if (pageNum == 0 && pageLimit == 0) {
    pageLimit = 10;
  } else {
    if (!query.includes("fetch first")) {
      if (!query.includes("offset")) {
        query += ` OFFSET ${pageNum * pageLimit} ROWS`;
      }

      if (pageLimit > 0) query += ` FETCH FIRST ${pageLimit} ROWS ONLY `;
    }
  }

  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(query);
  const respData = resp.rows;

  let totalPages = Math.ceil(respData.length / pageLimit);
  res.status(201).send({
    pageNum: pageNum,
    pageLimit: pageLimit,
    totalPages: totalPages,
    totalRows: respData.length,
    columnNames: resp.metaData.map((row) => row.name),
    response: utils.filterResponse(respData, pageNum, pageLimit),
  });
});

app.get("/trend_query_2", async (req, res) => {
  const params = req.query;
  const dbConnection = await getConnection();

  let groupByAttributes = [];
  let selectColumns = [];
  let orderByColumns = [];

  if (params.timeline == "yearly") {
    groupByAttributes.push("year");
    selectColumns.push("year");
    orderByColumns.push("year");
  }

  if (params.timeline == "quarterly") {
    groupByAttributes.push(["year", "quarter"]);
    selectColumns.push("CONCAT(year, CONCAT(' - ', quarter)) quarter");
    orderByColumns.push("quarter");
  }

  if (params.group == "cities") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\2')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\2') city"
    );
    orderByColumns.push("city");
  }

  if (params.group == "states") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\3')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\3') state"
    );

    orderByColumns.push("state");
  }

  if (params.group == "airports") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\1')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\1') airport"
    );

    orderByColumns.push("airport");
  }

  let columns = req.query.columns.split(",");
  if (columns.length > 0 && columns[0] != "") {
    let string = `ROUND((${columns
      .map((column) => {
        if (column === "total_satisfied") {
          return "SUM(total_satisfied)";
        } else {
          return `SUM(sum_${column})`;
        }
      })
      .join("+")})/(${columns.length}*SUM(total_count)), 2) value`;
    selectColumns.push(string);
  } else {
    selectColumns.push("ROUND(SUM(total_satisfied)/SUM(total_count), 2) value");
  }

  const finalQuery =
    trendQuery2 +
    ` SELECT ${selectColumns.join(
      ","
    )} FROM airport_level_feedback_statistics GROUP BY ${groupByAttributes.join(
      ","
    )} ORDER BY ${orderByColumns.join(",")}`;

  const resp = await dbConnection.execute(finalQuery);

  res.status(200).send({
    columnNames: resp.metaData.map((row) => row.name),
    data: resp.rows,
  });
});

app.get("/filter_options", async (req, res) => {
  const queryParams = req.query;
  const dbConnection = await getConnection();
  let query = "";
  if (queryParams.group === "all") {
    query = utilQueries.all[queryParams.timeline];
  } else {
    query = utilQueries[queryParams.group];
  }

  const resp = await dbConnection.execute(query);
  let respData = resp.rows;

  res.status(200).send(respData.map((row) => [row[0], row[1]]));
});

module.exports = app;
