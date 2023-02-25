import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceCard = ({ name, image, description, link }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Header><b>{name}</b></Card.Header>
      <Card.Img variant="top" src={image} />    
      <Card.Body>
        <Card.Text>
          {description}
        </Card.Text>
        <Link to={link}>
        <Button variant="light" style={{ backgroundColor: "rgb(95 175 225)" }}>View More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

const ServiceCards = ( {services} ) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Popular Services Offered</h2>
      <br />
      <Row xs={1} sm={2} md={4} className="g-4">
        {services.map((service, index) => (
          <Col key={index}>
            <ServiceCard
              name={service.name}
              image={service.image}
              description={service.description}
              link={service.link}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceCards;
