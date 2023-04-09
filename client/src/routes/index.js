/**
 * @author Shivangkumar Gandhi
 **/

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetOwnerDashboard from "../components/dashboard/PetOwnerDashboard";
import ClinicAndVetDetails from "../pages/pet_owner/ClinicAndVetDetails";
import TimeSlot from "../components/pet_owner/TimeSlot";
import Appointment from "../pages/pet_owner/Appointment";
import VetList from "../pages/pet_owner/DisplayVetList";
import HomePage from "../pages/HomePage";
import ViewMedicalDetailsOwnerHome from "../pages/pet_owner/ViewMedicalDetailsOwnerHome";
import OwnerPetMedicalDetails from "../pages/pet_owner/OwnerPetMedicalDetails";
import VetDashboard from "../components/dashboard/VetDashboard";
import AddMedicalRecord from "../pages/vet/AddMedicalRecord";
import UpdateMedicalRecord from "../pages/vet/UpdateMedicalRecord";
import ViewMedicalDetailsVetHome from "../pages/vet/ViewMedicalDetailsVetHome";
import PetMedicalDetails from "../pages/vet/PetMedicalDetails";
import Login from "../pages/Login";
import RegistrationDoctor from "../pages/RegistrationDoctor";
import ForgotPassword from "../pages/ForgotPassword";
import Registration from "../pages/Registration";
import Otp from "../pages/Otp";
import AvailabililtyForm from "../pages/vet/AddAvailability";
import AppointmentCalendar from "../pages/vet/Calendar";
import AppointmentPage from "../pages/vet/AppointmentPage";
import AppointmentDetails from "../pages/vet/AppointmentDetails";
import ComingSoon from "../pages/ComingSoon";
import Analytics from "../pages/analytics/Analytics";
import Payment from "../pages/insurance/Payment";
import ViewInsurances from "../pages/insurance/ViewInsurances";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import PendingVetList from "../pages/admin/PendingVetList";
import PendingVetProfilePage from "../pages/admin/PendingVetProfilePage";
import ApprovedVetList from "../pages/admin/ApprovedVetList";
import ApprovedVetProfilePage from "../pages/admin/ApprovedVetProfilePage";
import AddPets from "../pages/pet_owner/AddPets";
import ViewAllPets from "../pages/pet_owner/ViewAllPets";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* User Management */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/registrationdoctor" element={<RegistrationDoctor />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/otp" element={<Otp />} />

        {/* Pet Owner Dashboard */}
        <Route path="/add-pets" element={<AddPets />} />
        <Route path="/view-pets" element={<ViewAllPets />} />
        <Route path="/pet_owner_dashboard" element={<PetOwnerDashboard />} />
        <Route path="/view_vets" element={<VetList />} />
        <Route path="/book" element={<ClinicAndVetDetails />} />
        <Route path="/timeslot" element={<TimeSlot />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route
          path="/mypets/medical_records"
          element={<ViewMedicalDetailsOwnerHome />}
        />
        <Route
          path="/mypets/medical_records/viewdetails/:id"
          // path="/mypets/medical_records/viewdetails/:id"
          element={<OwnerPetMedicalDetails />}
        />

        {/* Vet Dashboard */}
        <Route path="/vet_dashboard" element={<VetDashboard />} />
        <Route
          path="/medical_records/add_medical_record/:id"
          element={<AddMedicalRecord />}
        />
        <Route
          path="/medical_records"
          element={<ViewMedicalDetailsVetHome />}
        />
        <Route
          path="/medical_records/viewdetails/:id"
          element={<PetMedicalDetails />}
        />
        <Route
          path="/medical_records/update_medical_record/:id"
          // path="/medical_records/update_medical_record/:id"
          element={<UpdateMedicalRecord />}
        />
        <Route path="/add_availability" element={<AvailabililtyForm />} />
        <Route
          path="/cancel_appointment_cal"
          element={<AppointmentCalendar />}
        />
        <Route path="/cancel_appointment_page" element={<AppointmentPage />} />
        <Route path="/view_appointment_cal" element={<AppointmentCalendar />} />
        <Route path="/view_appointment_page" element={<AppointmentPage />} />
        <Route path="/appointmentdetails" element={<AppointmentDetails />} />

        <Route path="comingsoon" element={<ComingSoon />} />

        {/* Admin */}
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/pending_vets" element={<PendingVetList />} />
        <Route path="/pending_vets/:id" element={<PendingVetProfilePage />} />
        <Route path="/approved_vets" element={<ApprovedVetList />} />
        <Route path="/approved_vets/:id" element={<ApprovedVetProfilePage />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* insurances */}
        <Route path="/insurances" element={<ViewInsurances />} />
        <Route path="/insurance/:id" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
