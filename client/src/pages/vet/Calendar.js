import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import VetNavBar from "../../components/common/VetNavbar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function AppointmentCalendar() {
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = createTheme();

  const [date, setDate] = useState(new Date());

  let buttonname = "";

  location.state?.pagelink === "/view_appointment_page"
    ? (buttonname = "view details")
    : (buttonname = "cancel");

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <VetNavBar />
        <Container
          component="main"
          maxWidth="md"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
            <StyledCalendar className="calendar-wrapper">
              <h3 className="heading">
                <b>Select</b> date to {location.state?.feature} scheduled
                appointments
              </h3>
              <div className="card flex justify-content-center">
                <Calendar
                  // defaultValue={date}
                  minDate={new Date()}
                  minDetail="year"
                  value={date}
                  readOnlyInput
                  showIcon
                  showButtonBar
                  touchUI
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <br />
                <Button
                  type="submit"
                  label="Submit"
                  onClick={() =>
                    navigate(location.state?.pagelink, {
                      state: {
                        datevalue: date,
                        loc: location.state?.pagelink,
                        btnname: buttonname,
                      },
                    })
                  }
                  style={{
                    color: "white",
                    borderRadius: "10px",
                    margin: "10px;",
                    padding: "5px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </StyledCalendar>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const StyledCalendar = styled.div`
  margin: 2rem;
  .card {
    margin: 2rem auto;
    .p-button {
      background-color: #1e69ba;
    }
    :hover {
      border: 1px solid #1e69ba;
    }
  }
`;
