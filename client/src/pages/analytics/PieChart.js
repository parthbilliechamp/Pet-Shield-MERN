import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import "./PieChart.css";

const PieChart = (props) => {
console.log(props.item);
const items = Array.isArray(props.item) ? props.item : [];

// Filter out items without an ailment name
const filteredItems = items.filter(item => item.ailmentName);

const ailmentCounts = filteredItems.reduce((count, curr) => {
  const { ailmentName } = curr;
  count[ailmentName] = (count[ailmentName] || 0) + 1;
  return count;
}, {});

  console.log(ailmentCounts);

  const colors = [
    "#add8e6",
    "#002147",
    "#9bddff",
    "#00009c",
    "#F0F8FF",
    "#73c2fb",
    "#e7feff",
    "#a2add0",
    "#1dacd6",
    // add more colors here if needed
  ];

  const data = {
    labels: Object.keys(ailmentCounts),
    datasets: [
      {
        label: "Disease statics:",
        data: Object.values(ailmentCounts),
        backgroundColor: colors.slice(0, Object.values(ailmentCounts).length),
        borderColor: colors.slice(0, Object.values(ailmentCounts).length),
        borderWidth: 2,
      },
    ],
  };
  Chart.register(ArcElement);
  Chart.register(CategoryScale);
  Chart.defaults.font.size = 24;
  const options = {
    layout: {
      padding: 20, // Increase this value to add more padding
    },
  };

  return (
    <div className="pieChart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
