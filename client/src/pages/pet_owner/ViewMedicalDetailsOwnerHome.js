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
import { InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetOwnerNavbar from '../../components/common/PetOwnerNavbar';
import PetOwnerSidebar from '../../components/common/PetOwnerSidebar';

const BASE_URL = require("../../../../client/src/utils/url").default;


export default function ViewMedicalDetailsOwnerHome() {

    const theme = createTheme();
    const navigate = useNavigate();

    const [petMedicalRecords, setPetMedicalRecords] = useState([]);
    const [searchInput, setSearchInput] = useState("");

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

    useEffect(() => {
        //To check authorize valid loggedin user to this page
        checkUser();

        getPets();
    }, []);

    const checkUser = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            navigate('/login')
        }
        else {
            const userType = userData.userType;
            if (userType !== 'petowner') {
                navigate('/login')
            }
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const filteredPetRecord = petMedicalRecords.filter((record) => {
        if (searchInput.length > 0) {
            return record.certificate_number.toString().startsWith(searchInput);
        }
        else {
            return record;
        }
    })

    const handleDetailsClick = (element) => {
        const certificate_number = element.record.certificate_number
        navigate('/mypets/medical_records/viewdetails/' + certificate_number, { state: element.record })
    }

    const getPets = () => {

        //TODO: Data to be fetched from session
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            navigate('/login')
        }
        else {
            const petOwner = userData.userDetails;

            const URL = `${BASE_URL}petsByOwnerEmail`
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(petOwner)
            })
                .then((response) => response.json())
                .then((data) => {
                    setPetMedicalRecords(data.pets)
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <PetOwnerNavbar />
                <PetOwnerSidebar />
                <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
                    <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    My Pet Medical Records
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='number'
                                    placeholder="e.g. 5002365330"
                                    autoFocus
                                    sx={{ width: { md: '80%' } }}
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
                                                            <Item >Pet Type: {record.type}</Item>
                                                            <Item >Pet Certificate Number: {record.certificate_number}</Item>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                            <Item >Pet Breed: {record.breed}</Item>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                            {record.medical_record &&
                                                                <Box textAlign='center'>
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
                                                            }
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
            </Box>
        </ThemeProvider>
    )
}
