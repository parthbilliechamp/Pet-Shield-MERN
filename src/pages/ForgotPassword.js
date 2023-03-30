import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper, Link } from "@mui/material";
import Typography from "@mui/material/Typography";


const ForgotPassword = () => {
    const [formValues, setFormValues] = useState({
        email: {
            value: "",
            errorMessage: ""
        },
        newPassword: {
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

        let newPasswordErrorMessage = formValues.newPassword.value === "" ?
            "Enter New Password" : formValues.newPassword.value.length < 8 ?
                "Password must contains 8 characters" : ""

        isValidate &= newPasswordErrorMessage === ""
        setFormValues((formValues) => ({
            ...formValues,
            newPassword: {
                value: formValues.newPassword.value,
                errorMessage: newPasswordErrorMessage,
            },
        }));

        let confirmPasswordErrorMessage = formValues.confirmPassword.value === "" ?
            "Confirm Password is Required" :
            formValues.confirmPassword.value.length < 8 ?
                "Password must contains 8 characters" :
                formValues.confirmPassword.value === formValues.newPassword.value ?
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
                    sx={{ flexGrow: 1, width: '50%' }}
                    m={8}
                    mb={5}
                    bgcolor="white"
                    style={{ padding: "30px 50px", margin: "150px auto" }}
                >
                    <Grid container spacing={3} alignItems="center" justifyContent="flex-end" direction="column">
                        <Grid item xs={4} sm={4} md={4}>
                            <Typography variant="h4" color="#2196F3" component="h4">
                                Forgot Password
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
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                value={formValues.newPassword.value}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                error={
                                    formValues.newPassword.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={formValues.newPassword.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
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
                            <Button variant="contained" onClick={validate}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            Do you want to login? <Link href="login" color={"#FF9800"} style={{ fontSize: 13 }}>Login Here</Link>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            {
                                isValidateForm ?
                                    <Typography variant="h6" component="h6" color={"green"}>
                                        Password  Changed Successfully!!
                                    </Typography> : ""
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </React.Fragment>
    )
}
export default ForgotPassword;