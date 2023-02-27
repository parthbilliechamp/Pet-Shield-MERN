import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import '../../assets/styles/pet_owner/ClinicAndVetDetails.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeSlotBox from "../pet_owner/TimeSlotBox";
import PetOwnerNavbar from "../common/PetOwnerNavbar";

export default function TimeSlot() {
  const [startDate, setStartDate] = useState(new Date());
  const [renderTimeSlots, setRenderTimeSlots] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const handleOnchangeEvent = (date) => {
    if (date < new Date().setHours(0, 0, 0, 0)) {
      setErrorMessage("Please choose a future date or today's date.");
    } else {
      setErrorMessage("");
      setStartDate(date);
      setRenderTimeSlots(true);
    }
  };

  return (
    <>
      <PetOwnerNavbar/>
      <div className="my-5">
        <div className="card w-50 mx-auto">
          <div className="card-body">
            <Row>
              <Col xs={12} md={5}>
                <strong>Choose an appointment date :</strong>
              </Col>
              <Col xs={12} md={7}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleOnchangeEvent(date)}
                  placeholderText="Select a date other than today or yesterday"
                />
              </Col>
            </Row>
            {errorMessage && (
                <p style={{'color':'red'}}>{errorMessage}</p>
  )}
          </div>
          <div className="card-header">
             <b>Available time slots : </b>
          </div>
          <div className="card-body">
            {renderTimeSlots && (
              <Row>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {timeSlots.map((time, index) => (
                    <TimeSlotBox time={time} key={index} />
                  ))}
                </div>
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
