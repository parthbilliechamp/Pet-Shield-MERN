/**
 * @author Jaivik Tailor
 **/
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, CssBaseline, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
const BASE_URL = require("../../utils/url").default;

const AddPets = (props) => {

    useEffect(() => {
        //To check authorize valid loggedin user to this page
        checkUser();
      }, []);

    const checkUser = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log(userData);
        if (userData === null) {
          navigate("/login");
        } else {
          const userType = userData.userType;
          if (userType !== "petowner") {
            navigate("/login");
          }
        }
      };

    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        petName: {
            value: "",
            errorMessage: ""
        },
        petType: {
            value: "",
            errorMessage: ""
        },
        petBreed: {
            value: "",
            errorMessage: ""
        },
        petAge: {
            value: "",
            errorMessage: ""
        },
        petCertificateNumber: {
            value: "",
            errorMessage: ""
        },
        petGender: {
            value: "",
            errorMessage: ""
        },
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
        const userData = JSON.parse(localStorage.getItem('userData'));
        //const user_id = userData.userDetails.email;
        axios.post(`${BASE_URL}add-pets`,
            {
                
                petName: formValues.petName.value,
                petType: formValues.petType.value,
                petBreed: formValues.petBreed.value,
                petAge: formValues.petAge.value,
                petCertificateNumber: formValues.petCertificateNumber.value,
                petGender: formValues.petGender.value,
                pet_owner: userData.userDetails,

            })
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    navigate('/view-pets')
                    alert('Pets added Successfully')
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

        let petNameErrorMessage = formValues.petName.value === "" ? "Pet Name is Required" :
        ALPHABET_REGEX.test(formValues.petName.value) ? "" : "Field can contain only alphabets!"
        isValidate &= petNameErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            petName: {
                value: formValues.petName.value,
                errorMessage: petNameErrorMessage,
            },
        }));

        let petTypeErrorMessage = formValues.petType.value === "" ? "Task Description is Required" :
        ALPHABET_REGEX.test(formValues.petType.value) ? "" : "Field can contain only alphabets!"
        isValidate &= petTypeErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            petType: {
                value: formValues.petType.value,
                errorMessage: petTypeErrorMessage,
            },
        }));

        let petAgerMessage = formValues.petAge.value === "" ? "Pet Age is Required" : 
        NUMBER_REGEX.test(formValues.petAge.value) ? "" : "Field can contain only numbers!"
        //PHONE_REGEX.test(formValues.phone.value) ? "" : "Field can contain only numbers!"
        isValidate &= petAgerMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            petAge: {
                value: formValues.petAge.value,
                errorMessage: petAgerMessage,
            },
        }));

        // let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Source: https://www.w3resource.com/
        let petBreedErrorMessage = formValues.petBreed.value === "" ? "Pet Breed is Required" : 
        ALPHABET_REGEX.test(formValues.petBreed.value) ? "" : "Field can contain only alphabets!"
        isValidate &= petBreedErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            petBreed: {
                value: formValues.petBreed.value,
                errorMessage: petBreedErrorMessage,
            },
        }));

        let petCertificateNumberErrorMessage = formValues.petCertificateNumber.value === "" ? "Pet Certification Number is Required" : 
        ONLY_TEN_NUMBERS_REGEX.test(formValues.petCertificateNumber.value) ? "" : "Field can contain only 10 digits!"
        isValidate &= petCertificateNumberErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            petCertificateNumber: {
                value: formValues.petCertificateNumber.value,
                errorMessage: petCertificateNumberErrorMessage,
            },
        }));

        setIsValidateForm(isValidate);
    };

    return (
        <React.Fragment>


            <Box sx={{ margin: 'auto', width: '90%', maxWidth: '800px' }}>
                <CssBaseline />
                <PetOwnerNavbar />
                <PetOwnerSidebar />
                <div>
                    <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                        <Paper
                            sx={{ mt: { xs: 6, md: 10 }, p: { xs: 2, md: 3 } }}  >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                    <Typography variant="h4" color="#2196F3" component="h4">
                                        Add Your Pets
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="petName"
                                        name="petName"
                                        label="Pet Name"
                                        type="text"
                                        value={formValues.petName.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petName.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petName.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="petType"
                                        name="petType"
                                        label="pet Type"
                                        type="text"
                                        value={formValues.petType.value} s
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petType.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petType.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="petBreed"
                                        name="petBreed"
                                        label="pet Breed"
                                        type="text"
                                        value={formValues.petBreed.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petBreed.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petBreed.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        id="petAge"
                                        name="petAge"
                                        label="Pet Age"
                                        type="text"
                                        value={formValues.petAge.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petAge.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petAge.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        id="petCertificateNumber"
                                        name="petCertificateNumber"
                                        label="Pet Certificate Number"
                                        type="text"
                                        value={formValues.petCertificateNumber.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petCertificateNumber.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petCertificateNumber.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        id="petGender"
                                        name="petGender"
                                        label="Pet Gender"
                                        type="text"
                                        value={formValues.petGender.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.petGender.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.petGender.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleChangeWithValidate}>
                                        Add Your Pet
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4}>
                                    {/* {
                isValidateForm ?
                  <Typography variant="h6" component="h6" color={"green"}>
                    User Registered Successfully.
                  </Typography> : ""
              } */}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div>
            </Box>
        </React.Fragment>
    )
}

export default AddPets;