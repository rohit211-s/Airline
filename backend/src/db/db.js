const oracledb = require("oracledb");

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

module.exports = { getConnection };
