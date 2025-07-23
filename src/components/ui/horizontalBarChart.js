import React from 'react';
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
import { Bar } from 'react-chartjs-2';

const StackContainer = styled.div`
    margin-top: 1rem;
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
const Paragraph = styled.div`
  display:flex;
  align-items:center;
  margin-right:16px;
`;


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = ({ constractTypeDestribution }) => {

  // Group data
  const groupContractsByType = (data) => {
    const result = {};
    data && data?.forEach(item => {
      const type = item.ContractType;
      const status = item.Status?.toLowerCase();
      if (!result[type]) {
        result[type] = {
          count: 0,
          active: 0,
          inactive: 0,
          Signed: 0,
          new: 0,
          Expired: 0,
          cancelled: 0,
          readyforsignature:0
        };
      }
      result[type].count += 1;
     
      if (status === 'signed') result[type].Signed += 1;
      else if (status === 'new') result[type].new += 1;
      else if (status === 'active') result[type].active += 1;
      else if (status === 'expired') result[type].Expired += 1;
      else if (status === 'cancelled') result[type].cancelled += 1;
      else if (status === 'ready for signature') result[type].readyforsignature += 1;
    });
    return result;
  };

  const groupedData = groupContractsByType(constractTypeDestribution);
 
  const sortedTopFive = Object.entries(groupedData)
  .sort(([, a], [, b]) => b.count - a.count) // Sort descending by count
  .slice(0, 5) // Take top 5
  .map(([name, values]) => ({ name, ...values }));
  
  const labels = sortedTopFive.map((data)=>data.name)
  const active = labels.map(label => groupedData[label]?.active ?? 0);
  const expired = labels.map(label => groupedData[label]?.Expired ?? 0);
  const canelled = labels.map(label => groupedData[label]?.cancelled ?? 0);
  const newData = labels.map(label => groupedData[label]?.new ?? 0);
  const signed = labels.map(label => groupedData[label]?.Signed ?? 0);
  const readyforsignature = labels.map(label => groupedData[label]?.readyforsignature ?? 0);
 
  const data = {
    labels,
    datasets: [
      {
        label: 'active',
        data: active,
        backgroundColor: '#3B1676',
        stack: 'Stack 0',
        barThickness: 33,
      },
      {
        label: 'expired',
        data: expired,
        backgroundColor: '#4F1D9E',
        stack: 'Stack 0',
        barThickness: 33,
      },
      {
        label: 'canelled ',
        data: canelled,
        backgroundColor: '#6023C0',
        stack: 'Stack 0',
        barThickness: 33,
      },
      {
        label: 'new',
        data: newData,
        backgroundColor: '#7434DB',
        stack: 'Stack 0',
        barThickness: 33,
      },
      {
        label: 'signed',
        data: signed,
        backgroundColor: '#8952E0',
        stack: 'Stack 0',
        barThickness: 33,
      },
       {
        label: 'readyforsignature',
        data: readyforsignature,
        backgroundColor: '#A379E7',
        stack: 'Stack 0',
        barThickness: 33,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'top',
      },
      title: {
       responsive: true,
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
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#000',
          display: true, // Show or hide Y-axis numbers
        },
        grid: {
          drawTicks: false,
          color: '#ccc',
          borderDash: [2, 2],
        },
      },
    },
  };

  return <div>
    <Bar data={data} options={options} />

    <StackContainer>
        <FlexItem><Item bg="#3B1676"/><Paragraph>active</Paragraph></FlexItem>
        <FlexItem><Item bg="#4F1D9E"/><Paragraph>expired</Paragraph></FlexItem>
        <FlexItem><Item bg="#6023C0"/><Paragraph>cancelled</Paragraph></FlexItem>
        <FlexItem><Item bg="#6023C0"/><Paragraph>new</Paragraph></FlexItem>
        <FlexItem><Item bg="#8952E0"/><Paragraph>signed</Paragraph></FlexItem>
        <FlexItem><Item bg="#A379E7"/><Paragraph>ready to sign</Paragraph></FlexItem>
      </StackContainer>
   
    
    </div>
};

export default HorizontalBarChart;
