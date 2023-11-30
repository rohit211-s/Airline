// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages
const utils = require("../utils/utils");

// Queries
const dashboardQueries = require("../queries/dashboard/dashboard");

// Setup
const { getConnection } = require("../db/db");

const processTableInfo = (tableInfo) => {
  const tableObj = { data: {}, totalRows: 0 };
  for (let i = 0; i < tableInfo.length; i++) {
    tableObj["data"] = tableInfo;
    tableObj["totalRows"] += tableInfo[i][1];
  }

  return tableObj;
};

// Routes
router.get("/dashboard_statistics", async (req, res) => {
  const dbConnection = await getConnection();
  const tableInfo = await utils.executeQuery(
    dbConnection,
    dashboardQueries.tablesInfoQuery
  );
  const tripYearInfo = await utils.executeQuery(
    dbConnection,
    dashboardQueries.tripYearQuery
  );

  const feedbackYearInfo = await utils.executeQuery(
    dbConnection,
    dashboardQueries.feedbackYearQuery
  );

  res.status(200).send({
    tableInfo: processTableInfo(tableInfo.rows),
    tripYearInfo: tripYearInfo.rows,
    feedbackYearInfo: feedbackYearInfo.rows,
    queryHistory: utils.fetchQueries(),
  });
});

module.exports = router;
