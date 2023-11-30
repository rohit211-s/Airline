const formatQuery = (props) => {
  let holiday = props.holiday;
  let airport = props.airport;
  let state = props.state;
  let start_year = props.start_year;
  let end_year = props.end_year;
  const trend_query_4 = `WITH formatted_date AS
    (
    SELECT EXTRACT(DAY FROM date_) AS DAY,
           EXTRACT(MONTH FROM date_) AS MONTH,
           SUBSTR(date_, 8, 2) AS YEAR,
           holiday
    FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}holidays
    WHERE holiday IN (${holiday})
    UNION ALL
    SELECT EXTRACT(DAY FROM date_) AS DAY,
           EXTRACT(MONTH FROM date_) AS MONTH,
           SUBSTR(date_, 8, 2) AS YEAR,
           holiday
    FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}holidays
    WHERE NOT EXISTS(
        SELECT EXTRACT(DAY FROM date_) AS DAY,
               EXTRACT(MONTH FROM date_) AS MONTH,
               SUBSTR(date_, 8, 2) AS YEAR,
               holiday
        FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}holidays
        WHERE holiday IN (${holiday})
        )
    ),
   airport_reg AS
    ( 
    SELECT
        ad.airport as airport_code, 
        a.airport as airport_name
    FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
    JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports a ON a.iata_code = ad.airport
    WHERE a.airport = '${airport}'
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
        WHERE a.airport = '${airport}'
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
    UNION
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
    
    
SELECT AVG(arr_delay+carrier_delay+weather_delay+nas_delay+security_delay+late_aircraft_delay)/100 AS AVG_DELAY,
       ad.year,
       fd.holiday
FROM ${process.env.DB_USERNAME_REPLACE_PREFIX}airlines_delay ad
JOIN formatted_date fd ON 
    CONCAT(ad.day, CONCAT('-', CONCAT(CONCAT(ad.month, '-'), SUBSTR(ad.year, 3, 2)))) = 
    CONCAT(fd.day, CONCAT('-', CONCAT(CONCAT(fd.month, '-'), fd.year)))
JOIN ${process.env.DB_USERNAME_REPLACE_PREFIX}airports air ON air.iata_code = ad.airport
WHERE 
     air.airport IN (
        SELECT airport_name
        FROM airport_reg 
        )
    AND
    air.airport IN (
        SELECT airport_name
        FROM regions
        )
    AND
    ad.year BETWEEN ${start_year} AND ${end_year}
GROUP BY ad.year, fd.holiday
ORDER BY ad.year
`;
  return trend_query_4;
};

module.exports = formatQuery;
