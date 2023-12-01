import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../../config/config";

const Dashboard = () => {
  // States
  const [response, setResponse] = useState({});

  // Handlers
  const getDashboardStatistics = async () => {
    const resp = await axios.get(
      constants.BACKEND_URL + constants.DASHBOARD_STATISTIS
    );

    setResponse(resp.data);
  };

  const handleCopyClick = (query) => {
    navigator.clipboard.writeText(query);
  };

  // Effects
  useEffect(() => {
    getDashboardStatistics();
  }, []);

  // Constants
  const pieChartColors = [
    "#1f77b4", // Blue
    "#ff7f0e", // Orange
    "#2ca02c", // Green
    "#d62728", // Red
    "#9467bd", // Purple
    "#8c564b", // Brown
    "#e377c2", // Pink
    "#7f7f7f", // Gray
    "#bcbd22", // Yellow
    "#17becf", // Cyan,
    "#4e79a7", // Steel Blue
    "#f28e2b", // Pumpkin
    "#e15759", // Salmon
    "#76b7b2", // Teal Blue
    "#edc948", // Maize
    "#b07aa1", // Mauve
    "#ff9da7", // Melon
    "#9c755f", // Tan
    "#bab0ac", // Ash Grey
    "#7f7f7f", // Mid Grey
  ];

  return (
    <>
      {Object.keys(response).length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            padding={4}
            sx={{ justifyContent: "space-around" }}
          >
            <Grid
              item
              xs={7}
              sx={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: 3,
              }}
            >
              <Typography>Database Level Information</Typography>
              <PieChart
                colors={pieChartColors}
                margin={{ left: -680 }}
                series={[
                  {
                    data: response.tableInfo.data
                      .filter((row) => row[1] != 0 && row[1] <= 1000)
                      .map((row, idx) => {
                        return { id: idx, value: row[1], label: row[0] };
                      }),
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                  {
                    data: response.tableInfo.data
                      .filter((row) => row[1] != 0 && row[1] > 1000)
                      .map((row, idx) => {
                        return { id: idx, value: row[1], label: row[0] };
                      }),
                    highlightScope: {
                      faded: "global",
                      highlighted: "item",
                    },
                    cx: 1140,
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "top", horizontal: "right" },
                    padding: 0,
                  },
                }}
                height={300}
              />
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                position: "relative",
                left: 10,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: 3,
              }}
            >
              <Typography>Annual Statistics</Typography>
              <BarChart
                height={400}
                xAxis={[
                  {
                    scaleType: "band",
                    data: response.tripYearInfo.map((row) => row[0]),
                  },
                  {
                    scaleType: "band",
                    data: response.feedbackYearInfo.map((row) => row[0]),
                  },
                ]}
                series={[
                  {
                    data: response.tripYearInfo.map((row) => row[1]),
                    label: "Trip Info",
                  },
                  {
                    data: response.feedbackYearInfo.map((row) => row[1]),
                    label: "Feedback Info",
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              height={"500px"}
              sx={{
                marginTop: 2,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: 3,
                marginBottom: 2,
                overflow: "scroll",
              }}
            >
              <List>
                <h4>Query History</h4>
                {response.queryHistory.map((query, index) => (
                  <ListItem key={index} sx={{ padding: 1 }}>
                    <TextField
                      disabled
                      id={"query" + index}
                      label="Disabled"
                      defaultValue={query}
                      fullWidth
                      sx={{ marginRight: "10px" }}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => handleCopyClick(query)}
                    >
                      Copy
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  );
};

export default Dashboard;
