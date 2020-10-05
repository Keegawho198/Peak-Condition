import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import API from '../../../../../utils/api'

function Chart(props) {

  const [chartData, setChartData] = useState({});


  useEffect(() => {
    console.log(props.user);
    if (props.user) {
      changeChart();
    }
  }, [props.user])



  function changeChart() {
    console.log(props.user);
    let data = {
      labels: props.user.week,
      datasets: [
        {
          label: 'Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          responsive: false,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: props.user.weights
        }
      ]
    };

    setChartData(data);
    console.log(props.user.weights);
    console.log(props.user.week);
    console.log(data);
  }



  return (
    <>
      <Line
        data={chartData}
        width={1}
        height={1}
        
        options={{ maintainAspectRatio: false }}
      />
    </>
  )

}

export default Chart;