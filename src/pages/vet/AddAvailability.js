import React, { useState } from "react";
import { Typography, Tooltip } from "@mui/material";
import styled from "styled-components";
import login_img from "../../assets/images/login.jpg";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import VetNavBar from "../../components/common/VetNavbar";

const AvailabililtyForm = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  const [visible, setVisible] = useState(false);
  const popDialog = (event) => {
    event.preventDefault();
    if (date === undefined) {
      setSuccess(false);
      setMessage("Error");
    } else {
      setMessage("Success");
      setSuccess(true);
      setDate("");
      setTime("");
    }

    setVisible(true);
  };

  return (
    <>
    <VetNavBar/>
    <StyledLoginImgWrapper className="login-img-wrapper">
      <form className="login-form" name="addavailability">
        <Typography variant="h2" paddingBottom={5}>
          Add Availability
        </Typography>

        <div className="input-wrapper">
          <h6 className="form-text">Enter Date</h6>
          <Tooltip title="Enter Date">
            <input
              value={date}
              margin="normal"
              type="date"
              min={Date}
              variant="outlined"
              label="Firstname"
              required
              onChange={(event) => setDate(event.target.value)}
            />
          </Tooltip>
        </div>
        <div className="input-wrapper">
          <h6 className="form-text">Enter Time</h6>
          <Tooltip title="Enter Time">
            <input
              margin="normal"
              value={time}
              min={time}
              type="time"
              variant="outlined"
              label="Lastname"
              required
              onChange={(event) => setTime(event.target.value)}
            />
          </Tooltip>
        </div>

        <Button
          type="submit"
          sx={{
            marginTop: 3,
            background: "1e69ba",
            color: "#1e69ba",
            borderRadius: 5,
            width: 100,
            alignSelf: "center",
            justifyContent: "center",
            ":hover": { background: "black" },
          }}
          variant="contained"
          onClick={(e) => popDialog(e)}
        >
          Add
        </Button>
        <Dialog
          header={message}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          {success ? (
            <p style={{ color: "green" }} className="m-0">
              Successfully added Availability
            </p>
          ) : (
            <p style={{ color: "red" }} className="m-0">
              Please Enter date and time
            </p>
          )}
        </Dialog>
      </form>
      <div className="login-img">
        <img src={login_img} alt="" />
      </div>
    </StyledLoginImgWrapper>
    </>
  );
};

const StyledLoginImgWrapper = styled.div`
  display: flex;
  .p-button {
    background: #1e69ba;

    :hover {
      background: #1e69ba;
      color: white;
    }
  }

  .form-text {
    color: #1e69ba;
  }
  /* flex-wrap: wrap; */
  :hover {
    box-shadow: 1px 1px 2px 1px #1e69ba;
  }

  box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
  width: 70%;
  margin: 2rem auto;
  padding: 2rem;
  gap: 1rem;
  .login-form {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    .input-wrapper {
      text-align: left;
      input {
        width: 100%;
        padding: 0.6rem;
        border-radius: 5px;
        border: none;
        box-shadow: 0px 0px 1px 1px rgb(193, 193, 193);

        :hover {
          box-shadow: 0px 0px 1px 1px #1e69ba;
        }
      }
    }
  }
  .login-img {
    flex-basis: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media only screen and (min-width: 280px) and (max-width: 432px) {
    width: 100%;
    box-shadow: none;
    padding: 1rem;
    h2 {
      font-size: 2rem;
    }
    .login-form {
      flex-basis: 100%;
    }
    .login-img {
      display: none;
    }
  }
  @media only screen and (min-width: 432px) and (max-width: 1120px) {
    .login-form {
      flex-basis: 100%;
    }
    .login-img {
      display: none;
    }
  }
`;

export default AvailabililtyForm;
