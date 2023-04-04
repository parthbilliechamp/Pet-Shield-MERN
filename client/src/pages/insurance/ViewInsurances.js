import {
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardHeader,
  CardContent
} from "@mui/material";
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/lab/Rating";
import PetOwnerSidebar from "../../components/common/PetOwnerSidebar";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";
const BASE_URL = require("../../utils/url").default;

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  flexGrow: 1,
  marginBottom: theme.spacing(2),
  borderRadius: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-5px)",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
  "& .MuiTypography-subtitle1": {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginTop: "30px",
}));

const ViewInsurances = () => {
  const [insurances, setInsurances] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    amount: "none",
    coverageLimit: "none",
    coveragePeriod: "none",
    rating: "none",
  });

  const theme = createTheme();

  const [selectedPet, setSelectedPet] = useState("");
  const [ownerPets, setOwnerPets] = useState([]);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData.userDetails);

  useEffect(() => {

    checkUser();

    Promise.all([
      fetch(`${BASE_URL}/petsByOwnerEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData.userDetails),
      }).then((response) => response.json()),
      fetch(`${BASE_URL}/insurances`).then((response) =>
        response.json()
      ),
    ])
      .then(([petsData, insurancesData]) => {
        setOwnerPets(petsData.pets);
        setInsurances(insurancesData.insurances);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (ownerPets.length > 0) {
      setSelectedPet(ownerPets[0]); // set the default selected value to the first pet in the array
    }
  }, [ownerPets]);

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

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [name]: value,
    }));
  };

  const sortedInsurances = [...insurances].sort((a, b) => {
    const amountOrder =
      sortOrder.amount === "asc"
        ? parseInt(a.amount) - parseInt(b.amount)
        : sortOrder.amount === "desc"
          ? parseInt(b.amount) - parseInt(a.amount)
          : 0;
    const coverageLimitOrder =
      sortOrder.coverageLimit === "asc"
        ? parseInt(a.coverage_limit) - parseInt(b.coverage_limit)
        : sortOrder.coverageLimit === "desc"
          ? parseInt(b.coverage_limit) - parseInt(a.coverage_limit)
          : 0;
    const coveragePeriodOrder =
      sortOrder.coveragePeriod === "asc"
        ? a.coverage_period.localeCompare(b.coverage_period)
        : sortOrder.coveragePeriod === "desc"
          ? b.coverage_period.localeCompare(a.coverage_period)
          : 0;
    const ratingOrder =
      sortOrder.rating === "asc"
        ? parseFloat(a.rating) - parseFloat(b.rating)
        : sortOrder.rating === "desc"
          ? parseFloat(b.rating) - parseFloat(a.rating)
          : 0;

    return (
      amountOrder || coverageLimitOrder || coveragePeriodOrder || ratingOrder
    );
  });



  const handlePetSelection = (event) => {
    const petId = event.target.value;
    const selectedPet = ownerPets.find((pet) => pet._id === petId);
    setSelectedPet(selectedPet);

  };

  const purchasedInsurance = (insurance) => {
    console.log(insurance);
    const data = Object.assign(selectedPet, { insurance: insurance });
    console.log("Purchased insurance ID:", insurance._id);
    navigate("/insurance/" + insurance._id, { state: data });
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Box display="flex" justifyContent="center" marginBottom={2}> */}
        <CssBaseline />
        <PetOwnerNavbar />
        <PetOwnerSidebar />
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
          <Paper sx={{ mt: { xs: 6, md: 6 }, p: { xs: 2, md: 3 } }}>
            <FormControl variant="outlined" margin="normal" sx={{ marginRight: 5 }}>
              <InputLabel>Select Pet</InputLabel>
              <Select
                label="Select Pet"
                value={selectedPet ? selectedPet._id : ""}
                onChange={handlePetSelection}
              >
                prop here
                {ownerPets.map((pet) => (
                  <MenuItem value={pet._id} key={pet._id}>
                    {pet.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" margin="normal" sx={{ marginRight: 5 }}>
              <InputLabel> Sort by Amount </InputLabel>
              <Select
                label="Sort by Amount"
                name="amount"
                value={sortOrder.amount || null} // Change this line
                onChange={handleSortChange}
              >
                <MenuItem value="none"> Sort by Amount</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" margin="normal" sx={{ marginRight: 5 }}>
              <InputLabel>Sort by Limit</InputLabel>
              <Select
                label="Sort by Limit"
                name="coverageLimit"
                value={sortOrder.coverageLimit}
                onChange={handleSortChange}
              >
                <MenuItem value="none">
                  <em>Sort by Limit</em>
                </MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" margin="normal" sx={{ marginRight: 5 }}>
              <InputLabel>Sort by Period</InputLabel>
              <Select
                label="Sort by Period"
                name="coveragePeriod"
                value={sortOrder.coveragePeriod}
                onChange={handleSortChange}
              >
                <MenuItem value="none">
                  <em>Sort by Period</em>
                </MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" margin="normal">
              <InputLabel>Sort by Rating</InputLabel>
              <Select
                label="Sort by Rating"
                name="rating"
                value={sortOrder.rating}
                onChange={handleSortChange}
              >
                <MenuItem value="none">
                  <em>Sort by Rating</em>
                </MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            <StyledGrid container spacing={4}>
              {sortedInsurances.map((insurance) => (
                <Grid item xs={12} md={6} lg={4} key={insurance._id}>
                  <StyledCard>
                    <CardHeader title={insurance.insurance_name} />
                    <StyledCardContent>
                      <Typography variant="subtitle1" color="primary">
                        ${insurance.amount}
                      </Typography>
                      <Typography variant="body2">
                        Coverage Limit: ${insurance.coverage_limit}
                      </Typography>
                      <Typography variant="body2">
                        Coverage Period: {insurance.coverage_period}
                      </Typography>
                      <Typography variant="body2">
                        Provider: {insurance.insurance_provider}
                      </Typography>

                      <Rating
                        name="insurance-rating"
                        value={insurance.rating}
                        precision={0.5}
                        readOnly
                      />
                    </StyledCardContent>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => purchasedInsurance(insurance)}
                    // disabled={buyNowDisabled}
                    >
                      Buy Now
                    </StyledButton>
                  </StyledCard>
                </Grid>
              ))}
            </StyledGrid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ViewInsurances;
