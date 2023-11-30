// Third Party Packages
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

// Custom packages
const utils = require("./utils/utils");
const trendQuery2 = require("./queries/trend_query_2/passenger_preferences");
const formatQuery = require("./queries/trend_query_4/holiday_delay");
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

app.get("/trend_query4/filter_data", async (req, res) => {
  const dbConnection = await getConnection();
  const responseData = {
    holidays: [],
    airports: [],
    states: [],
    seasons: [],
    years: [],
  };
  let query = `select distinct holiday from ${process.env.AIRLINE_ANALYSIS_DATABASE_PREFIX_STRING}holidays`;
  const holidayResp = await dbConnection.execute(query);
  responseData.holidays = holidayResp.rows;
  query = `select distinct airport from ${process.env.AIRLINE_ANALYSIS_DATABASE_PREFIX_STRING}airports`;
  const airportResp = await dbConnection.execute(query);
  responseData.airports = airportResp.rows;
  query = `select distinct state from ${process.env.AIRLINE_ANALYSIS_DATABASE_PREFIX_STRING}airports`;
  const stateResp = await dbConnection.execute(query);
  responseData.states = stateResp.rows;
  query = `select distinct type from ${process.env.AIRLINE_ANALYSIS_DATABASE_PREFIX_STRING}seasonal_breaks`;
  const seasonResp = await dbConnection.execute(query);
  responseData.seasons = seasonResp.rows;
  query = `select distinct year from kondas.airlines_delay`;
  const yearsResp = await dbConnection.execute(query);
  responseData.years = yearsResp.rows;
  res.status(200).send(responseData);
});

app.post("/trend_query4", async (req, res) => {
  keys = Object.keys(req.body);
  let obj = {
    holiday: [],
    airport: "",
    state: "",
    start_year: 2003,
    end_year: 2023,
  };
  for (let i = 0; i < keys.length; i++) {
    if (req.body[keys[i]] != "All") {
      switch (keys[i]) {
        case "holidayVal":
          obj.holiday = req.body[keys[i]];
          break;
        case "airportVal":
          obj.airport = req.body[keys[i]];
          break;
        case "stateVal":
          obj.state = req.body[keys[i]];
          break;
        case "startYearVal":
          obj.start_year = req.body[keys[i]];
          break;
        case "endYearVal":
          obj.end_year = req.body[keys[i]];
          break;
        default:
          continue;
      }
    }
  }
  let holidayStr = "";
  for (let i = 0; i < obj.holiday.length; i++) {
    holidayStr = holidayStr + "'" + String(obj.holiday[i]) + "'";
    if (i != obj.holiday.length - 1) {
      holidayStr = holidayStr + ",";
    }
  }
  if (holidayStr === "") {
    holidayStr = "'" + "All" + "'";
  }
  obj.holiday = holidayStr;
  const trend_query4 = formatQuery(obj);
  console.log(trend_query4);
  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(trend_query4);
  res.status(200).send(resp.rows);
});

module.exports = app;
