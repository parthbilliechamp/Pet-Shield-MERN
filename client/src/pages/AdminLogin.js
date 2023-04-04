/**
 * @author Jaivik Tailor
 */
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import axios from "axios";
import Switch from '@mui/material/Switch';
const BASE_URL = require("../utils/url").default;

const AdminLogin = () => {
    const [formValues, setFormValues] = useState({
        email: {
            value: "",
            errorMessage: ""
        },
        password: {
            value: "",
            errorMessage: ""
        },
        authentication: {
            errorMessage: ""
        }
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

    const handleSubmit = () => {
        //console.log(email, password)
        axios.post(`${BASE_URL}adminlogin`,
            {
                email: formValues.email.value,
                password: formValues.password.value,
            })
            .then(res => {
                //console.log(res.data)
                if (res.data.code === 500) {
                    alert('User Not Found')
                }
                if (res.data.code === 404) {
                    alert('Email or Password is wrong')
                }
                if (res.data.code === 200) {
                    localStorage.setItem('userData', JSON.stringify(res.data))
                    window.location.href = '/admin_dashboard'
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: { ...formValues[name], value }
        })
    };

    const validate = (event) => {
        event.preventDefault();
        let isValidate = true;

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

        let passwordErrorMessage = formValues.password.value === "" ?
            "Password is Required" : ""

        isValidate &= passwordErrorMessage === ""
        setFormValues((formValues) => ({
            ...formValues,
            password: {
                value: formValues.password.value,
                errorMessage: passwordErrorMessage,
            },
        }));

        setIsValidateForm(isValidate);
    }
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
                    <Grid container spacing={3} alignItems="center" justifyContent="flex-end" direction="column">
                        <Grid item xs={4} sm={4} md={4}>
                            <Typography variant="h4" color="#2196F3" component="h4">
                                Login
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
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
                        <Grid item xs={4} sm={4} md={4}>
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

                        <Grid item xs={4} sm={4} md={4}>
                            {<Grid color="red">{formValues.authentication.errorMessage}</Grid>}
                            <Button variant="contained" onClick={handleChangeWithValidate}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </div>

        </React.Fragment>
    )
}

export default AdminLogin;