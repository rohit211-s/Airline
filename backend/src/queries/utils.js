const fetchAllYears = `SELECT distinct year year_code, year year_name from airlines_trips WHERE
    ( 'yearly' = (
            SELECT
                CASE
                    WHEN length('%startDate%') = 4 THEN
                        'yearly'
                    WHEN length('%startDate%') > 4 THEN
                        'quarterly'
                END
            FROM
                dual
        )
      AND year >= (SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY)
      AND year <= ( SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY) )
    OR ( 'quarterly' = (
            SELECT
                CASE
                    WHEN length('%startDate%') = 4 THEN
                        'yearly'
                    WHEN length('%startDate%') > 4 THEN
                        'quarterly'
                END
            FROM
                dual
        )
         AND ( year > (
        SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    )
               OR ( year = (
            SELECT
                TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
            FETCH FIRST 1 ROW ONLY
        )
                    AND quarter >= (
        SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 2, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 2, level) IS NOT NULL
        ORDER BY
            ROWNUM DESC
        FETCH FIRST 1 ROW ONLY
    ) ) )
         AND ( year < (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    )
               OR ( ( year = (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    ) )
                    AND ( quarter <= (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 2, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 2, level) IS NOT NULL
        ORDER BY
            ROWNUM DESC
        FETCH FIRST 1 ROW ONLY
    ) ) ) ) ) order by year_code`;
const fetchAllQuarters = `SELECT distinct CONCAT(year, CONCAT(' - ', quarter)) quarter_code, CONCAT(year, CONCAT(' - ', quarter)) quarter_name from airlines_trips  WHERE
    ( 'yearly' = (
            SELECT
                CASE
                    WHEN length('%startDate%') = 4 THEN
                        'yearly'
                    WHEN length('%startDate%') > 4 THEN
                        'quarterly'
                END
            FROM
                dual
        )
      AND year >= (SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY)
      AND year <= ( SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY) )
    OR ( 'quarterly' = (
            SELECT
                CASE
                    WHEN length('%startDate%') = 4 THEN
                        'yearly'
                    WHEN length('%startDate%') > 4 THEN
                        'quarterly'
                END
            FROM
                dual
        )
         AND ( year > (
        SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    )
               OR ( year = (
            SELECT
                TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
            FETCH FIRST 1 ROW ONLY
        )
                    AND quarter >= (
        SELECT
            TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 2, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%startDate%', '[^-]+', 2, level) IS NOT NULL
        ORDER BY
            ROWNUM DESC
        FETCH FIRST 1 ROW ONLY
    ) ) )
         AND ( year < (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    )
               OR ( ( year = (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
        FETCH FIRST 1 ROW ONLY
    ) )
                    AND ( quarter <= (
        SELECT
            TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 2, level)) AS string_parts
        FROM
            dual
        CONNECT BY
            regexp_substr('%endDate%', '[^-]+', 2, level) IS NOT NULL
        ORDER BY
            ROWNUM DESC
        FETCH FIRST 1 ROW ONLY
    ) ) ) ) ) order by quarter_code`;
const fetchAllStates = `SELECT distinct t1.acronym state_code, t2.official_name_state state_name from (SELECT distinct regexp_replace(from_airport, '(.+), (.+), (.+)', '\\3') acronym FROM airport_distances UNION SELECT distinct regexp_replace(to_airport, '(.+), (.+), (.+)', '\\3') acronym FROM airport_distances) t1 inner join states t2 on t1.acronym = t2.usps_state_abbreviation order by state_code`;
const fetchAllCities = `SELECT distinct regexp_replace(from_airport, '(.+), (.+), (.+)', '\\2') city_code, regexp_replace(from_airport, '(.+), (.+), (.+)', '\\2') city_name FROM airport_distances UNION SELECT distinct regexp_replace(to_airport, '(.+), (.+), (.+)', '\\2') city_code, regexp_replace(to_airport, '(.+), (.+), (.+)', '\\2') city_name FROM airport_distances order by city_code`;
const fetchAllAirports = `SELECT distinct regexp_replace(from_airport, '(.+), (.+), (.+)', '\\1') airport_code, regexp_replace(from_airport, '(.+), (.+), (.+)', '\\1') airport_name FROM airport_distances UNION SELECT distinct regexp_replace(to_airport, '(.+), (.+), (.+)', '\\1') airport_code, regexp_replace(to_airport, '(.+), (.+), (.+)', '\\1') airport_name FROM airport_distances order by airport_code`;

module.exports = {
  cities: fetchAllCities,
  states: fetchAllStates,
  airports: fetchAllAirports,
  all: {
    yearly: fetchAllYears,
    quarterly: fetchAllQuarters,
  },
};
