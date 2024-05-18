# Project Overview

## Description
This project aims to analyze how airline delays in the United States over a period of 19 years are influenced by factors such as COVID-19, weather, disasters, customer satisfaction, revenues, and income levels. The project will use public datasets from Kaggle and the United States Bureau of Transportation Statistics (BTS) to extract meaningful trends and insights.

## Data Sources
- **Kaggle Public Datasets**: Includes airline information, airport departure details, delay types, customer satisfaction levels, compensation benefits, and scheduled flight counts.
- **Bureau of Transportation Statistics (BTS)**: Provides data on airline operations and statistics.
- **COVID-19 Data**: Analyzes the impact of the pandemic on airline functioning.

## Scope
The dataset covers over 350,000 records from 2003 to 2022, encompassing information on weather, disasters, delays, customer satisfaction, airline statistics, and passenger statistics. This comprehensive dataset helps explore fluctuations in airline choices, identify common delay types and locations, and understand trends over time.

## Goals
- **Trend Analysis**: Identify key trends related to consumer complaints, travel history, airline operations, and revenues.
- **Interactive Interface**: Create a responsive web application for users to interact with the dataset and visualize trends.
- **Stakeholder Insights**: Provide valuable insights for passengers, airline authorities, travel agencies, government bodies, the tourism industry, competitors, and other stakeholders.

## Motivation
Due to redundancies and the high correlation between different attributes, managing this dataset within a database will facilitate complex queries and efficient analysis. This project aims to help various users understand airline delays and operational trends, enabling them to make informed decisions.

## User Interests
- **Passengers**: Find reliable airlines, plan trips, and understand fare trends.
- **Airline Employees**: Gain insights into job security, working conditions, and operational efficiency.
- **Airline Management**: Make strategic decisions based on historical and current data.
- **Airport Authorities**: Optimize operations and manage resources effectively.
- **Travel Agencies**: Enhance travel planning and customer satisfaction.
- **Tourism Industry**: Understand travel patterns and improve service offerings.
- **Competitors**: Analyze market dynamics and adjust strategies accordingly.

# User Interface Design

## Main Page
The main page features five distinct buttons, each leading to a different type of trend analysis. A central graph displays airline trips in the USA with delays shown over time.

## Trend Analyses
1. **Weather Affect Trend**: Analyzes how weather changes impact airline delays.
2. **Price Analysis**: Examines price trends based on route popularity, delays, and passenger numbers.
3. **COVID-19 Influence**: Shows the pandemic's impact on delays, passenger travel, and fares.
4. **Holiday Affect**: Projects how holidays affect airline delays.
5. **Airline Popularity Trend**: Displays airline popularity based on factors like cost, delays, and comfort.

## Mockups
Each trend analysis page includes filters for users to customize their queries and visualize data specific to their interests.

# Complex Trend Queries

1. **COVID-19 Influence**: Compare airline operations before, during, and after the pandemic to understand recovery trends.
2. **Airline Popularity Over Time**: Analyze how passenger preferences and delay trends influence airline popularity.
3. **Price Trends**: Investigate airline fare trends in relation to passenger income levels and travel frequency.
4. **Busiest Airports During Holidays**: Identify peak delays and no-delay periods at major airports during holidays.
5. **Weather and Disasters Impact**: Assess how weather conditions and natural disasters affect airline operations in specific cities.

# Conceptual Database Design

## Entity-Relationship Model
The database design includes several key entities and their relationships:

- **Airlines_Delay**: Records monthly delay information by airline and airport.
  - `YEAR, MONTH`: Denoted the month of delay information.
  - `CARRIER, CARRIER_NAME, AIRPORT, AIRPORT_NAME`: Records the delay at the specific airport by a specific carrier.
  - `ARR_FLIGHTS, ARR_DEL15`: Total number of flights and delayed flights.
  - `CARRIER_CT, WEATHER_CT, NAS_CT, SECURITY_CT, LATE_AIRCRAFT_CT`: The impact score on the airline delays with respect to carrier, weather, security, and late aircraft.
  - `ARR_CANCELLED, ARR_DIVERTED`: The number of flights arrived which got cancelled and diverted.
  - `ARR_DELAY, CARRIER_DELAY, WEATHER_DELAY, NAS_DELAY, SECURITY_DELAY, LATE_AIRCRAFT_DELAY`: Delay in minutes classified based on arrival, carrier, weather, NAS (airport operations, heavy traffic, etc.), security reasons, and late aircraft.

