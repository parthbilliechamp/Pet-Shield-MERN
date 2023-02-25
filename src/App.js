import React from 'react';
import './assets/styles/App.css';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes';

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
