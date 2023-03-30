import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../../assets/styles/pet_owner/ClinicAndVetDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeSlotBox from "../pet_owner/TimeSlotBox";
import PetOwnerNavbar from "../common/PetOwnerNavbar";
import { useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import Container from "@mui/material/Container";

export default function TimeSlot() {
  const theme = createTheme();
  const location = useLocation();
  const { vet } = location.state;
  const [startDate, setStartDate] = useState(new Date());
  const [renderTimeSlots, setRenderTimeSlots] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [formattedDate, setFormattedDate] = useState();

  function formatDate(date) {
    return date.toDateString().replace(/ /g, "%20");
  }

  const handleOnchangeEvent = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const maxDate = new Date(today + 7 * 24 * 60 * 60 * 1000); // 7 days from today
    if (date < today) {
      setErrorMessage("Please choose a future date or today's date.");
    } else if (date > maxDate) {
      setErrorMessage(
        "You cannot choose a date more than 7 days in the future."
      );
    } else {
      const vet_id = vet._id;
      const formattedDate = formatDate(date);
      const url = `http://localhost:3001/availability/${vet_id}/${formattedDate}`;
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.availability) {
            setErrorMessage(
              "No Time slots available for the selected date. Please select a different date!!"
            );
            setRenderTimeSlots(false);
          } else {
            setTimeSlots(data.availability?.time_slots);
            setFormattedDate(date.toDateString());
            setErrorMessage("");
            setStartDate(date);
            setRenderTimeSlots(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PetOwnerNavbar />
        <PetOwnerSidebar />
        <Container
          component="main"
          maxWidth="lg"
          sx={{ flexGrow: 1, p: 3, mt: 2 }}
        >
          <div className="my-5">
            <div className="card w-50 mx-auto">
              <div className="card-body">
                <Row>
                  <Col xs={12} md={5}>
                    <strong>Choose an appointment date :</strong>
                  </Col>
                  <Col xs={12} sm={7}>
                    <div className="d-flex justify-content-center text-center mb-3">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => handleOnchangeEvent(date)}
                        placeholderText="Select a date other than today or yesterday"
                      />
                    </div>
                  </Col>
                </Row>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
              <div className="card-header">
                 <b>Available time slots : </b>
              </div>
              <div className="card-body">
                {renderTimeSlots && (
                  <Row>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {timeSlots.map((time, index) => (
                        <TimeSlotBox
                          time={time.start_time}
                          key={index}
                          vet={vet}
                          date={formattedDate}
                        />
                      ))}
                    </div>
                  </Row>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
