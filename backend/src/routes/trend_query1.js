// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages

// Queries
const formatQuery = require("../queries/trend_query_1/covid_analysis");

// Setup
const { getConnection } = require("../db/db");

router.get("/trend_query1/filter_data", async (req, res) => {
  const dbConnection = await getConnection();
  const responseData = {
    airports: [],
    states: [],
    years: [],
  };

  query = `select distinct airport from ${process.env.DB_USERNAME_REPLACE_PREFIX}airports`;
  const airportResp = await dbConnection.execute(query);
  responseData.airports = airportResp.rows;
  query = `select distinct state from ${process.env.DB_USERNAME_REPLACE_PREFIX}airports`;
  const stateResp = await dbConnection.execute(query);
  responseData.states = stateResp.rows;
  query = `select distinct year from ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay`;
  const yearsResp = await dbConnection.execute(query);
  responseData.years = yearsResp.rows;
  res.status(200).send(responseData);
});

router.post("/trend_query1", async (req, res) => {
  keys = Object.keys(req.body);
  let obj = {
    delayTypeVal: [],
    airportVal: "",
    stateVal: "",
  };
  for (let i = 0; i < keys.length; i++) {
    if (req.body[keys[i]] != "All") {
      switch (keys[i]) {
        case "delayTypeVal":
          obj.delayTypeVal = req.body[keys[i]];
          break;
        case "airportVal":
          obj.airport = req.body[keys[i]];
          break;
        case "stateVal":
          obj.state = req.body[keys[i]];
          break;
        default:
          continue;
      }
    }
  }
  let delayType = "";
  for (let i = 0; i < obj.delayTypeVal.length; i++) {
    delayType = delayType + "'" + String(obj.delayTypeVal[i]) + "'";
    if (i != obj.delayTypeVal.length - 1) {
      delayType = delayType + ",";
    }
  }
  obj.delayTypeVal = delayType;
  const trend_query1 = formatQuery(obj);
  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(trend_query1);
  res.status(200).send(resp.rows);
});

module.exports = router;
