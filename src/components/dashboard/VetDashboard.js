import React from "react";
import ServiceCards from "../common/ServiceCards";
import Vet1 from "../../assets/images/Vetimg/Vet1.jpg";
import Vet2 from "../../assets/images/Vetimg/Vet2.jpg";
import Vet3 from "../../assets/images/Vetimg/Vet3.jpg";
import Vet4 from "../../assets/images/Vetimg/Vet4.jpg";

export default function VetDashboard() {
  const services = [
    {
      name: "View Upcoming Bookings.",
      image: Vet1,
      description: "View Upcoming bookings with the clients.",
      link: "/service1",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "Add Medical Record for Pet.",
      image: Vet2,
      description: "Add medical record for a new pet that took consultation.",
      link: "/add_medical_record",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "View Medical History of Pets.",
      image: Vet3,
      description:
        "View and Manage medical history of the pet that came for consultation.",
      link: "/medical_records",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "View My Feedback",
      image: Vet4,
      description: "View ratings and feedbacks given by the clients.",
      link: "/service4",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "View Appointment",
      image: Vet3,
      description: "View your upcoming appointments",
      link: "/view_appointment_cal",
      feature: "view details",
      pagelink: "/view_appointment_page",
    },
    {
      name: "Cancel Appointment",
      image: Vet2,
      description: "Cancel your appointment for the pet owners",
      link: "/cancel_appointment_cal",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
    {
      name: "Add Availability",
      image: Vet1,
      description: "Add  your availability for pet owners ",
      link: "/add_availability",
      feature: "cancel",
      pagelink: "/cancel_appointment_page",
    },
  ];

  return <ServiceCards services={services} />;
}
