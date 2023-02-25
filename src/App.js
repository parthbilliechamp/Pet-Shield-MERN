import React from 'react';
import './assets/styles/App.css';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes';

const clinics = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    name: 'Smile Clinic',
    address: '123 Main St, Anytown USA 12345',
    phone: '(123) 456-7890'
  },
  {
    id: 2,
    name: 'Happy Clinic',
    image: 'https://milduravet.com.au/wp-content/uploads/2022/03/katherine-overs-profile.jpg',
    address: '456 Elm St, Anytown USA 67890',
    phone: '(987) 654-3210'
  },
  {
    id: 3,
    image: 'https://milduravet.com.au/wp-content/uploads/2022/03/katherine-overs-profile.jpg',
    name: 'Cure Clinic',
    address: '789 Oak St, Anytown USA 24680',
    phone: '(369) 258-147'
  }
];

function App() {
  return (
    <>
    <Navbar />
    <div className="container-fluid" style={{ marginBottom:'50px' }}/>
    <AppRoutes/>
    </>
  );
}

export default App;
