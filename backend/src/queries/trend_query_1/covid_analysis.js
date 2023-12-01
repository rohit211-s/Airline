const formatQuery = (props) => {
  let airport = props.airportVal;
  let state = props.stateVal;
  let delay_type = props.delayTypeVal;
  const trend_query_1 = `
  WITH user_delay_types AS (
      SELECT delay_type
      FROM  ${process.env.DB_USERNAME_REPLACE_PREFIX}delay_types
      WHERE delay_type IN (${delay_type})
  ), airport_reg AS
  ( 
  SELECT
      ad.airport as airport_code, 
      a.airport as airport_name
  FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
  JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
  WHERE ad.airport = '${airport}'
  UNION ALL
  SELECT
      ad.airport as airportCode, 
      a.airport as airport_name
  FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
  JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
  WHERE NOT EXISTS (
       SELECT
          ad.airport as airportCode, 
          a.airport as airport_name
      FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
      JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
      WHERE ad.airport = '${airport}'
      )
  ),
  regions AS
  ( 
  SELECT
      ad.airport as airport_code, 
      a.airport as airport_name
  FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
  JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
  WHERE a.state = '${state}'
  UNION ALL
  SELECT
      ad.airport as airportCode, 
      a.airport as airport_name
  FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
  JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
  WHERE NOT EXISTS (
       SELECT
          ad.airport as airportCode, 
          a.airport as airport_name
      FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
      JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
      WHERE a.state = '${state}'
      )
  )
  , delayed_flights AS (
      SELECT
          ad.year,
          udt.delay_type,
          AVG(CASE WHEN udt.delay_type = 'security_delay' THEN security_delay END) AS avg_security_delay,
          AVG(CASE WHEN udt.delay_type = 'carrier_delay' THEN carrier_delay END) AS avg_carrier_delay,
          AVG(CASE WHEN udt.delay_type = 'weather_delay' THEN weather_delay END) AS avg_weather_delay,
          AVG(CASE WHEN udt.delay_type = 'late_aircraft_delay' THEN late_aircraft_delay END) AS avg_late_aircraft_delay,
          AVG(CASE WHEN udt.delay_type = 'nas_delay' THEN nas_delay END) AS avg_nas_delay,
          AVG(CASE WHEN udt.delay_type = 'arr_delay' THEN nas_delay END) AS avg_arr_delay
      FROM
          ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
      JOIN
          ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON ad.airport = a.iata_code
      CROSS JOIN
          user_delay_types udt
      WHERE   ad.airport IN (
        SELECT airport_code
        FROM airport_reg 
        )
    AND
    ad.airport IN (
        SELECT airport_code
        FROM regions
        )
      GROUP BY
          ad.year, udt.delay_type
  )
  SELECT
      year,
      delay_type,
      AVG(avg_delay) AS avg_delay
  FROM (
      SELECT
          year,
          delay_type,
          avg_security_delay AS avg_delay FROM delayed_flights
      UNION ALL
      SELECT
          year,
          delay_type,
          avg_carrier_delay FROM delayed_flights
      UNION ALL
      SELECT
          year,
          delay_type,
          avg_weather_delay FROM delayed_flights
      UNION ALL
      SELECT
          year,
          delay_type,
          avg_late_aircraft_delay FROM delayed_flights
      UNION ALL
      SELECT
          year,
          delay_type,
          avg_nas_delay FROM delayed_flights
  ) 
  GROUP BY
      year, delay_type
  ORDER BY
      year, delay_type
  
    `;
  return trend_query_1;
};

module.exports = formatQuery;
