import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import RegistrationStats from "./RegistrationStats";
import PieChart from "./PieChart";
import petImage from "../../assets/images/pet 3.jpeg";
import userImage from "../../assets/images/user3.svg";
import Grid from "@mui/material/Grid";
const BASE_URL = require("../../utils/url").default;

export default function Analytics() {
  const [petInfo, setpetInfo] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}/pets`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const petData = data.pets.map((pet) => {
          const ownerName =
            pet.pet_owner.first_name + " " + pet.pet_owner.last_name;
          return {
            id: pet._id,
            petName: pet.name,
            ownerName: ownerName,
            ailmentName: pet.medical_record?.diagnosis || "",
            registrationDate: pet.medical_record?.date_of_diagnosis
              ? new Date(pet.medical_record.date_of_diagnosis)
              : null,
          };
        });
        console.log(petData);
        setpetInfo(petData);
      })
      .catch((error) => console.log(error));
  }, []);

  // declaring state and giving the inital value
  // const [petInfo, setPetInfo] = useState(DUMMY_DATA);
  // Right now I am not inserting a new data but hardcoring in the app.js file
  // that is why setPetInfo is not used anywhere because we are working on inital value of state

  const [buttonClicked, setButtonClicked] = useState("notClicked");

  const buttonOneClicked = (event) => {
    console.log("first clicked");
    setButtonClicked("button1");
  };

  const buttonTwoClicked = (event) => {
    console.log("2nd click");
    setButtonClicked("button2");
  };

  return (
    <div>
    {buttonClicked === "notClicked" && (
      <Grid
        container
        spacing={10}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "40px", textAlign: "center" }} // added textAlign property
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 450, // adjusted maxWidth
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: 15,
              width: "100%",
            }}
          >
            <CardMedia
              sx={{
                height: 300,
                width: "100%",
                objectFit: "cover",
              }}
              image={petImage}
              title="disease tracker"
            />
  
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: "180px",
                  height: "50px",
                  fontSize: 16,
                  borderRadius: 15,
                }}
                onClick={buttonOneClicked}
              >
                Disease Tracker
              </Button>
            </CardActions>
          </Card>
        </Grid>
  
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              maxWidth: 450, // adjusted maxWidth
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: 15,
              width: "100%",
            }}
          >
            <CardMedia
              sx={{ height: 300, width: "100%" }}
              image={userImage}
              title="pet registrations"
            />
  
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: "180px",
                  height: "50px",
                  fontSize: 16,
                  borderRadius: 15,
                }}
                onClick={buttonTwoClicked}
              >
                User Registrations
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )}
       {buttonClicked === "button1" && <RegistrationStats item={petInfo} />}
       {buttonClicked === "button2" && <PieChart item={petInfo} />}
  </div>
  
  );
}
