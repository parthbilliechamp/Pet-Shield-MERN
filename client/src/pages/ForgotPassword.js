import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';


const ForgotPassword = () => {
    const navigate = useNavigate()
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

    const [checked, setChecked] = useState(false);
    const [userType, setUserType] = useState('petowner');

    const handleSwitch = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            setUserType('vets');
        } else {
            setUserType('petowner');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: { ...formValues[name], value }
        })
    };
    useEffect(() => {
        const handleSubmit = () => {
            console.log(formValues.email.value);
            axios.post('http://localhost:5000/send-otp',
                {
                    email: formValues.email.value,
                    userType: userType
                })
                .then(res => {
                    console.log(res.data)
                    if (res.data.code === 200) {
                        navigate('/otp')
                    } else {
                        alert('Email / Server Error.')
                    }
                }).catch(err => {
                    console.log(err)
                })
        };
        
        if (isValidateForm) {
            handleSubmit();
        }
    }, [formValues.email.value, isValidateForm, navigate, userType]);
    

    const handleChangeWithValidate = (event) => {
        validate(event);

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
                            <Switch
                                checked={checked}
                                onChange={handleSwitch}
                                name="checked"
                                color="primary"
                            /> Are you vet? yes, check this 
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <Button variant="contained" onClick={handleChangeWithValidate}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            Do you want to login? <Link href="login" color={"#FF9800"} style={{ fontSize: 13 }}>Login Here</Link>
                        </Grid>
                        {/* <Grid item xs={4} sm={4} md={4}>
                            {
                                isValidateForm ?
                                    <Typography variant="h6" component="h6" color={"green"}>
                                        Password  Changed Successfully!!
                                    </Typography> : ""
                            }
                        </Grid> */}
                    </Grid>
                </Paper>
            </div>
        </React.Fragment>
    )
}
export default ForgotPassword;