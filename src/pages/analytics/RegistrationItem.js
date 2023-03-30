import Card from "./Card";
import RegistrationDate from "./RegistrationDate";
import './RegistrationItem.css'

const RegistrationItem = (props) => {
  
  // const [petTitle, setPetTitle] = useState(props.petName);

 
  return (
    <li>
      <Card className="registration-item">
        {/* sending props date into registrationDate component */}
        <RegistrationDate date={props.date} />
        <div className="registration-item__description">
          <h2>{props.petName}</h2>
          <div className="registration-item__ailmentName">{props.ailmentName}</div>
        </div>
      </Card>
    </li>
  );
};
export default RegistrationItem;
