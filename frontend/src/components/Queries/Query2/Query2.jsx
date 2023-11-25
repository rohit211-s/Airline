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
} from "@mui/material";

const Query2 = () => {
  // States
  const [mainState, setMainState] = useState({
    columnNames: [],
    data: [],
    firstDropDown: "yearly",
    secondDropDown: "all",
    filteredOptions: [],
    selectedFilters: [],
    selectedColumns: [],
  });

  // Effects
  useEffect(() => {
    fetchData();
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
    const resp1 = await axios.get(
      `${constants.BACKEND_URL}${constants.TREND_QUERY_2_PATH}?timeline=${
        mainState.firstDropDown
      }&group=${
        mainState.secondDropDown
      }&columns=${mainState.selectedColumns.join(",")}`
    );

    if (isFetchAll) {
      const resp2 = await axios.get(
        `${constants.BACKEND_URL}${constants.GET_FILTER_OPTIONS_PATH}?timeline=${mainState.firstDropDown}&group=${mainState.secondDropDown}`
      );

      setMainState({
        ...mainState,
        columnNames: resp1.data.columnNames,
        data: resp1.data.data,
        filterOptions: resp2.data,
      });
    } else {
      setMainState({
        ...mainState,
        columnNames: resp1.data.columnNames,
        data: resp1.data.data,
      });
    }
  };

  // Constants

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
      <Grid item xs={6}>
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
                firstDropDown: e.target.value,
              });
            }}
          >
            <MenuItem value={"yearly"}>Yearly</MenuItem>
            <MenuItem value={"quarterly"}>Quarterly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
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
          View Updated Graph
        </Button>
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
          <LineChart
            xAxis={
              mainState.secondDropDown == "all"
                ? [
                    {
                      scaleType: "band",
                      data: mainState.filterOptions.map((filter) => filter[0]),
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
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Query2;
