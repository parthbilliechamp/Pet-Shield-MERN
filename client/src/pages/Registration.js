/**
 * @author Jaivik Tailor
 */
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = require("../utils/url").default;

const Registration = (props) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstName: {
      value: "",
      errorMessage: ""
    },
    lastName: {
      value: "",
      errorMessage: ""
    },
    email: {
      value: "",
      errorMessage: ""
    },
    phone: {
      value: "",
      errorMessage: ""
    },
    password: {
      value: "",
      errorMessage: ""
    },
    confirmPassword: {
      value: "",
      errorMessage: ""
    }
  })
  const [isValidateForm, setIsValidateForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: { ...formValues[name], value }
    })
  };

  const handleSubmit = () => {
    //console.log(email, password)
    axios.post(`${BASE_URL}registration`,
      {
        email: formValues.email.value,
        password: formValues.password.value,
        firstname: formValues.firstName.value,
        lastname: formValues.lastName.value,
        phone: formValues.phone.value,
        userType: 'petowner'
      })
      .then(res => {
        console.log(res.data)
        if (res.data.Code === 200) {
          navigate('/login')
          alert('Signup success.')
        } else {
          alert('Error.')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isValidateForm) {
      handleSubmit();
    }
  }, [isValidateForm]);

  const handleChangeWithValidate = (event) => {
    validate(event);

  };

  const validate = (event) => {
    event.preventDefault();
    let isValidate = true;

    const ALPHABET_REGEX = /^[a-zA-Z]+$/;
    const NUMBER_REGEX = /^[0-9]+$/;
    const ONLY_TEN_NUMBERS_REGEX = /^[0-9]{10}$/;

    let firstNameErrorMessage = formValues.firstName.value === "" ? "First Name is Required" :
      ALPHABET_REGEX.test(formValues.firstName.value) ? "" : "Field can contain only alphabets!"
    isValidate &= firstNameErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      firstName: {
        value: formValues.firstName.value,
        errorMessage: firstNameErrorMessage,
      },
    }));

    let lastNameErrorMessage = formValues.lastName.value === "" ? "Last Name is Required" :
      ALPHABET_REGEX.test(formValues.lastName.value) ? "" : "Field can contain only alphabets!"
    isValidate &= lastNameErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      lastName: {
        value: formValues.lastName.value,
        errorMessage: lastNameErrorMessage,
      },
    }));

    let phoneErrorMessage = formValues.phone.value === "" ? "Phone Number is Required" : 
    ONLY_TEN_NUMBERS_REGEX.test(formValues.phone.value) ? "" : "Field can contain only 10 digits!"
      // PHONE_REGEX.test(formValues.phone.value) ? "" : "Field can contain only numbers!"
    isValidate &= phoneErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      phone: {
        value: formValues.phone.value,
        errorMessage: phoneErrorMessage,
      },
    }));

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Source: https://www.w3resource.com/
    let emailErrorMessage = formValues.email.value === "" ?
      "Email is Required" :
      emailRegex.test(formValues.email.value) ?
        "" : "Email Address is not valid"
    isValidate &= emailErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      email: {
        value: formValues.email.value,
        errorMessage: emailErrorMessage,
      },
    }));

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*)(+=._-]*$/;

    let passwordErrorMessage = formValues.password.value === "" ?
      "Password is Required" :
      formValues.password.value.length < 8 ?
        "Password must contains 8 characters" :
        passwordRegex.test(formValues.password.value) ? "" : "Password must contain alphabets and characters"

    isValidate &= passwordErrorMessage === ""
    setFormValues((formValues) => ({
      ...formValues,
      password: {
        value: formValues.password.value,
        errorMessage: passwordErrorMessage,
      },
    }));

    let confirmPasswordErrorMessage = formValues.confirmPassword.value === "" ?
      "Password is Required" :
      formValues.confirmPassword.value.length < 8 ?
        "Password must contains 8 characters" :
        formValues.confirmPassword.value === formValues.password.value ?
          "" : "Confirm Password and Pasword must match"

    isValidate &= confirmPasswordErrorMessage === ""
    setFormValues((formValues) => ({
      ...formValues,
      confirmPassword: {
        value: formValues.confirmPassword.value,
        errorMessage: confirmPasswordErrorMessage,
      },
    }));

    setIsValidateForm(isValidate);
  };

  return (
    <React.Fragment>
      <div style={{

        backgroundColor: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "150vh",
        width: "100vw",
        position: "fixed",
        top: 1,
        left: 0,
        zIndex: -1
      }}></div>
      <div>
        <Paper

          sx={{
            flexGrow: 1,
            maxWidth: '800px',
            margin: '50px auto',
            padding: '30px 50px',
            textAlign: 'center',
          }}
        // sx={{ flexGrow: 1, width: '50%' }}
        // m={8}
        // mb={5}
        // bgcolor="white"
        // style={{ padding: "30px 50px", margin: "50px auto" }}

        >
          <Grid container spacing={3} alignItems="center" justifyContent="flex-end" direction="column">
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" color="#2196F3" component="h4">
                Registration
              </Typography>
              <Stack direction="row" justifyContent="space-between" style={{ fontSize: 14 }}>
                Are you doctor?<Link href="registrationdoctor" color={"#FF9800"} style={{ fontSize: 13 }}>Register Here</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                value={formValues.firstName.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.firstName.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.firstName.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                value={formValues.lastName.value} s
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.lastName.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.lastName.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone No"
                type="text"
                value={formValues.phone.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.phone.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.phone.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formValues.email.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.email.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.email.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formValues.password.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.password.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.password.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formValues.confirmPassword.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.confirmPassword.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.confirmPassword.errorMessage}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Button variant="contained" onClick={handleChangeWithValidate}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              Are you already registered user? <Link href="login" color={"#FF9800"} style={{ fontSize: 13 }}>Login Here</Link>
            </Grid>
            {/* <Grid item xs={4} sm={4} md={4}>
              {
                isValidateForm ?
                  <Typography variant="h6" component="h6" color={"green"}>
                    User Registered Successfully.
                  </Typography> : ""
              }
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  )
}

export default Registration;