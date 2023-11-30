// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages

// Queries
const formatQuery = require("../queries/trend_query_4/holiday_delay");

// Setup
const { getConnection } = require("../db/db");

router.get("/trend_query4/filter_data", async (req, res) => {
  const dbConnection = await getConnection();
  const responseData = {
    holidays: [],
    airports: [],
    states: [],
    seasons: [],
    years: [],
  };
  let query = `select distinct holiday from ${process.env.DB_USERNAME_REPLACE_PREFIX}holidays`;
  const holidayResp = await dbConnection.execute(query);
  responseData.holidays = holidayResp.rows;
  query = `select distinct airport from ${process.env.DB_USERNAME_REPLACE_PREFIX}airports`;
  const airportResp = await dbConnection.execute(query);
  responseData.airports = airportResp.rows;
  query = `select distinct state from ${process.env.DB_USERNAME_REPLACE_PREFIX}airports`;
  const stateResp = await dbConnection.execute(query);
  responseData.states = stateResp.rows;
  query = `select distinct type from ${process.env.DB_USERNAME_REPLACE_PREFIX}seasonal_breaks`;
  const seasonResp = await dbConnection.execute(query);
  responseData.seasons = seasonResp.rows;
  query = `select distinct year from kondas.airlines_delay`;
  const yearsResp = await dbConnection.execute(query);
  responseData.years = yearsResp.rows;
  res.status(200).send(responseData);
});

router.post("/trend_query4", async (req, res) => {
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

module.exports = router;
