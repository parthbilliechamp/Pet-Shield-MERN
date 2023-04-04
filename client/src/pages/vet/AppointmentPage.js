import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { details } from "../../assets/data/CardDetails";
import AppointmentCard from "./AppointmentCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { CssBaseline, Paper } from "@mui/material";
import VetNavBar from "../../components/common/VetNavbar";
import axios from "axios";
import VetSidebar from "../../components/common/VetSidebar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
const BASE_URL = require("../../utils/url").default;

const AppointmentPage = (props) => {
  const theme = createTheme();
  const location = useLocation();
  const [carddetails, setCardDetails] = useState(details);
  const [appointmentdetails, setAppointmentdetails] = useState([]);
  const [vetid, setVetid] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setVetid(userData._id);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!vetid) {
        return;
      }
      try {
        const url = `${BASE_URL}vetappointments/${vetid}`;
        const result = await axios.post(url, {
          date: location.state?.datevalue.toDateString(),
        });
        setAppointmentdetails([...result.data.upcomingAppointments]);
      } catch (err) {}
    };
    getData();
  }, [vetid]);

  const cancelCardHandler = (id) => {
    const data = carddetails.filter((detail) => {
      return detail.id !== id;
    });

    setCardDetails([...data]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <VetNavBar />
        <VetSidebar />
        {/* Add this to keep space between nav and sidebar */}
        <Container
          component="main"
          maxWidth="lg"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <VetNavBar />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper
              sx={{
                mx: { xs: 3, md: 5 },
                my: { xs: 3, md: 5 },
                p: { xs: 2, md: 3 },
              }}
            >
              <h1 style={{ color: "#1e69ba" }}>
                Scheduled Appointments on{" "}
                {location.state?.datevalue.toDateString()}
              </h1>

              <Grid container spacing={2}>
                {appointmentdetails?.map((detail) => {
                  return (
                    <Grid item xs={12} sm={4}>
                      <AppointmentCard
                        cancelCardHandler={cancelCardHandler}
                        id={detail._id}
                        date={location.state?.datevalue.toISOString()}
                        first_name={detail.pet_owner.first_name}
                        last_name={detail.pet_owner.last_name}
                        email={detail.pet_owner.email}
                        phone={detail.pet_owner.phone}
                        start_time={detail.start_time}
                        end_time={detail.end_time}
                        buttonname={location.state?.btnname}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </ThemeProvider>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default AppointmentPage;
