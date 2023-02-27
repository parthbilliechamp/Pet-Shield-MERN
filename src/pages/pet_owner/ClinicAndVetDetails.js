import React, {useState} from "react";
import { Row, Col, Button } from "react-bootstrap";
import '../../assets/styles/pet_owner/ClinicAndVetDetails.css';
import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import { Link } from "react-router-dom";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";

function ClinicAndVetDetails({ vet, clinic }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (e, message, type) => {
    e.preventDefault();
    setAlert({ message: message, type: type });
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
              <b>Date : </b> 23 February 2023
            </div>
            <div>
              <b>Time : </b> 9.00 AM
            </div>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />

            <Row className="mb-3 align-items-center">
              <Col xs={12} md={3} style={{ marginRight: "10px" }}>
                <div
                  className="img-holder"
                  style={{ borderRadius: "50%", overflow: "hidden" }}
                >
                  <img
                    src={vet.image}
                    alt={vet.name}
                    className="circular-image"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} style={{ marginRight: "10px" }}>
                <div className="card-title mt-3">
                  <b>Vet details</b>
                </div>
                <div>Name: {vet.name}</div>
                <div>Contact: {vet.contact}</div>
                <div>Fees: {vet.fees}</div>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />
            <Row className="mb-3 align-items-center">
              <Col xs={12} md={3} style={{ marginRight: "10px" }}>
                <div
                  className="img-holder"
                >
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    style={{ width: "1", height: "118" }}
                    className="rectangular-image"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} style={{ marginRight: "10px" }}>
                <div className="card-title mt-3">
                  <b>Clinic details</b>
                </div>
                <div>Name: {clinic.name}</div>
                <div>Address: {clinic.address}</div>
                <div>Phone: {clinic.phone}</div>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #ddd", margin: "20px 0" }} />
            <div className="container" style={{ marginTop: "30px" }}>
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={2} />
                <Col xs={12} md={2}>
                <Link to="/timeslot">
                  <u style={{color:'black'}}>Go Back</u>
                </Link>
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    variant="light"
                    style={{ backgroundColor: "#1e69ba", color: "white" }}
                    href="book"
                    onClick={(e) => showAlert(e, "Booking Confirmed!!!", "Success")}
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

  const vet = {
    id: 1,
    name: 'James Wick',
    image: 'https://vcacanada.com/carecentre/-/media/vca-canada/images/hospitals/canada/alberta/carecentre/staff/700x525_care_smith.jpg?h=525&w=700&la=en&hash=DC7893BABD38D9A8AE8518550DC4F393',
    clinic: 'Smile Clinic',
    contact: '+1 334 324 3332',
    address: "1234, Street Ave, Halifax",
    fees: '$20.00', 
    rating: 4
  }

  const clinic = {
    id: 1,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    name: 'Smile Clinic',
    address: '123 Main St, Anytown USA 12345',
    phone: '(123) 456-7890'
  }

  return (
    <>
    <PetOwnerNavbar/>
    <div className="container">
      <ClinicAndVetDetails vet={vet} clinic={clinic} />
    </div>
    </>
  );
}
