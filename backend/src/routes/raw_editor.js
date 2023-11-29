// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages
const utils = require("../utils/utils");

// Setup
const oracledb = require("oracledb");
const { getConnection } = require("../db/db");

// Routes
router.post("/raw_query", async (req, res) => {
  let query = req.body.query;

  if (query.toLowerCase().includes("with")) {
    // oracledb.escap
    query = query.replace(/[\n]+/g, " ");
    console.log(query);
    const dbConnection = await getConnection();
    const resp = await utils.executeQuery(dbConnection, query);
    const respData = resp.rows;

    let totalPages = Math.ceil(respData.length / pageLimit);
    res.status(201).send({
      pageNum: 0,
      pageLimit: 10,
      totalPages: totalPages,
      totalRows: respData.length,
      columnNames: resp.metaData.map((row) => row.name),
      response: utils.filterResponse(respData, pageNum, pageLimit),
    });
    return;
  }

  query = query.replace(/[;\n]+/g, "").toLowerCase();
  let pageNum = req.body.pageNum;
  let pageLimit = req.body.pageLimit;

  if (
    query.includes("insert into") ||
    query.includes("update") ||
    query.includes("drop table") ||
    query.includes("alter table") ||
    query.includes("grant") ||
    query.includes("revoke") ||
    query.includes("delete from")
  ) {
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
  const resp = await utils.executeQuery(dbConnection, query);
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

module.exports = router;
