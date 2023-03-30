import RegistrationItem from "./RegistrationItem";
import "./RegistrationList.css";

const RegistrationList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="registration-list__fallback"> Found No registration</h2>;
  }
  
  return (
    <ul className="registration-list">
      {props.items.map((registration) => (
        <RegistrationItem
          // because of this key attribute react will be able to uniquely identity the list item
          // if you dont add it, then it will visit every item and replace its content which is very costly
          key={registration.id}
          petName={registration.petName}
          ailmentName={registration.ailmentName}
          date={registration.registrationDate}
        ></RegistrationItem>
      ))}
    </ul>
  );
};

export default RegistrationList;