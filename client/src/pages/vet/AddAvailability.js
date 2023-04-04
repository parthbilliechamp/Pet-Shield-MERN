import React, { useState, useEffect } from "react";
import { Typography, Tooltip } from "@mui/material";
import styled from "styled-components";
import login_img from "../../assets/images/login1.jpg";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import VetNavBar from "../../components/common/VetNavbar";
import axios from "axios";
import VetSidebar from "../../components/common/VetSidebar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BASE_URL = require("../../utils/url").default;

const AvailabililtyForm = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [timeslot, setTimeslot] = useState([]);

  const [visible, setVisible] = useState(false);
  const theme = createTheme();
  const [vet, setVet] = useState(null);
  // const [vets, setVets] = useState([]);

  useEffect(() => {
    //To check authorize valid loggedin user to this page
    checkUser();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const vetData = {
      _id: userData._id,
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
    };
    setVet(vetData);
  }, []);

  const checkUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData === null) {
      navigate("/login");
    } else {
      const userType = userData.userType;
      if (userType !== "vets") {
        navigate("/login");
      }
    }
  };

  const addSlot = (event) => {
    event.preventDefault();
    const newSlot = { start_time: starttime, end_time: endtime, availability: 1 };
    setTimeslot((prevArray) => [...prevArray, newSlot]);
  };

  const popDialog = (event) => {
    event.preventDefault();
    if (date === undefined) {
      setSuccess(false);
      setMessage("Error");
    } else {
      setMessage("Success");
      setSuccess(true);
      console.log("vet id " + vet._id);
      const url = `${BASE_URL}addavailability/${vet._id}`;
      var datestring = new Date(date);
      datestring = datestring.toDateString();
      axios
        .post(url, {
          date: datestring,
          slot: timeslot,
          vets: vet,
        })
        .then(function (response) {})
        .catch(function (error) {});
    }

    setVisible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <VetNavBar />
        <VetSidebar />
        {/* Add this to keep space between nav and sidebar */}
        <Container
          component="main"
          maxWidth="md"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
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
                  <h6 className="form-text">Enter Start Time</h6>
                  <Tooltip title="Enter Start Time">
                    <input
                      margin="normal"
                      value={starttime}
                      min={starttime}
                      type="time"
                      variant="outlined"
                      label="Lastname"
                      required
                      onChange={(event) => setStarttime(event.target.value)}
                    />
                  </Tooltip>
                </div>
                <div className="input-wrapper">
                  <h6 className="form-text">Enter End Time</h6>
                  <Tooltip title="Enter End Time">
                    <input
                      margin="normal"
                      value={endtime}
                      min={endtime}
                      type="time"
                      variant="outlined"
                      label="Lastname"
                      required
                      onChange={(event) => setEndtime(event.target.value)}
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
                  onClick={(event) => addSlot(event)}
                >
                  Add slot
                </Button>

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
                  Submit Availability
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
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
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

  width: 80%;
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
