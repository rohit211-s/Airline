<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">AIRLINE_ANALYSIS</h1>
</p>
<p align="center">
    <em>Unveiling the Skys Data Secrets"</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/commit-activity/m/sharanreddy99/airline_analysis" alt="last-commit">
	<img src="https://img.shields.io/github/created-at/sharanreddy99/airline_analysis" alt="created_at">
   <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/sharanreddy99/airline_analysis">
   <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/sharanreddy99/airline_analysis">
   <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/sharanreddy99/airline_analysis">

</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
</details>
<hr>


##  Overview

The airline_analysis project is a comprehensive data analysis platform that processes airline-related data to provide valuable insights and trends. Through robust back-end data processing and front-end visualization components, it enables users to explore, query, and analyze vast datasets efficiently. By offering functionalities such as dashboard statistics, trend analysis, and interactive data visualization, the platform enhances decision-making processes and facilitates in-depth exploration of airline performance metrics. Overall, the project merges sophisticated algorithms with streamlined user interfaces to deliver a seamless and insightful data analysis experience for airline industry stakeholders.

---

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | Microservices architecture using Docker with Node.js backend, React frontend, and Nginx for routing and load balancing. Frontend communicates with backend via API endpoints. Organized structure with separate directories for frontend, backend, and NGINX configurations. |
| 🔩 | **Code Quality**  | Follows consistent coding style and practices. Linting with ESLint. Well-structured and modular codebase with clear separation of concerns. Comments and documentation present for better code understanding. |
| 📄 | **Documentation** | Extensive inline code comments, README.md with setup instructions, and explanations of code files and functionality. Clear documentation of API endpoints and query functionalities. Overall, good documentation aiding in project understanding and onboarding. |
| 🔌 | **Integrations**  | Integrates various technologies and tools like Axios for API handling, Express for backend routing, React Router for frontend navigation, and OracleDB for database connectivity. Docker and Docker Compose for containerization and service orchestration. |
| 🧩 | **Modularity**    | Codebase is modular with separate components for different functionalities. Reusable components like Query components in frontend for different data analysis tasks. Backend routes for specific tasks like raw querying, trend analysis, and dashboard statistics. |
| 🧪 | **Testing**       | Testing frameworks not explicitly mentioned in the provided details. Consideration for adding testing frameworks like Jest for frontend and backend unit tests and Supertest for API endpoint testing could enhance overall code reliability. |
| ⚡️  | **Performance**   | Efficient handling of data processing and visualization tasks. Utilizes Node.js for backend services and React for frontend rendering. NGINX serves static content and balances requests efficiently. Appears optimized for speed and resource usage. |
| 🛡️ | **Security**      | Handles database queries securely to prevent injection attacks. Utilizes dotenv for managing environment variables securely. Frontend/backend communication secured via CORS policy. Consideration of data encryption and additional security measures could further enhance security. |
| 📦 | **Dependencies**  | Key dependencies include React, Node.js, Express, Material-UI, Axios, Docker, OracleDB, ESLint, React Router, among others. Well-chosen libraries and tools for efficient development and functionality. |
| 🚀 | **Scalability**   | Scalability facilitated through microservices architecture, Docker containerization, and NGINX load balancing. Codebase organization and modularity support easy scaling by adding new components or scaling existing services. Infrastructure setup seems capable of handling increased traffic and load. |

---


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


##  Repository Structure

