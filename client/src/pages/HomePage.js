/**
 * @author Shivangkumar Gandhi
 **/

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import vetImg from "../assets/images/vet.png";
import dogImg from "../assets/images/dog.png";
import HomeNavbar from "../components/common/HomeNavbar";
import ReviewsCarousal from "../components/homepage/ReviewsCarousal";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const theme = createTheme();
  const navigate = useNavigate();

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData !== null) {
      const userType = userData.userType;
      if (userType === 'petowner') {
        navigate('/pet_owner_dashboard')
      }
      else if (userType === 'vet') {
        navigate('/vet_dashboard')
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeNavbar />
      <Grid container spacing={1} sx={{ backgroundColor: "#A8DFE4" }}>
        <Grid xs={12} sm={6} justify="space-between" sx={{ margin: "auto" }}>
          <Img alt="complex" src={dogImg} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            Welcome to petShield
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "rgb(207, 172, 191)",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            We love your pets
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "white",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            Keep your pets free from diseases and with a glooming healthy paw future.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 0, backgroundColor: "#ffffcc" }}>
        <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "rgb(207, 172, 191)",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            Connect to best professionals
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#1e69ba",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            We care for your pet's health
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "rgb(207, 172, 191)",
              mt: 2,
              mb: 2,
              ml: { xs: 4, md: 10 },
            }}
          >
            Reach out to the best nearby available professionals that care for you and your pets health.
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} justify="space-between" sx={{ margin: "auto" }}>
          <Img alt="complex" src={vetImg} />
        </Grid>
      </Grid>
      <Grid
        sx={{
          margin: "auto",
          display: 'flex',
          justifyContent: 'center',
          alignItems: { sm: 'center' },
          flexDirection: 'column',
          bgcolor: "#A8DFE4"
        }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, mx: { xs: 3 }, p: { xs: 2, md: 3 }, width: { sx: '100%', sm: '80%', md: '80%' }, boxShadow: 0, bgcolor: "#A8DFE4" }}>
          <ReviewsCarousal />
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
