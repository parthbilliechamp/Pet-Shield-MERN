import "./RegistrationDate.css";
function RegistrationDate(props) {

  console.log(props.date);
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className='registration-date'>
      <div className='registration-date__month'>{month}</div>
      <div className='registration-date__year'>{day}</div>
      <div className='registration-date__day'>{year}</div>
    </div>
  );
}

export default RegistrationDate;
