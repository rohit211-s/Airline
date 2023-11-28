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

// Trend Query 2
// ----------------------- BEGIN --------------------
app.get("/trend_query_2", async (req, res) => {
  const params = req.query;
  const dbConnection = await getConnection();

  let startDate = params.startDate;
  if (!startDate) {
    if (params.timeline == "yearly") {
      startDate = "1993";
    } else {
      startDate = "1993 - 1";
    }
  }

  let endDate = params.endDate;
  if (!endDate) {
    if (params.timeline == "yearly") {
      endDate = "2024";
    } else {
      endDate = "2024 - 4";
    }
  }

  let { selectColumns, groupByAttributes, orderByColumns } =
    utils.getQueryAttributes(params);

  let columns = req.query.columns.split(",");
  if (columns.length > 0 && columns[0] != "") {
    let string = `ROUND((${columns
      .map((column) => {
        if (column === "total_satisfied") {
          return "SUM(total_satisfied)";
        } else if (column == "total_dissatisfied") {
          return "SUM(total_dissatisfied)";
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
    trendQuery2
      .replace(/%startDate%/g, "" + startDate)
      .replace(/%endDate%/g, "" + endDate) +
    ` SELECT ${selectColumns.join(
      ","
    )} FROM airport_level_feedback_statistics GROUP BY ${groupByAttributes.join(
      ","
    )} ORDER BY ${orderByColumns.join(",")}`;

  const resp = await dbConnection.execute(finalQuery);

  // Popular Airlines based on timeline and group by
  let selectColumns2 = [];
  let groupByColumns2 = [];
  let orderByColumns2 = [];

  if (params.timeline == "yearly") {
    selectColumns2.push("year");
    groupByColumns2.push("year");
    orderByColumns2.push("year");
  } else if (params.timeline == "quarterly") {
    selectColumns2.push("CONCAT(year, CONCAT(' - ', quarter)) quarter");
    groupByColumns2.push(["year", "quarter"]);
    orderByColumns2.push("quarter");
  }

  selectColumns2.push(["airline", "COUNT(*)"]);
  groupByColumns2.push("airline");
  orderByColumns2.push("airline");

  const popularAirlines =
    trendQuery2
      .replace(/%startDate%/g, "" + startDate)
      .replace(/%endDate%/g, "" + endDate) +
    ` SELECT ${selectColumns2.join(
      ","
    )} FROM airport_level_feedback_statistics GROUP BY ${groupByColumns2.join(
      ","
    )} ORDER BY ${orderByColumns2.join(",")}`;

  const resp2 = await dbConnection.execute(popularAirlines);

  res.status(200).send({
    columnNames: resp.metaData.map((row) => row.name),
    data: resp.rows,
    popularAirlines: resp2.rows,
  });
});

app.get("/filter_options", async (req, res) => {
  const params = req.query;
  let startDate = params.startDate;
  if (!startDate) {
    if (params.timeline == "yearly") {
      startDate = "1993";
    } else {
      startDate = "1993 - 1";
    }
  }

  let endDate = params.endDate;
  if (!endDate) {
    if (params.timeline == "yearly") {
      endDate = "2024";
    } else {
      endDate = "2024 - 4";
    }
  }

  const queryParams = req.query;
  const dbConnection = await getConnection();
  let query = "";
  if (queryParams.group === "all") {
    query = utilQueries.all[queryParams.timeline];
  } else {
    query = utilQueries[queryParams.group];
  }

  query = query
    .replace(/%startDate%/g, "" + startDate)
    .replace(/%endDate%/g, "" + endDate);

  const resp = await dbConnection.execute(query);
  let respData = resp.rows;

  res.status(200).send(respData.map((row) => [row[0], row[1]]));
});

// Trend Query 2
// ----------------------- END --------------------

module.exports = app;
