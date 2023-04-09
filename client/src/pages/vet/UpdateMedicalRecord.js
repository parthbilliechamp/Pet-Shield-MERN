/**
 * @author Shivangkumar Gandhi
 **/

import React, { useState } from 'react'
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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VetNavBar from '../../components/common/VetNavbar';
import SuccessAlert from "../../components/pet_owner/SuccessAlert";
import VetSidebar from '../../components/common/VetSidebar';
import dateFormat from 'dateformat';

const BASE_URL = require("../../utils/url.js").default;

export default function UpdateMedicalRecord() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const theme = createTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const petData = location.state;

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ message: message, type: type });
    };

    const onSubmit = (medicalData) => {
        const todaysDate = dateFormat(new Date(), "yyyy-mm-dd")
        medicalData = Object.assign(medicalData, { "date_of_diagnosis": todaysDate })
        const data = Object.assign(petData, { "medical_record": medicalData })
        const URL = `${BASE_URL}${location.state._id}/addPetMedicalDetails`
        fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.status === 200) {
                    setAlert({
                        message: "Medical Records Updated!!",
                        type: "Success",
                    });
                    setTimeout(() => {
                        navigate('/medical_records', { state: { responseStatus: { "message": "Medical Records Updated!" } } })
                        window.location.reload();
                    }, 500);
                } else {
                    showAlert("Error: Unable to add medical record", "Error");
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <VetNavBar />
                <VetSidebar />
                <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
                    <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Update Medical Records
                        </Typography>
                        <br />
                        <hr />
                        {alert && <SuccessAlert alert={alert} />}
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            <React.Fragment>
                                <Typography align='center' variant="h6" gutterBottom>
                                    Pet Number: {location.state.certificate_number}
                                </Typography>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            defaultValue={location.state.medical_record.diagnosis}
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
                                            defaultValue={location.state.medical_record.medical_prescriptions}
                                            label="Medical Prescriptions"
                                            name="medical_prescriptions"
                                            id="medical_prescriptions"
                                            inputProps={{
                                                style: {
                                                    height: "50px",
                                                },
                                            }}
                                            {...register("medical_prescriptions")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            defaultValue={location.state.medical_record.pet_vaccines}
                                            label="Pet Vaccines"
                                            name="pet_vaccines"
                                            id="pet_vaccines"
                                            inputProps={{
                                                style: {
                                                    height: "50px",
                                                },
                                            }}
                                            {...register("pet_vaccines")}
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
                                                Update
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
