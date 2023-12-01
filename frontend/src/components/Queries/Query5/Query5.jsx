import React from "react"

import axios from "axios";
import { useState } from "react";
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


import { LineChart } from '@mui/x-charts/LineChart';



const Query5 = () => {
  const [startYear, setStartYear] = React.useState("");
  const [endYear, setEndYear] = React.useState("");
  const [startQuarter, setStartQuarter] = React.useState("");
  const [endQuarter, setEndQuarter] = React.useState("");  
  const [state, setState] = React.useState("");
  const [response, setResponse] = useState({data: []});  
  const fetchData = async (isFetchAll = true) => {
    let url = `${constants.BACKEND_URL}${
      constants.TREND_QUERY_5_PATH
    }?startYear=${startYear}&endYear=${endYear}&startQuarter=${startQuarter}&endQuarter=${endQuarter}&fromState=${state}`;

      const resp2 = await axios.get(url);

      setResponse(resp2.data)

  };



  return (
    <Grid container padding={2} spacing={2}>
        <Grid item xs={5}>
      
      <FormControl fullWidth>
            <InputLabel id="startYearLabelId">Start Year</InputLabel>
            <Select
            labelId="startYearLabelId"
            id="demo-simple-select"
            placeholder="Select Me"
            value={startYear}
            label="Start Year"
            onChange={(e)=>{
                setStartYear(e.target.value)
            }}
            >
            <MenuItem value={2003}>2003</MenuItem>
            <MenuItem value={2004}>2004</MenuItem>
            <MenuItem value={2005}>2005</MenuItem>
            <MenuItem value={2006}>2006</MenuItem>
            <MenuItem value={2007}>2007</MenuItem>
            <MenuItem value={2008}>2008</MenuItem>
            <MenuItem value={2009}>2009</MenuItem>
            <MenuItem value={2010}>2010</MenuItem>
            <MenuItem value={2011}>2011</MenuItem>
            <MenuItem value={2012}>2012</MenuItem>
            <MenuItem value={2013}>2013</MenuItem>
            <MenuItem value={2014}>2014</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={5}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label2">End Year</InputLabel>
            <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={endYear}
            label="endYear"
            onChange={(e)=>{
                setEndYear(e.target.value)
            }}
            >
            <MenuItem value={2003}>2003</MenuItem>
            <MenuItem value={2004}>2004</MenuItem>
            <MenuItem value={2005}>2005</MenuItem>
            <MenuItem value={2006}>2006</MenuItem>
            <MenuItem value={2007}>2007</MenuItem>
            <MenuItem value={2008}>2008</MenuItem>
            <MenuItem value={2009}>2009</MenuItem>
            <MenuItem value={2010}>2010</MenuItem>
            <MenuItem value={2011}>2011</MenuItem>
            <MenuItem value={2012}>2012</MenuItem>
            <MenuItem value={2013}>2013</MenuItem>
            <MenuItem value={2014}>2014</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            </Select>
        </FormControl>
        </Grid>


        <Grid item xs={5}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label3">Start Quarter</InputLabel>
            <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select3"
            value={startQuarter}
            label="startQuarter"
            onChange={(e)=>{
                setStartQuarter(e.target.value)
            }}
            >
            <MenuItem value={"Q1"}>Q1</MenuItem>
            <MenuItem value={"Q2"}>Q2</MenuItem>
            <MenuItem value={"Q3"}>Q3</MenuItem>
            <MenuItem value={"Q4"}>Q4</MenuItem>
            </Select>
        </FormControl>
        </Grid>

        <Grid item xs={5}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label4">End Quarter</InputLabel>
            <Select
            labelId="demo-simple-select-label4"
            id="demo-simple-select4"
            value={endQuarter}
            label="endQuarter"
            onChange={(e)=>{
                setEndQuarter(e.target.value)
            }}
            >
            <MenuItem value={"Q1"}>Q1</MenuItem>
            <MenuItem value={"Q2"}>Q2</MenuItem>
            <MenuItem value={"Q3"}>Q3</MenuItem>
            <MenuItem value={"Q4"}>Q4</MenuItem>
            </Select>
        </FormControl>
        </Grid>
        
        <Grid item xs={5}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            label="state"
            onChange={(e)=>{
                setState(e.target.value)
            }}
            >
            <MenuItem value={"AK"}>AK</MenuItem>
            <MenuItem value={"AL"}>AL</MenuItem>
            <MenuItem value={"AR"}>AR</MenuItem>
            <MenuItem value={"AS"}>AS</MenuItem>
            <MenuItem value={"AZ"}>AZ</MenuItem>
            <MenuItem value={"CA"}>CA</MenuItem>
            <MenuItem value={"CO"}>CO</MenuItem>
            <MenuItem value={"CT"}>CT</MenuItem>
            <MenuItem value={"DE"}>DE</MenuItem>
            <MenuItem value={"FL"}>FL</MenuItem>
            <MenuItem value={"GA"}>GA</MenuItem>
            <MenuItem value={"GU"}>GU</MenuItem>
            <MenuItem value={"HI"}>HI</MenuItem>
            <MenuItem value={"IA"}>IA</MenuItem>
            <MenuItem value={"ID"}>ID</MenuItem>
            <MenuItem value={"IL"}>IL</MenuItem>
            <MenuItem value={"IN"}>IN</MenuItem>
            <MenuItem value={"KS"}>KS</MenuItem>
            <MenuItem value={"KY"}>KY</MenuItem>
            <MenuItem value={"LA"}>LA</MenuItem>
            <MenuItem value={"MA"}>MA</MenuItem>
            <MenuItem value={"MD"}>MD</MenuItem>
            <MenuItem value={"ME"}>ME</MenuItem>
            <MenuItem value={"MI"}>MI</MenuItem>
            <MenuItem value={"MN"}>MN</MenuItem>
            <MenuItem value={"MO"}>MO</MenuItem>
            <MenuItem value={"MS"}>MS</MenuItem>
            <MenuItem value={"MT"}>MT</MenuItem>
            <MenuItem value={"NC"}>NC</MenuItem>
            <MenuItem value={"ND"}>ND</MenuItem>
            <MenuItem value={"NE"}>NE</MenuItem>
            <MenuItem value={"NH"}>NH</MenuItem>
            <MenuItem value={"NJ"}>NJ</MenuItem>
            <MenuItem value={"NM"}>NM</MenuItem>
            <MenuItem value={"NV"}>NV</MenuItem>
            <MenuItem value={"NY"}>NY</MenuItem>
            <MenuItem value={"OH"}>OH</MenuItem>
            <MenuItem value={"OK"}>OK</MenuItem>
            <MenuItem value={"OR"}>OR</MenuItem>
            <MenuItem value={"PA"}>PA</MenuItem>
            <MenuItem value={"PR"}>PR</MenuItem>
            <MenuItem value={"RI"}>RI</MenuItem>
            <MenuItem value={"SC"}>SC</MenuItem>
            <MenuItem value={"SD"}>SD</MenuItem>
            <MenuItem value={"TN"}>TN</MenuItem>
            <MenuItem value={"TX"}>TX</MenuItem>
            <MenuItem value={"UT"}>UT</MenuItem>
            <MenuItem value={"VA"}>VA</MenuItem>
            <MenuItem value={"VI"}>VI</MenuItem>
            <MenuItem value={"VT"}>VT</MenuItem>
            <MenuItem value={"WA"}>WA</MenuItem>
            <MenuItem value={"WI"}>WI</MenuItem>
            <MenuItem value={"WV"}>WV</MenuItem>
            <MenuItem value={"WY"}>WY</MenuItem>
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
      {response.data.length == 0 ? null : 
        <Grid item xs={12}>
        <LineChart
          xAxis={[{ 
            scaleType: "band",data: response.data.map((row)=>`${row[1]} ${row[2]}`) }]}
          series={[
            {
              data: response.data.map((row)=>row[3]),
              label: state
            },
          ]}
          height={300}
        />
        </Grid>
      }
      
    </Grid>

  );
}

export default Query5;