// Third Party Packages
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

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
  const result = await dbConnection.execute("SELECT * FROM lectures");
  const data = result.rows;
  res.status(200).send({ result: data });
});

module.exports = app;
