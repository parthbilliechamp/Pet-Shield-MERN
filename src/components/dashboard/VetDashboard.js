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
      name: "View Medical History of Pets.",
      image: "https://via.placeholder.com/150",
      description:
        "View and Manage medical history of the pet that took consultation.",
      link: "/service2",
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
