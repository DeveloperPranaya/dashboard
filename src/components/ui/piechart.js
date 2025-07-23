import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ filterbar, counterPartyData }) => {
  const [totalItem, setTotalItem] = useState(0);
  const [chartData, setChartData] = useState(null); // ⬅️ store chart data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (counterPartyData && counterPartyData.length > 0) {
      const counts = {};
      counterPartyData.forEach(item => {
        const key = item[filterbar];
        if (key) {
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      const labels = Object.keys(counts);
      const values = Object.values(counts);

      setChartData({
        labels,
        datasets: [
          {
            label: `Distribution by ${filterbar}`,
            data: values,
            backgroundColor: ['#3B1676', '#E5DAF8', '#D3BEF4', '#7434DB', '#B795EC'],
            hoverOffset: 4,
          },
        ],
      });

      setTotalItem(counterPartyData.length);
      setIsLoading(false);
    }
  }, [counterPartyData, filterbar]);

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 350).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      const text = `Total: ${totalItem || 0}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 4);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    },
  };

  if (isLoading || !chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ width: '350px', height: '350px', margin: 'auto' }}>
      <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default PieChart;
