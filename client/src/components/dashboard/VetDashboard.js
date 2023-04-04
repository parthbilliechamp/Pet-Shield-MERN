/**
 * @author Shivangkumar Gandhi
 **/

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Image2 from "../../assets/images/Vetimg/Image2.jpg";
import Image3 from "../../assets/images/Vetimg/Image3.jpg";
import VetNavBar from "../common/VetNavbar";
import VetSidebar from "../common/VetSidebar";
import { useNavigate } from "react-router-dom";

export default function VetDashboard() {
  const navigate = useNavigate();
  const theme = createTheme();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData === null) {
      navigate('/login')
    }
    else {
      const userType = userData.userType;
      if (userType !== 'vets') {
        navigate('/login')
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <VetNavBar />
        <VetSidebar />
        <Container
          component="main"
          maxWidth="md"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <Paper sx={{ mt: { xs: 6, md: 10 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} sx={{ margin: "auto" }}>
                <Typography component="h1" variant="h4" align="center">
                  Manage Appointments
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={Image2}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Grid container justify="space-between">
                      <Grid item xs={12}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{ textAlign: "left" }}
                          inline
                        >
                          View Appointments
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      View your upcoming appointments
                    </Typography>
                    <hr />
                    <Grid container>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            onClick={() => {
                              navigate("/view_appointment_cal", {
                                state: {
                                  feature: "view details",
                                  pagelink: "/view_appointment_page",
                                },
                              });
                            }}
                            size="medium"
                            variant="outlined"
                            color="inherit"
                            sx={{
                              mt: 1,
                              color: "green",
                            }}
                          >
                            View Appointments
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={Image3}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Grid container justify="space-between">
                      <Grid item xs={12}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{ textAlign: "left" }}
                          inline
                        >
                          Cancel Appointment
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Cancel your upcoming appointment
                    </Typography>
                    <hr />
                    <Grid container>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            onClick={() => {
                              navigate("/cancel_appointment_cal", {
                                state: {
                                  feature: "cancel",
                                  pagelink: "/cancel_appointment_page",
                                },
                              });
                            }}
                            size="medium"
                            variant="outlined"
                            color="inherit"
                            sx={{
                              mt: 1,
                              color: "green",
                            }}
                          >
                            Cancel Appointment
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
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
