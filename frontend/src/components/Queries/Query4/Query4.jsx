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
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../../../config/config";

const Query4 = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [airportList, setAirportList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [selectedStates, setSelectedStates] = useState({
    holidayVal: [],
    airportVal: "All",
    stateVal: "All",
    startYearVal: "All",
    endYearVal: "All",
  });

  const fetchData = async () => {
    const response = await axios.get(
      `${constants.BACKEND_URL}/trend_query4/filter_data/`
    );

    setHolidayList(formatData(response.data.holidays));
    setAirportList(formatData(response.data.airports));
    setStateList(formatData(response.data.states));
    setYearList(formatData(response.data.years));
  };

  const formatData = (data) => {
    let formattedData = [];
    data.sort();
    formattedData.push("All");
    for (let i = 0; i < data.length; i++) {
      formattedData.push(data[i][0]);
    }
    return formattedData;
  };

  const handleChange = (event) => {
    setSelectedStates({
      ...selectedStates,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      selectedStates.startYearVal != "All" &&
      selectedStates.endYearVal != "All" &&
      parseInt(selectedStates.startYearVal) >
        parseInt(selectedStates.endYearVal)
    ) {
      alert("End year must be greater than start year.");
    } else {
      const response = await axios.post(
        `${constants.BACKEND_URL}/trend_query4/`,
        selectedStates
      );

      const data = response.data;
      let xArr = [];
      let yArr = [];

      setXAxisData(xArr);
      const uniqueVals = [];
      for (let i = 0; i < data.length; i++) {
        if (uniqueVals.indexOf(data[i][2]) === -1) {
          uniqueVals.push(data[i][2]);
        }
      }
      for (let i = 0; i < uniqueVals.length; i++) {
        yArr.push([]);
      }
      let val = uniqueVals[0];
      for (let i = 0; i < data.length; i++) {
        if (data[i][2] === val) {
          xArr.push(data[i][1]);
        }
      }
      for (let i = 0; i < data.length; i++) {
        let ind = uniqueVals.indexOf(data[i][2]);
        if (yArr[ind].length !== xArr.length) yArr[ind].push(data[i][0]);
      }
      let series = [];
      for (let i = 0; i < yArr.length; i++) {
        series.push({
          id: uniqueVals[i],
          data: yArr[i],
          area: true,
          stack: "total",
          label: uniqueVals[i],
        });
      }
      setYAxisData([...series]);
    }
  };

  const handleReset = () => {
    setSelectedStates({
      holidayVal: [],
      airportVal: "All",
      stateVal: "All",
      startYearVal: "All",
      endYearVal: "All",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {stateList.length && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              width: "80%",
              height: "25%",
              backgroundColor: "white",
              padding: "2vh",
              marginTop: "2vh",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "8px",
            }}
          >
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Holiday
                </InputLabel>
                <Select
                  name="holidayVal"
                  onChange={(e) => handleChange(e)}
                  label="Select Holiday"
                  value={selectedStates["holidayVal"]}
                  multiple
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {holidayList.map((holiday) => (
                    <MenuItem value={holiday} key={holiday}>
                      {holiday}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Airport
                </InputLabel>
                <Select
                  name="airportVal"
                  onChange={(e) => handleChange(e)}
                  label="Select Airport"
                  value={selectedStates["airportVal"]}
                >
                  {airportList.map((airport) => (
                    <MenuItem value={airport} key={airport}>
                      {airport}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select State
                </InputLabel>
                <Select
                  name="stateVal"
                  onChange={(e) => handleChange(e)}
                  label="Select State"
                  value={selectedStates["stateVal"]}
                >
                  {stateList.map((state) => (
                    <MenuItem value={state} key={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Start Year
                </InputLabel>
                <Select
                  name="startYearVal"
                  onChange={(e) => handleChange(e)}
                  label="Select Start Year"
                  value={selectedStates["startYearVal"]}
                >
                  {yearList.map((startYear) => (
                    <MenuItem value={startYear} key={startYear}>
                      {startYear}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select End Year
                </InputLabel>
                <Select
                  name="endYearVal"
                  onChange={(e) => handleChange(e)}
                  label="Select End Year"
                  value={selectedStates["endYearVal"]}
                >
                  {yearList.map((endYear) => (
                    <MenuItem value={endYear} key={endYear}>
                      {endYear}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "100%", height: "100%" }}
                onClick={handleSubmit}
                disabled={selectedStates.holidayVal.length === 0}
              >
                Submit
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "100%", height: "100%" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          <div>
            {yAxisData.length && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: "5vh",
                  padding: "2vh",
                  backgroundColor: "white",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <LineChart
                  xAxis={[
                    {
                      data: xAxisData,
                      valueFormatter: (v) => v.toString(),
                      id: "years",
                    },
                  ]}
                  yAxis={[{ id: "delay" }]}
                  series={yAxisData}
                  width={800}
                  height={500}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Query4;
