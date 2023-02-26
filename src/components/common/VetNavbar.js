import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function VetNavbar() {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: "white",
        position: "relative",
        borderBottom: (t) => `2px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar sx={{ ml: { xs: 3, md: 7 } }}>
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
          }}
        >
          Shield
        </Typography>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/vet_dashboard">HOME</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">FIND VETS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">PET INSURANCE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">APPOINTMENTS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">PROFILE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">LOGOUT</a>
          </li>
        </ul>
        <IconButton
          size="small"
          aria-label="account of current user"
          color="inherit"
          sx={{
            color: "#1e69ba",
            marginLeft: "auto",
            mr: { xs: 3, md: 9 },
          }}
        >
          Logout
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