- **Airports**: Stores the details of all the airports.
  - `IATA_CODE`: Represents the unique International Air Transport Association (IATA) code for the airport.
  - `AIRPORT`: The name of the airport.
  - `CITY`: The city where the airport is located.
  - `STATE`: The state or province where the airport is situated.
  - `LATITUDE, LONGITUDE`: Geographical location of the airport.

- **Airlines**: Stores the airline name and associated IATA code.
  - `IATA_CODE`: Unique IATA code of the airline.
  - `AIRLINE`: Name of the airline.

- **Airlines_Fares**: Maintains fares for flights between cities/airports.
  - `YEAR, QUARTER`: Year and quarter of the year when the fare is recorded.
  - `CITYMARKETID_FROM, CITYMARKETID_TO`: Consolidate airports serving the same city market.
  - `FROM_CITY, TO_CITY`: City names of the departure and arrival destinations.
  - `AIRPORTID_FROM, AIRPORTID_TO`: Airport IDs of the departure and arrival airports.
  - `PASSENGERS`: Number of passengers associated with the fare data.
  - `FARE`: Fare amount for the airline route.
  - `CARRIER_LG, LARGE_MS, FARE_LG`: Carrier code, market share, and average fare with the largest market share.
  - `CARRIER_LOW, LF_MS, FARE_LOW`: Carrier responsible for a lower portion of the passengers.

- **States**: Stores the GPS location, name, and code for all the states.
  - `GEO_POINT`: Geographical location of the state.
  - `OFFICIAL_CODE_STATE, OFFICIAL_NAME_STATE`: Official state name and code.
  - `TYPE`: Indicates if it’s a state or outlying area.
  - `USPS_STATE_ABBREVIATION`: State code given by the government.

- **Holidays**: Maintains dates of all holiday types.
  - `DATE, HOLIDAY`: Date and name of the holiday.
  - `WEEKDAY`: Day of the week.

- **Disasters**: Stores details of disasters like type, subtypes, and dates.
  - `ID`: Unique identifier for each record.
  - `YEAR, START_YEAR, START_MONTH, START_DAY, END_YEAR, END_MONTH, END_DAY`: Time frame of the disaster.
  - `DISASTER_SUBGROUP, DISASTER_TYPE, DISASTER_SUBTYPE, DISASTER_SUBSUBTYPE, EVENT_NAME`: Classification of the disaster and its name.
  - `LOCATION, LATITUDE, LONGITUDE`: Geographical location of the disaster.
  - `TOTAL_DEATHS, NO_INJURED, NO_AFFECTED, NO_HOMELESS`: Number of people impacted by the disaster.

- **Feedback**: Stores customer feedback on various trip experience factors.
  - `SOME_ID`: Unique identifier for each record.
  - `GENDER, CUSTOMER_TYPE, AGE, TYPE_OF_TRAVEL, CLASS`: Customer details.
  - `FLIGHT_DISTANCE`: Distance covered in the flight.
  - `INFLIGHT_WIFI_SERVICE, DEPARTURE/ARRIVAL_TIME_CONVENIENT, EASE_OF_ONLINE_BOOKING, GATE_LOCATION, FOOD_AND_DRINK, ONLINE_BOARDING, SEAT_COMFORT, INFLIGHT_ENTERTAINMENT, ON-BOARD_SERVICE, LEG_ROOM_SERVICE, BAGGAGE_HANDLING, CHECKIN_SERVICE, INFLIGHT_SERVICE, CLEANLINESS`: Factors influencing the customer’s trip experience.
