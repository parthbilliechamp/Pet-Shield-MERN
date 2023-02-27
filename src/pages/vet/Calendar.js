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

export default function AppointmentCalendar() {
  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState(new Date());

  let buttonname = "";

  location.state?.pagelink === "/view_appointment_page"
    ? (buttonname = "view details")
    : (buttonname = "cancel");

  return (
    <>
    <VetNavBar/>
    <Paper
      sx={{ mx: { xs: 3, md: 45 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}
    >
      <StyledCalendar className="calendar-wrapper">
        <h3 className="heading">
          <b>Select</b> date to {location.state?.feature} scheduled appointments
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
    </>
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
