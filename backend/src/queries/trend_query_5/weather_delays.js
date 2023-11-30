const trendQuery5 = `
WITH DelayData AS (
    SELECT 
        t2.DELAY_ID, 
        t2.YEAR, 
        t2.MONTH, 
        t2.CARRIER_NAME, 
        t1.AIRPORT,
        t1.CITY, 
        t1.STATE,
        t2.WEATHER_CT
    FROM 
        %%DB_USERNAME%%AIRPORTS t1
        INNER JOIN %%DB_USERNAME%%ASSOCIATED_WITH t3 ON t1.IATA_CODE = t3.AIRPORT_IATA_CODE
        INNER JOIN %%DB_USERNAME%%AIRLINES_DELAY t2 ON t3.DELAY_ID = t2.DELAY_ID
),
JoinedData AS (
    SELECT 
        t2.YEAR,
        CASE 
            WHEN t2.MONTH BETWEEN 1 AND 3 THEN 'Q1'
            WHEN t2.MONTH BETWEEN 4 AND 6 THEN 'Q2'
            WHEN t2.MONTH BETWEEN 7 AND 9 THEN 'Q3'
            WHEN t2.MONTH BETWEEN 10 AND 12 THEN 'Q4'
        END AS QUARTER,
        t2.AIRPORT,
        t2.CITY,
        t2.STATE,
        t2.WEATHER_CT
    FROM 
        %%DB_USERNAME%%DISASTERS t1
        INNER JOIN %%DB_USERNAME%%CAUSES t3 ON t1.ID = t3.DISASTER_ID
        INNER JOIN DelayData t2 ON t3.DELAY_ID = t2.DELAY_ID
),
AggregatedData AS (
    SELECT 
        jd.STATE,
        jd.YEAR,
        jd.QUARTER,
        AVG(jd.WEATHER_CT) AS AvgWeatherImpact
    FROM 
        JoinedData jd
    GROUP BY 
        jd.STATE, jd.YEAR, jd.QUARTER
    HAVING
    jd.STATE = :fromState AND
    jd.YEAR BETWEEN :startYear AND :endYear AND
    jd.QUARTER BETWEEN :startQuarter AND :endQuarter
)
SELECT 
    ad.STATE,
    ad.YEAR,
    ad.QUARTER, 
    ad.AvgWeatherImpact
FROM 
    AggregatedData ad
ORDER BY 
    ad.STATE, ad.YEAR, ad.QUARTER
`;

// const trendQuery6 = 'SELECT DISTINCT STATE FROM KONDAS.AIRPORTS ORDER BY STATE;';

// const trendQuery7 = 'SELECT DISTINCT YEAR FROM KONDAS.AIRLINES_DELAY ORDER BY YEAR;'



module.exports = {trendQuery5};
