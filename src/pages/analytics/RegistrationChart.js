import Chart from "./Chart";

const RegistrationChart = (props) => {
  // Here I have defined a array which have all the months in the year and initially I am setting its
  // value as zero
  const charDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  //   props.petRegistration we are getting from analytics Component
  for (const register of props.petRegistration) {
    // here we are getting the index of the months which have analytics
    const registrationMonth = register.registrationDate.getMonth();

    // updating the months with the analytics
    charDataPoints[registrationMonth].value += 1; // starting at 0-> jan to 11 ->dec
  }

  // Sending the entire 12 length array to its child Component that is Chart Component
  return <Chart dataPoints={charDataPoints} />;
  // return <div>Abc</div>;
};

export default RegistrationChart;
