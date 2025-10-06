import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CommonModal from './commonModal'; // your modal component
import ContractTypeTable from './ContractTypeTable';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ filterbar, counterPartyData }) => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search term state
  const [totalItem, setTotalItem] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fixedColors = ['#3B1676', '#7434DB', '#9C61D1', '#B795EC', '#DFC6F8'];

  useEffect(() => {
    if (!counterPartyData || counterPartyData.length === 0) return;

    const counts = {};
    counterPartyData.forEach(item => {
      let key = item[filterbar] || 'Unknown';
      if (key === "0" || key === 0 || key === 'Unknown') key = "Not Specified";
      if (!counts[key]) counts[key] = [];
      counts[key].push(item);
    });

    let labels = Object.keys(counts);
    let values = Object.values(counts).map(arr => arr.length);
    const total = counterPartyData.length;

    const combined = labels.map((label, i) => ({ label, value: values[i], items: counts[label] }));
    const sorted = combined.sort((a, b) => b.value - a.value);
    const top5 = sorted.slice(0, 5);

    setChartData({
      labels: top5.map(item => item.label),
      datasets: [
        {
          label: `Distribution by ${filterbar}`,
          data: top5.map(item => item.value),
          backgroundColor: top5.map((_, i) => fixedColors[i]),
          hoverOffset: 0,
          borderWidth: 0,
          metaItems: top5.map(item => item.items) // store full data for modal
        }
      ]
    });

    setTotalItem(total);
    setIsLoading(false);
  }, [counterPartyData, filterbar]);

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

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', onClick: () => null },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.chart.data.datasets[0];
            const label = context.chart.data.labels[context.dataIndex];
            const value = dataset.data[context.dataIndex];
            return `${label}: ${value}`;
          }
        }
      }
    },
    onClick: (evt, elements, chart) => {
      if (!elements.length) return;
      const index = elements[0].index;
      const dataset = chart.data.datasets[0];
      const sliceLabel = chart.data.labels[index];
      const sliceItems = dataset.metaItems[index];
      setSelectedSlice({ label: sliceLabel, items: sliceItems });
      setShowModal(true);
      setSearchTerm(""); // reset search when modal opens
      setCurrentPage(1);
    }
  };

  // ✅ Filter items based on search term
  const filteredItems = selectedSlice
    ? selectedSlice.items.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  if (isLoading || !chartData) return <div>Loading chart...</div>;

  return (
    <>
      <div style={{ width: '550px', height: '200px', marginTop: '50px' }}>
        <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>

      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`List of CounterParty: ${selectedSlice?.label === "0" || selectedSlice?.label === 0 ? "Not Specified":selectedSlice?.label}`}
        fromContractView={true}
        subTitle={`Showing ${filteredItems.length} counterparty`}
        fullscreen={true}
        showSearch={true} // ✅ enable search input
        onSearchChange={(value) => setSearchTerm(value)} // ✅ handle search input
        counterPartyData={counterPartyData}
      >
        <ContractTypeTable filteredItems={filteredItems} counterPartyData />
      </CommonModal>
    </>
  );
};






export const PieChartContractType = ({ filterbar, counterPartyData }) => {
  const [totalItem, setTotalItem] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState(null);

  // ✅ search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fixedColors = ['#3B1676', '#7434DB', '#9C61D1', '#B795EC', '#DFC6F8'];

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

  useEffect(() => {
    if (counterPartyData && Array.isArray(counterPartyData)) {
      const total = counterPartyData.reduce((sum, item) => sum + (item.count || 0), 0);
      setTotalItem(total);

      const sortedData = [...counterPartyData].sort((a, b) => b.count - a.count);
      const top5 = sortedData.slice(0, 5);

      setChartData({
        labels: top5.map(item => item.contractType),
        datasets: [
          {
            label: `Distribution by ${filterbar}`,
            data: top5.map(item => item.count),
            backgroundColor: top5.map((_, i) => fixedColors[i]),
            hoverOffset: 0,
            borderWidth: 0,
            metaItems: top5.map(item => item.contracts)
          }
        ]
      });

      setIsLoading(false);
    }
  }, [counterPartyData, filterbar]);

  const options = {
    cutout: '70%',
    rotation: 0,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', onClick: () => null },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.chart.data.datasets[0];
            const label = context.chart.data.labels[context.dataIndex];
            const value = dataset.data[context.dataIndex];
            return `${label}: ${value}`;
          }
        }
      }
    },
    onClick: (evt, elements, chart) => {
      if (!elements.length) return;
      const index = elements[0].index;
      const dataset = chart.data.datasets[0];
      const sliceLabel = chart.data.labels[index];
      const sliceItems = dataset.metaItems[index];
      setSelectedSlice({ label: sliceLabel, items: sliceItems });
      setShowModal(true);
      setSearchTerm(""); // reset search
      setCurrentPage(1);
    }
  };

  // ✅ Filter items based on search
  const filteredItems = selectedSlice
    ? selectedSlice.items.filter((item) =>
        item.contractTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.counterparty?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading || !chartData) return <div>Loading chart...</div>;

  return (
    <>
      <div style={{ width: '550px', height: '200px', marginTop: '50px' }}>
        <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
      </div>
    
      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`List of Contracts: ${selectedSlice?.label}`}
        fromContractView={true}
        subTitle={`Showing ${filteredItems.length} contracts`}
        fullscreen={true}
        showSearch={true}  // ✅ enable search
        onSearchChange={(value) => setSearchTerm(value)} // ✅ handle search
      >
        <ContractTypeTable filteredItems={filteredItems} />
      </CommonModal>
    </>
  );
};



