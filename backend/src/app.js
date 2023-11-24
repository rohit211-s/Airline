// Third Party Packages
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

// Custom packages
const utils = require("./utils/utils");
const trendQuery2 = require("./queries/trend_query_2/passenger_preferences");

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
  const result = await dbConnection.execute("SELECT * FROM states");
  const data = result.rows;
  res.status(200).send({ result: data });
});

app.post("/raw_query", async (req, res) => {
  let query = req.body.query;
  query = query.trim(";").toLowerCase();
  let pageNum = req.body.pageNum;
  let pageLimit = req.body.pageLimit;

  if (!query.startsWith("select")) {
    res.status(403).send({
      pageNum: 0,
      pageLimit: 0,
      totalPages: 0,
      totalRows: 0,
      columnNames: [],
      queryResponse: [],
    });
  }

  if (pageNum == 0 && pageLimit == 0) {
    pageLimit = 10;
  } else {
    if (!query.includes("fetch first")) {
      if (!query.includes("offset")) {
        query += ` OFFSET ${pageNum * pageLimit} ROWS`;
      }

      if (pageLimit > 0) query += ` FETCH FIRST ${pageLimit} ROWS ONLY `;
    }
  }

  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(query);
  const respData = resp.rows;

  let totalPages = Math.ceil(respData.length / pageLimit);
  res.status(201).send({
    pageNum: pageNum,
    pageLimit: pageLimit,
    totalPages: totalPages,
    totalRows: respData.length,
    columnNames: resp.metaData.map((row) => row.name),
    response: utils.filterResponse(respData, pageNum, pageLimit),
  });
});

app.get("/trend_query_2", async (req, res) => {
  let type = req.params;

  const dbConnection = await getConnection();
  const resp = await dbConnection.execute(trendQuery2);
  const respData = resp.rows;

  // res.status(200).send({
  //   columnNames: resp.metaData.map((row)=> row.name),
  //   data: resp.data.data
  // })

  res.status(200).send({ asdas: "asdsad" });
});

module.exports = app;
