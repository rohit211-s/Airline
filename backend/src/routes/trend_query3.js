// Standard Packages
const app = require("express");
const router = app.Router();

// Custom Packages
const utils = require("../utils/utils");

// Queries
const trendQuery3 = require("../queries/trend_query_3/fare_analysis");
const utilQueries = require("../queries/utils");


// Setup
const { getConnection } = require("../db/db");

router.get("/trend_query_3",async (req,res) =>{
    const params=req.query;
    const dbConnection = await getConnection();
    const startYear=params.startYear;
    const startQuarter=params.startQuarter;
    const endYear=params.endYear;
    const endQuarter=params.endQuarter;
    const fromState=params.fromState;
    const toState=params.toState;

    const finalQuery=trendQuery3;
    const resp = await utils.executeQuery(dbConnection, finalQuery,{
        startYear:startYear,
        startQuarter:startQuarter,
        endYear:endYear,
        endQuarter:endQuarter,
        fromState:fromState,
        toState:toState
    });
    res.status(200).send({
        columnNames: resp.metaData.map((row) => row.name),
        data: resp.rows
      });
});

module.exports = router;