
import { useEffect, useState } from 'react';
import { NewBarChart, CommonBarChart } from './NewBarChart';
import { countData } from "../../commonFunction/commonfunction";
import NoDataAvailable from './NoDataAvailable';

export function ContractsBarChart({ individualCardData }) {

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });


  const formatShort = (num) => {
  // if (num >= 1e12) return Math.round(num / 1e12) + "T";  // Trillions
  if (num >= 1e9)  return Math.round(num / 1e9) + "B";   // Billions
  if (num >= 1e6)  return Math.round(num / 1e6) + "M";   // Millions
  if (num >= 1e3)  return Math.round(num / 1e3) + "K";   // Thousands
  return num.toString();
};

  useEffect(() => {
    if (!individualCardData || individualCardData.length === 0) return;
    const topContracts = individualCardData
      .map(item => {
        const counterparty = item["Contracts.Counterparty"] || "";
        return {
          value: item["Contracts.ContractValue"],
          type: counterparty.includes("Sales Agreement") ? "Sales Agreement" : counterparty
        };
      })
      .filter(item => Number.isFinite(item.value) && item.type.trim() !== "")
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    const originalLabels = topContracts.map(item => item.type);
    const fullLabels = topContracts.map(item => item.type);
    const maxLabelLength = 8; // max chars on x-axis
    const truncatedLabels = topContracts.map(item => {
      const label = item.type;
      return label.length > maxLabelLength
        ? label.slice(0, maxLabelLength) + "…"  // truncated with ellipsis
        : label;
    });

    setChartData({
      labels: truncatedLabels, // only for display
      datasets: [
        {
          data: topContracts.map(item => item.value),
          fullLabels,
          originalLabels, // keep original labels here
          backgroundColor: '#B795EC',
          borderRadius: {
            topLeft: 20,
            topRight: 20,
            bottomLeft: 0,
            bottomRight: 0
          },
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.5
        }
      ]
    });

  }, [JSON.stringify(individualCardData)]); // ⚠️ safer than object directly


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Contract Value vs. Counterparty   (Top 10 )",
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#333'
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const dataset = chartData.datasets[0];
            return dataset.fullLabels[tooltipItems[0].dataIndex]; // original text
          },
          // label: (context) => `$${context.raw.toLocaleString()}`
          label: (context) => `$${formatShort(context.raw)}`
        }
      }
    },
    options: {
      layout: {
        padding: {
          right: 20,  // 👈 works like margin-right for chart area
          left: 20    // 👈 if you want margin-left
        }
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => "$" + formatShort(value),
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: 'Contract Value ($)',
          font: {
            size: 13,
            weight: '600',
            lineHeight: 6 // ✅ makes x-axis title bold   
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: 'Counterparty Name',
          font: {
            size: 13,
            weight: '600',
            lineHeight: 6
          }
        }
      }
    }
  };

  return (
    <>

      {chartData?.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <NewBarChart chartData={chartData} chartOptions={chartOptions} chartTitle="Contract Renewal Type" />
      )}

    </>
  )

}


export const ContractViewBarChart = ({ individualCardData = [] }) => {
  const negativeAutoRenewal = individualCardData.filter(
    value => value['Contracts.AutoRenew'] === 'No'
  ).length;



  const positiveAutoRenewal = individualCardData.filter(
    value => value['Contracts.AutoRenew'] === 'Yes'
  ).length;

  const labels = ['Manual', 'AutoRenewal'];
  const dataPoints = [negativeAutoRenewal, positiveAutoRenewal];
  const originalLabel = labels
  

  return (
    <>
      {negativeAutoRenewal === 0 && positiveAutoRenewal === 0 ? (
        <NoDataAvailable />
      ) : (
        <CommonBarChart
        originalLabels={originalLabel}
          labels={labels}
          // labels={labels.substring(0,10)}
          dataPoints={dataPoints}
          chartTitle="Renewal Type vs. Count"
          renewaltype
        />
      )}
    </>

  );
};

export const CounterTypeChart = ({ individualCardData = [] }) => {

  const details = individualCardData.map(value => value['Counterparty.CounterpartyType']);
  const detailsData = countData(details);

  const labels = [];
  const dataPoint = [];
  const originalLabel = []

  for (let item in detailsData) {
    originalLabel.push(item)
    const truncated =
      item.length > 10 ? item.slice(0, 10) + "..." : item;
    labels.push(truncated);
    dataPoint.push(detailsData[item])
  }

  return (
    <>
      {dataPoint?.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <CommonBarChart
          originalLabels={originalLabel}
          labels={labels}
          dataPoints={dataPoint}
          chartTitle="Counterparty Type vs. Count"
        />
      )}
    </>

  )
}

export const RegionTypeChart = ({ individualCardData = [] }) => {
  const details = individualCardData.map(value => value['Contracts.Region']);
  const detailsData = countData(details);

  const labels = [];
  const dataPoint = [];

    const originalLabel = []

  for (let item in detailsData) {
    originalLabel.push(item)
    const truncated =
      item.length > 10 ? item.slice(0, 10) + "..." : item;
    labels.push(truncated);
    dataPoint.push(detailsData[item])
  }

  return (
    <>
      {dataPoint?.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <CommonBarChart
        originalLabels={originalLabel}
          labels={labels}
          dataPoints={dataPoint}
          chartTitle="Region vs. Count"
          region
        />
      )}
    </>
  );
}

