import React from "react";
import ServiceCards from "../common/ServiceCards";
import Image1 from "../../assets/images/Vetimg/Image1.jpg";
import Image2 from "../../assets/images/Vetimg/Image2.jpg";
import Image3 from "../../assets/images/Vetimg/Image3.jpg";
import Image5 from "../../assets/images/Vetimg/Image5.jpg";
import Image7 from "../../assets/images/Vetimg/Image7.jpg";
import VetNavBar from "../common/VetNavbar";

export default function VetDashboard() {
  const services = [
    {
      name: "Add Medical Record",
      image: Image1,
      description: "Add medical record for a new pet that took consultation.",
      link: "/add_medical_record",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "View Medical History",
      image: Image2,
      description:
        "View and Manage medical history of the pet that came for consultation.",
      link: "/medical_records",
      feature: "",
      pagelink: "",
    },
    {
      name: "View My Feedback",
      image: Image5,
      description: "View ratings and feedbacks given by the clients.",
      link: "/comingsoon",
      feature: "",
      pagelink: "",
    },
    {
      name: "View Appointments",
      image: Image7,
      description: "View your upcoming appointments",
      link: "/view_appointment_cal",
      feature: "view details",
      pagelink: "/view_appointment_page",
    },
    {
      name: "Cancel Appointment",
      image: Image7,
      description: "Cancel your appointment for the pet owners",
      link: "/cancel_appointment_cal",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "Add Availability",
      image: Image3,
      description: "Add  your availability for pet owners ",
      link: "/add_availability",
      feature: "",
      pagelink: "",
    },
  ];

  return (
    <>
    <VetNavBar/>
    <ServiceCards services={services} />
    </>
  )
}
