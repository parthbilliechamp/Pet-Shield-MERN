import "./RegistrationStats.css";
import Card from "./Card";

import { useState } from "react";
import RegistrationChart from "./RegistrationChart";
import RegistrationFilter from "./RegistrationFilter";
import RegistrationList from "./RegistrationList";

const RegistrationStats = (props) => {
  // Here We are using state for storing filteredYear
  // initially I am storing 2020 year in the dropdown but the state will change as
  // the user select different year with dropdown
  const [filteredYear, setFilteredYear] = useState("2023");

  // setFilteredYear is state reloading function which will reload component with new value
  // YEAR FROM CHILD
  const filterChangeHandler = (selectedYear) => {
    // here as user changed the year in the dropdown filteredyear got changed with selected year
    setFilteredYear(selectedYear);
  };

  // filtered pet information object on the bases of selection of year
  const filterPetInfo = Array.isArray(props.item)
    ? props.item.filter((petInfo) => {
        const registrationDate = petInfo.registrationDate;
        return (
          registrationDate &&
          registrationDate.getFullYear().toString() === filteredYear
        );
      })
    : [];

  // print filtered pet objects by selcted year
  // console.log(filterPetInfo + "filterPetInfo");

  return (
    // normally we cant use our custom class [Card] as a wrapper around other custome Components but it will Worker
    // for built HTML tags like div , h1 etc but react have to do it check props.children in card.js file
    <Card className="registrationStats">
      <RegistrationFilter
        // Here selected attribute is getting passed into its child component i.e. RegistrationFilter
        // VALUE INTO CHILD
        selected={filteredYear}
        // onChangeFilter attribute is fetching value from child component
        // VALUE FROM CHILD
        onChangeFilter={filterChangeHandler}
      />

      {/* Sending PetInfo Object according to selected year For eg for the first time 
      It will pet object which was registed in 2020 after that it will show from selected year*/}
      <RegistrationChart petRegistration={filterPetInfo} />

      <RegistrationList items={filterPetInfo}></RegistrationList>
    </Card>
  );
};

export default RegistrationStats;
