// Third Party Packages
const express = require("express");
const cors = require("cors");

// Custom packages
const utils = require("./utils/utils");

// Custom Routes
const rawEditorRouter = require("./routes/raw_editor");
const trendQuery2Router = require("./routes/trend_query2");

// Global Setup
require("dotenv").config();

// Setup
const app = express();

app.use(cors());
app.use(express.json());
app.use(rawEditorRouter);
app.use(trendQuery2Router);

module.exports = app;
