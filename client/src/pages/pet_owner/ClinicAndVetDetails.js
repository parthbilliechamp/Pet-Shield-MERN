import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../assets/styles/pet_owner/ClinicAndVetDetails.css";
import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import { Link } from "react-router-dom";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import Container from "@mui/material/Container";

function ClinicAndVetDetails({ vet, date, time }) {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const showAlert = (e, message, type) => {
    e.preventDefault();
    setAlert({ message: message, type: type });
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    //retrieve this information from the session
    const pet_owner = {
      _id: "641fd9751e7561f41b50746e",
      email: "pet.owner@gmail.com",
      password: "pass",
      first_name: "Parth",
      last_name: "Owner",
      phone: "5542352354",
    };

    //pet_id information?
    const data = {
      date: date,
      start_time: time,
      end_time: time,
      pet_id: "641dce7c2e232613752e549a",
      vet: vet,
      pet_owner: pet_owner,
    };

    const isModifiedRequest = localStorage.getItem("isModifiedRequest");
    console.log(isModifiedRequest);
    if (isModifiedRequest === "yes") {
      console.log("inside modify");
      localStorage.setItem("isModifiedRequest", "no");
      const appointmentId = localStorage.getItem("appointmentId");
      console.log(appointmentId);
      const url = `http://localhost:3001/appointments/${appointmentId}/update`;
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
      const url = "http://localhost:3001/appointments/book";
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
    }, 800);
  };

  return (
    <>
      <div className="my-5">
        <div className="card w-50 mx-auto">
          <div className="card-header">
            <b>Appointment details</b>
          </div>
          <div className="card-body">
            <div className="card-title">
              <b>Date : {date}</b>
            </div>
            <div>
              <b>Time : {time} </b>
            </div>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />

            <Row className="mb-3 align-items-center">
              <Col xs={12} md={3} style={{ marginRight: "10px" }}>
                <div
                  className="img-holder"
                  style={{ borderRadius: "50%", overflow: "hidden" }}
                >
                  <img
                    src={vet.photo_url}
                    alt={vet.first_name}
                    className="circular-image"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} style={{ marginRight: "10px" }}>
                <div className="card-title mt-3">
                  <b>Vet details</b>
                </div>
                <div>
                  Name: {vet.first_name} {vet.last_name}
                </div>
                <div>Contact: {vet.phone}</div>
                <div>Fees: CAD {vet.fees}</div>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />
            <Row className="mb-3 align-items-center">
              <Col xs={12} md={3} style={{ marginRight: "10px" }}>
                <div className="img-holder">
                  <img
                    src={vet.clinic_photo_url}
                    alt={vet.clinic_name}
                    style={{ width: "1", height: "118" }}
                    className="rectangular-image"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} style={{ marginRight: "10px" }}>
                <div className="card-title mt-3">
                  <b>Clinic details</b>
                </div>
                <div>Name: {vet.clinic_name}</div>
                <div>Address: {vet.clinic_address}</div>
                <div>Phone: {vet.phone}</div>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />
            <div className="container" style={{ marginTop: "30px" }}>
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={2} />
                <Col xs={12} md={2}>
                  <Link to="/timeslot">
                    <u style={{ color: "black" }}>Go Back</u>
                  </Link>
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    variant="light"
                    style={{ backgroundColor: "#1e69ba", color: "white" }}
                    href="book"
                    onClick={(e) => handleOnClick(e)}
                  >
                    Confirm Booking
                  </Button>
                </Col>
                <Col xs={12} md={2} />
              </Row>
            </div>
          </div>
          {alert && <SuccessAlert alert={alert} />}
        </div>
      </div>
    </>
  );
}

export default function VetAndClinicDetails() {
  const location = useLocation();
  const { vet } = location.state;
  const { time } = location.state;
  const { date } = location.state;
  const theme = createTheme();

  console.log(vet);
  console.log(time);
  console.log(date);

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
          <div class="container">
          <ClinicAndVetDetails vet={vet} date={date} time={time} />
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
