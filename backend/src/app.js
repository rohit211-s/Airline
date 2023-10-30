// Third Party Packages
const express = require("express");
const OracleDB = require("oracledb");
const cors = require("cors");

// Global Setup
require("dotenv").config();

// Setup
const app = express();

app.use(cors());
app.use(express.json());

const { getConnection } = require("./db/db");

app.get("/api", async (req, res) => {
  const dbConn = await getConnection();
  const result = await dbConn.execute("SELECT * FROM lectures");
  console.log(result);
  res.status(200).send({ msg: "Hello Sharan Reddy" });
});

module.exports = app;
