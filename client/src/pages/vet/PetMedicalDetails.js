/**
 * @author Shivangkumar Gandhi
 **/

import React from 'react'
import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import VetNavBar from '../../components/common/VetNavbar';
import VetSidebar from '../../components/common/VetSidebar';


export default function PetMedicalDetails() {

    const theme = createTheme();
    const location = useLocation();

    const downloadFileDocument = (rootElementId, downloadFileName) => {
        const input = document.getElementById(rootElementId)
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("img/png")
            const pdf = new jsPDF("p", "pt", "a3")
            pdf.addImage(imgData, "JPEG", 0, 0)
            pdf.save(`${downloadFileName}`)
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <VetNavBar />
                <VetSidebar />
                <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
                    <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Pet Medical Record
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    onClick={() => downloadFileDocument("sectionToDownload", location.state.certificate_number + "MedicalRecords")}
                                    type="submit"
                                    size="large"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, color: 'black', border: '1px solid' }}
                                >
                                    Download
                                </Button>
                            </Grid>
                        </Grid>
                        <TableContainer id="sectionToDownload" component={Paper} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Pet Type: </TableCell>
                                    <TableCell>{location.state.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Breed: </TableCell>
                                    <TableCell>{location.state.breed}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Certificate Number: </TableCell>
                                    <TableCell>{location.state.certificate_number}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date of Diagnosis: </TableCell>
                                    <TableCell>{location.state.medical_record.date_of_diagnosis}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis: </TableCell>
                                    <TableCell>{location.state.medical_record.diagnosis}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Medical Prescriptions: </TableCell>
                                    <TableCell>{location.state.medical_record.medical_prescriptions}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Vaccines: </TableCell>
                                    <TableCell>{location.state.medical_record.pet_vaccines}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Owner Name: </TableCell>
                                    <TableCell>{location.state.pet_owner.first_name} {location.state.pet_owner.last_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Owner Email: </TableCell>
                                    <TableCell>{location.state.pet_owner.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Owner Contact: </TableCell>
                                    <TableCell>(+1) {location.state.pet_owner.phone}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
