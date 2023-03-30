import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ name, image, description, link, feature, pagelink }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem", marginBottom: "20px" }}>
      <Card.Header>
        <b>{name}</b>
      </Card.Header>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        {/* <Link to={link}> */}
        <Button
          onClick={() =>
            navigate(link, {
              state: {
                feature: feature,
                pagelink: pagelink,
              },
            })
          }
          variant="light"
          style={{ backgroundColor: "#1e69ba", color: "white"}}
        >
          View More
        </Button>
        {/* </Link> */}
      </Card.Body>
    </Card>
  );
};

const ServiceCards = ({ services }) => {

  return (
    <div style={{ marginLeft: "20px" }}>
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
              feature={service.feature}
              pagelink={service.pagelink}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceCards;
