const assert = require("assert");
const oracledb = require("oracledb");
let _db;

const connConfig = {
  user: process.env.AIRLINE_ANALYSIS_DATABASE_USERNAME,
  password: process.env.AIRLINE_ANALYSIS_DATABASE_PASSWORD,
  connectionString: process.env.AIRLINE_ANALYSIS_DATABASE_CONNECTION_STRING,
  poolMin: 2,
  poolMax: 10,
};

console.log(connConfig);

async function initDb(callback) {
  if (_db) {
    console.log("Trying to init DB again!");
    return callback(null, _db);
  }

  _db = await oracledb.createPool(connConfig);
  return callback(null, _db);
}

async function getDb() {
  assert.ok(_db, "Db has not been initialized. Please called init first.");
  const conn = await _db.getConnection();
  return conn;
}

module.exports = {
  getDb,
  initDb,
};
