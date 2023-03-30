import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import Container from "@mui/material/Container";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";

function ViewAppointments({ appointment }) {
  const [alert, setAlert] = useState(null);
  const [showModify, setShowModify] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const navigate = useNavigate();

  const handleConfirmModify = (appointment) => {
    setShowModify(false);
    localStorage.setItem("isModifiedRequest", "yes");
    localStorage.setItem("appointmentId", appointment._id);
    navigate("/timeslot", { state: { vet: appointment.vet } });
  };

  const handleConfirmCancel = (appointmentId, petOwnerId) => {
    setShowCancel(false);
    console.log(appointmentId);
    const url = `http://localhost:3001/appointments/${appointmentId}/cancel`;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (response.status === 200) {
          setAlert({
            message: "Booking Cancelled Successfully!!!",
            type: "Success",
          });
          // //get this information from session.
          // const petOwnerId = "641fd9751e7561f41b50746e";
          // const url = `http://localhost:3001/appointments/${petOwnerId}`;
          // fetch(url)
          //   .then((response) => response.json())
          //   .then((data) => {
          //     setAppointments(data.upcomingAppointments);
          //   })
          //   .catch((error) => console.log(error));
          setTimeout(() => {
            navigate("/appointments");
            window.location.reload();
          }, 500);
        } else {
          console.log("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleCloseModify = () => {
    setShowModify(false);
  };

  const handleCloseCancel = () => {
    setShowCancel(false);
  };

  const handleShowModify = () => {
    setShowModify(true);
  };

  const handleShowCancel = () => {
    setShowCancel(true);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col xs={12} md={7}>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Appointment Date:</span>{" "}
            {appointment.date}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Appointment Time:</span>{" "}
            {appointment.start_time}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Vet Name:</span>{" "}
            {appointment.vet.first_name} {appointment.vet.last_name}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Name:</span>{" "}
            {appointment.vet.clinic_name}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Contact:</span>{" "}
            {appointment.vet.phone}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Address:</span>{" "}
            {appointment.vet.clinic_address}
          </p>
        </Col>
        <Col xs={12} md={4}>
          <Row className="mb-5">
            <div>
              <button
                type="button"
                className="btn btn-modify fs-5 fw-normal"
                onClick={handleShowModify}
                style={{ backgroundColor: "#1e69ba", color: "white" }}
              >
                Modify Booking
              </button>
            </div>
            <Modal show={showModify} onHide={handleCloseModify}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Modification</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to modify booking?</Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn btn-cancel fs-5 fw-normal"
                  onClick={handleCloseModify}
                >
                  Close
                </Button>
                <Button
                  className="btn btn-cancel fs-5 fw-normal"
                  onClick={() => handleConfirmModify(appointment)}
                >
                  Modify Booking
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
          <Row>
            <div>
              <button
                type="button"
                className="btn btn-cancel fs-5 fw-normal"
                onClick={handleShowCancel}
                style={{ backgroundColor: "#1e69ba", color: "white" }}
              >
                Cancel Booking
              </button>

              <Modal show={showCancel} onHide={handleCloseCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Cancellation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to cancel booking?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="btn btn-cancel fs-5 fw-normal"
                    onClick={handleCloseCancel}
                  >
                    Close
                  </Button>
                  <Button
                    className="btn btn-cancel fs-5 fw-normal"
                    onClick={() => handleConfirmCancel(appointment._id)}
                  >
                    Cancel Booking
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Row>
        </Col>
      </Row>
      <Row>{alert && <SuccessAlert alert={alert} />}</Row>
    </>
  );
}

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const theme = createTheme();
  useEffect(() => {
    //get this information from session.
    const petOwnerId = "641fd9751e7561f41b50746e";
    const url = `http://localhost:3001/appointments/${petOwnerId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.upcomingAppointments);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(appointments);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PetOwnerNavbar />
        <PetOwnerSidebar />
        {/* Add this to keep space between nav and sidebar */}
        <Container
          component="main"
          maxWidth="lg"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <div className="my-5">
            <div className="card w-50 mx-auto">
              <div className="card-header">
                <h3>Upcoming Appointments</h3>
              </div>
              <div className="card-body">
                <Row className="align-items-center">
                  <Col xs={12} md={12} style={{ marginRight: "10px" }}>
                    <div className="container">
                      {appointments.map((appointment, index) => (
                        <React.Fragment key={appointment.id}>
                          <ViewAppointments appointment={appointment} />
                          {index !== appointments.length - 1 && (
                            <hr
                              style={{
                                border: "1px solid #ddd",
                                margin: "20px 0",
                              }}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
