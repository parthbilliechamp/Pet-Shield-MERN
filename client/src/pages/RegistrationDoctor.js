/**
 * @author Jaivik Tailor
 */
import React, { useState,useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationDoctor = (props) => {
  const navigate = useNavigate()
  const [file, setFile] = useState()

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

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
    password: {
      value: "",
      errorMessage: ""
    },
    confirmPassword: {
      value: "",
      errorMessage: ""
    },
    phone: {
      value: "",
      errorMessage: ""
    },
    license_number: {
      value: "",
      errorMessage: ""
    },
    qualification: {
      value: "",
      errorMessage: ""
    },
    experience: {
      value: "",
      errorMessage: ""
    },
    clinic_license_number: {
      value: "",
      errorMessage: ""
    },
    clinic_address: {
      value: "",
      errorMessage: ""
    },
    rating: {
      value: "",
      errorMessage: ""
    },
    fees: {
      value: "",
      errorMessage: ""
    },
    clinic_name: {
      value: "",
      errorMessage: ""
    },

  })
  const [isValidateForm, setIsValidateForm] = useState(false);

  useEffect(() => {
    if (isValidateForm) {
      handleSubmit();
    }
  }, [isValidateForm]);

  const handleChangeWithValidate = (event) => {
    validate(event);

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: { ...formValues[name], value }
    })
  };
  const handleSubmit = () => {
    console.log(file);
    const formData = new FormData();
    formData.append('email', formValues.email.value);
    formData.append('password', formValues.password.value);
    formData.append('firstname', formValues.firstName.value);
    formData.append('lastname', formValues.lastName.value);
    formData.append('phone', formValues.phone.value);
    formData.append('license_number', formValues.license_number.value);
    formData.append('qualification', formValues.qualification.value);
    formData.append('experience', formValues.experience.value); 
    formData.append('clinic_license_number', formValues.clinic_license_number.value);
    formData.append('clinic_address', formValues.clinic_address.value);
    formData.append('fees', formValues.fees.value);
    formData.append('rating', formValues.rating.value);
    formData.append('clinic_name', formValues.clinic_name.value);
    const BASE_URL = require("../utils/url").default;
    
    formData.append('userType', 'vets');
    formData.append('status', 'pending');
    formData.append('photo', file);
    //console.log(email, password)
    
     axios.post(`${BASE_URL}registration`, formData,
     {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.Code === 200) {
          navigate('/login')
          alert('Resgister successfully.')
        } else {
          alert('Error.')
        }
      }).catch(err => {
        console.log(err)
      })
  }
  // const handleChangeWithValidate = (event) => {
  //   handleChange(event);
  //   validate(event);
  // };

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

    let licenseNumberErrorMessage = formValues.license_number.value === "" ? "license Number is Required" :""
    isValidate &= licenseNumberErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      license_number: {
        value: formValues.license_number.value,
        errorMessage: licenseNumberErrorMessage,
      },
    }));

    let qualificationErrorMessage = formValues.qualification.value === "" ? "Qualification is Required" :
      ALPHABET_REGEX.test(formValues.qualification.value) ? "" : "Field can contain only alphabets!"
    isValidate &= qualificationErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      qualification: {
        value: formValues.qualification.value,
        errorMessage: qualificationErrorMessage,
      },
    }));

    let experienceErrorMessage = formValues.experience.value === "" ? "Experience is Required" : 
    NUMBER_REGEX.test(formValues.experience.value) ? "" : "Field can contain only numbers!"
    isValidate &= experienceErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      experience: {
        value: formValues.experience.value,
        errorMessage: experienceErrorMessage,
      },
    }));

    let clinicLNErrorMessage = formValues.clinic_license_number.value === "" ? "Clinic License Number is Required" : ""
     
    isValidate &= clinicLNErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      clinic_license_number: {
        value: formValues.clinic_license_number.value,
        errorMessage: clinicLNErrorMessage,
      },
    }));
    
    let clinicAddressErrorMessage = formValues.clinic_address.value === "" ? "Clinic Address is Required" : ""
    isValidate &= clinicAddressErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      clinic_address: {
        value: formValues.clinic_address.value,
        errorMessage: clinicAddressErrorMessage,
      },
    }));

    let ratingErrorMessage = formValues.rating.value === "" ? "Rating is Required" : 
    NUMBER_REGEX.test(formValues.rating.value) ? "" : "Field can contain only numbers!"
    isValidate &= ratingErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      rating: {
        value: formValues.rating.value,
        errorMessage: ratingErrorMessage,
      },
    }));

    let feesErrorMessage = formValues.fees.value === "" ? "Fees is Required" : 
    NUMBER_REGEX.test(formValues.fees.value) ? "" : "Field can contain only numbers!"
    isValidate &= feesErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      fees: {
        value: formValues.fees.value,
        errorMessage: feesErrorMessage,
      },
    }));
    
    let clinicNameErrorMessage = formValues.clinic_name.value === "" ? "Clinic Name is Required" : ""
    isValidate &= clinicNameErrorMessage === "";

    setFormValues((formValues) => ({
      ...formValues,
      clinic_name: {
        value: formValues.clinic_name.value,
        errorMessage: clinicNameErrorMessage,
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

        >
          <br/>
          
          {/* alignItems="center" justifyContent="flex-end" direction="column" */}
          <Grid container spacing={3} >
            
            <Grid container justifyContent="center" >
              <Typography variant="h4" color="#2196F3" component="h4">
                Registration
              </Typography>
            </Grid>
            <Grid container justifyContent="center" >
              <Stack direction="row" style={{ fontSize: 14 }}>
                Are you a Pet Owner?<Link href="./registration" color={"#FF9800"} style={{ fontSize: 13 }}>Register Here</Link>
              </Stack>
            </Grid>
            <Grid item  xs={12} sm={6}>
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
                id="license_number"
                name="license_number"
                label="License No"
                type="text"
                value={formValues.license_number.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.license_number.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.license_number.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="qualification"
                name="qualification"
                label="Qualification"
                type="text"
                value={formValues.qualification.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.qualification.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.qualification.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="experience"
                name="experience"
                label="Experience"
                type="text"
                value={formValues.experience.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.experience.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.experience.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="clinic_license_number"
                name="clinic_license_number"
                label="Clinic License Number"
                type="text"
                value={formValues.clinic_license_number.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.clinic_license_number.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.clinic_license_number.errorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="clinic_address"
                name="clinic_address"
                label="Clinic Address"
                type="text"
                value={formValues.clinic_address.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.clinic_address.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.clinic_address.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="rating"
                name="rating"
                label="Rating"
                type="text"
                value={formValues.rating.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.rating.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.rating.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fees"
                name="fees"
                label="Fees"
                type="text"
                value={formValues.fees.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.fees.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.fees.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="clinic_name"
                name="clinic_name"
                label="Clinic Name"
                type="text"
                value={formValues.clinic_name.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  formValues.clinic_name.errorMessage === ""
                    ? false
                    : true
                }
                helperText={formValues.clinic_name.errorMessage}
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
            <Grid item xs={12} sm={6}>
            <input type="file" onChange={handleFileSelect} /> 
              *Upload Profile Photo
              </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container justifyContent="center" >
            <Grid item>
              <Button variant="contained" onClick={handleChangeWithValidate}>
                Submit
              </Button>
              </Grid> 
            </Grid>
            <Grid container justifyContent="center">
              Are you already registered user? <Link href="login" color={"#FF9800"} style={{ fontSize: 13 }}>Login Here</Link>
            </Grid>
            {/* <Grid item xs={4} sm={4} md={4}>
              {
                isValidateForm ?
                  <Typography variant="h6" component="h6" color={"green"}>
                    User Registered Successfully as a Doctor
                  </Typography> : ""
              }
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  )
}

export default RegistrationDoctor;