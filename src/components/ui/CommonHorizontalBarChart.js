import { useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ContractTypeTable from "./ContractTypeTable";
import CommonModal from "./commonModal";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  color: #52555a;
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
  background-color: ${(props) => props.bg || "#D3BEF4"};
  margin-right: 4px;
`;

const Paragraph = styled.div`
  display: flex;
  align-items: center;
`;

export const CommonHorizontalBarChart = ({ labels, datasets, title, groupedContracts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state

  const stableDatasets = datasets.map((ds) => ({
    ...ds,
    stack: "Stack 0",
    barThickness: 33,
    backgroundColor: Array.isArray(ds.backgroundColor)
      ? [...ds.backgroundColor]
      : ds.backgroundColor,
  }));

  const data = { labels, datasets: stableDatasets };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: !!title, text: title },
    },
    scales: {
      x: { stacked: true, ticks: { color: "#000" }, grid: { display: false, drawBorder: false } },
      y: { stacked: true, ticks: { color: "#000" }, grid: { drawTicks: false, color: "#ccc", borderDash: [2, 2] } },
    },
    onClick: (evt, elements) => {
      if (!elements.length) return;
      const element = elements[0];
      const datasetIndex = element.datasetIndex;
      const index = element.index;

      const dataset = stableDatasets[datasetIndex];
      const label = labels[index]; // contract type
      const status = dataset.label; // status (active, signed, etc.)
      const value = dataset.data[index];
      const contracts = dataset.rawData[index] || [];

      setSelectedBar({ label, status, value, contracts });
      setSearchTerm(""); // reset search on new click
      setShowModal(true);
    },
  };

  // ✅ filter contracts inside modal
  const filteredItems =
    selectedBar?.contracts?.filter((c) =>
      c.contractTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.counterparty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.status?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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

      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`List of Contracts: ${selectedBar?.label} (${selectedBar?.status})`}
        fromContractView={true}
        subTitle={`Showing ${filteredItems.length} contracts`}
        fullscreen={true}
        showSearch={true} // ✅ show search in header
        onSearchChange={(value) => setSearchTerm(value)} // ✅ update searchTerm
      >
        {selectedBar && (
          <ContractTypeTable filteredItems={filteredItems} contractType />
        )}
      </CommonModal>
    </div>
  );
};

export const HorizontalBarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};






