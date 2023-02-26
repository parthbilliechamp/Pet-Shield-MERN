import React from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function Success() {

    const theme = createTheme();

    const style = {
        text: {
            color: 'green'
        },
        container: {
            border: '2px solid green',
            borderRadius: `10px`
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <React.Fragment>
                    <br />
                    <Typography component="h1" variant="h4" align="center">
                        Confirmation
                    </Typography>
                    <br />
                    <hr />
                    <br />
                    <Container sx={style.container}>
                        <br />
                        <Typography variant="h4" gutterBottom sx={style.text} align="center">
                            SUCCESS!!
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={style.text} align="center">
                            Medical Record have been updated...
                        </Typography>
                        <br />
                    </Container>
                </React.Fragment>
            </Container>
        </ThemeProvider>
    )
}
