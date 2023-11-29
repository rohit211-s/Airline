const tablesInfoQuery = "SELECT table_name, num_rows from user_tables";
const tripYearQuery =
  "SELECT year, count(*) total_trips from airlines_trips group by year order by year";
const feedbackYearQuery =
  "SELECT year, count(*) total_trips from airlines_trips t1 inner join feedbacks t2 on t1.trip_id = t2.trip_id group by year order by year";

module.exports = { tablesInfoQuery, tripYearQuery, feedbackYearQuery };
