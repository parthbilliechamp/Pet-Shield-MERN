import "./RegistrationFilter.css";

const RegistrationFilter = (props) => {
  // calling dropdownChangeHandler method on changing dropdown value
  const dropdownChangeHandler = (event) => {
    // passing selected year from dropdown into its parent Analytics component
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="register-filter">
      <div className="register-filter__control">
        <label>Pet Registration By Year</label>
        {/* here props.selected has value from analytics component initially 2020 and after that according
        to selected value from the user */}
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  );
};

export default RegistrationFilter;
