import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ filterbar, counterPartyData }) => {
  const [totalItem, setTotalItem] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🎨 Fixed colors for ranks (1st to 5th highest)
  const fixedColors = [
    '#3B1676', // 1st highest
    '#7434DB', // 2nd highest
    '#9C61D1', // 3rd highest
    '#B795EC', // 4th highest
    '#DFC6F8', // 5th highest
  ];

  useEffect(() => {
    let labels = [];
    let values = [];
    let total = 0;

    if (counterPartyData) {
      if (Array.isArray(counterPartyData) && counterPartyData.length > 0) {
        const counts = {};
        counterPartyData.forEach(item => {
          const key = item[filterbar];
          if (key) counts[key] = (counts[key] || 0) + 1;
        });
        labels = Object.keys(counts);
        values = Object.values(counts);
        total = counterPartyData.length;
      } else if (typeof counterPartyData === 'object' && !Array.isArray(counterPartyData)) {
        labels = Object.keys(counterPartyData);
        values = Object.values(counterPartyData);
        total = values.reduce((a, b) => a + b, 0);
      }

      // Sort & take top 5
      const combined = labels.map((label, i) => ({ label, value: values[i] }));
      const sorted = combined.sort((a, b) => b.value - a.value);
      const top5 = sorted.slice(0, 5);

      labels = top5.map(item => item.label);
      values = top5.map(item => item.value);

      if (values.length === 1) values.push(0.0009);

      const colors = values.map((_, i) => fixedColors[i]);

      setChartData({
        labels: labels.map(label => (label === '0' ? 'Others' : label)),
        datasets: [
          {
            label: `Distribution by ${filterbar}`,
            data: values,
            backgroundColor: colors,
            hoverOffset: 0,
            borderWidth: 0,
          },
        ],
      });

      setTotalItem(total);
      setIsLoading(false);
    }
  }, [counterPartyData, filterbar]);

  // Center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { ctx, chartArea: { left, top, right, bottom } } = chart;
      ctx.save();
      ctx.font = '18px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000';
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      ctx.fillText(`Total: ${totalItem || 0}`, centerX, centerY);
      ctx.restore();
    }
  };

  // Legend hover tooltip plugin
  const legendTooltipPlugin = {
    id: 'legendTooltipPlugin',
    afterEvent(chart, args) {
      const event = args.event;
      const legend = chart.legend;
      if (!legend || !legend.legendHitBoxes) return;

      legend.legendHitBoxes.forEach((box, index) => {
        if (
          event.x >= box.left &&
          event.x <= box.left + box.width &&
          event.y >= box.top &&
          event.y <= box.top + box.height
        ) {
          chart.tooltip.setActiveElements([{ datasetIndex: 0, index }], { x: event.x, y: event.y });
          chart.update();
        }
      });
    }
  };

  const options = {
    cutout: '70%',
    rotation: 0,
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { right: 10 } },
    plugins: {
      legend: {
        position: 'right',
        onClick: () => null,
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const backgroundColor = data.datasets[0].backgroundColor[i];
                return {
                  text: label.length > 34 ? label.slice(0, 34) + '...' : label,
                  fillStyle: backgroundColor,
                  hidden: isNaN(value) || value === null,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const dataset = context.chart.data.datasets[0];
            const label = context.chart.data.labels[context.dataIndex];
            const value = dataset.data[context.dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  if (isLoading || !chartData) return <div>Loading chart...</div>;

  return (
    <div style={{ width: '550px', height: '200px', marginTop: '50px' }}>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin, legendTooltipPlugin]}
      />
    </div>
  );
};

export default PieChart;
