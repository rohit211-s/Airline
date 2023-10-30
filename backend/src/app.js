// Third Party Packages
const express = require("express");
const cors = require("cors");

// Global Setup
require("dotenv").config();

// Setup
const app = express();
const { getDb } = require("./db/db");

app.use(cors());
app.use(express.json());

// Database connection

app.get("/api", async (req, res) => {
  console.log("Entered api");
  const dbConnection = await getDb();
  console.log("DB Setup Done");
  const result = await dbConnection.execute("SELECT * FROM lectures");
  console.log(result);
  res.status(200).send({ msg: "Hello Sharan Reddy" });
});

module.exports = app;
