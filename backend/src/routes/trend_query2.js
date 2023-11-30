// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages
const utils = require("../utils/utils");

// Queries
const trendQuery2 = require("../queries/trend_query_2/passenger_preferences");
const utilQueries = require("../queries/utils");

// Setup
const { getConnection } = require("../db/db");

router.get("/trend_query_2", async (req, res) => {
  const params = req.query;
  const dbConnection = await getConnection();

  let startDate = params.startDate;
  if (!startDate) {
    if (params.timeline == "yearly") {
      startDate = "1993";
    } else {
      startDate = "1993 - 1";
    }
  }

  let endDate = params.endDate;
  if (!endDate) {
    if (params.timeline == "yearly") {
      endDate = "2024";
    } else {
      endDate = "2024 - 4";
    }
  }

  let { selectColumns, groupByAttributes, orderByColumns } =
    utils.getQueryAttributes(params);

  let columns = req.query.columns.split(",");
  if (columns.length > 0 && columns[0] != "") {
    let string = `ROUND((${columns
      .map((column) => {
        if (column === "total_satisfied") {
          return "SUM(total_satisfied)";
        } else if (column == "total_dissatisfied") {
          return "SUM(total_dissatisfied)";
        } else {
          return `SUM(sum_${column})`;
        }
      })
      .join("+")})/(${columns.length}*SUM(total_count)), 2) value`;
    selectColumns.push(string);
  } else {
    selectColumns.push("ROUND(SUM(total_satisfied)/SUM(total_count), 2) value");
  }

  const finalQuery =
    trendQuery2
      .replace(/%startDate%/g, "" + startDate)
      .replace(/%endDate%/g, "" + endDate) +
    ` SELECT ${selectColumns.join(
      ","
    )} FROM %%DB_USERNAME%%airport_level_feedback_statistics GROUP BY ${groupByAttributes.join(
      ","
    )} ORDER BY ${orderByColumns.join(",")}`;

  const resp = await utils.executeQuery(dbConnection, finalQuery);

  // Popular Airlines based on timeline and group by
  let selectColumns2 = [];
  let groupByColumns2 = [];
  let orderByColumns2 = [];

  if (params.timeline == "yearly") {
    selectColumns2.push("year");
    groupByColumns2.push("year");
    orderByColumns2.push("year");
  } else if (params.timeline == "quarterly") {
    selectColumns2.push("CONCAT(year, CONCAT(' - ', quarter)) quarter");
    groupByColumns2.push(["year", "quarter"]);
    orderByColumns2.push("quarter");
  }

  selectColumns2.push(["airline", "COUNT(*)"]);
  groupByColumns2.push("airline");
  orderByColumns2.push("airline");

  const popularAirlines =
    trendQuery2
      .replace(/%startDate%/g, "" + startDate)
      .replace(/%endDate%/g, "" + endDate) +
    ` SELECT ${selectColumns2.join(
      ","
    )} FROM %%DB_USERNAME%%airport_level_feedback_statistics GROUP BY ${groupByColumns2.join(
      ","
    )} ORDER BY ${orderByColumns2.join(",")}`;

  const resp2 = await utils.executeQuery(dbConnection, popularAirlines);

  res.status(200).send({
    columnNames: resp.metaData.map((row) => row.name),
    data: resp.rows,
    popularAirlines: resp2.rows,
  });
});

router.get("/filter_options", async (req, res) => {
  const params = req.query;
  let startDate = params.startDate;
  if (!startDate) {
    if (params.timeline == "yearly") {
      startDate = "1993";
    } else {
      startDate = "1993 - 1";
    }
  }

  let endDate = params.endDate;
  if (!endDate) {
    if (params.timeline == "yearly") {
      endDate = "2024";
    } else {
      endDate = "2024 - 4";
    }
  }

  const queryParams = req.query;
  const dbConnection = await getConnection();
  let query = "";
  if (queryParams.group === "all") {
    query = utilQueries.all[queryParams.timeline];
  } else {
    query = utilQueries[queryParams.group];
  }

  query = query
    .replace(/%startDate%/g, "" + startDate)
    .replace(/%endDate%/g, "" + endDate);

  const resp = await utils.executeQuery(dbConnection, query);
  let respData = resp.rows;

  res.status(200).send(respData.map((row) => [row[0], row[1]]));
});

module.exports = router;
