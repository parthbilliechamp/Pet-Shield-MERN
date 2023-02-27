import React from "react";
import StarRating from "../../components/pet_owner/Star";
import "../../assets/styles/pet_owner/DisplayVetList.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import PetOwnerNavbar from "../../components/common/PetOwnerNavbar";

function DisplayVetList({ vet }) {
  return (
    <Row className="mb-3 align-items-center">
      <Col xs={12} sm={12} md={3} lg={3} style={{ marginRight: "10px" }}>
        <div className="img-holder">
          <img src={vet.image} alt={vet.name} className="circular-image" />
        </div>
      </Col>
      <Col xs={12} sm={12} md={4}>
        <h4 style={{ color: "#1e69ba" }}>{vet.name}</h4>
        <h5>{vet.clinic}</h5>
        <p>{vet.address}</p>
        <p>{vet.contact}</p>
        <span>{vet.fees}</span>
        <div className="feedback">
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <StarRating rating={vet.rating} />
          </div>
          <a style={{ display: "inline-block" }} href="/">
            54 Ratings
          </a>
        </div>
      </Col>
      <Col xs={12} md={1} sm={12}>
        <Link to="/timeslot">
          <Button
            variant="light"
            style={{ backgroundColor: "#1e69ba", color: "white" }}
          >
            Book Appointment
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

function VetList() {

  const vets = [
    {
      id: 1,
      name: 'James Wick',
      image: 'https://vcacanada.com/carecentre/-/media/vca-canada/images/hospitals/canada/alberta/carecentre/staff/700x525_care_smith.jpg?h=525&w=700&la=en&hash=DC7893BABD38D9A8AE8518550DC4F393',
      clinic: 'Smile Clinic',
      contact: '+1 334 324 3332',
      address: "1234, Street Ave, Halifax",
      fees: '$20.00', 
      rating: 4
    },
    {
      id: 2,
      name: 'Yuon Wee',
      image: 'https://milduravet.com.au/wp-content/uploads/2022/03/katherine-overs-profile.jpg',
      clinic: 'Smile Clinic',
      contact: '+1 334 324 3332',
      address: '1234, Street Ave, Halifax',
      fees: '$40.00',
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Plante',
      image: 'https://vcahospitals.com/-/media/2/vca/images/hospitals/united-states/california/marina/staff/700x525_marinaca_blancar.ashx?h=525&iar=0&w=700&hash=2AFBA3F221E1A971519D3368E9DBF492',
      clinic: 'Smile Clinic',
      contact: '+1 334 324 3332',
      adrees: '1234, Street Ave, Halifax',
      fees: '$15.00',
      rating: 3
    },
  ];

  const [renderingVetList, setRenderingVetList] = useState(vets);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setRenderingVetList(vets);
    } else {
      const filteredVets = vets.filter((vet) =>
        vet.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filteredVets.length)
      setRenderingVetList(filteredVets);
    }
  };

  const handleSort = (e) => {
    switch (e.target.value) {
      case "Name":
        setRenderingVetList(
          [...renderingVetList].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Rating":
        setRenderingVetList(
          [...renderingVetList].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setRenderingVetList(vets)
    }
  };

  return (
    <>
    <PetOwnerNavbar/>
    <div className="my-5">
      <div className="card w-50 mx-auto">
        <div className="card-header">
          <Row>
            <Col xs={12} md={6}>
              <div className="input-group rounded">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search by name"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={handleSearch}
                />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <select className="form-select" onChange={handleSort}>
                <option value="">Sort by</option>
                <option value="Name">Name</option>
                <option value="Rating">Rating</option>
                <option value="Location">Location</option>
              </select>
            </Col>
          </Row>
        </div>
        <div className="card-body">
          <Row className="align-items-center">
            <Col xs={12} md={12} sm={12} style={{ marginRight: "10px" }}>
              <div className="container">
                {renderingVetList.map((vet, index) => (
                  <React.Fragment key={vet.id}>
                    <DisplayVetList vet={vet} />
                    {index !== vets.length - 1 && (
                      <hr
                        style={{ border: "1px solid #ddd", margin: "20px 0" }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    </>
  );
}

export default VetList;
