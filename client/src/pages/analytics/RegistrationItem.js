import Card from "./Card";
import RegistrationDate from "./RegistrationDate";
import "./RegistrationItem.css";

const RegistrationItem = (props) => {
  return (
    <li>
      <Card className="registration-item">
        <div className="registration-item__date">
          <RegistrationDate date={props.date} />
        </div>
        <div className="registration-item__description">
          <h2 className="registration-item__petName">{props.petName}</h2>
          <div className="registration-item__ailmentName">{props.ailmentName}</div>
        </div>
      </Card>
    </li>
  );
};

export default RegistrationItem;