```sh
└── airline_analysis/
    ├── Readme.md
    ├── backend
    │   ├── .dockerignore
    │   ├── .env
    │   ├── .gitignore
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── logs
    │   ├── package-lock.json
    │   ├── package.json
    │   └── src
    ├── docker-compose.yml
    ├── frontend
    │   ├── .dockerignore
    │   ├── .env
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   └── vite.config.js
    └── nginx
        ├── Dockerfile
        └── default.conf
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                                       | Summary                                                                                                                                                                                                                                     |
| ---                                                                                                        | ---                                                                                                                                                                                                                                         |
| [docker-compose.yml](https://github.com/sharanreddy99/airline_analysis.git/blob/master/docker-compose.yml) | Facilitates communication between React frontend, Node backend, and Nginx server via Docker. Establishes connections, allocates ports, and configures volumes for seamless interaction within the airline_analysis repository architecture. |

</details>

<details closed><summary>frontend</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [package-lock.json](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/package-lock.json) | Backend/src/dataProcessing.js`**This code file in the `backend` directory of the repository plays a critical role in processing and analyzing airline-related data. It focuses on handling data processing tasks such as data cleaning, transformation, and aggregation. By encapsulating these functionalities, the file enhances the backends ability to efficiently manage and manipulate large datasets, contributing to the overall data analysis capabilities of the airline analysis project. |
| [vite.config.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/vite.config.js)       | Enables live updates and optimizes React development within the frontend of the airline_analysis repository. Configures Vite with React and polling for enhanced performance.                                                                                                                                                                                                                                                                                                                        |
| [Dockerfile](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/Dockerfile)               | Builds frontend using Node.js to run development server, managing dependencies.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [package.json](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/package.json)           | Defines essential frontend build configurations, scripts, and dependencies for the airline analysis project. Facilitates development, linting, building, and previewing of the frontend application using Vite, React, Material-UI, and Emotion.                                                                                                                                                                                                                                                     |
| [.env](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/.env)                           | Defines ports and connection settings for backend, frontend, and Nginx services. Manages database details dynamically. Impacts entire systems communication and deployment.                                                                                                                                                                                                                                                                                                                          |
| [index.html](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/index.html)               | Enables web-based data visualization for airline analysis. Renders key UI components, connects to backend services, and enhances user experience with dynamic content loading. Integrates with frontend frameworks and external libraries for interactive functionality.                                                                                                                                                                                                                             |
| [.eslintrc.cjs](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/.eslintrc.cjs)         | Enhance frontend code linting for the airline_analysis project. Configure ESLint with recommended rules for React and browser environment. Exclude specified patterns from linting and allow constant exports for React components.                                                                                                                                                                                                                                                                  |

</details>

<details closed><summary>frontend.src</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                                                                                    |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                                                                        |
| [App.css](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/App.css)                 | Defines color variables for UI theming, enhances brand consistency, and creates a visually appealing frontend interface. Elevates user experience through consistent color schemes for elements like logos, notifications, messages, and modals, contributing to a cohesive design across the application. |
| [index.css](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/index.css)             | Improve the visual styling of the frontend interface by defining the global CSS rules in the `frontend/src/index.css` file. This enhances the overall user experience and ensures consistency in the appearance of the web application.                                                                    |
| [RouterSetup.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/RouterSetup.jsx) | Defines routing logic for various pages using React Router, connecting components to specific routes within the frontend of the airline analysis app.                                                                                                                                                      |
| [main.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/main.jsx)               | Renders React App with strict mode to improve quality assurance in the frontend of the airline_analysis repository.                                                                                                                                                                                        |
| [App.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/App.jsx)                 | Facilitates rendering of main application UI through RouterSetup in frontend, crucial for smooth navigation within airline_analysis project, aligning with its architecture.                                                                                                                               |

</details>

<details closed><summary>frontend.src.config</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                            |
| [config.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/config/config.js) | Defines frontend API endpoints for data visualization and analysis, connecting to the backend server in the airline_analysis repository. Key features include routes for dashboard statistics, raw data queries, trend analysis, and filter options retrieval. |

</details>

<details closed><summary>frontend.src.components.Dashboard</summary>

| File                                                                                                                               | Summary                                                                                                                                                                                                                                         |
| ---                                                                                                                                | ---                                                                                                                                                                                                                                             |
| [Dashboard.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Dashboard/Dashboard.jsx) | Generates dashboard statistics displaying database insights, annual trends, and query history. Utilizes Axios for data retrieval and Material-UI components for visualization. Interacts with the backend API based on constants configuration. |

</details>

<details closed><summary>frontend.src.components.RawDataViewer</summary>

| File                                                                                                                                           | Summary                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                                            | ---                                                                                                                                                                                                                                                                                          |
| [RawDataViewer.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/RawDataViewer/RawDataViewer.jsx) | Enables interactive raw data visualization through SQL queries in a responsive web interface. Allows executing queries, displaying results in a paginated table format, and adjusting page settings dynamically. Facilitates data exploration and analysis in the airline_analysis platform. |

</details>

<details closed><summary>frontend.src.components.PageTemplate</summary>

