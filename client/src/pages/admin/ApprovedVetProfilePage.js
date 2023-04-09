/**
 * @author Shivangkumar Gandhi
 **/

import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AdminNavbar from '../../components/common/AdminNavbar';
import AdminSidebar from '../../components/common/AdminSidebar';
import SuccessAlert from '../../components/pet_owner/SuccessAlert';
const BASE_URL = require("../../../../client/src/utils/url").default;

export default function ApprovedVetProfilePage() {

    const theme = createTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const [profile, setProfile] = useState([])
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ message: message, type: type });
    };

    useEffect(() => {
        setProfile(location.state);
    }, []);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width: '30%',
        height: '30%'
    });

    const handleDeleteClick = (element) => {
        const vetDataToBeDeleted = element.profile

        //Delete profile in db
        const URL = `${BASE_URL}${vetDataToBeDeleted._id}/deleteVetProfile`
        fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setAlert({
                        message: "Vet Profile Deleted!!!",
                        type: "Success",
                    });
                    setTimeout(() => {
                        navigate("/approved_vets");
                        window.location.reload();
                    }, 500);
                } else {
                    showAlert("Error: Unable to delete vet", "Error");
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AdminNavbar />
                <AdminSidebar />
                <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                    <Paper sx={{ mx: { xs: 3, md: 5 }, mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ margin: 'auto' }}>
                                <Img alt="complex" src={profile.photo} sx={{ borderRadius: '2%' }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                                <Grid container spacing={3} sx={{ my: 2 }}>
                                    <Grid item xs={12} >
                                        <Typography variant="h6" textAlign='center' sx={{ fontSize: { xs: 32, md: 40 } }}>
                                            <strong>{profile.first_name} {profile.last_name}</strong>
                                        </Typography>
                                        <br />
                                        <Typography variant="h6">
                                            <strong>Contact Details: </strong>
                                        </Typography>
                                        <br />
                                        <Typography variant="body2">
                                            <strong>Email: </strong>{profile.email}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Phone Number: </strong>+1 {profile.phone}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6">
                                            <strong>Professional Details: </strong>
                                        </Typography>
                                        <br />
                                        <Typography variant="body2">
                                            <strong>Qualification: </strong>{profile.qualification}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Industry Experience: </strong>{profile.experience} years
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6">
                                            <strong>Clinic Details: </strong>
                                        </Typography>
                                        <br />
                                        <Typography variant="body2">
                                            <strong>Clinic License Number: </strong>{profile.clinic_license_number}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Clinic Name: </strong>{profile.clinic_name}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Clinic Address: </strong>{profile.clinic_address}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6">
                                            <strong>Fees: </strong>$ {profile.fees}
                                        </Typography>
                                        <hr />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} sx={{ my: 2 }}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Button
                                                onClick={() => handleDeleteClick({ profile })}
                                                type="submit"
                                                size="large"
                                                variant="light"
                                                style={{ backgroundColor: "red", color: "white" }}
                                                sx={{ mt: { md: 3 }, mb: { md: 2 } }}
                                            >
                                                Delete Profile
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {alert && <SuccessAlert alert={alert} />}
                    </Paper>
                </Container>
            </Box >
        </ThemeProvider >
    )
}
