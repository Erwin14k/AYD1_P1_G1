import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const Top5 = ({ titulo, ll, labels, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [
          {
            label: ll,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)' // Color de fondo de las barras
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
  }, [ll, labels, data]);
  
  return (
    <div className="container" >
      <h4 style={{ marginTop: "2%" }}>Top 5 {titulo}</h4>
      <div style={{width:"55%", margin:"auto"}}>
        <canvas ref={chartRef}  />
      </div>   
    </div>
  );
};

export default Top5;
