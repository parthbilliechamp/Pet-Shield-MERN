import React from 'react';
import { Doughnut} from 'react-chartjs-2';
import { ArcElement } from 'chart.js'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import "./PieChart.css";

const PieChart = (props) => {


    const ailmentCounts = props.item.reduce((count, curr) => {
        const { ailmentName } = curr;
        count[ailmentName] = (count[ailmentName] || 0) + 1;
        return count;
    }, {});


    const data = {

        labels: Object.keys(ailmentCounts),
        datasets: [
            {
                label: 'Disease statics:',
                data: Object.values(ailmentCounts),
                backgroundColor: [
                    '#add8e6',
                    '#002147',
                    '#9bddff',
                    '#00009c',
                    '#F0F8FF',
                    '#73c2fb',
                ],
                borderColor: [
                    '#add8e6',
                    '#002147',
                    '#9bddff',
                    '#00009c',
                    '#F0F8FF',
                    '#73c2fb',
                ],
                borderWidth: 2,
            },
        ],
  

    };
    Chart.register(ArcElement);
    Chart.register(CategoryScale);
    Chart.defaults.font.size = 24;
    const options = {
        layout: {
          padding: 20 // Increase this value to add more padding
        }
      };
    
    return (
        <div className='pieChart'>
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default PieChart;


