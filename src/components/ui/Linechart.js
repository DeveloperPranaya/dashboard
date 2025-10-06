import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: Array(5).fill(""), // ✅ just empty labels
  datasets: [
    {
      label: "My Dataset",
      data: [2, 1, 0, 1, 6],
      fill: false,
      borderColor: "#6023C0",
      backgroundColor: "#6023C0",
      tension: 0.3, // smooth curve
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // hide legend
    },
    title: {
      display: false, // hide title
    },
  },
  scales: {
    x: {
      display: false, // hide x-axis
    },
    y: {
      display: false, // hide y-axis
    },
  },
};

export default function Linechart() {
  return (
    <div style={{ width: "100px", height: "30px" }}>
      <Line data={data} options={options} />
    </div>
  );
}


