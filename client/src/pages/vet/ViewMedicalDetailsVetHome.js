/**
 * @author Shivangkumar Gandhi
 **/

import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import VetNavBar from '../../components/common/VetNavbar';
import { useForm } from 'react-hook-form';
import VetSidebar from '../../components/common/VetSidebar';

const BASE_URL = require("../../utils/url.js").default;

export default function ViewMedicalDetailsVetHome() {
    const theme = createTheme();
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            navigate('/login')
        }
        else {
            const userType = userData.userType;
            if (userType !== 'vets') {
                navigate('/login')
            }
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [petMedicalRecords, setPetMedicalRecords] = useState([]);

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

    const handleAdditionClick = (element) => {
        const certificate_number = element.record.certificate_number
        navigate('/medical_records/add_medical_record/' + certificate_number, { state: element.record })
    }

    const handleUpdateClick = (element) => {
        const certificate_number = element.record.certificate_number
        navigate('/medical_records/update_medical_record/' + certificate_number, { state: element.record })
    }

    const handleDetailsClick = (element) => {
        const certificate_number = element.record.certificate_number
        navigate('/medical_records/viewdetails/' + certificate_number, { state: element.record })
    }

    const onSubmit = (data) => {
        const URL = `${BASE_URL}petsByOwnerEmail`
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                setPetMedicalRecords(data.pets)
            })
            .catch((error) => console.log(error))
    }

    return (
        // Add themeprovider, box and CssBaseline to containerize the page
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <VetNavBar />
                <VetSidebar />
                {/* Add this to keep space between nav and sidebar */}
                <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                    <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} sx={{ margin: 'auto' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Pet Medical Records
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <TextField
                                                placeholder="e.g. tom.blundell@gmail.com"
                                                fullWidth
                                                label="Pet Owner Email Id"
                                                name="email"
                                                id="email"
                                                {...register("email", {
                                                    required: "Please enter your email",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message: "Invalid Email Address"
                                                    }
                                                })}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Button
                                                style={style.blueButton}
                                                type="submit"
                                                fullWidth
                                                size="large"
                                                variant="outlined"
                                                sx={{ mb: 1, height: '100%' }}
                                                endIcon={<SearchIcon />}
                                            >
                                                Search
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <br />
                        <Box sx={{ mt: 3 }}>
                            <React.Fragment>
                                <Stack container spacing={2}>
                                    {petMedicalRecords.length === 0 &&
                                        <Paper style={style.paperStyle}>
                                            <Typography variant="h5" align="center"
                                                sx={{
                                                    padding: 5,
                                                    color: "gray"
                                                }}>
                                                No Records Found
                                            </Typography>
                                        </Paper>
                                    }
                                    {petMedicalRecords.map(function (record, index) {
                                        return (
                                            <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                                                <Paper style={style.paperStyle}>
                                                    <Grid container spacing={3} key={index}>
                                                        <Grid item xs={12} sm={4}>
                                                            <Item >Owner Name: {record.pet_owner.first_name + ' ' + record.pet_owner.last_name}</Item>
                                                            <Item >Pet Certificate Number: {record.certificate_number}</Item>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Item >Pet Type: {record.type}</Item>
                                                            <Item >Pet Breed: {record.breed}</Item>
                                                        </Grid>
                                                        {!record.medical_record &&
                                                            <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                                <Box textAlign='center'>
                                                                    <Button
                                                                        onClick={() => handleAdditionClick({ record })}
                                                                        size="medium"
                                                                        variant="outlined"
                                                                        sx={{ mt: 1, mb: 1, mr: 1, ml: 1 }}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </Box>
                                                            </Grid>
                                                        }
                                                        {record.medical_record &&
                                                            <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                                <Box textAlign='center'>
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
                                                                </Box>
                                                            </Grid>
                                                        }
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
            </Box>
        </ThemeProvider>
    )
}
