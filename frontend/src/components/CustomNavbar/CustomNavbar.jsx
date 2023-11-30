import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const pages = [
  {
    label: "Dashboard",
    link: "/",
  },
  {
    label: "Trend Query 1",
    link: "/trendquery1",
  },
  {
    label: "Passenger Preferences Trends",
    link: "/trendquery2",
  },
  {
    label: "Trend Query 3",
    link: "/trendquery3",
  },
  {
    label: "Holiday Trends",
    link: "/trendquery4",
  },
  {
    label: "Trend Query 5",
    link: "/trendquery5",
  },
  {
    label: "Raw SQL Editor",
    link: "/sql_editor",
  },
];

function CustomNavbar() {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        backgroundColor: "#000042",
      }}
    >
      <Container maxWidth="false">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <AdbIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => {
                window.location.href = "/";
              }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Airline Analysis
            </Typography>
          </div>
          <Box
            sx={{
              flexGrow: 1,
              alignSelf: "flex-end",
              justifyContent: "space-evenly",
              maxWidth: "70vw",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.link}
                href={page.link}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  padding: "6px",
                  ":hover": {
                    backgroundColor: "black",
                    color: "white",
                    border: "0.5px solid white",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomNavbar;
