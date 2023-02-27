import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { details } from "../../assets/data/CardDetails";
import AppointmentCard from "./AppointmentCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { CssBaseline, Paper } from "@mui/material";
import VetNavBar from "../../components/common/VetNavbar";

const AppointmentPage = (props) => {
  const theme = createTheme();
  const [carddetails, setCardDetails] = useState(details);

  const cancelCardHandler = (id) => {
    const data = carddetails.filter((detail) => {
      return detail.id !== id;
    });

    setCardDetails([...data]);
  };

  const location = useLocation();

  console.log(location.state?.datevalue);
  console.log(location.state?.btnname);

  return (
    <>
    <VetNavBar/>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}
      >
        <h1 style={{ color: "#1e69ba" }}>
          Scheduled Appointments on {location.state?.datevalue.toDateString()}
        </h1>

        <Grid container spacing={2}>
          {carddetails.map((detail) => {
            return (
              <Grid item xs={12} sm={4}>
                <AppointmentCard
                  cancelCardHandler={cancelCardHandler}
                  id={detail.id}
                  name={detail.name}
                  bio={detail.bio}
                  image={detail.image}
                  render={detail.render}
                  buttonname={location.state?.btnname}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </ThemeProvider>
    </>
  );
};
export default AppointmentPage;
