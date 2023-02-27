import React from "react";
import styled from "styled-components";
import p4 from "../../assets/images/Profileimg/p4.jpg";
import VetNavBar from "../../components/common/VetNavbar";

const AppointmentDetails = () => {
  window.scrollTo(0, 0);

  return (
    <>
    <VetNavBar/>
    <AppointmentDetailsWrapper>
      <div className="image">
        <img alt="not found" src={p4}></img>
      </div>
      <div className="intro">
        <div className="intro-card">
          <h6 className="info-card">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h6>
          <h6 className="info-card">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h6>
          <h6 className="info-card">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h6>
        </div>
      </div>
    </AppointmentDetailsWrapper>
    </>
  );
};

const AppointmentDetailsWrapper = styled.div`
  display: flex;
  box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
  margin: auto;
  width: 70%;
  flex-wrap: wrap;
  .image {
    flex-basis: 50%;
    img {
      width: 90%;
      margin: 5px auto;
      object-fit: cover;
    }
  }
  .intro {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;

    .intro-card {
      box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
      width: 50%;
      margin: auto;
      height: 90%;
      border-radius: 5px;

      .info-card {
        box-shadow: 1px 1px 2px 2px rgb(204, 204, 204);
        width: 85%;
        margin: 10px auto;
        border-radius: 5px;
        padding: 5px;
      }
    }
  }

  @media only screen and (min-width: 280px) and (max-width: 432px) {
    .image {
      flex-basis: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .intro {
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  @media only screen and (min-width: 432px) and (max-width: 1120px) {
    .image {
      flex-basis: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .intro {
      padding-top: 5%;
      flex-basis: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default AppointmentDetails;
