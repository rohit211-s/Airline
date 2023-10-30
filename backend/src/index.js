// Custom Packages
const app = require("./app");
const port = process.env.AIRLINE_ANALYSIS_BACKEND_PORT;

app.listen(port, (err) => {
  if (err) {
    console.log("Error occured while startup backend at port: ", port);
    process.exit(1);
  }

  console.log("Backend server running at port: ", port);
});
