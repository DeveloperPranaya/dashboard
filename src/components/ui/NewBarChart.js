// components/common/BarChart.jsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  padding: 1rem;
`;

const ErrorMsg = styled.div`
  text-align: center;
  padding: 2rem;
  color: #555;
`;

export function NewBarChart({ chartData, chartOptions, height = 500 }) {
  const chartRef = useRef();

  return (
    <>
      {chartData?.labels?.length === 0 ? (
        <ErrorMsg>No data available</ErrorMsg>
      ) : (
        <ChartContainer style={{ height }}>
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </ChartContainer>
      )}
    </>
  );
}

export const CommonBarChart = ({ labels = [], dataPoints = [], chartTitle = 'Bar Chart' }) => {
  const data = {
    labels,
    datasets: [
      {
        label: chartTitle,
        data: dataPoints,
        backgroundColor: ['#B795EC', '#AED6F1'],
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
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.raw.toLocaleString()} contracts`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Number of Contracts',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Type',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

