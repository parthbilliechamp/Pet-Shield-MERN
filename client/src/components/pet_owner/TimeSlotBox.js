import React from 'react'
import '../../assets/styles/pet_owner/TimeSlotBox.css'
import {Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TimeSlotBox ({ time, vet, date, isModified, id }) {
    return (
          <Link to="/book" state={{ vet: vet, time: time, date: date, isModified: isModified, id: id }}>
        <Button className='btn AvailableBox'>
          {time}
        </Button>
        </Link>
      );
  };