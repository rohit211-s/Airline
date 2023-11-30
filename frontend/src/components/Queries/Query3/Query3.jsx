import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from '@mui/x-charts/BarChart';
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
const Query3 =()=>{

    const [startYear, setStartYear] = useState("")
    const [endYear, setEndYear] = useState("")
    const [startQuarter, setStartQuarter] = useState("")
    const [endQuarter, setEndQuarter] = useState("")
    const [fromState, setFromState] = useState("")
    const [toState, setToState] = useState("")

    const [years, setYears]=useState([]);
    const [states, setStates]=useState([]);

    const [showGraph, setShowGraph] = useState(false);

    const [dates, setDates] = useState([]);
    const [avgFares, setAvgFares] = useState([]);
    const [avgPassengerCnt, setAvgPassengerCnt] = useState([]);
    const [fareStdDev, setFareStdDev] = useState([]);
    const [farePercentageChange, setFarePercentageChange] = useState([]);
    const [passengerPercentageChange, setPassengerPercentageChange] = useState([]);
    const [passengerSatisfactionRate, setPassengerSatisfactionRate] = useState([]);

    const fetchStates = async ()=>{
        let url=`${constants.BACKEND_URL}${constants.GET_FILTER_OPTIONS_PATH}?timeline=quarterly&group=states`;
        const response = await axios.get(url);
        const states = [];
        for (const item of response.data) {
            states.push(item[1]);
          }
          return states;
    }
    const fetchYears = async ()=>{
        let url=`${constants.BACKEND_URL}${constants.GET_FILTER_OPTIONS_PATH}?timeline=quarterly&group=all`;
        const resp2 = await axios.get(url);
        const years = [];
        for (const item of resp2.data) {
            const year = item[0].split(' - ')[0];
            if (!years.includes(year)) {
              years.push(year);
            }
          }
          return years;
    }

    const fetchData = async () => {
        const fetchedYears = await fetchYears();
        const fetchedStates = await fetchStates();
        setYears(fetchedYears);
        setStates(fetchedStates);
    };

    const fetchGraph = async () =>{
        const params={
            startYear:startYear,
            startQuarter:startQuarter,
            endYear:endYear,
            endQuarter:endQuarter,
            fromState:fromState,
            toState:toState
        }
        const url = `${constants.BACKEND_URL}${constants.TREND_QUERY_3_PATH}`;
        const response = await axios.get(url, {params});
        const coloumnNames = response.data.columnNames;
        const data = response.data.data;
        const newDates = [];
        const newAvgFares = [];
        const newAvgPassengerCnt = [];
        const newFareStdDev = [];
        const newFarePercentageChange = [];
        const newPassengerPercentageChange = [];
        const newPassengerSatisfactionRate = [];

        for (let i = 0; i < data.length; i++) {
            newDates.push(data[i][0] + '_Q' + data[i][1]);
            newAvgFares.push(data[i][2]);
            newAvgPassengerCnt.push(data[i][3]);
            newFareStdDev.push(data[i][4]);
            newFarePercentageChange.push(data[i][5]);
            newPassengerPercentageChange.push(data[i][6]);
            newPassengerSatisfactionRate.push(data[i][7] || 50); // Use default value if data[i][7] is falsy
        }

        // Update state
        setDates(newDates);
        setAvgFares(newAvgFares);
        setAvgPassengerCnt(newAvgPassengerCnt);
        setFareStdDev(newFareStdDev);
        setFarePercentageChange(newFarePercentageChange);
        setPassengerPercentageChange(newPassengerPercentageChange);
        setPassengerSatisfactionRate(newPassengerSatisfactionRate)

        console.log("dates",newDates);
        console.log("avg_fares",newAvgFares);
        console.log("avg_passenger_cnt",newAvgPassengerCnt);
        setShowGraph(true);
    }

    useEffect(() => {
        fetchData()
    }, []);


    return(
        <Grid container padding={2} spacing={2}>
            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="start-year">Start Year</InputLabel>
                <Select
                labelId="start-year-select-label"
                id="start-year-select"
                value={startYear}
                label="start-year"
                onChange={(e)=>{
                    setStartYear(e.target.value)
                }}
                >
                {   
                    years.map((year, index)=>{
                        return <MenuItem key={index} value={year}>{year}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
            </Grid>
            
            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="start-quarter">Start Quarter</InputLabel>
                <Select
                labelId="start-quarter-select-label"
                id="start-quarter-select"
                value={startQuarter}
                label="start-quarter"
                onChange={(e)=>{
                    setStartQuarter(e.target.value)
                }}
                >
                <MenuItem value={1}>{1}</MenuItem>
                <MenuItem value={2}>{2}</MenuItem>
                <MenuItem value={3}>{3}</MenuItem>
                <MenuItem value={4}>{4}</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="end-year">End Year</InputLabel>
                <Select
                labelId="end-year-select-label"
                id="end-year-select"
                value={endYear}
                label="end-year"
                onChange={(e)=>{
                    setEndYear(e.target.value)
                }}
                >
                {   
                    years.map((year, index)=>{
                        return <MenuItem key={index} value={year}>{year}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
            </Grid>
            
            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="end-quarter">End Quarter</InputLabel>
                <Select
                labelId="end-quarter-select-label"
                id="end-quarter-select"
                value={endQuarter}
                label="end-quarter"
                onChange={(e)=>{
                    setEndQuarter(e.target.value)
                }}
                >
                <MenuItem value={1}>{1}</MenuItem>
                <MenuItem value={2}>{2}</MenuItem>
                <MenuItem value={3}>{3}</MenuItem>
                <MenuItem value={4}>{4}</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="from-state">From State</InputLabel>
                <Select
                labelId="from-state-select-label"
                id="from-state-select"
                value={fromState}
                label="from-state"
                onChange={(e)=>{
                    setFromState(e.target.value)
                }}
                >
                {   
                    states.map((state, index)=>{
                        return <MenuItem key={index} value={state}>{state}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
            </Grid>
            
            <Grid item xs={5}>
            <FormControl fullWidth>
                <InputLabel id="to-state">To State</InputLabel>
                <Select
                labelId="to-state-select-label"
                id="to-state-select"
                value={toState}
                label="to-state"
                onChange={(e)=>{
                    setToState(e.target.value)
                }}
                >
                {   
                    states.map((state, index)=>{
                        return <MenuItem key={index} value={state}>{state}</MenuItem>
                    })
                }
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
                    fetchGraph();
                }}
                >
                View Graph
                </Button>
            </Grid>
            <Grid item xs={12}>
            {showGraph &&
            (<>
                <BarChart
                xAxis={[{ scaleType: 'band', data: dates }]}
                series={[{ data: avgFares, label:'Avg Fare' }, { data: avgPassengerCnt, label:'Avg Passenger cnt' }]}
                height={300}
                
                />
                <LineChart
                xAxis={[{ scaleType: "band",data: dates }]}
                series={[
                    {
                        data: farePercentageChange,
                        label: 'Fare change%'
                    },
                    {
                        data: passengerPercentageChange,
                        label: 'Passanger change%'
                    },
                    { data: passengerSatisfactionRate, label:'Passenger Satisfaction rate' }
                ]}
                height={300}
                />
            </>
                
            )}
            </Grid>
        </Grid>
    )
}
export default Query3;
