import React from 'react'
import ServiceCards from '../common/ServiceCards'

export default function PetOwnerDashboard() {

  const services = [
    {
      name: 'Book an Appointment',
      image: 'https://via.placeholder.com/150',
      description: 'Book an Appointment with the available Vets.',
      link: '/view_vets'
    },
    {
      name: 'View Medical History',
      image: 'https://via.placeholder.com/150',
      description: 'View and Manage medical history of the pet.',
      link: '/mypets/medical_records'
    },
    {
      name: 'Buy Pet Insurance',
      image: 'https://via.placeholder.com/150',
      description: 'Choose from a wide range of insurance for your pet. ',
      link: '/service3'
    },
    {
      name: 'Rating and Feedback',
      image: 'https://via.placeholder.com/150',
      description: 'Leave a rating and give feedback for the Vet.',
      link: '/service4'
    },
    {
      name: 'View Upcoming Appointments',
      image: 'https://via.placeholder.com/150',
      description: 'View upcoming booking with the Vet.',
      link: '/appointments'
    },
  ];

  return (
    <ServiceCards services={services} />
  )
}
