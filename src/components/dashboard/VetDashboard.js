import React from "react";
import ServiceCards from "../common/ServiceCards";

export default function VetDashboard() {
  const services = [
    {
      name: "View Upcoming Bookings.",
      image: "https://via.placeholder.com/150",
      description: "View Upcoming bookings with the clients.",
      link: "/service1",
    },
    {
      name: "Add Medical Record for Pet.",
      image: "https://via.placeholder.com/150",
      description:
        "Add medical record for a new pet that took consultation.",
      link: "/add_medical_record",
    },
    {
      name: "View Medical History of Pets.",
      image: "https://via.placeholder.com/150",
      description:
        "View and Manage medical history of the pet that came for consultation.",
      link: "/medical_records",
    },
    {
      name: "View My Feedback",
      image: "https://via.placeholder.com/150",
      description: "View ratings and feedbacks given by the clients.",
      link: "/service4",
    },
  ];

  return <ServiceCards services={services} />;
}
