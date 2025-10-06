
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const StackContainer = styled.div`
    margin-top:1rem;
    display: flex;
    align-item:center;
    justify-content:center;
    font-size:14px;
    line-height:24px;
    width:500;
    color:#52555A;
`;

const FlexItem = styled.div`
    display:flex;
    align-items:center;
    margin-right:16px;
`;
const Item = styled.div`
    width:12px;
    height:12px;
    border-radius:4px;
    background-color: ${(props) => props.bg || '#D3BEF4'};
    margin-right:4px;
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StackedBarChart({ data }) {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const autoRenew = data.map(item => item.AutoRenew);
  const manualRenew = data.map(item => item.ManualRenew);
  const oneTimeRenew = data.map(item => item.OneTimeRenew);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Auto Renewal',
        data: autoRenew,
        backgroundColor: '#D3BEF4',
        barThickness: 33,
      },
      {
        label: 'Manual Renewal',
        data: manualRenew,
        backgroundColor: '#6023C0',
        barThickness: 33,
      },
      {
        label: 'One Time Renewal',
        data: oneTimeRenew,
        backgroundColor: '#A379E7',
        barThickness: 33,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
    ],
  };

 
  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Renewal Types (Stacked)',
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: { color: '#000' },
      grid: {
        display: false,
        drawBorder: false,
        color: '#ccc',
        borderDash: [4, 4],
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: '#000',
        display: true,   // ✅ show y-axis ticks
      },
      grid: {
        drawTicks: true,
        color: '#ccc',
        borderDash: [2, 2],
      },
      title: {
        display: true,   // ✅ add axis label
        text: 'Renewals Count',
        color: '#000',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};


  return (
    <>
      <Bar data={chartData} options={options} width={664} height={364}/>
      <StackContainer>
        <FlexItem><Item/><FlexItem>Auto Renewal</FlexItem></FlexItem>
        <FlexItem><Item bg="#6023C0"/><FlexItem>Manual Renewal</FlexItem></FlexItem>
        <FlexItem><Item bg="#A379E7"/><FlexItem>One Time Renewal</FlexItem></FlexItem>
      </StackContainer>
    </>
  );
  
}
