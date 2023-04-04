import React, { useEffect } from "react";
import StarRating from "../../components/pet_owner/Star";
import "../../assets/styles/pet_owner/DisplayVetList.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import PetOwnerSidebar from '../../components/common/PetOwnerSidebar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";

const BASE_URL = require("../../utils/url").default;

function VetList() {
  const url = `${BASE_URL}vets`;
  const [vets, setVets] = useState([]);
  const [renderingVetList, setRenderingVetList] = useState(vets);
  const navigate = useNavigate();

  useEffect(() => {

    //To check authorize valid loggedin user to this page
    checkUser();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVets(data.vets);
        setRenderingVetList(data.vets);
      })
      .catch((error) => console.log(error));
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

  const handleOnClick = (vet) => {
    console.log("vet is : ");
    console.log(vet);
    navigate("/timeslot", {
      state: { vet: vet },
    });
  };

  const handleSort = (e) => {
    switch (e.target.value) {
      case "Name":
        setRenderingVetList(
          [...renderingVetList].sort((a, b) =>
            a.first_name.localeCompare(b.first_name)
          )
        );
        break;
      case "Rating":
        setRenderingVetList(
          [...renderingVetList].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setRenderingVetList(vets);
    }
  };

  const theme = createTheme();

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setRenderingVetList(vets);
    } else {
      const filteredVets = vets.filter((vet) =>
        (
          vet.first_name.toLowerCase() +
          " " +
          vet.last_name.toLowerCase()
        ).includes(e.target.value.toLowerCase())
      );
      setRenderingVetList(filteredVets);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PetOwnerNavbar />
        <PetOwnerSidebar />
        {/* Add this to keep space between nav and sidebar */}
        <Container
          component="main"
          maxWidth="lg"
          sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}
        >
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3} sx={{ margin: { md: 'auto' } }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="search"
                  autoFocus
                  fullWidth
                  onChange={handleSearch}
                  label="Search Name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <TextField
                  select
                  label="sortby"
                  name="sortby"
                  id="sortby"
                  defaultValue="Name"
                  sx={{ width: '50%' }}
                  onChange={handleSort}
                >
                  <MenuItem value="Name">Name</MenuItem>
                  <MenuItem value="Rating">Rating</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <br />
            <Box sx={{ mt: 3 }}>
              <React.Fragment>
                <Stack container spacing={2}>
                  {renderingVetList.map((vet, index) => (
                    <Stack item xs={12} sm={12} sx={{ borderRadius: '10px' }}>
                      <Paper>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={4} md={4}>
                            <Grid item xs={12}
                              sx={{
                                my: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              <div className="img-holder">
                                <img
                                  src={vet.photo}
                                  alt={vet.first_name}
                                  className="circular-image"
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12}
                              sx={{
                                my: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                              }}>
                              <Typography variant="h5">{vet.first_name} {vet.last_name}</Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4}>
                            <Item sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              <strong>Address: </strong> {vet.clinic_address}
                            </Item>
                            <Item sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              <strong>Contact: </strong> {vet.phone}
                            </Item>
                            <Item sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              <strong>Fees : </strong> CAD {vet.fees}
                            </Item>
                            <Item sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              <StarRating rating={vet.rating} />
                            </Item>
                            <Item sx={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              <a style={{ display: "inline-block" }} href="/comingsoon">
                                {vet.feedback} Feedbacks
                              </a>
                            </Item>
                          </Grid>
                          <Grid item xs={12} sm={4} md={4} sx={{ margin: 'auto' }}>
                            <Box textAlign='center'>
                              <Button
                                variant="light"
                                style={{ backgroundColor: "#1e69ba", color: "white" }}
                                onClick={() => handleOnClick(vet)}
                                size="medium"
                                sx={{ mt: 1, mb: 2, mr: 1, ml: 1 }}
                              >
                                Book Appointment
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Stack>
                  ))}
                </Stack>
              </React.Fragment>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default VetList;
