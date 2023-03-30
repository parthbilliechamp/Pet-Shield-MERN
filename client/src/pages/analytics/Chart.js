import ChartBar from "./ChartBar";
import "./Chart.css";
const Chart = (props) => {
  // extracting value out object array to make it int array which has each month count values
  const dataPointValues = props.dataPoints.map((datapoint) => datapoint.value);

  // Finding out the maximum out of the array
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((datapoint) => (
        // displaying chartbar till the length of datapoints by also adding more attribute and additional
        // child ChartBar component
        <ChartBar
          // to manage list efficiently in react we need a key
          key={datapoint.label}
          value={datapoint.value}
          maxValue={totalMaximum}
          label={datapoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
