/**
 * @author Jaivik Tailor
 */
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = require("../utils/url").default;


const Otp = () => {

    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        otp: {
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

    const handleSubmit = () => {
        const userType = JSON.parse(localStorage.getItem('userData'));
        console.log(userType);
        axios.post(`${BASE_URL}submit-otp`,
            {
                otp: formValues.otp.value,
                password: formValues.newPassword.value,
                userType: userType
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    navigate('/login')
                    alert('Password Updated.')
                } else {
                    alert('server err / wrong OTP')
                }
            }).catch(err => {
                console.log(err);
                alert('server err / wrong OTP')
                navigate('/forgotPassword')
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

        let OtpErrorMessage = formValues.otp.value === "" ?
            "OTP is Required" : ""
        isValidate &= OtpErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            otp: {
                value: formValues.otp.value,
                errorMessage: OtpErrorMessage,
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
                // style={{ padding: "30px 50px", margin: "150px auto" }}
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
                                id="otp"
                                name="otp"
                                label="OTP"
                                type="otp"
                                value={formValues.otp.value}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                error={
                                    formValues.otp.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={formValues.otp.errorMessage}
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
                            <Button variant="contained" onClick={handleChangeWithValidate}>
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

export default Otp