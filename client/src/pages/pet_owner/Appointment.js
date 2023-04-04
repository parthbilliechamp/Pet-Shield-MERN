import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem'
import Stack from '@mui/material/Stack';

const BASE_URL = require("../../utils/url").default;

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const theme = createTheme();
  useEffect(() => {
    //To check authorize valid loggedin user to this page
    checkUser();
   
    const petOwnerId = JSON.parse(localStorage.getItem('userData')).userDetails._id

    const url = `${BASE_URL}appointments/${petOwnerId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.upcomingAppointments);
      })
      .catch((error) => console.log(error));
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

  const [alert, setAlert] = useState(null);
  const [showModify, setShowModify] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const navigate = useNavigate();
  console.log("userdata : " + localStorage.getItem("userData"));

  const handleConfirmModify = (appointment) => {
    setShowModify(false);
    localStorage.setItem("isModifiedRequest", "yes");
    localStorage.setItem("appointmentId", appointment._id);
    navigate("/timeslot", { state: { vet: appointment.vet } });
  };

  const handleConfirmCancel = (appointmentId, petOwnerId) => {
    setShowCancel(false);
    console.log(appointmentId);
    const url = `${BASE_URL}/appointments/${appointmentId}/cancel`;
    console.log(url);
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
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ margin: 'auto' }}>
                <Typography component="h6" variant="h4" align="center">
                  Upcoming Appointments
                </Typography>
              </Grid>
            </Grid>
            <hr />
            <Box sx={{ mt: 3 }}>
              {alert && <SuccessAlert alert={alert} />}
              <React.Fragment>
                <Stack container spacing={2}>
                  {appointments.map((appointment, index) => (
                    <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                      <Paper>
                        <Grid container spacing={3} >
                          <Grid item xs={12} sm={4}>
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Appointment Date:</span>{" "}
                                {appointment.date}
                              </p>
                            </Item> 
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Appointment Time:</span>{" "}
                                {appointment.start_time}
                              </p>
                            </Item>
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Vet Name:</span>{" "}
                                {appointment.vet.first_name} {appointment.vet.last_name}
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Clinic Name:</span>{" "}
                                {appointment.vet.clinic_name}
                              </p>
                            </Item>
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Clinic Contact:</span>{" "}
                                {appointment.vet.phone}
                              </p>
                            </Item>
                            <Item>
                              <p className="fs-5 fw-light mb-3">
                                <span className="fw-bold">Clinic Address:</span>{" "}
                                {appointment.vet.clinic_address}
                              </p>
                            </Item>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                            <Box textAlign='center'>
                              <Button
                                onClick={handleShowModify}
                                size="medium"
                                sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                style={{ backgroundColor: "#1e69ba", color: "white" }}
                              >
                                Modify Booking
                              </Button>
                              <Modal aria-labelledby="contained-modal-title-vcenter"
                                centered show={showModify} onHide={handleCloseModify}>
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
                              <Button
                                onClick={handleShowCancel}
                                size="medium"
                                sx={{ mt: 1, mb: { md: 1, xs: 2 }, mr: 1, ml: 1 }}
                                style={{ backgroundColor: "#1e69ba", color: "white" }}
                              >
                                Cancel Booking
                              </Button>
                              <Modal aria-labelledby="contained-modal-title-vcenter"
                                centered show={showCancel} onHide={handleCloseCancel}>
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
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Stack>
                  ))}
                </Stack>
              </React.Fragment>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
