import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ViewMedicalDetailsVetHome() {
    const theme = createTheme();
    const navigate = useNavigate();

    const style = {
        paperStyle: {
            boxShadow:
                "0px 1px 1px -2px #d6d2d2,0px 1px 1px 0px #d6d2d2,0px 1px 1px 1px #d6d2d2"
        },
        blueButton: {
            backgroundColor: '#1e69ba',
            color: 'white'
        }
    }

    const petMedicalRecords = [
        {
            petType: "Dog",
            breed: "Labrador",
            certificateNumber: "5002365330",
            dateOfDiagnosis: "2023-01-24",
            diagnosis: "Fever",
            medicalPrescriptions: "None",
            petVaccines: "Rabies",
            name: "John",
            email: "js@gmail.com",
            phoneNumber: "7829963232",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        },
        {
            petType: "Dog",
            breed: "Husky",
            certificateNumber: "5522001236",
            dateOfDiagnosis: "2023-01-24",
            diagnosis: "Constipation",
            medicalPrescriptions: "None",
            petVaccines: "None",
            name: "Peter Hidge",
            email: "peterh19@gmail.com",
            phoneNumber: "7826332162",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        },
        {
            petType: "Dog",
            breed: "Golden Retreiver",
            certificateNumber: "5525201236",
            dateOfDiagnosis: "2023-01-24",
            diagnosis: "Constipation",
            medicalPrescriptions: "None",
            petVaccines: "None",
            name: "Richard Hogg",
            email: "rg522@gmail.com",
            phoneNumber: "7826332162",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        },
        {
            petType: "Cat",
            breed: "British Shorthair",
            certificateNumber: "5536622012",
            dateOfDiagnosis: "2023-01-24",
            diagnosis: "Constipation",
            medicalPrescriptions: "None",
            petVaccines: "None",
            name: "Sarah Moore",
            email: "smsm76@gmail.com",
            phoneNumber: "7826332162",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        },
        {
            petType: "Dog",
            breed: "German Shephard",
            certificateNumber: "5205203365",
            dateOfDiagnosis: "2023-01-24",
            diagnosis: "Sickness",
            medicalPrescriptions: "None",
            petVaccines: "None",
            name: "Chloe Peter",
            email: "chloeishere@gmail.com",
            phoneNumber: "7826332162",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        },
        {
            petType: "Cat",
            breed: "Ragdoll",
            certificateNumber: "5503362210",
            dateOfDiagnosis: "2023-01-25",
            diagnosis: "Loose Body",
            medicalPrescriptions: "None",
            petVaccines: "None",
            name: "Dr. Adam Tyler",
            email: "atyler@gmail.com",
            phoneNumber: "7826332162",
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: ""
        }
    ]

    const [searchInput, setSearchInput] = useState("");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const filteredPetRecord = petMedicalRecords.filter((record) => {
        if (searchInput.length > 0) {
            return record.certificateNumber.startsWith(searchInput);
        }
        else {
            return record;
        }
    })

    const handleDetailsClick = (element) => {
        const certificateNumber = element.record.certificateNumber
        navigate('/viewdetails/' + certificateNumber, { state: element.record })
    }

    const handleUpdateClick = (element) => {
        const certificateNumber = element.record.certificateNumber
        navigate('/update_medical_record/' + certificateNumber, { state: element.record })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                            <Typography component="h1" variant="h4" align="center">
                                Pet Medical Records
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='number'
                                placeholder="e.g. 5002365330"
                                autoFocus
                                sx={{ width: { md: '80%' }, ml: { xs: 1 } }}
                                onChange={handleSearchChange}
                                value={searchInput}
                                label="Search Certificate Number"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Box sx={{ mt: 3 }}>
                        <React.Fragment>
                            <Stack container spacing={2}>
                                {filteredPetRecord.map(function (record, index) {
                                    return (
                                        <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                                            <Paper style={style.paperStyle}>
                                                <Grid container spacing={3} key={index}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Item >Owner Name: {record.name}</Item>
                                                        <Item >Pet Certificate Number: {record.certificateNumber}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Item >Pet Type: {record.petType}</Item>
                                                        <Item >Pet Breed: {record.breed}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                        <Button
                                                            onClick={() => handleUpdateClick({ record })}
                                                            size="medium"
                                                            variant="outlined"
                                                            sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDetailsClick({ record })}
                                                            style={style.blueButton}
                                                            size="medium"
                                                            variant="outlined"
                                                            sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                                        >
                                                            Details
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </React.Fragment>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
