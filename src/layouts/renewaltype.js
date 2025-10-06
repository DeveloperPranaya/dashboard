import { useState } from "react";
import { useSelector } from 'react-redux';
import ContractHeader from "../components/ui/contractheader";
import StackedBarChart from "../components/ui/stackbarchat";
import { HorizontalBarChart } from "../components/ui/CommonHorizontalBarChart.js";
import NoDataAvailable from "../components/ui/NoDataAvailable.js";
import {GraphSkeleton} from "../style/ActivityDetailGraphStyle"

function RenewalType({ renewalType , selectedDropdown }) {
  const [selected, setSelected] = useState('Sales - Business Area');
  const { data: cardContainer } = useSelector((state) => state.dashboard);
  const [view, setView] = useState({ type: "graph" });
  const globalRenewalType = cardContainer?.WG019?.Result?.Data || [];
  const globalRenewal = globalRenewalType.map(data => data.BusinessArea);
  const renewalLabels = Object.keys(globalRenewalType[0] || {}).filter(key => key !== 'BusinessArea');
  const backgroundColors = ['#3B1676', '#4F1D9E', '#6023C0', '#7434DB'];

  const handleDropdownChange = (e) => {
    setSelected(e.target.value);
  };

  function transformRenewalData(flatData) {
    const result = {};
    flatData && Object.entries(flatData).forEach(([key, value]) => {
      const match = key.match(/^([A-Za-z]+)Month(.+)$/);
      if (match) {
        const month = match[1];
        const type = match[2];
        if (!result[month]) {
          result[month] = {
            month,
            AutoRenewal: 0,
            ManualRenewal: 0,
            OneTimeRenewal: 0,
          };
        }
        result[month][type] = value;
      }
    });
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthOrder
      .filter(month => result[month])
      .map(month => result[month]);
  }

  const selectedBusinessData = globalRenewalType.find(item => item.BusinessArea === selected);

  const chartData = selectedBusinessData ? {
    labels: renewalLabels,
    datasets: [{
      label: selectedBusinessData.BusinessArea,
      data: renewalLabels.map(label => selectedBusinessData[label]),
      backgroundColor: backgroundColors
    }]
  } : null;

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: selected ? `Contract Renewals - ${selected}` : 'Contract Renewals'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  const transformedData = transformRenewalData(renewalType);

  const hasOnlyZeros = transformedData.every(
  item =>
    item.AutoRenew === 0 &&
    item.ManualRenew === 0 &&
    item.OneTimeRenew === 0
);

   if(renewalType && renewalType.length === 0){
          return <div className="graph-skeleton large" />
        }

return (
  <div className="renewaltype-container">
    <ContractHeader
      heading="Renewals YTD"
      visibleButtons={["graph"]}
      view={view}
      setView={setView}
      globalRenewal={globalRenewal}
      selectedDropdown={selectedDropdown}
      onChange={handleDropdownChange}
      desc = "This stacked bar chart shows the total count of contract renewals for the current year, categorized by renewal type (Auto, Manual, or One Time). It helps you track renewal trends and volume on a monthly basis."
    />
    {(!transformedData.length || hasOnlyZeros) ? (
        <NoDataAvailable /> 
    ) : selected !== "" && chartData && globalRenewal ? (
      <HorizontalBarChart data={chartData} options={chartOptions} />
    ) : (
      <StackedBarChart data={transformedData} height={414} />
    )}
  </div>
);

}

export default RenewalType;
