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
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../../../config/config";

const Query1 = () => {
  const [delayType, setDelayType] = useState([]);
  const [airportList, setAirportList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [selectedStates, setSelectedStates] = useState({
    delayCauseVal: [],
    airportVal: "All",
    stateVal: "All",
  });

  const fetchData = async () => {
    const response = await axios.get(
      `${constants.BACKEND_URL}/trend_query1/filter_data/`
    );

    setDelayType([
      "Arrival Delay",
      "Weather Delay",
      "Security Delay",
      "Late Aircraft Delay",
      "National Airspace System Delay(NAS)",
    ]);
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
    const mapObj = {
      "Arrival Delay": "arr_delay",
      "Weather Delay": "weather_delay",
      "Security Delay": "security_delay",
      "Late Aircraft Delay": "late_aircraft_delay",
      "National Airspace System Delay(NAS)": "nas_delay",
    };
    const revObj = {
      arr_delay: "Arrival Delay",
      weather_delay: "Weather Delay",
      security_delay: "Security Delay",
      late_aircraft_delay: "Late Aircraft Delay",
      nas_delay: "National Airspace System Delay(NAS)",
    };
    let obj = [];
    for (let i = 0; i < selectedStates.delayCauseVal.length; i++) {
      obj.push(mapObj[selectedStates.delayCauseVal[i]]);
    }
    const payload = {
      delayTypeVal: obj,
      airportVal: selectedStates.airportVal,
      stateVal: selectedStates.stateVal,
    };
    const response = await axios.post(
      `${constants.BACKEND_URL}/trend_query1/`,
      payload
    );

    const data = response.data;
    console.log(data);
    let xArr = [];
    let yArr = [];

    setXAxisData(yearList);
    const uniqueVals = [];
    for (let i = 0; i < data.length; i++) {
      if (uniqueVals.indexOf(data[i][1]) === -1) {
        uniqueVals.push(data[i][1]);
      }
    }
    for (let i = 0; i < uniqueVals.length; i++) {
      yArr.push([]);
    }
    for (let i = 0; i < data.length; i++) {
      let ind = uniqueVals.indexOf(data[i][1]);
      yArr[ind].push(data[i][2]);
    }
    let series = [];
    for (let i = 0; i < yArr.length; i++) {
      series.push({
        id: uniqueVals[i],
        data: yArr[i],
        label: uniqueVals[i],
      });
    }
    console.log(yArr);
    setYAxisData([...series]);
  };

  const handleReset = () => {
    setSelectedStates({
      holidayVal: [],
      airportVal: "All",
      stateVal: "All",
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
                  Select Delay Cause
                </InputLabel>
                <Select
                  name="delayCauseVal"
                  onChange={(e) => handleChange(e)}
                  label="Select Delay Cause"
                  value={selectedStates["delayCauseVal"]}
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
                  {delayType.map((delay) => (
                    <MenuItem value={delay} key={delay}>
                      {delay}
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
                disabled={selectedStates.delayCauseVal.length === 0}
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
                <BarChart
                  xAxis={[
                    {
                      data: xAxisData,
                      scaleType: "band",
                    },
                  ]}
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
export default Query1;
