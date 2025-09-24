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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #52555A;
  flex-wrap: wrap;
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 8px;
`;

const Item = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background-color: ${(props) => props.bg || '#D3BEF4'};
  margin-right: 4px;
`;

const Paragraph = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * @param {Object} props
 * @param {Array} props.labels - Array of label strings for y-axis
 * @param {Array} props.datasets - Array of { label, data, backgroundColor }
 * @param {string} [props.title] - Optional chart title
 */
export const CommonHorizontalBarChart = ({ labels, datasets, title }) => {
  // ✅ Freeze colors to prevent mutation
  const stableDatasets = datasets.map((ds) => ({
    ...ds,
    stack: 'Stack 0',
    barThickness: 33,
    backgroundColor: Array.isArray(ds.backgroundColor)
      ? [...ds.backgroundColor] // clone if array
      : ds.backgroundColor, // keep single color stable
  }));

  const data = {
    labels,
    datasets: stableDatasets,
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
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
          display: true,
        },
        grid: {
          drawTicks: false,
          color: '#ccc',
          borderDash: [2, 2],
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
      <StackContainer>
        {stableDatasets.map((ds, i) => (
          <FlexItem key={i}>
            <Item bg={ds.backgroundColor} />
            <Paragraph>{ds.label}</Paragraph>
          </FlexItem>
        ))}
      </StackContainer>
    </div>
  );
};

export const HorizontalBarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};





