/**
 * @author Shivangkumar Gandhi
 **/

import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Paper } from '@mui/material'

export default function ReviewsCarousal() {

    var items = [
        {
            name: "Paul Jenkins",
            review: "Probably the most random thing you have ever seen! My pets are happy now after the use of this website"
        },
        {
            name: "Ava Martins",
            review: "Best Service. I got from the vets that I had been to. The website has a professional approach."
        }
    ]

    function Item(props) {
        return (
            <Grid container spacing={1}
                sx={{
                    mt: 0
                }}>
                <Grid xs={12} sm={12} justify="space-between"
                    sx={{
                        margin: "auto",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <Paper sx={{
                        my: { md: 6 }, p: { xs: 3, md: 3 },
                        width: { md: '100%' },
                        height: { md: '100%' },
                        boxShadow: 0,
                        bgcolor: "#A8DFE4",
                        margin: "auto",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        <Typography align="center" variant="h2">{props.item.name}</Typography>
                        <br />
                        <Typography style={{ wordWrap: "break-word" }} align="center" variant='h5'>"{props.item.review}"</Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        <Carousel animation='slide'>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}
