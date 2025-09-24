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


// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const data = {
//   labels: Array(5).fill(""), // empty labels
//   datasets: [
//     {
//       label: "Spline Dataset",
//       data: [2, 1, 0, 1, 6],
//       fill: false,
//       borderColor: "#6023C0",
//       backgroundColor: "#6023C0",
//       tension: 0.5, // ✅ spline effect (0 = straight, 1 = max curve)
//       pointRadius: 0, // ✅ remove dots for smooth spline
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: false,
//     },
//   },
//   scales: {
//     x: {
//       display: false,
//     },
//     y: {
//       display: false,
//     },
//   },
// };

// export default function Linechart() {
//   return (
//     <div style={{ width: "100px", height: "30px" }}>
//       <Line data={data} options={options} />
//     </div>
//   );
// }

