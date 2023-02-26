import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';


export default function HomeNavbar() {
    return (
        <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                position: 'relative',
                borderBottom: (t) => `2px solid ${t.palette.divider}`,
            }}
        >
            <Toolbar sx={{ ml: { xs: 3, md: 7 } }}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        color: 'rgb(207, 172, 191)',
                        fontWeight: 'bold'
                    }}
                >
                    pet
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        color: '#1e69ba',
                        fontWeight: 'bold'
                    }}
                >
                    Shield
                </Typography>
                <IconButton
                    size="small"
                    aria-label="account of current user"
                    color="inherit"
                    sx={{
                        color: '#1e69ba',
                        marginLeft: 'auto',
                        mr: { xs: 3, md: 9 }
                    }}
                >
                    Login/Sign-up
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
