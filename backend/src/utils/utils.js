const fs = require("fs");

const filterResponse = (data, pageNum, pageLimit) => {
  return data.filter((row, idx) => {
    return idx >= pageNum * pageLimit && idx < (pageNum + 1) * pageLimit;
  });
};

const getQueryAttributes = (params) => {
  let groupByAttributes = [];
  let selectColumns = [];
  let orderByColumns = [];

  if (params.timeline == "yearly") {
    groupByAttributes.push("year");
    selectColumns.push("year");
    orderByColumns.push("year");
  }

  if (params.timeline == "quarterly") {
    groupByAttributes.push(["year", "quarter"]);
    selectColumns.push("CONCAT(year, CONCAT(' - ', quarter)) quarter");
    orderByColumns.push("quarter");
  }

  if (params.group == "cities") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\2')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\2') city"
    );
    orderByColumns.push("city");
  }

  if (params.group == "states") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\3')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\3') state"
    );

    orderByColumns.push("state");
  }

  if (params.group == "airports") {
    groupByAttributes.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\1')"
    );
    selectColumns.push(
      "regexp_replace(airport, '(.+), (.+), (.+)', '\\1') airport"
    );

    orderByColumns.push("airport");
  }

  return { selectColumns, orderByColumns, groupByAttributes };
};

const executeQuery = async (db, query) => {
  const queryHistory = fs
    .readFileSync("logs/queries.txt", "utf8")
    .split("%%__QUERY_DELIM__%%");

  const resp = await db.execute(query);

  queryHistory.unshift(query);
  if (queryHistory.length > 15) {
    queryHistory.pop();
  }

  // fs.writeFileSync(
  //   "logs/queries.txt",
  //   queryHistory.join("%%__QUERY_DELIM__%%")
  // );

  return resp;
};

const fetchQueries = () => {
  const queryHistory = fs
    .readFileSync("logs/queries.txt", "utf8")
    .split("%%__QUERY_DELIM__%%");
  return queryHistory;
};

module.exports = {
  filterResponse,
  getQueryAttributes,
  executeQuery,
  fetchQueries,
};
