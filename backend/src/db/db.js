const oracledb = require("oracledb");

async function connectToOracle() {
  try {
    const connConfig = {
      user: process.env.AIRLINE_ANALYSIS_DATABASE_USERNAME,
      password: process.env.AIRLINE_ANALYSIS_DATABASE_PASSWORD,
      connectionString: process.env.AIRLINE_ANALYSIS_DATABASE_CONNECTION_STRING,
      poolMin: 2,
      poolMax: 10,
    };

    console.log(connConfig);

    const connection = await oracledb.getConnection(connConfig);
    console.log(
      "Result is: ",
      await connection.execute("SELECT * from lectures")
    );
  } catch (err) {
    console.error("Error connecting to Oracle Database:", err);
  }
}

connectToOracle();

module.exports = { getConnection: oracledb.getConnection };
