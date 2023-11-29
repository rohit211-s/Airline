const trendQuery2 = `WITH date_classifier AS (
    SELECT
        CASE
            WHEN length('%startDate%') = 4  THEN
                'yearly'
            WHEN length('%endDate%') = 8 THEN
                'quarterly'
            ELSE
                'invalid'
        END
    FROM
        dual
), date_range_classifier AS (
    SELECT
        TO_NUMBER('%startDate%') min_year,
        1                     min_quarter,
        TO_NUMBER('%endDate%') max_year,
        4                     max_quarter
    FROM
        dual
    WHERE
        'yearly' = (
            SELECT
                *
            FROM
                date_classifier
        )
    UNION
    SELECT
        (
            SELECT
                TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 1, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%startDate%', '[^-]+', 1, level) IS NOT NULL
            FETCH FIRST 1 ROW ONLY
        ) min_year,
        (
            SELECT
                TO_NUMBER(regexp_substr('%startDate%', '[^-]+', 2, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%startDate%', '[^-]+', 2, level) IS NOT NULL
            ORDER BY
                ROWNUM DESC
            FETCH FIRST 1 ROW ONLY
        ) min_quarter,
        (
            SELECT
                TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 1, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%endDate%', '[^-]+', 1, level) IS NOT NULL
            FETCH FIRST 1 ROW ONLY
        ) max_year,
        (
            SELECT
                TO_NUMBER(regexp_substr('%endDate%', '[^-]+', 2, level)) AS string_parts
            FROM
                dual
            CONNECT BY
                regexp_substr('%endDate%', '[^-]+', 2, level) IS NOT NULL
            ORDER BY
                ROWNUM DESC
            FETCH FIRST 1 ROW ONLY
        ) max_quarter
    FROM
        dual
    WHERE
        'quarterly' = (
            SELECT
                *
            FROM
                date_classifier
        )
    UNION
    SELECT
        1993 min_year,
        1    min_quarter,
        2024 max_year,
        4    max_quarter
    FROM
        dual
    WHERE
        'invalid' = (
            SELECT
                *
            FROM
                date_classifier
        )
), custom_airlines_trips AS (
    SELECT
        *
    FROM
        airlines_trips
    WHERE
        ( ( year > (
            SELECT
                min_year
            FROM
                date_range_classifier
        ) )
          OR ( year = (
                SELECT
                    min_year
                FROM
                    date_range_classifier
            )
               AND quarter >= (
            SELECT
                min_quarter
            FROM
                date_range_classifier
        ) ) )
        AND ( ( year < (
            SELECT
                max_year
            FROM
                date_range_classifier
        ) )
              OR ( year = (
                SELECT
                    max_year
                FROM
                    date_range_classifier
            )
                   AND quarter <= (
            SELECT
                max_quarter
            FROM
                date_range_classifier
        ) ) )
), custom_airlines AS (
    SELECT
        *
    FROM
        airlines
), custom_feedbacks AS (
    SELECT
        *
    FROM
        feedbacks
), custom_feedback_metrics AS (
    (
        SELECT
            (
                CASE
                    WHEN satisfaction = 'satisfied' THEN
                        1
                    ELSE
                        0
                END
            )                               satisfaction,
            COUNT(*)                        satisfaction_count,
            AVG(flight_distance)            avg_flight_distance,
            AVG(inflight_wifi_service)      avg_inflight_wifi_service,
            AVG(departure_delay_in_minutes) avg_departure_delay_in_minutes,
            AVG(arrival_delay_in_minutes)   avg_arrival_delay_in_minutes,
            AVG(ease_of_online_booking)     avg_ease_of_online_booking,
            AVG(gate_location)              avg_gate_location,
            AVG(food_and_drink)             avg_food_and_drink,
            AVG(online_boarding)            avg_online_boarding,
            AVG(seat_comfort)               avg_seat_comfort,
            AVG(inflight_entertainment)     avg_inflight_entertainment,
            AVG(on_board_service)           avg_on_board_service,
            AVG(leg_room_service)           avg_leg_room_service,
            AVG(baggage_handling)           avg_baggage_handling,
            AVG(checkin_service)            avg_checkin_service,
            AVG(inflight_service)           avg_inflight_service,
            AVG(cleanliness)                avg_cleanliness
        FROM
            custom_feedbacks
        GROUP BY
            satisfaction
    )
    UNION
    (
        SELECT
            - 1                             satisfaction,
            COUNT(*)                        satisfaction_count,
            AVG(flight_distance)            avg_flight_distance,
            AVG(inflight_wifi_service)      avg_inflight_wifi_service,
            AVG(departure_delay_in_minutes) avg_departure_delay_in_minutes,
            AVG(arrival_delay_in_minutes)   avg_arrival_delay_in_minutes,
            AVG(ease_of_online_booking)     avg_ease_of_online_booking,
            AVG(gate_location)              avg_gate_location,
            AVG(food_and_drink)             avg_food_and_drink,
            AVG(online_boarding)            avg_online_boarding,
            AVG(seat_comfort)               avg_seat_comfort,
            AVG(inflight_entertainment)     avg_inflight_entertainment,
            AVG(on_board_service)           avg_on_board_service,
            AVG(leg_room_service)           avg_leg_room_service,
            AVG(baggage_handling)           avg_baggage_handling,
            AVG(checkin_service)            avg_checkin_service,
            AVG(inflight_service)           avg_inflight_service,
            AVG(cleanliness)                avg_cleanliness
        FROM
            custom_feedbacks
    )
), from_airport_information AS (
    SELECT
        t1.year            year,
        t1.quarter         quarter,
        t2.from_airport    airport,
        SUM(t1.passengers) sum_passengers,
        COUNT(*)           total_passengers,
        SUM(t1.fare)       sum_fares,
        COUNT(*)           total_fares
    FROM
             custom_airlines_trips t1
        INNER JOIN airport_distances t2 ON t1.airport_distances_id = t2.id
    GROUP BY
        t1.year,
        t1.quarter,
        t2.from_airport
), to_airport_information AS (
    SELECT
        t1.year            year,
        t1.quarter         quarter,
        t2.to_airport      airport,
        SUM(t1.passengers) sum_passengers,
        COUNT(*)           total_passengers,
        SUM(t1.fare)       sum_fares,
        COUNT(*)           total_fares
    FROM
             custom_airlines_trips t1
        INNER JOIN airport_distances t2 ON t1.airport_distances_id = t2.id
    GROUP BY
        t1.year,
        t1.quarter,
        t2.to_airport
), airport_level_trip_information AS (
    SELECT
        t1.year,
        t1.quarter,
        t1.airport,
        SUM(t1.sum_passengers) / SUM(t1.total_passengers) avg_passengers,
        SUM(t1.sum_fares) / SUM(t1.total_fares)           avg_fares
    FROM
        (
            SELECT
                *
            FROM
                from_airport_information
            UNION
            SELECT
                *
            FROM
                to_airport_information
        ) t1
    GROUP BY
        t1.year,
        t1.quarter,
        t1.airport
), airport_level_feedback_statistics AS (
    SELECT
        t1.year                         year,
        t1.quarter                      quarter,
        t2.from_airport                 airport,
        t4.airline                      airline,
        SUM(
            CASE t3.satisfaction
                WHEN 'satisfied' THEN
                    1
                ELSE
                    0
            END
        )                               total_satisfied,
        SUM(
            CASE t3.satisfaction
                WHEN 'satisfied' THEN
                    0
                ELSE
                    1
            END
        )                               total_dissatisfied,
        COUNT(*)                        total_count,
        SUM(inflight_wifi_service)      sum_inflight_wifi_service,
        SUM(departure_delay_in_minutes) sum_departure_delay_in_minutes,
        SUM(arrival_delay_in_minutes)   sum_arrival_delay_in_minutes,
        SUM(ease_of_online_booking)     sum_ease_of_online_booking,
        SUM(gate_location)              sum_gate_location,
        SUM(food_and_drink)             sum_food_and_drink,
        SUM(online_boarding)            sum_online_boarding,
        SUM(seat_comfort)               sum_seat_comfort,
        SUM(inflight_entertainment)     sum_inflight_entertainment,
        SUM(on_board_service)           sum_on_board_service,
        SUM(leg_room_service)           sum_leg_room_service,
        SUM(baggage_handling)           sum_baggage_handling,
        SUM(checkin_service)            sum_checkin_service,
        SUM(inflight_service)           sum_inflight_service,
        SUM(cleanliness)                sum_cleanliness
    FROM
             custom_airlines_trips t1
        INNER JOIN airport_distances t2 ON t1.airport_distances_id = t2.id
        INNER JOIN feedbacks         t3 ON t1.trip_id = t3.trip_id
        INNER JOIN airlines          t4 ON t1.airline_id = t4.id
    GROUP BY
        t1.year,
        t1.quarter,
        t2.from_airport,
        t4.airline
)`;

module.exports = trendQuery2;
