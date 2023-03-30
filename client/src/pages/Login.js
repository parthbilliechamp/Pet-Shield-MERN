import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Paper from "@mui/material/Paper";
import axios from "axios";
import Switch from '@mui/material/Switch';

const Login = () => {
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
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            if (userData.userType === "petowner") {
                window.location.href = "/pet_owner_dashboard";
            }
            else if (userData.userType === "vets") {
                window.location.href = "/vet_dashboard";
            }
        }
    }, []);

    useEffect(() => {
        if (isValidateForm) {
            handleSubmit();
        }
    }, [isValidateForm]);

    const handleChangeWithValidate = (event) => {
        validate(event);

    };

    // useEffect(() => {

    //     if (isValidateForm) {
    //         if (formValues.email.value === "group5petowner@gmail.com" && formValues.password.value === "Petowner@PetShield") {
    //             window.location.href = '/pet_owner_dashboard';
    //         }
    //         else if (formValues.email.value === "group5vets@gmail.com" && formValues.password.value === "Vets@PetShield") {
    //             window.location.href = '/vet_dashboard';
    //         }
    //         else {
    //             setFormValues((formValues) => ({
    //                 ...formValues,
    //                 authentication: {
    //                     errorMessage: "Unauthorized User",
    //                 },
    //             }));
    //         }
    //     }
    //     setIsValidateForm(false);
    // }, [isValidateForm, formValues]);
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

    const handleSubmit = () => {
        //console.log(email, password)
        axios.post('http://localhost:5000/login',
            {
                email: formValues.email.value,
                password: formValues.password.value,
                userType: userType
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 500) {
                    alert('User Not Found')
                }
                if (res.data.code === 404) {
                    alert('Email or Password is wrong')
                }
                if (res.data.code === 200) {
                    // move to home
                    // console.log(res.data.session);
                    // cookie.save('userId',res.data.session.userId, { path: '/' })
                    // cookie.save('userType',res.data.userType, { path: '/' })
                    localStorage.setItem('userData', JSON.stringify(res.data))

                    if (res.data.userType === "petowner") {

                        window.location.href = '/pet_owner_dashboard'
                    }
                    else if (res.data.userType === "vets") {

                        window.location.href = '/vet_dashboard'
                    }

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
    // useEffect(
    //     () => {
    //         if(cookie.load('userId')){
    //             if(cookie.load('userType') === 'petowner') {
    //                 window.location.href = '/pet_owner_dashboard'
    //             }
    //             else  if(cookie.load('userType') === 'vets')
    //             {
    //                 window.location.href = '/vet_dashboard'
    //             }
    //         }
    //     }, []
    // )
    // 
    // useEffect(
    //     () => {
    //         const userData = JSON.parse(localStorage.getItem('userData'));
    //         console.log(userData)
    //         if (!userData) {
    //             // redirect to login page
    //             window.location.href = '/login';
    //         } else {
    //             if (userData.userType === 'petowner') {
    //                 window.location.href = '/pet_owner_dashboard';
    //             } else if (userData.userType === 'vets') {
    //                 window.location.href = '/vet_dashboard';
    //             }
    //         }
    //     }, []
    // )



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
                            <Switch
                                checked={checked}
                                onChange={handleSwitch}
                                name="checked"
                                color="primary"
                            /> Want to login as Vets?
                        </Grid>
                        <Grid >
                            {/* <FormControlLabel
                                control={<Checkbox style={{ left: 10 }} size="small" />} label={<Typography style={{ fontSize: 9 }} variant="caption" align="inherit">Remember me</Typography>}
                            /> */}

                            <Link href="/forgotPassword" style={{ fontSize: 13 }} color={"#FF9800"} align="right">Forgot Password?</Link>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            {<Grid color="red">{formValues.authentication.errorMessage}</Grid>}
                            <Button variant="contained" onClick={handleChangeWithValidate}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            Don't have an Account? <Link href="registration" color={"#FF9800"} style={{ fontSize: 13 }}>Create an Account</Link>
                        </Grid>
                    </Grid>

                </Paper>
            </div>

        </React.Fragment>
    )
}

export default Login;