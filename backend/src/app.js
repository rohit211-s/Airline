// Third Party Packages
const express = require("express");
const cors = require("cors");

// Global Setup
require("dotenv").config();

// Setup
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
  res.status(200).send({ msg: "Hello Sharan Reddy" });
});

module.exports = app;
