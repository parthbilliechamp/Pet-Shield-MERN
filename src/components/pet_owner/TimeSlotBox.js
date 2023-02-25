import React from 'react'
import '../../assets/styles/pet_owner/TimeSlotBox.css'
import {Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TimeSlotBox ({ time }) {
    return (
        <Link to="/book">
        <Button className='btn AvailableBox'>
          {time}
        </Button>
        </Link>
      );
  };