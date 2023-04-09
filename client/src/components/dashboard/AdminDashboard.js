/**
 * @author Shivangkumar Gandhi
 **/

import Image1 from "../../assets/images/Vetimg/Image1.jpg";
import Image3 from "../../assets/images/Vetimg/Image3.jpg";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../common/AdminNavbar";
import AdminSidebar from "../common/AdminSidebar";

export default function AdminDashboard() {

    const navigate = useNavigate();
    const theme = createTheme();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = () => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            navigate('/adminlogin')
        }
        else {
            const userType = userData.userType;
            if (userType !== null) {
                if (userType === 'petowner' && userType === 'vets') {
                    navigate('/adminlogin')
                }
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AdminNavbar />
                <AdminSidebar />
                <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                    <Paper sx={{ mt: { xs: 6, md: 10 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} sx={{ margin: 'auto' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Manage Vets
                                </Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={Image1}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Grid container justify="space-between">
                                            <Grid item xs={12}>
                                                <Typography gutterBottom
                                                    variant="h5"
                                                    sx={{ textAlign: 'left' }}
                                                    inline>
                                                    Manage Pending Vet Profiles
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.secondary">
                                            Approve or Reject Pending Vet Profiles
                                        </Typography>
                                        <hr />
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Button
                                                        onClick={() => {
                                                            navigate('/pending_vets')
                                                        }}
                                                        size="medium"
                                                        variant="outlined"
                                                        color="inherit"
                                                        sx={{
                                                            mt: 1,
                                                            color: 'green'
                                                        }}
                                                    >
                                                        View Vets
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={Image3}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Grid container justify="space-between">
                                            <Grid item xs={12}>
                                                <Typography gutterBottom
                                                    variant="h5"
                                                    sx={{ textAlign: 'left' }}
                                                    inline>
                                                    Manage Existing Vet Profiles
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.secondary">
                                            Delete Vet Profiles
                                        </Typography>
                                        <hr />
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Button
                                                        onClick={() => {
                                                            navigate('/approved_vets')
                                                        }}
                                                        size="medium"
                                                        variant="outlined"
                                                        color="inherit"
                                                        sx={{
                                                            mt: 1,
                                                            color: 'green'
                                                        }}
                                                    >
                                                        View Vets
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
