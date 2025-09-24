// components/common/BarChart.jsx
import { useRef } from 'react';
import { ChartContainer } from "../../style/chartStyle";
import NoDataAvailable from './NoDataAvailable';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export function NewBarChart({ chartData, chartOptions, height = 500 }) {
  const chartRef = useRef();

  return (
    <>
      {chartData?.labels?.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <ChartContainer style={{ height }}>
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </ChartContainer>
      )}
    </>
  );
}

export const CommonBarChart = ({
  originalLabels,
  labels = [],
  dataPoints = [],
  chartTitle = 'Bar Chart',
  region,
  renewaltype
}) => {
  // 🔄 Replace "Unknown" with "Not specified" just for display
  const displayLabels = labels.map(label =>
    label === "Unknown" ? "Not specified" : label
  );

  const data = {
    labels: displayLabels, // use transformed labels
    datasets: [
      {
        label: chartTitle,
        data: dataPoints,
        originalLabels,
        backgroundColor: ['#B795EC', '#B795EC'],
        borderRadius: { topLeft: 20, topRight: 20 },
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: { size: 12, weight: 'bold' },
        padding: { top: 10, bottom: 30 },
        color: '#333'
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const dataset = tooltipItems[0].dataset;
            const original = dataset.originalLabels[tooltipItems[0].dataIndex];
            return original === "Unknown" ? "Not specified" : original;
          },
          label: (context) => `${context.raw.toLocaleString()} contracts`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: { size: 13, weight: "bold" }
        },
        title: {
          display: true,
          text: 'Number of Contracts',
          font: { size: 13, weight: '600', lineHeight: 6 }
        }
      },
      x: {
        ticks: {
          font: { size: 13, weight: "bold" }
        },
        title: {
          display: true,
          text: region ? 'Region' : renewaltype ? "Renewal Type" : 'Counterparty Type',
          font: { size: 13, weight: '600', lineHeight: 6 }
        }
      }
    },
  };

  return <Bar data={data} options={options} width={1000} height={400} />;
};


