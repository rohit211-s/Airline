// Third Party Packages
const express = require("express");
const cors = require("cors");

// Global Setup
require("dotenv").config();
require("npm-atom").db;
require("./routers/automaticserver");

// Custom Packages
const middleware = require("npm-atom").middleware;
const defaultAuthRouter = require("npm-atom").auth;
const defaultEmailRouter = require("npm-atom").email;
const itemRouter = require("./routers/items");
const reminderRouter = require("./routers/reminder");

// Setup
const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.InitAPILoggerMiddleware);
app.use("/api/auth", defaultAuthRouter);
app.use("/api/email", defaultEmailRouter);
app.use("/api/items", itemRouter);
app.use("/api/reminders", reminderRouter);

module.exports = app;
