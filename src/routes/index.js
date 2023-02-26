import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetOwnerDashboard from "../components/dashboard/PetOwnerDashboard"
import ClinicAndVetDetails from "../pages/pet_owner/ClinicAndVetDetails"
import TimeSlot from "../components/pet_owner/TimeSlot"
import Appointment from "../pages/pet_owner/Appointment"
import VetList from "../pages/pet_owner/DisplayVetList"
import HomePage from "../pages/HomePage";
import ViewMedicalDetailsOwnerHome from "../pages/pet_owner/ViewMedicalDetailsOwnerHome";
import OwnerPetMedicalDetails from "../pages/pet_owner/OwnerPetMedicalDetails";
import VetDashboard from "../components/dashboard/VetDashboard";
import AddMedicalRecord from "../pages/vet/AddMedicalRecord";
import Success from "../pages/vet/Success";
import UpdateMedicalRecord from "../pages/vet/UpdateMedicalRecord";
import ViewMedicalDetailsVetHome from "../pages/vet/ViewMedicalDetailsVetHome";
import PetMedicalDetails from "../pages/vet/PetMedicalDetails";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Pet Owner Dashboard */}
        <Route path="/pet_owner_dashboard" element={<PetOwnerDashboard />} />
        <Route path="/view_vets" element={<VetList />} />
        <Route path="/book" element={<ClinicAndVetDetails />} />
        <Route path="/timeslot" element={<TimeSlot />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/mypets/medical_records" element={<ViewMedicalDetailsOwnerHome />} />
        <Route path="/myPets/viewdetails/:id" element={<OwnerPetMedicalDetails />} />

        {/* Vet Dashboard */}
        <Route path="/vet_dashboard" element={<VetDashboard />} />
        <Route path="/add_medical_record" element={<AddMedicalRecord />} />
        <Route path="/success" element={<Success />} />
        <Route path="/medical_records" element={<ViewMedicalDetailsVetHome />} />
        <Route path="/viewdetails/:id" element={<PetMedicalDetails />} />
        <Route path="/update_medical_record/:id" element={<UpdateMedicalRecord />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;