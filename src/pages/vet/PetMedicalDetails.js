import React from 'react'
import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
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
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                            <Typography component="h1" variant="h4" align="center">
                                Pet Medical Record
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                onClick={() => downloadFileDocument("sectionToDownload", location.state.certificateNumber + "MedicalRecords")}
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
                                <TableCell>{location.state.petType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Breed: </TableCell>
                                <TableCell>{location.state.breed}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Certificate Number: </TableCell>
                                <TableCell>{location.state.certificateNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date of Diagnosis: </TableCell>
                                <TableCell>{location.state.dateOfDiagnosis}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis: </TableCell>
                                <TableCell>{location.state.diagnosis}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Medical Prescriptions: </TableCell>
                                <TableCell>{location.state.medicalPrescriptions}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Vaccines: </TableCell>
                                <TableCell>{location.state.petVaccines}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Owner Name: </TableCell>
                                <TableCell>{location.state.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Owner Email: </TableCell>
                                <TableCell>{location.state.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Owner Contact: </TableCell>
                                <TableCell>{location.state.phoneNumber}</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
