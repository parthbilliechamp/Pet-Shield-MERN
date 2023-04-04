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
import AdminNavbar from '../../components/common/AdminNavbar';
import AdminSidebar from '../../components/common/AdminSidebar';

const BASE_URL = require("../../../../client/src/utils/url").default;


export default function PendingVetList() {

    const theme = createTheme();
    const navigate = useNavigate();

    const [pendingVetRecords, setPendingVetRecords] = useState([]);
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

        getPendingVets();
    }, []);

    const checkUser = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            navigate('/adminlogin')
        }
        else {
            const userType = userData.userType;
            if (userType === null) {
                if (userType === 'petowner' && userType === 'vets') {
                    navigate('/adminlogin')
                }
            }
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const filterVetRecord = pendingVetRecords.filter((record) => {
        if (searchInput.length > 0) {
            return record.email.startsWith(searchInput);
        }
        else {
            return record;
        }
    })

    const handleDetailsClick = (element) => {
        const _id = element.record._id;
        navigate('/pending_vets/' + _id, { state: element.record })
    }

    const getPendingVets = () => {

        const URL = `${BASE_URL}vetsByPendingRequests`
        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPendingVetRecords(data.pendingVets)
            })
            .catch((error) => console.log(error))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AdminNavbar />
                <AdminSidebar />
                <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                    <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Pending Vet Records
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='email'
                                    placeholder="e.g. skype2003@gmail.com"
                                    autoFocus
                                    sx={{ width: { md: '80%' } }}
                                    onChange={handleSearchChange}
                                    value={searchInput}
                                    label="Search Vet Email"
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
                        </Box>
                        <React.Fragment>
                            <Stack container spacing={2}>
                                {filterVetRecord.map(function (record, index) {
                                    return (
                                        <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                                            <Paper style={style.paperStyle}>
                                                <Grid container spacing={3} key={index}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Item >Vet Name: {record.first_name} {record.last_name}</Item>
                                                        <Item >Email Id: {record.email}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                                                        <Item >License Number: {record.license_number}</Item>
                                                        <Item >Clinic License Number: {record.clinic_license_number}</Item>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
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
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </React.Fragment>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

