import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Typography, Box, Paper, TextField, Button, Grid } from "@mui/material";
const BASE_URL = require("../../utils/url").default;

const Payment = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: false,
    expDate: false,
    cvv: false,
    nameOnCard: false,
  });

  const FancyButton = styled(Button)({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "10px 20px",
    borderRadius: "25px",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  });
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
  };

  const handlePayNow = () => {
    if (!validateForm()) {
      console.log("Invalid form");
      return;
    }

    const URL = `${BASE_URL}/${location.state._id}/addPetInsuranceDetails`;
    console.log(URL);
    fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location.state),
    })
      .then((response) => {
        if (response.status === 200) {
          showAlert("Insurances Sucessfully Added !!", "Success");
          navigate("/insurances", { state: { responseStatus: alert } });
        } else {
          showAlert("Error: Unable to add insurance", "Error");
        }
      })
      .catch((error) => console.log(error));

    console.log("Valid form, process payment");
  };

  const validateForm = () => {
    let isValid = true;

    // Card number validation: 13-19 digits
    const cardNumberRegex = /^(\d{13,19})$/;
    const isCardNumberValid = cardNumberRegex.test(cardNumber);
    setErrors((prevState) => ({
      ...prevState,
      cardNumber: !isCardNumberValid,
    }));

    // Expiry date validation: MM/YY
    const expDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const isExpDateValid = expDateRegex.test(expDate);
    setErrors((prevState) => ({ ...prevState, expDate: !isExpDateValid }));

    // CVV validation: 3-4 digits
    const cvvRegex = /^(\d{3,4})$/;
    const isCvvValid = cvvRegex.test(cvv);
    setErrors((prevState) => ({ ...prevState, cvv: !isCvvValid }));

    // Name on card validation: at least 2 characters
    const nameOnCardRegex = /^.{2,}$/;
    const isNameOnCardValid = nameOnCardRegex.test(nameOnCard);
    setErrors((prevState) => ({
      ...prevState,
      nameOnCard: !isNameOnCardValid,
    }));

    isValid =
      isCardNumberValid && isExpDateValid && isCvvValid && isNameOnCardValid;

    return isValid;
  };

  console.log(location.state);

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Payment
        </Typography>
        <Paper
          sx={{
            padding: "20px",
            backgroundColor: "#f0f4f7",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                error={errors.cardNumber}
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={errors.expDate}
                id="expDate"
                name="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={errors.cvv}
                id="cvv"
                name="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={errors.nameOnCard}
                id="nameOnCard"
                name="nameOnCard"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center" spacing={2}>
              <Grid item>
                <FancyButton
                  variant="contained"
                  color="primary"
                  onClick={handlePayNow}
                  size="large"
                >
                  Pay
                </FancyButton>
              </Grid>
              <Grid item>
                <FancyButton
                  variant="outlined"
                  color="primary"
                  onClick={() => console.log("Payment canceled")}
                  size="large"
                >
                  Cancel
                </FancyButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Payment;
