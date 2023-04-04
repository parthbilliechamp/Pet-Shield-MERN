import React, { useEffect, useState } from "react";
import "../../assets/styles/pet_owner/ClinicAndVetDetails.css";
import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BASE_URL = require("../../utils/url").default;

export default function VetAndClinicDetails() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    //To check authorize valid loggedin user to this page
    checkUser();
  }, []);

  const checkUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData === null) {
      navigate('/login')
    }
    else {
      const userType = userData.userType;
      if (userType !== 'petowner') {
        navigate('/login')
      }
    }
  }

  const { vet } = location.state;
  const { time } = location.state;
  const { date } = location.state;
  const { id } = location.state;
  const theme = createTheme();

  const [alert, setAlert] = useState(null);

  const showAlert = (e, message, type) => {
    e.preventDefault();
    setAlert({ message: message, type: type });
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    //retrieve this information from the session
    console.log("User data : ")
    const userData = JSON.parse(localStorage.getItem('userData')).userDetails
    console.log(userData);
    const pet_owner = {
      _id: userData._id,
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: "7855583322"
    };
    console.log(pet_owner);
    //TODO fetch phone and pet_id from session.

    const data = {
      date: date,
      start_time: time,
      end_time: time,
      pet_id: "641dce7c2e232613752e549a",
      vet: vet,
      pet_owner: pet_owner,
      time_slot_id: id
    };

    const isModifiedRequest = localStorage.getItem("isModifiedRequest");
    console.log(isModifiedRequest);
    if (isModifiedRequest === "yes") {
      console.log("inside modify");
      localStorage.setItem("isModifiedRequest", "no");
      const appointmentId = localStorage.getItem("appointmentId");
      console.log(appointmentId);
      const url = `${BASE_URL}appointments/${appointmentId}/update`;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            showAlert(e, "Booking Confirmed!!!", "Success");
          } else {
            showAlert(e, "Error: Unable to book appointment", "Error");
          }
        })
        .catch((error) => {
          showAlert(e, `Error: ${error.message}`, "Error");
        })
        .finally(() => {
          localStorage.setItem("appointmentId", null);
        });
    } else {
      const url = `${BASE_URL}appointments/book`;
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 201) {
            showAlert(e, "Booking Confirmed!!!", "Success");
          } else {
            showAlert(e, "Error: Unable to book appointment", "Error");
          }
        })
        .catch((error) => {
          showAlert(e, `Error: ${error.message}`, "Error");
        });
    }
    setTimeout(() => {
      navigate("/view_vets");
    }, 1500);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PetOwnerNavbar />
        <PetOwnerSidebar />
        <Container
          component="main"
          maxWidth="sm"
          sx={{ flexGrow: 1, p: 3, mt: 2 }}
        >
          <Paper sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} sx={{ margin: 'auto' }}>
                <Typography component="h1" variant="h4" align="center">
                  <b>Appointment details</b>
                </Typography>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={vet.photo}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Grid container justify="space-between">
                      <Grid item xs={12}>
                        <Typography gutterBottom
                          variant="h6"
                          sx={{ textAlign: 'left' }}
                          inline>
                          <b>Date : {date}</b>
                        </Typography>
                        <Typography gutterBottom
                          variant="h6"
                          sx={{ textAlign: 'left' }}
                          inline>
                          <b>Time : {time} </b>
                        </Typography>
                        <hr />
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Typography gutterBottom
                          variant="h6"
                          sx={{ textAlign: 'left' }}
                          inline>
                          <b>Vet details</b>
                        </Typography>
                        <Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Name: {vet.first_name} {vet.last_name}
                        </Typography>
                        <Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Contact: {vet.phone}
                        </Typography><Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Fees: CAD {vet.fees}
                        </Typography>
                        <hr />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom
                          variant="h6"
                          sx={{ textAlign: 'left' }}
                          inline>
                          <b>Clinic details</b>
                        </Typography>
                        <Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Name: {vet.clinic_name}
                        </Typography>
                        <Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Address: {vet.clinic_address}
                        </Typography><Typography gutterBottom
                          variant="body1"
                          sx={{ textAlign: 'left' }}
                          inline>
                          Phone: {vet.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                    <hr />
                    <Grid container>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            onClick={() => {
                              navigate('/view_vets');
                            }}
                            size="medium"
                            variant="outlined"
                            color="inherit"
                            sx={{
                              mt: 1,
                              mr: 1
                            }}
                          >
                            Go Back
                          </Button>
                          <Button
                            onClick={(e) => handleOnClick(e)}
                            size="medium"
                            variant="light"
                            style={{ backgroundColor: "#1e69ba", color: "white" }}
                            sx={{
                              mt: 1
                            }}
                          >
                            Confirm Booking
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <br />
                    {alert && <SuccessAlert alert={alert} />}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
