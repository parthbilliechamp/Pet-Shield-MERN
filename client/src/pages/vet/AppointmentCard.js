import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./AppointmentPage.js";
import axios from "axios";
import p3 from "../../assets/images/Profileimg/p3.jpg";
const BASE_URL = require("../../utils/url").default;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentCard = (props) => {
  const navigate = useNavigate();

  const [modalflag, setModalflag] = useState(false);
  const [confirmationflag, setConfirmationflag] = useState(false);

  const viewDetails = () => {
    navigate("/appointmentdetails", {
      state: {
        first_name: props.first_name,
        last_name: props.last_name,
        email: props.email,
        phone: props.phone,
      },
    });
  };

  const handlemodalClose = () => {
    setModalflag(false);
  };

  const handlemodalOpen = () => {
    setModalflag(true);
  };

  const handleconfirmationClose = () => {
    setConfirmationflag(false);
  };

  const handleconfirmationOpen = () => {
    setModalflag(false);
    setConfirmationflag(true);

    axios
      .post(`${BASE_URL}cancelvetappointment/${props.id}`)
      .then(function (response) {})
      .catch(function (error) {});
  };

  let methodName;

  props.buttonname === "cancel"
    ? (methodName = handlemodalOpen)
    : (methodName = viewDetails);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 200 }} image={p3} title="pet owner" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.first_name} {props.last_name}
          </Typography>
          <Typography variant="h7" color="text.secondary" fontWeight={"bold"}>
            Slot: {props.start_time} - {props.end_time}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={methodName}>
            {props.buttonname}
          </Button>
        </CardActions>
      </Card>

      <Dialog open={modalflag}>
        <DialogTitle>
          Please enter the reason for cancelling the appointment
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cancellation Reason"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlemodalClose}>Cancel</Button>
          <Button onClick={handleconfirmationOpen}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmationflag}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleconfirmationClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Appointment Cancelled</DialogTitle>
        <DialogActions>
          <Button onClick={handleconfirmationClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentCard;
