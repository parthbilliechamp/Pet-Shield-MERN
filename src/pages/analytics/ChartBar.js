import "./ChartBar.css";

const ChartBar = (props) => {
  let barFillHeight = "0%"; // as text because this will be assigned as css style

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
        //   style is different in react there are two bracket outerone for dynamic content entry and
        // and inner one for object insertion
        //barFillHeight value from above 
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};

export default ChartBar;
