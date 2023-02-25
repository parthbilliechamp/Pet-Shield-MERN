import React from 'react'
import "../../assets/styles/Navbar.css"

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(95 175 225)', color: 'white'}}>
    <div className="container-fluid">
      <img src='/PetShield.png' alt='Pet Shield' style={{width:'40px', height:'40px'}}/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{color: 'white'}}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">HOME</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">FIND VETS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">PET INSURANCE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">APPOINTMENTS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">PROFILE</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">LOGOUT</a>
          </li>
        </ul>
        <form className="d-flex" role="search" style={{ maxWidth: '300px'}}>
          <input className="form-control w-100" type="search" placeholder="Search here..." aria-label="Search" style={{ marginRight: '10px' }}/>
          <button className="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  )
}