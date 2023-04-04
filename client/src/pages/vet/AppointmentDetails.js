import React from "react";
import styled from "styled-components";
import VetNavBar from "../../components/common/VetNavbar";
import { useLocation } from "react-router-dom";
import VetSidebar from "../../components/common/VetSidebar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import profile from "../../assets/images/Profileimg/vectorprofile.jpg";
import Grid from "@mui/material/Grid";

const AppointmentDetails = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const theme = createTheme();

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
          <Container maxWidth="xl">
            <Grid container spacing={5} style={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ height: "100px" }}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <StyledProfile className="profile-wrapper">
                  <div className="profile-top"></div>
                  <div className="profile-img">
                    <img src={profile} alt="profile_img" />
                  </div>
                  <div className="profile-details-wrapper">
                    <div className="profile-details">
                      <h4>
                        {location.state.first_name} {location.state.last_name}
                      </h4>
                      <span>{location.state.email}</span>
                      <span>{location.state.phone}</span>
                    </div>
                  </div>
                </StyledProfile>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const StyledProfile = styled.div`
  width: 400px;
  height: 500px;
  border-radius: 60px;
  margin: 0rem auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 5px 2px #ccc;
  display: flex;
  flex-direction: column;
  .profile-top {
    height: 50%;
    width: 100%;
    position: absolute;
    background: linear-gradient(
      360deg,
      rgba(30, 105, 186, 1) 19%,
      rgba(0, 212, 255, 1) 100%
    );
    border-radius: 60px;
  }
  .profile-img {
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ccc;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .profile-details-wrapper {
    flex-basis: 50%;
    margin-top: auto;
    .profile-details {
      text-align: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      gap: 1rem;
      h4 {
        font-size: 2rem;
      }
    }
  }
  @media only screen and (max-width: 430px) {
    width: 100%;
  }
`;

export default AppointmentDetails;
