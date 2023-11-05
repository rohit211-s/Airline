import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

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
    label: "Trend Query 2",
    link: "/trendquery2",
  },
  {
    label: "Trend Query 3",
    link: "/trendquery3",
  },
  {
    label: "Trend Query 4",
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              window.location.reload();
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Airline Analysis
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.link}
                href={page.link}
                sx={{ my: 2, color: "white", display: "block" }}
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
