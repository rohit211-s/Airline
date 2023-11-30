const trendQuery3 = `
WITH TRIP_SATISFACTION AS (
    SELECT 
      TRIP_ID, 
      ROUND(
        COUNT(
          CASE WHEN SATISFACTION = 'satisfied' THEN 1 END
        ) * 100.0 / NULLIF(
          COUNT(*), 
          0
        ), 
        2
      ) AS SATISFACTION_PERCENTAGE 
    FROM 
      %%DB_USERNAME%%FEEDBACKS 
    WHERE 
      CUSTOMER_TYPE = 'Loyal Customer' 
    GROUP BY 
      TRIP_ID
  ),
  PRICE_ANALYSIS AS (
    SELECT 
      a_t.year, 
      a_t.QUARTER, 
      F_S.OFFICIAL_NAME_STATE from_state, 
      T_S.OFFICIAL_NAME_STATE to_state, 
      AVG(a_t.Fare) avg_price, 
      AVG(a_t.PASSENGERS) avg_passengers, 
      STDDEV(a_t.FARE) fare_stddev, 
      COUNT(*) trip_count, 
      LAG(
        AVG(a_t.PASSENGERS)
      ) OVER (
        PARTITION BY F_S.OFFICIAL_NAME_STATE, 
        T_S.OFFICIAL_NAME_STATE 
        ORDER BY 
          a_t.year, 
          a_t.QUARTER
      ) prev_avg_passengers, 
      LAG(
        AVG(a_t.Fare)
      ) OVER (
        PARTITION BY F_S.OFFICIAL_NAME_STATE, 
        T_S.OFFICIAL_NAME_STATE 
        ORDER BY 
          a_t.year, 
          a_t.QUARTER
      ) prev_avg_price,
      ROUND(
      AVG(ts.SATISFACTION_PERCENTAGE), 
      2
    ) AS avg_satisfaction_percentage 
      FROM 
      %%DB_USERNAME%%AIRLINES_TRIPS a_t 
      JOIN %%DB_USERNAME%%AIRPORT_DISTANCES a_d ON a_d.ID = a_t.AIRPORT_DISTANCES_ID 
      JOIN %%DB_USERNAME%%AIRLINES AL ON AL.ID = a_t.AIRLINE_ID 
      LEFT JOIN TRIP_SATISFACTION TS ON a_t.trip_id = TS.trip_id
      JOIN %%DB_USERNAME%%STATES F_S ON F_S.USPS_STATE_ABBREVIATION = TRIM(
        BOTH ' ' 
        FROM 
          REGEXP_SUBSTR(FROM_AIRPORT, '[^,]+$')
      ) 
      JOIN %%DB_USERNAME%%STATES T_S ON T_S.USPS_STATE_ABBREVIATION = TRIM(
        BOTH ' ' 
        FROM 
          REGEXP_SUBSTR(TO_AIRPORT, '[^,]+$')
      ) 
    WHERE 
      (
          (YEAR = :startYear AND QUARTER >= :startQuarter)
          OR (YEAR > :startYear AND YEAR < :endYear)
          OR (YEAR = :endYear AND QUARTER <= :endQuarter)
      )
      AND TRIM(
        BOTH ' ' 
        FROM 
          REGEXP_SUBSTR(a_d.from_airport, '[^,]+$')
      ) = (
        SELECT 
          USPS_STATE_ABBREVIATION 
        FROM 
          %%DB_USERNAME%%STATES 
        WHERE 
          OFFICIAL_NAME_STATE = :fromState
      ) 
      AND TRIM(
        BOTH ' ' 
        FROM 
          REGEXP_SUBSTR(a_d.to_airport, '[^,]+$')
      ) = (
        SELECT 
          USPS_STATE_ABBREVIATION 
        FROM 
          %%DB_USERNAME%%STATES 
        WHERE 
          OFFICIAL_NAME_STATE = :toState
      ) 
    GROUP BY 
      a_t.year, 
      a_t.QUARTER, 
      F_S.OFFICIAL_NAME_STATE, 
      T_S.OFFICIAL_NAME_STATE
  )
  SELECT 
  year, 
  QUARTER,
  ROUND(
    avg_price, 
    2
  ) AS avg_price, 
  ROUND(
    avg_passengers, 
    2
  ) AS avg_passengers, 
  ROUND(
    fare_stddev, 
    2
  ) AS fare_stddev, 
  --trip_count AS total_trips,
    ROUND(
    LEAST(
      GREATEST(
        COALESCE(
          (
            (avg_price - prev_avg_price) / NULLIF(prev_avg_price, 0)
          ) * 100, 
          0
        ), 
        -200
      ), 
      200
    ), 
    2
  ) AS fare_change_percentage,
  ROUND(
    LEAST(
      GREATEST(
        COALESCE(
          (
            (
              avg_passengers - prev_avg_passengers
            ) / NULLIF(prev_avg_passengers, 0)
          ) * 100, 
          0
        ), 
        -200
      ), 
      200
    ), 
    2
  ) AS passenger_change_percentage, 
  avg_satisfaction_percentage
FROM 
  PRICE_ANALYSIS p 
ORDER BY 
  year, 
  QUARTER
    `;

module.exports = trendQuery3;