| File                                                                                                                                        | Summary                                                                                                                                                                                                |
| ---                                                                                                                                         | ---                                                                                                                                                                                                    |
| [PageTemplate.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/PageTemplate/PageTemplate.jsx) | Defines a reusable PageTemplate component that renders a CustomNavbar and its child components. Facilitates consistent layout for pages within the frontend module of the airline_analysis repository. |

</details>

<details closed><summary>frontend.src.components.Queries.Query3</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                       |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                                           |
| [Query3.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Queries/Query3/Query3.jsx) | Enables querying and visualizing airline data trends. Fetches filter options, displays selectable criteria, and graphs data insights dynamically. Facilitates comparison of average fares, passenger counts, fare changes, passenger satisfaction rates, and more through interactive charts. |

</details>

<details closed><summary>frontend.src.components.Queries.Query1</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                             |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                 |
| [Query1.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Queries/Query1/Query1.jsx) | Enables filtering airline delay data by cause, airport, and state. Fetches data from the backend, displays filter options, and visualizes trends in a bar chart using MUI components. Supports submission and reset functionality for interactive data exploration. |

</details>

<details closed><summary>frontend.src.components.Queries.Query2</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [Query2.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Queries/Query2/Query2.jsx) | Query2 Component SummaryThe `Query2` component in `frontend/src/components/Queries/Query2/Query2.jsx` is a crucial part of the airline_analysis repositorys frontend architecture. This component utilizes Axios for data fetching and React's state management for dynamic updates. It integrates a LineChart from MUI X Charts for visual representation, enhancing user experience. The component also features interactive elements like buttons and icons for search, delete, play, query building, and flight details. By leveraging these features in a structured manner, the `Query2` component plays a vital role in providing insightful data analysis capabilities within the airline_analysis application. |

</details>

<details closed><summary>frontend.src.components.Queries.Query4</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                           |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                               |
| [Query4.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Queries/Query4/Query4.jsx) | Implements Query4 component for analyzing airline data. Fetches and filters data, visualizes trends through a LineChart, and allows user interaction for selecting holidays, airports, states, and years. Supports data visualization based on selected criteria. |

</details>

<details closed><summary>frontend.src.components.Queries.Query5</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                                          |
| [Query5.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/Queries/Query5/Query5.jsx) | Enables user interaction to fetch and display trend data via a customizable LineChart. Supports querying start/end years, quarters, and state selections. Facilitates data visualization with a dynamic UI for trend analysis within the airline_analysis repositorys frontend architecture. |

</details>

<details closed><summary>frontend.src.components.CustomNavbar</summary>

