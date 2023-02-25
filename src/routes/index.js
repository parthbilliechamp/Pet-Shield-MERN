import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetOwnerDashboard from "../components/dashboard/PetOwnerDashboard"
import ClinicAndVetDetails from "../pages/pet_owner/ClinicAndVetDetails"
import TimeSlot from "../components/pet_owner/TimeSlot"
import Appointment from "../pages/pet_owner/Appointment"
import VetList from "../pages/pet_owner/DisplayVetList"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PetOwnerDashboard />} />
      <Route path="/view_vets" element={<VetList/>} />
      <Route path="/book" element={<ClinicAndVetDetails/>} />
      <Route path="/timeslot" element={<TimeSlot />} />
      <Route path="/appointments" element={<Appointment/>} />
      <Route path="/pet_owner_dashboard" element={<PetOwnerDashboard />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;