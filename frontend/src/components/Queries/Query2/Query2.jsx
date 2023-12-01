import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import constants from "../../../config/config";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

const Query2 = () => {
  // States
  const [mainState, setMainState] = useState({
    columnNames: [],
    data: [],
    popularAirlines: [],
    passengerFareInfo: [],
    firstDropDown: "yearly",
    secondDropDown: "all",
    filterOptions: [],
    selectedFilters: [],
    selectedColumns: [],
    selectedAirlines: [],
    airlinesList: [],
    startDate: null,
    endDate: null,
  });

  const [dateRanges, setDateRanges] = useState([]);

  // Effects
  useEffect(() => {
    console.log("Entered useEffect");
    if (mainState.firstDropDown == "yearly") {
      let newArray = [];
      for (let i = 1993; i < 2024; i++) {
        newArray.push(i);
      }
      setDateRanges(newArray);
    } else if (mainState.firstDropDown == "quarterly") {
      let newArray = [];
      for (let i = 1993; i < 2024; i++) {
        for (let j = 1; j <= 4; j++) {
          newArray.push(i + " - " + j);
        }
      }
      setDateRanges(newArray);
    } else {
      setDateRanges([]);
    }
  }, [mainState.firstDropDown, mainState.secondDropDown]);

  // Handlers
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setMainState({
      ...mainState,
      selectedFilters: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeAirlines = (event) => {
    const {
      target: { value },
    } = event;

    setMainState({
      ...mainState,
      selectedAirlines: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeColumns = (event) => {
    const {
      target: { value },
    } = event;

    setMainState({
      ...mainState,
      selectedColumns: typeof value === "string" ? value.split(",") : value,
    });
  };

  const fetchData = async (isFetchAll = true) => {
    let url = `${constants.BACKEND_URL}${
      constants.TREND_QUERY_2_PATH
    }?timeline=${mainState.firstDropDown}&group=${
      mainState.secondDropDown
    }&columns=${mainState.selectedColumns.join(",")}`;

    if (mainState.startDate != null && mainState.endDate != null) {
      if (mainState.startDate > mainState.endDate) {
        return;
      }

      url += `&startDate=${mainState.startDate}&endDate=${mainState.endDate}`;
    }

    const resp1 = await axios.get(url);

    if (isFetchAll) {
      let url = `${constants.BACKEND_URL}${constants.GET_FILTER_OPTIONS_PATH}?timeline=${mainState.firstDropDown}&group=${mainState.secondDropDown}`;
      if (mainState.startDate != null && mainState.endDate != null) {
        url += `&startDate=${mainState.startDate}&endDate=${mainState.endDate}`;
      }

      const resp2 = await axios.get(url);

      setMainState({
        ...mainState,
        columnNames: resp1.data.columnNames,
        data: resp1.data.data,
        filterOptions: resp2.data,
        popularAirlines: resp1.data.popularAirlines,
        passengerFareInfo: resp1.data.passengerFareInfo,
        airlinesList: [
          ...new Set(resp1.data.popularAirlines.map((row) => row[1])),
        ],
      });
    } else {
      setMainState({
        ...mainState,
        columnNames: resp1.data.columnNames,
        data: resp1.data.data,
        popularAirlines: resp1.data.popularAirlines,
        passengerFareInfo: resp1.data.passengerFareInfo,
        airlinesList: [
          ...new Set(resp1.data.popularAirlines.map((row) => row[1])),
        ],
      });
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const columns = [
    "total_satisfied",
    "total_dissatisfied",
    "ease_of_online_booking",
    "gate_location",
    "food_and_drink",
    "online_boarding",
    "seat_comfort",
    "inflight_entertainment",
    "on_board_service",
    "leg_room_service",
    "baggage_handling",
    "checkin_service",
    "inflight_service",
    "cleanliness",
  ];

  return (
    <Grid container padding={2} spacing={2}>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel id="timeline">Timeline</InputLabel>
          <Select
            labelId="timeline"
            id="timeline_select"
            value={mainState.firstDropDown}
            label="timeline"
            onChange={(e) => {
              setMainState({
                ...mainState,
                data: [],
                columnNames: [],
                filterOptions: [],
                selectedFilters: [],
                selectedColumns: [],
                selectedAirlines: [],
                firstDropDown: e.target.value,
              });
            }}
          >
            <MenuItem value={"yearly"}>Yearly</MenuItem>
            <MenuItem value={"quarterly"}>Quarterly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl fullWidth>
          <InputLabel id="groupby">Group By</InputLabel>
          <Select
            labelId="groupby"
            id="groupby_select"
            value={mainState.secondDropDown}
            label="Group By"
            onChange={(e) => {
              setMainState({
                ...mainState,
                data: [],
                columnNames: [],
                filterOptions: [],
                selectedFilters: [],
                selectedColumns: [],
                secondDropDown: e.target.value,
              });
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"cities"}>Cities</MenuItem>
            <MenuItem value={"states"}>States</MenuItem>
            <MenuItem value={"airports"}>Airports</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000042",
            ":hover": { backgroundColor: "#000022", color: "white" },
          }}
          onClick={() => {
            fetchData();
          }}
        >
          Fetch Filters
        </Button>
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <InputLabel id="filteroptions">Filter Options</InputLabel>
          <Select
            labelId="filteroptions"
            id="filter_options_select"
            multiple
            value={mainState.selectedFilters}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Filter Options" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {mainState.secondDropDown != "all" &&
            mainState.filterOptions &&
            mainState.filterOptions.length > 0
              ? mainState.filterOptions.map((row) => (
                  <MenuItem key={row[0]} value={row[0]}>
                    {row[1]}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000042",
            ":hover": { backgroundColor: "#000022", color: "white" },
          }}
          onClick={() => {
            setMainState({ ...mainState, selectedFilters: [] });
          }}
        >
          Clear All
        </Button>
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <InputLabel id="columnoptions">Columns To Visualize</InputLabel>
          <Select
            labelId="columnoptions"
            id="column_options_select"
            multiple
            value={mainState.selectedColumns}
            onChange={handleChangeColumns}
            input={
              <OutlinedInput
                id="select-multiple-chip_columns"
                label="Columns To Visualize"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000042",
            ":hover": { backgroundColor: "#000022", color: "white" },
          }}
          onClick={() => {
            fetchData(false);
          }}
        >
          View Graph
        </Button>
      </Grid>
      {mainState.data.length > 0 ? (
        <>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="startdate">Start Date</InputLabel>
              <Select
                labelId="startdate"
                id="startdate_select"
                value={mainState.startDate}
                label="Start Date"
                onChange={(e) => {
                  setMainState({ ...mainState, startDate: e.target.value });
                }}
              >
                {dateRanges.map((row) => {
                  return (
                    <MenuItem key={row} value={row}>
                      {row}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="enddate">End Date</InputLabel>
              <Select
                labelId="enddate"
                id="enddate_select"
                value={mainState.endDate}
                label="End Date"
                onChange={(e) => {
                  setMainState({ ...mainState, endDate: e.target.value });
                }}
              >
                {dateRanges.map((row) => {
                  return (
                    <MenuItem key={row} value={row}>
                      {row}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000042",
                ":hover": { backgroundColor: "#000022", color: "white" },
              }}
              onClick={() => {
                fetchData();
              }}
            >
              View Graph
            </Button>
          </Grid>
        </>
      ) : null}

      <Grid item xs={12}>
        {(mainState.secondDropDown == "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ||
        (mainState.secondDropDown != "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ? (
          <>
            <Typography>
              Satisfaction of Passengers Based on Feedback Parameters
            </Typography>
            <LineChart
              xAxis={
                mainState.secondDropDown == "all"
                  ? [
                      {
                        scaleType: "band",
                        data: mainState.filterOptions.map(
                          (filter) => filter[0]
                        ),
                      },
                    ]
                  : [
                      {
                        scaleType: "band",
                        data: [
                          ...new Set(mainState.data.map((filter) => filter[0])),
                        ],
                      },
                    ]
              }
              series={
                mainState.secondDropDown == "all"
                  ? [{ data: mainState.data.map((row) => row[1]) }]
                  : mainState.selectedFilters.map((filter) => {
                      return {
                        data: mainState.data
                          .filter((row) => {
                            return row[1] == filter;
                          })
                          .map((row) => row[2]),
                        label: filter,
                      };
                    })
              }
              height={600}
              width={1800}
            ></LineChart>
          </>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        {(mainState.secondDropDown == "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ||
        (mainState.secondDropDown != "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ? (
          <>
            <Typography>Passengers Travel Frequency</Typography>
            <LineChart
              xAxis={
                mainState.secondDropDown == "all"
                  ? [
                      {
                        scaleType: "band",
                        data: mainState.filterOptions.map(
                          (filter) => filter[0]
                        ),
                      },
                    ]
                  : [
                      {
                        scaleType: "band",
                        data: [
                          ...new Set(
                            mainState.passengerFareInfo.map(
                              (filter) => filter[0]
                            )
                          ),
                        ],
                      },
                    ]
              }
              series={
                mainState.secondDropDown == "all"
                  ? [{ data: mainState.passengerFareInfo.map((row) => row[1]) }]
                  : mainState.selectedFilters.map((filter) => {
                      return {
                        data: mainState.passengerFareInfo
                          .filter((row) => {
                            return row[1] == filter;
                          })
                          .map((row) => row[2]),
                        label: filter,
                      };
                    })
              }
              height={600}
              width={1800}
            ></LineChart>
          </>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        {(mainState.secondDropDown == "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ||
        (mainState.secondDropDown != "all" &&
          mainState.filterOptions &&
          mainState.filterOptions.length > 0 &&
          mainState.data &&
          mainState.data.length > 0) ? (
          <>
            <Typography>
              Airline Trip Fares Information for a given time
            </Typography>
            <LineChart
              xAxis={
                mainState.secondDropDown == "all"
                  ? [
                      {
                        scaleType: "band",
                        data: mainState.filterOptions.map(
                          (filter) => filter[0]
                        ),
                      },
                    ]
                  : [
                      {
                        scaleType: "band",
                        data: [
                          ...new Set(
                            mainState.passengerFareInfo.map(
                              (filter) => filter[0]
                            )
                          ),
                        ],
                      },
                    ]
              }
              series={
                mainState.secondDropDown == "all"
                  ? [{ data: mainState.passengerFareInfo.map((row) => row[2]) }]
                  : mainState.selectedFilters.map((filter) => {
                      return {
                        data: mainState.passengerFareInfo
                          .filter((row) => {
                            return row[1] == filter;
                          })
                          .map((row) => row[3]),
                        label: filter,
                      };
                    })
              }
              height={600}
              width={1800}
            ></LineChart>
          </>
        ) : null}
      </Grid>
      <Grid item xs={10}>
        <FormControl fullWidth>
          <InputLabel id="airline_filter">Airline Filter</InputLabel>
          <Select
            labelId="airline_filter"
            id="airline_filter_options_select"
            multiple
            value={mainState.selectedAirlines}
            onChange={handleChangeAirlines}
            input={
              <OutlinedInput id="select-multiple-chip" label="Airline Filter" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {mainState.airlinesList && mainState.airlinesList.length > 0
              ? mainState.airlinesList.map((row) => (
                  <MenuItem key={row} value={row}>
                    {row}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000042",
            ":hover": { backgroundColor: "#000022", color: "white" },
          }}
          onClick={() => {
            setMainState({ ...mainState, selectedAirlines: [] });
          }}
        >
          Clear All
        </Button>
      </Grid>
      <Grid item xs={12}>
        {mainState.airlinesList &&
        mainState.airlinesList.length > 0 &&
        mainState.selectedAirlines &&
        mainState.selectedAirlines.length > 0 &&
        mainState.popularAirlines &&
        mainState.popularAirlines.length > 0 ? (
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  ...new Set(
                    mainState.popularAirlines.map((filter) => filter[0])
                  ),
                ],
              },
            ]}
            series={mainState.selectedAirlines.map((filter) => {
              return {
                data: mainState.popularAirlines
                  .filter((row) => {
                    return row[1] == filter;
                  })
                  .map((row) => row[2]),
                label: filter,
              };
            })}
            height={600}
            width={1800}
          ></LineChart>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Query2;
