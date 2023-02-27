import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

function VetNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="default" style={{ marginBottom: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "rgb(207, 172, 191)",
              fontWeight: "bold",
            }}
          >
            pet
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: "#1e69ba",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Shield
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  component={Link}
                  to="/vet_dashboard"
                >
                  HOME
                </Button>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  component={Link}
                  to="/medical_records"
                >
                  MEDICAL RECORDS
                </Button>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  component={Link}
                  to="/appointmentdetails"
                >
                  APPOINTMENTS
                </Button>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  component={Link}
                  to="/"
                >
                  LOGOUT
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, display: "block", color: "#1e69ba" }}
              component={Link}
              to="/vet_dashboard"
            >
              HOME
            </Button>
            <Button
              sx={{ my: 2, display: "block", color: "#1e69ba" }}
              component={Link}
              to="/medical_records"
            >
              MEDICAL RECORDS
            </Button>
            <Button
              sx={{ my: 2, display: "block", color: "#1e69ba" }}
              component={Link}
              to="/appointmentdetails"
            >
              APPOINTMENTS
            </Button>
            <Button
              sx={{ my: 2, display: "block", color: "#1e69ba" }}
              component={Link}
              to="/"
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default VetNavBar;
