import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import RegistrationStats from './RegistrationStats';
import PieChart from './PieChart';
import petImage from '../../assets/images/pet 3.jpeg';
import userImage from '../../assets/images/user3.svg';


// declaring the dummy data which will be used and displayed on the screen
const DUMMY_DATA = [
  {
    id: "p1",
    petName: "Ron",
    ownerName: "Andrea",
    ailmentName: "Anthrax",
    registrationDate: new Date(2020, 7, 14),
  },
  {
    id: "p2",
    petName: "Rosie",
    ownerName: "Allan",
    ailmentName: "Akabane",
    registrationDate: new Date(2020, 2, 12),
  },
  {
    id: "p3",
    petName: "Rocky",
    ownerName: "Wanda",
    ailmentName: "Parvovirus",
    registrationDate: new Date(2020, 2, 28),
  },
  {
    id: "p4",
    petName: "Jackie",
    ownerName: "Helen",
    ailmentName: "Hydatid",
    registrationDate: new Date(2021, 5, 12),
  },

  {
    id: "p5",
    petName: "Jerry",
    ownerName: "Chris",
    ailmentName: "Hydatid",
    registrationDate: new Date(2021, 5, 12),
  },

  {
    id: "p6",
    petName: "Ian",
    ownerName: "Robert",
    ailmentName: "Hydatid",
    registrationDate: new Date(2022, 5, 12),
  },

  {
    id: "p7",
    petName: "Vodka",
    ownerName: "Honey",
    ailmentName: "Akabane",
    registrationDate: new Date(2020, 5, 12),
  },

  {
    id: "p8",
    petName: "Chichi",
    ownerName: "James",
    ailmentName: "Botulism",
    registrationDate: new Date(2021, 2, 28),
  },
  {
    id: "p9",
    petName: "Tom",
    ownerName: "ginger",
    ailmentName: "Botulism",
    registrationDate: new Date(2022, 2, 28),
  },
  {
    id: "p10",
    petName: "Butcher",
    ownerName: "mark",
    ailmentName: "Parvovirus",
    registrationDate: new Date(2021, 7, 28),
  },
  {
    id: "p11",
    petName: "stallone",
    ownerName: "robie",
    ailmentName: "Botulism",
    registrationDate: new Date(2022, 9, 28),
  },
];

export default function Analytics() {

// declaring state and giving the inital value
// const [petInfo, setPetInfo] = useState(DUMMY_DATA);
// Right now I am not inserting a new data but hardcoring in the app.js file 
// that is why setPetInfo is not used anywhere because we are working on inital value of state

  const [buttonClicked, setButtonClicked]= useState('notClicked');

  const buttonOneClicked = (event) => {
    console.log("first clicked");
    setButtonClicked('button1');
  };

  const buttonTwoClicked = (event) => {
    console.log("2nd click");
    setButtonClicked('button2');
  };

  return (
    <div>
      {buttonClicked === 'notClicked' && <div id='analytics' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '150px'}}>
      <Card sx={{ maxWidth: 1200, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' ,borderRadius:15}}>
        <CardMedia
          sx={{ height: 500 }} // increased height to 300
          image={petImage}
          title="disease tracker"
          
          
        />
        <CardContent sx={{ minWidth: 520 }}>
          <Typography gutterBottom variant="h5" component="div">
            Disease Tracker
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            To track the widespread diseases among animals
          </Typography> */}
       
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{width: '180px', height: '50px', fontSize:16 ,borderRadius:15}} onClick={buttonOneClicked}>View Statistics</Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 1000 , marginLeft: '220px' , boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' ,borderRadius:15}}>
        <CardMedia
          sx={{ height: 500 }} // increased height to 300
          image={userImage}
          title="pet registrations"
        />
       
         <CardContent sx={{ minWidth: 520 }} >
          <Typography gutterBottom variant="h5" component="div">
            User Registrations
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Visual represtation of registered user per year in application
          </Typography> */}
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" sx={{width: '180px', height: '50px', fontSize:16 ,borderRadius:15}} onClick={buttonTwoClicked}>View Statistics</Button>
        </CardActions>
      </Card>
    </div>}
    

    {buttonClicked === 'button1' && <RegistrationStats item={DUMMY_DATA} />}
    {buttonClicked === 'button2' && <PieChart item={DUMMY_DATA} />}
        
    </div>
  );
}
