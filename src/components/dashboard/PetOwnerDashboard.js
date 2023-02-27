import ServiceCards from '../common/ServiceCards'
import Image1 from "../../assets/images/Vetimg/Image1.jpg";
import Image2 from "../../assets/images/Vetimg/Image2.jpg";
import Image5 from "../../assets/images/Vetimg/Image5.jpg";
import Image6 from "../../assets/images/Vetimg/Image6.jpg";
import Image7 from "../../assets/images/Vetimg/Image7.jpg";
import PetOwnerNavbar from '../common/PetOwnerNavbar';

export default function PetOwnerDashboard() {

  const services = [
    {
      name: 'Book an Appointment',
      image: Image1,
      description: 'Book an Appointment with the available Vets.',
      link: '/view_vets'
    },
    {
      name: 'View Medical History',
      image: Image2,
      description: 'View and Manage medical history of the pet.',
      link: '/mypets/medical_records'
    },
    {
      name: 'Buy Pet Insurance',
      image: Image6,
      description: 'Choose from a wide range of insurance for your pet. ',
      link: '/comingsoon'
    },
    {
      name: 'Rating and Feedback',
      image: Image5,
      description: 'Leave a rating and give feedback for the Vet.',
      link: '/comingsoon'
    },
    {
      name: 'View Upcoming Appointments',
      image: Image7,
      description: 'View upcoming booking with the Vet.',
      link: '/appointments'
    },
  ];

  return (
    <>
    <PetOwnerNavbar />
    <ServiceCards services={services} />
    </>
  )
}
