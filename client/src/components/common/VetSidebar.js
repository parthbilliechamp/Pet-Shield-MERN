/**
 * @author Shivangkumar Gandhi
 **/

import * as React from "react";
import { useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ReviewsIcon from "@mui/icons-material/Reviews";
import StartIcon from "@mui/icons-material/Start";
import { useNavigate } from "react-router-dom";

//TODO: Add respective links in sidebar

export default function VetSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const drawerWidth = 240;

  let CustomListItem = ({ to, primary, tag }) => (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(to);
        }}
        selected={location.pathname.includes(to)}
      >
        <ListItemIcon>{tag}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 2, color: "#1e69ba" }}>
        <List>
          <CustomListItem
            to="/vet_dashboard"
            primary="Appointments"
            tag={<CalendarMonthIcon />}
          />
          <CustomListItem
            to="/add_availability"
            primary="Availability"
            tag={<AddTaskIcon />}
          />
          <CustomListItem
            to="/medical_records"
            primary="Pet Med Records"
            tag={<AssignmentIcon />}
          />
        </List>
        <List
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            color: "red",
          }}
        >
          <Divider sx={{ borderBottomWidth: 4 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("userData");
                navigate("/");
              }}
              selected={location.pathname.includes("/something")}
            >
              <ListItemText primary={"Logout"} sx={{ ml: 1 }} />
              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                <StartIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
