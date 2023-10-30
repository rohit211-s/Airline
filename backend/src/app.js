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
const getConnection = async () => {
  const connConfig = {
    user: process.env.AIRLINE_ANALYSIS_DATABASE_USERNAME,
    password: process.env.AIRLINE_ANALYSIS_DATABASE_PASSWORD,
    connectionString: process.env.AIRLINE_ANALYSIS_DATABASE_CONNECTION_STRING,
    poolMin: 2,
    poolMax: 10,
  };
  const dbConnection = await oracledb.getConnection(connConfig);

  return dbConnection;
};

app.get("/api", async (req, res) => {
  const dbConnection = await getConnection();
  const result = await dbConnection.execute("SELECT * FROM lectures");
  res.status(200).send({ result: result });
});

module.exports = app;
