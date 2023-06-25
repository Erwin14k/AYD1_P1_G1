import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

function Top5 (props) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      type: 'horizontalBar',
      data: {
        labels: props.labels,
        datasets: [
          {
            label: props.ll,
            data: props.data,
            backgroundColor: '#F2890D' // Color de fondo de las barras
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, chartConfig);
  }, [props.ll, props.labels, props.data]);

  return (
    <div className="container" >
      <h4 style={{ marginTop: "2%" }}>Top 5 {props.titulo}</h4>
      <div style={{width:"55%", margin:"auto"}}>
        <canvas ref={chartRef}  />
      </div>   
    </div>
  );
};

export default Top5;
