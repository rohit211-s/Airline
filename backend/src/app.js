// Third Party Packages
const express = require("express");
const cors = require("cors");

// Global Setup
require("dotenv").config();

// Custom packages
const utils = require("./utils/utils");

// Custom Routes
const rawEditorRouter = require("./routes/raw_editor");
const trendQuery2Router = require("./routes/trend_query2");
const dashboardRouter = require("./routes/dashboard");

// Setup
const app = express();

app.use(cors());
app.use(express.json());
app.use(rawEditorRouter);
app.use(trendQuery2Router);
app.use(dashboardRouter);

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
  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(trend_query4);
  res.status(200).send(resp.rows);
});

module.exports = app;
