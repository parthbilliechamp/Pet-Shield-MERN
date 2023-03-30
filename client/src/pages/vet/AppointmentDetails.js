import React from "react";
import styled from "styled-components";
import p4 from "../../assets/images/Profileimg/p4.jpg";
import VetNavBar from "../../components/common/VetNavbar";
import { useLocation } from "react-router-dom";
import VetSidebar from "../../components/common/VetSidebar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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
          <AppointmentDetailsWrapper>
            <div className="image">
              <img alt="not found" src={p4}></img>
            </div>
            <div className="intro">
              <div className="intro-card">
                <h6 className="info-card">{location.state.first_name}</h6>
                <h6 className="info-card">{location.state.last_name}</h6>
                <h6 className="info-card">{location.state.email}</h6>
                <h6 className="info-card">{location.state.phone}</h6>
              </div>
            </div>
          </AppointmentDetailsWrapper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const AppointmentDetailsWrapper = styled.div`
  display: flex;
  box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
  margin: auto;
  width: 70%;
  flex-wrap: wrap;
  .image {
    flex-basis: 50%;
    img {
      width: 90%;
      margin: 5px auto;
      object-fit: cover;
    }
  }
  .intro {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;

    .intro-card {
      box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
      width: 50%;
      margin: auto;
      height: 90%;
      border-radius: 5px;

      .info-card {
        box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
        width: 85%;
        margin: 10px auto;
        border-radius: 5px;
        padding: 5px;
      }
    }
  }

  @media only screen and (min-width: 280px) and (max-width: 432px) {
    .image {
      flex-basis: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .intro {
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  @media only screen and (min-width: 432px) and (max-width: 1120px) {
    .image {
      flex-basis: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .intro {
      padding-top: 5%;
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default AppointmentDetails;
