import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VetNavBar from '../../components/common/VetNavbar';

export default function AddMedicalRecord() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        navigate('/success')
    }

    return (
        <>
        <VetNavBar/>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Add Medical Records
                    </Typography>
                    <br />
                    <hr />
                    <br />
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Pet Medical Diagnosis
                            </Typography>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Pet Type"
                                        name="petType"
                                        id="petType"
                                        {...register("petType", {
                                            required: "Pet Type is Required",
                                            pattern: {
                                                value: /^[A-Za-z ]+$/,
                                                message: "Only Letters"
                                            }
                                        })}
                                        error={Boolean(errors.petType)}
                                        helperText={errors.petType?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Breed"
                                        name="breed"
                                        id="breed"
                                        {...register("breed", {
                                            required: "Breed is Required",
                                            pattern: {
                                                value: /^[A-Za-z ]+$/,
                                                message: "Only Letters"
                                            }
                                        })}
                                        error={Boolean(errors.breed)}
                                        helperText={errors.breed?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Certificate Number"
                                        type='number'
                                        name="certificateNumber"
                                        id="certificateNumber"
                                        fullWidth
                                        {...register("certificateNumber", {
                                            required: "Please enter a Certificate Number",
                                            minLength: {
                                                value: 10,
                                                message: "Password be atleast 10 digits"
                                            }
                                        })}
                                        error={Boolean(errors.certificateNumber)}
                                        helperText={errors.certificateNumber?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        focused
                                        name="dateOfDiagnosis"
                                        id="dateOfDiagnosis"
                                        label="Date of Diagnosis"
                                        type='date'
                                        {...register("dateOfDiagnosis")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Diagnosis"
                                        inputProps={{
                                            style: {
                                                height: "50px",
                                            },
                                        }}
                                        name="diagnosis"
                                        id="diagnosis"
                                        {...register("diagnosis", {
                                            required: "Diagnosis is Required",
                                        })}
                                        error={Boolean(errors.diagnosis)}
                                        helperText={errors.diagnosis?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Medical Prescriptions"
                                        name="medicalPrescriptions"
                                        id="medicalPrescriptions"
                                        inputProps={{
                                            style: {
                                                height: "50px",
                                            },
                                        }}
                                        {...register("medicalPrescriptions")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Pet Vaccines"
                                        name="petVaccines"
                                        id="petVaccines"
                                        inputProps={{
                                            style: {
                                                height: "50px",
                                            },
                                        }}
                                        {...register("petVaccines")}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <hr />
                            <br />
                            <Typography variant="h6" gutterBottom>
                                Owner Details
                            </Typography>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        autoComplete="given-name"
                                        name="name"
                                        id="name"
                                        {...register("name", {
                                            required: "Name is Required",
                                            pattern: {
                                                value: /^[A-Za-z ]+$/,
                                                message: "Only Letters"
                                            }
                                        })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        autoComplete="email"
                                        id="email"
                                        label="Email"
                                        {...register("email", {
                                            required: "Please enter your email",
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: "Invalid Email"
                                            }
                                        })}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Phone Number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        {...register("phoneNumber", {
                                            required: "Please enter a Contact Number",
                                            minLength: {
                                                value: 10,
                                                message: "Password be atleast 10 digits"
                                            }
                                        })}
                                        error={Boolean(errors.phoneNumber)}
                                        helperText={errors.phoneNumber?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        id="address"
                                        inputProps={{
                                            style: {
                                                height: "50px",
                                            },
                                        }}
                                        {...register("address")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        name="postalCode"
                                        id="postalCode"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        id="city"
                                        {...register("city")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Province"
                                        name="province"
                                        id="province"
                                        {...register("province")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        id="country"
                                        {...register("country")}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="flex-end">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="large"
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
        </>
    )
}
