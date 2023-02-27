import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import { useNavigate } from "react-router-dom";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";

function ViewAppointments({ appointment }) {
  const [alert, setAlert] = useState(null);
  const [showModify, setShowModify] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const navigate = useNavigate();

  const handleConfirmModify = () => {
    setShowModify(false);
    navigate("/timeslot");
  };

  const handleConfirmCancel = () => {
    setShowCancel(false);
    setAlert({ message: "Booking Cancelled Successfully!!!", type: "Success" });
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
            {appointment.appointment_date}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Appointment Time:</span>{" "}
            {appointment.appointment_time}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Vet Name:</span> {appointment.vet_name}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Name:</span>{" "}
            {appointment.clinic_name}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Contact:</span>{" "}
            {appointment.clinic_contact}
          </p>
          <p className="fs-5 fw-light mb-3">
            <span className="fw-bold">Clinic Address:</span>{" "}
            {appointment.clinic_address}
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
                  onClick={handleConfirmModify}
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
                    onClick={handleConfirmCancel}
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
  const appointments = [
    {
      id: 1,
      appointment_date: "23 March 2023",
      appointment_time: "10:00 AM",
      vet_name: "Ana Plante",
      clinic_name: "Smile Clinic",
      clinic_contact: "+1 224 324 3332",
      clinic_address: "1234, Street Ave, Halifax",
    },
    {
      id: 2,
      appointment_date: "23 March 2023",
      appointment_time: "10:00 AM",
      vet_name: "Ana Plante",
      clinic_name: "Smile Clinic",
      clinic_contact: "+1 224 324 3332",
      clinic_address: "1234, Street Ave, Halifax",
    },
    {
      id: 1,
      appointment_date: "23 March 2023",
      appointment_time: "10:00 AM",
      vet_name: "Ana Plante",
      clinic_name: "Smile Clinic",
      clinic_contact: "+1 224 324 3332",
      clinic_address: "1234, Street Ave, Halifax",
    },
  ];

  return (
    <>
    <PetOwnerNavbar/>
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
                        style={{ border: "1px solid #ddd", margin: "20px 0" }}
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
    </>
  );
}