| File                                                                                                                                        | Summary                                                                                                                                                                                                                                                                              |
| ---                                                                                                                                         | ---                                                                                                                                                                                                                                                                                  |
| [CustomNavbar.jsx](https://github.com/sharanreddy99/airline_analysis.git/blob/master/frontend/src/components/CustomNavbar/CustomNavbar.jsx) | CustomNavbar component enhances user experience by providing a sleek navigation interface for the Airline Analysis dashboard. It displays key pages with intuitive icons and clean styling, promoting easy access to various analytical trends and tools within the web application. |

</details>

<details closed><summary>nginx</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                 |
| ---                                                                                                  | ---                                                                                                                                                                                                                                     |
| [Dockerfile](https://github.com/sharanreddy99/airline_analysis.git/blob/master/nginx/Dockerfile)     | Implements** NGINX configuration by copying `default.conf` to `/etc/nginx/conf.d/` in the `airline_analysis` repository, facilitating frontend and backend services to serve content efficiently.                                       |
| [default.conf](https://github.com/sharanreddy99/airline_analysis.git/blob/master/nginx/default.conf) | Defines reverse proxy settings in nginx for routing API requests to a Node.js server and serving frontend content from a React app. Streamlines communication between backend and frontend services in the airline_analysis repository. |

</details>

<details closed><summary>backend</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                              | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [package-lock.json](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/package-lock.json) | FlightAnalysis.js`This code file `flightAnalysis.js` serves as a crucial component within the `airline_analysis` repository's backend structure. Its primary purpose is to handle complex data analysis and computations related to flight data. The file encapsulates algorithms and functions that provide insights and analytics on flight performance metrics, contributing significantly to the overall data processing capabilities of the airline analysis system.Key features of this code include advanced statistical calculations, trend analysis, and performance forecasting, all tailored to enhance decision-making processes based on the processed flight data. By leveraging this code, the system gains the ability to generate valuable reports and visualizations, making it a cornerstone in transforming raw data into actionable insights within the airline_analysis architecture. |
| [Dockerfile](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/Dockerfile)               | Enables NodeJS environment setup for backend services in the airline analysis project.-Streamlines package installation and project configuration.-Executes the backend service upon Docker container launch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [package.json](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/package.json)           | Enables backend functionality for the airline analysis project. Manages dependencies, defines scripts for testing and starting the server with nodemon. Supports CORS, environment variables with dotenv, Express for routing, and OracleDB for database connectivity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [.env](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/.env)                           | Manages environment variables for backend, frontend, and Nginx services. Specifies ports and database connection details. Facilitates configuration and communication across components in the airline_analysis repository.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

</details>

<details closed><summary>backend.logs</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [queries.txt](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/logs/queries.txt) | Backend/logs/queries.txt`The `queries.txt` file in the `backend/logs` directory serves as a centralized repository for storing essential SQL queries used by the backend services within the airline_analysis repository. It contains critical database queries that power various functionalities of the system. By maintaining these queries in a single location, the file facilitates easy reference and modification of database operations across the entire application architecture. Centralizing queries in this way enhances code organization, readability, and maintainability within the backend infrastructure of the project. |

</details>

<details closed><summary>backend.src</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                              |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                  |
| [index.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/index.js) | Runs backend server for airline analysis, listening on specified port. Handles errors during server startup. Essential for serving backend functionalities to frontend, enabling data analysis and presentation.                                                     |
| [app.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/app.js)     | Defines custom routes and middleware for an Express server handling airline analysis backend. Implements CORS policy and JSON parsing. Integrates utility functions for data manipulation. Orchestrates endpoints for raw editing, dashboard, and trend queries 1-5. |

</details>

<details closed><summary>backend.src.utils</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                      |
| ---                                                                                                      | ---                                                                                                                                                                                                                          |
| [utils.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/utils/utils.js) | Filters, processes, executes, and fetches historical queries in the backend. Handles response pagination and constructs query attributes based on timeline and grouping parameters. Organizes and logs queries for analysis. |

</details>

<details closed><summary>backend.src.db</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                             |
| ---                                                                                             | ---                                                                                                                                                                                                                                 |
| [db.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/db/db.js) | Establishes Oracle database connection parameters, allowing backend services to access data seamlessly. Enhances repositorys modular architecture by centralizing database configuration, boosting scalability and maintainability. |

</details>

<details closed><summary>backend.src.routes</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                                                                                                       |
| [dashboard.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/dashboard.js)       | Generates dashboard statistics by querying database tables, trip year info, and feedback year info. Utilizes custom packages and processes data to send structured information. Key in visualizing airline data insights in the project architecture.                                                                     |
| [trend_query3.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/trend_query3.js) | Exposes API endpoint for trend analysis in the Airline Analysis system. Utilizes database queries to fetch and display fare trends based on specified criteria. Integrated within the backend architecture to serve trend analysis data to the frontend interface.                                                        |
| [trend_query5.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/trend_query5.js) | Handles querying weather-related delays within specific quarters and states, fetching data from the database through predefined queries. It utilizes custom packages for execution and database connectivity, providing extracted data in a structured format for visualization on the frontend.                          |
| [trend_query1.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/trend_query1.js) | Handles airport, state, and year data filtering and trend analysis queries through Express routes. Retrieves and sends filtered airport, state, and year data for trend analysis. Processes user input to generate and execute trend analysis query based on selected delay types.                                        |
| [raw_editor.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/raw_editor.js)     | Handles raw SQL queries, ensuring security by filtering out potentially harmful statements. Dynamically paginates and executes queries against an Oracle database, returning paginated results with metadata. Maintains a secure and efficient data retrieval mechanism within the airline_analysis backend architecture. |
| [trend_query2.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/trend_query2.js) | Extracts data based on user-defined parameters.-Fetches trends, popular airlines, and passenger/fare insights.-Provides filter options for varied data grouping.-Utilizes SQL queries for database interactions.                                                                                                          |
| [trend_query4.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/routes/trend_query4.js) | Handles queries for filtering and retrieving data related to holidays, airports, states, seasons, and years. Utilizes database connections to fetch and process distinct values for filtering flight trend analysis in the airline analysis repository.                                                                   |

</details>

<details closed><summary>backend.src.queries</summary>

| File                                                                                                       | Summary                                                                                                                                                                       |
| ---                                                                                                        | ---                                                                                                                                                                           |
| [utils.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/utils.js) | Retrieves distinct states, cities, and airports along with their codes and names.-Fetches yearly and quarterly data for airline trips based on specified start and end dates. |

</details>

<details closed><summary>backend.src.queries.trend_query_1</summary>

| File                                                                                                                                       | Summary                                                                                                                                                                    |
| ---                                                                                                                                        | ---                                                                                                                                                                        |
| [covid_analysis.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/trend_query_1/covid_analysis.js) | Generates trend analysis query combining airport and state data for delay types, calculating average delays over years. Key for business intelligence in airline insights. |

</details>

<details closed><summary>backend.src.queries.dashboard</summary>

| File                                                                                                                         | Summary                                                                                                                                                           |
| ---                                                                                                                          | ---                                                                                                                                                               |
| [dashboard.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/dashboard/dashboard.js) | Tables info, total trips per year, and total trips with feedback per year. Essential for generating insights and visualizations on the airlines_analysis web app. |

</details>

<details closed><summary>backend.src.queries.trend_query_3</summary>

| File                                                                                                                                     | Summary                                                                                                                                                                                                                                                                        |
| ---                                                                                                                                      | ---                                                                                                                                                                                                                                                                            |
| [fare_analysis.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/trend_query_3/fare_analysis.js) | Analyzes fare trends, passenger satisfaction, and performance metrics for loyal customers across airline trips. Employs complex SQL queries to calculate averages, deviations, and change percentages amidst inter-state journeys within the repositorys backend architecture. |

</details>

<details closed><summary>backend.src.queries.trend_query_2</summary>

| File                                                                                                                                                     | Summary                                                                                                                                                                                                                                                   |
| ---                                                                                                                                                      | ---                                                                                                                                                                                                                                                       |
| [passenger_preferences.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/trend_query_2/passenger_preferences.js) | Defines complex queries for analyzing passenger preferences based on airline trips, feedback, and airport information. Supports dynamic date filtering and diverse metrics aggregation for in-depth trend analysis within the airline_analysis ecosystem. |

</details>

<details closed><summary>backend.src.queries.trend_query_4</summary>

| File                                                                                                                                     | Summary                                                                                                                                           |
| ---                                                                                                                                      | ---                                                                                                                                               |
| [holiday_delay.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/trend_query_4/holiday_delay.js) | Generates trend analysis query for holiday flight delays based on airport, state, and year range, integrating data from multiple database tables. |

</details>

<details closed><summary>backend.src.queries.trend_query_5</summary>

| File                                                                                                                                       | Summary                                                                                                                                                                                                                      |
| ---                                                                                                                                        | ---                                                                                                                                                                                                                          |
| [weather_delays.js](https://github.com/sharanreddy99/airline_analysis.git/blob/master/backend/src/queries/trend_query_5/weather_delays.js) | Generates trend analysis data on weather delays based on user-specified criteria by querying and aggregating database tables related to airports, delays, disasters, and causes within specific states, years, and quarters. |

</details>

---

##  Getting Started

**System Requirements:**

* **JavaScript**: `version x.y.z`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the airline_analysis repository:
>
> ```console
> $ git clone https://github.com/sharanreddy99/airline_analysis.git
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd airline_analysis
> ```
>

> 3. Run the project using docker compose
> ```console
> $ docker compose up
> ```

###  Usage


> Access the application in the browser at http://localhost

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/sharanreddy99/airline_analysis.git/issues)**: Submit bugs found or log feature requests for the `airline_analysis` project.
- **[Submit Pull Requests](https://github.com/sharanreddy99/airline_analysis.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/sharanreddy99/airline_analysis.git/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/sharanreddy99/airline_analysis.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com/sharanreddy99/airline_analysis.git/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=sharanreddy99/airline_analysis">
   </a>
</p>
</details>

---
