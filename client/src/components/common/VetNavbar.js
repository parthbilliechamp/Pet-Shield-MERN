/**
 * @author Shivangkumar Gandhi
 **/

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
import { useNavigate } from "react-router-dom";

function VetNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      color="default"
      style={{ marginBottom: "20px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              PaperProps={{ sx: { width: "100%" } }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  onClick={() => {
                    navigate("/vet_dashboard");
                  }}
                >
                  Appointments
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  onClick={() => {
                    navigate("/add_availability");
                  }}
                >
                  Availability
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  onClick={() => {
                    navigate("/medical_records");
                  }}
                >
                  Pet Med Records
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  onClick={() => {
                    navigate("/comingsoon");
                  }}
                >
                  Ratings & Feedback
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  sx={{ my: 2, display: "block", color: "#1e69ba" }}
                  onClick={() => {
                    localStorage.removeItem('userData');
                    navigate("/");
                  }}
                >
                  LOGOUT
                </Button>
              </MenuItem>
            </Menu>
          </Box>
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
              marginRight: 1,
            }}
          >
            Shield
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default VetNavBar;
