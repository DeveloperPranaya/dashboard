// ContractsBarChart.jsx
import React, { useEffect, useState } from 'react';
import {NewBarChart, CommonBarChart} from './NewBarChart';

export function ContractsBarChart({ individualCardData }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (Array.isArray(individualCardData)) {
      const topContracts = individualCardData
        .map(item => ({
          value: item["Contracts.ContractValue"],
          type: item["Contracts.ContractType"]
        }))
        .filter(item => Number.isFinite(item.value))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      const labels = topContracts.map(item => item.type);
      const dataPoints = topContracts.map(item => item.value);
       console.log("dataPoints:-",dataPoints);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Contract Value',
            data: dataPoints,
            backgroundColor: '#B795EC',
            borderRadius: { topLeft: 20, topRight: 20, bottomLeft: 0, bottomRight: 0 },
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.5
          }
        ]
      });
    }
  }, [individualCardData]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => '$' + value.toLocaleString()
        },
        title: {
          display: true,
          text: 'Contract Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Contract Type'
        }
      }
    }
  };

  return <NewBarChart chartData={chartData} chartOptions={chartOptions} />;
}


export const ContractViewBarChart = ({ individualCardData = [] }) => {
  const negativeAutoRenewal = individualCardData.filter(
    value => value['Contracts.AutoRenew'] === 'No'
  ).length;

  const positiveAutoRenewal = individualCardData.filter(
    value => value['Contracts.AutoRenew'] === 'yes'
  ).length;

  console.log("positiveAutoRenewal:-",positiveAutoRenewal)

  const labels = ['Manual', 'AutoRenewal'];
  const dataPoints = [negativeAutoRenewal, positiveAutoRenewal];

  return (
    <CommonBarChart
      labels={labels}
      dataPoints={dataPoints}
      chartTitle="Contract Renewal Type"
    />
  );
};

