import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import RegistrationStats from "./RegistrationStats";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import PieChart from "./PieChart";
import petImage from "../../assets/images/pet 3.jpeg";
import userImage from "../../assets/images/user3.svg";
import Grid from "@mui/material/Grid";
import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
const BASE_URL = require("../../utils/url").default;

export default function Analytics() {
  const [petInfo, setpetInfo] = useState("");

  const theme = createTheme();
  const navigate = useNavigate();

  useEffect(() => {

    //To check authorize valid loggedin user to this page
    checkUser();

    const url = `${BASE_URL}/pets`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const petData = data.pets.map((pet) => {
          const ownerFirstName = pet?.pet_owner?.first_name ?? "";
          const ownerLastName = pet?.pet_owner?.last_name ?? "";
          const ownerName = ownerFirstName + " " + ownerLastName;
          return {
            id: pet?._id,
            petName: pet?.name,
            ownerName: ownerName,
            ailmentName: pet?.medical_record?.diagnosis || "",
            registrationDate: pet.medical_record?.date_of_diagnosis
              ? new Date(pet.medical_record.date_of_diagnosis)
              : null,
          };
        });
        setpetInfo(petData);
      })
      .catch((error) => console.log(error));
  }, []);

  const checkUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData === null) {
      navigate('/adminlogin')
    }
    else {
      const userType = userData.userType;
      if (userType === null) {
        if (userType === 'petowner' && userType === 'vets') {
          navigate('/adminlogin')
        }
      }
    }
  }

  // declaring state and giving the inital value
  // const [petInfo, setPetInfo] = useState(DUMMY_DATA);
  // Right now I am not inserting a new data but hardcoring in the app.js file
  // that is why setPetInfo is not used anywhere because we are working on inital value of state

  const [buttonClicked, setButtonClicked] = useState("notClicked");

  const buttonOneClicked = (event) => {
    console.log("first clicked");
    setButtonClicked("button1");
    console.log(petInfo);
  };

  const buttonTwoClicked = (event) => {
    console.log("2nd click");
    setButtonClicked("button2");
    console.log(petInfo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminNavbar />
        <AdminSidebar />
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
            {buttonClicked === "notClicked" && (
              <ThemeProvider theme={theme}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} sx={{ margin: 'auto' }}>
                    <Typography component="h1" variant="h4" align="center">
                      Analytics
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={10}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: 1, textAlign: "center" }} // added textAlign property
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        maxWidth: 450, // adjusted maxWidth
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                        borderRadius: 15,
                        width: "100%",
                      }}
                    >
                      <CardMedia
                        sx={{
                          height: 300,
                          width: "100%",
                          objectFit: "cover",
                        }}
                        image={petImage}
                        title="disease tracker"
                      />

                      <CardActions style={{ justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          sx={{
                            width: "180px",
                            height: "50px",
                            fontSize: 16,
                            borderRadius: 15,
                          }}
                          onClick={buttonOneClicked}
                        >
                          Disease Tracker
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        maxWidth: 450, // adjusted maxWidth
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                        borderRadius: 15,
                        width: "100%",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 300, width: "100%" }}
                        image={userImage}
                        title="pet registrations"
                      />

                      <CardActions style={{ justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          sx={{
                            width: "180px",
                            height: "50px",
                            fontSize: 16,
                            borderRadius: 15,
                          }}
                          onClick={buttonTwoClicked}
                        >
                          User Registrations
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </ThemeProvider>
            )}
            
            {buttonClicked === "button1" && <PieChart item={petInfo} />}
            {buttonClicked === "button2" && <RegistrationStats item={petInfo} />}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
