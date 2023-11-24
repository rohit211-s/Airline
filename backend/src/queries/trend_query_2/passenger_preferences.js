const trendQuery2 = `
    WITH custom_airlines_trips AS (
        SELECT
            *
        FROM
            airlines_trips
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
                airlines_trips t1
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
                airlines_trips t1
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
                airlines_trips t1
            INNER JOIN airport_distances t2 ON t1.airport_distances_id = t2.id
            INNER JOIN feedbacks         t3 ON t1.trip_id = t3.trip_id
            INNER JOIN airlines          t4 ON t1.airline_id = t4.id
        GROUP BY
            t1.year,
            t1.quarter,
            t2.from_airport,
            t4.airline
    ), yearly_statistics AS (
        SELECT
            year,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year
        ORDER BY
            year
    ), quarterly_statistics AS (
        SELECT
            year,
            quarter,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year,
            quarter
        ORDER BY
            year,
            quarter
    ), state_statistics AS (
        SELECT
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\3')      state,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\3')
        ORDER BY
            year,
            state
    ), city_statistics AS (
        SELECT
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\2')      city,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\2')
        ORDER BY
            year,
            city
    ), airport_statistics AS (
        SELECT
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\1')      airport,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year,
            regexp_replace(airport, '(.+), (.+), (.+)', '\\1')
        ORDER BY
            year,
            airport
    ), airline_statistics AS (
        SELECT
            year,
            airline,
            ( SUM(total_satisfied) / SUM(total_count) ) * 100      satisfaction_percent,
            SUM(sum_inflight_wifi_service) / SUM(total_count)      overall_inflight_wifi_service,
            SUM(sum_departure_delay_in_minutes) / SUM(total_count) overall_departure_delay_in_minutes,
            SUM(sum_arrival_delay_in_minutes) / SUM(total_count)   overall_arrival_delay_in_minutes,
            SUM(sum_ease_of_online_booking) / SUM(total_count)     overall_ease_of_online_booking,
            SUM(sum_gate_location) / SUM(total_count)              overall_gate_location,
            SUM(sum_food_and_drink) / SUM(total_count)             overall_food_and_drink,
            SUM(sum_online_boarding) / SUM(total_count)            overall_online_boarding,
            SUM(sum_seat_comfort) / SUM(total_count)               overall_seat_comfort,
            SUM(sum_inflight_entertainment) / SUM(total_count)     overall_inflight_entertainment,
            SUM(sum_on_board_service) / SUM(total_count)           overall_on_board_service,
            SUM(sum_leg_room_service) / SUM(total_count)           overall_leg_room_service,
            SUM(sum_baggage_handling) / SUM(total_count)           overall_baggage_handling,
            SUM(sum_checkin_service) / SUM(total_count)            overall_checkin_service,
            SUM(sum_inflight_service) / SUM(total_count)           overall_inflight_service,
            SUM(sum_cleanliness) / SUM(total_count)                overall_cleanliness
        FROM
            airport_level_feedback_statistics
        GROUP BY
            year,
            airline
        ORDER BY
            year,
            airline
    )
    SELECT
        *
    FROM
        state_statistics
    `;

module.exports = trendQuery2;
