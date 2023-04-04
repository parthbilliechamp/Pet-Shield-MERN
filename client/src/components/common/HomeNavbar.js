/**
 * @author Shivangkumar Gandhi
 **/

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';


export default function HomeNavbar() {

    const navigate = useNavigate();

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
                <Link href="/login" style={{ fontSize: 14, textDecoration: 'none' }} color={"rgb(207, 172, 191)"} sx={{ marginLeft: 'auto' }}> Login</Link>
                <Button
                    size="small"
                    aria-label="account of current user"
                    color="inherit"
                    variant="outlined"
                    sx={{
                        color: '#1e69ba',
                        mr: { xs: 2, md: 9 },
                        ml: { xs: 1, md: 2 }
                    }}
                    onClick={() => { navigate('/registration') }}
                >
                    Sign-up
                </Button>
            </Toolbar>
        </AppBar>
    )
}
