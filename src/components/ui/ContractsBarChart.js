
import { useEffect, useState } from 'react';
import { NewBarChart, CommonBarChart } from './NewBarChart';
import { countData } from "../../commonFunction/commonfunction";
import NoDataAvailable from './NoDataAvailable';
import CommonModal from './commonModal';
import { useSearchAndPagination } from '../../hooks/useSearchAndPagination';
import CounterTypeChartTable from "./CounterTypeChartTable.js";
import "../../style/CommonModal.css"

export function ContractsBarChart({ individualCardData }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedBar, setSelectedBar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatShort = (num) => {
    if (num >= 1e9) return Math.round(num / 1e9) + "B";
    if (num >= 1e6) return Math.round(num / 1e6) + "M";
    if (num >= 1e3) return Math.round(num / 1e3) + "K";
    return num.toString();
  };

  useEffect(() => {
    if (!individualCardData || individualCardData.length === 0) return;

    const topContracts = individualCardData
      .map(item => {
        const counterparty = item["Contracts.Counterparty"] || "";
        return {
          value: item["Contracts.ContractValue"],
          type: counterparty.includes("Sales Agreement")
            ? "Sales Agreement"
            : counterparty,
          contractTitle: item["Contracts.ContractTitle"],
          status: item["Contracts.Status"],
          region: item["Contracts.Region"],
          counterPartyType: item["Counterparty.CounterpartyType"],
          termEndDate: item["Contracts.TermEndDate"],
          createdDate: item["Contracts.Created"],
          contractRowKey: item["Contracts.RowKey"],
          counterpartyRowKey: item["Counterparty.RowKey"]
        };
      })
      .filter(item => Number.isFinite(item.value) && item.type.trim() !== "")
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const originalLabels = topContracts.map(item => item.type);
    const fullLabels = topContracts.map(item => item.type);
    const maxLabelLength = 8;
    const truncatedLabels = topContracts.map(item =>
      item.type.length > maxLabelLength
        ? item.type.slice(0, maxLabelLength) + "…"
        : item.type
    );

    setChartData({
      labels: truncatedLabels,
      datasets: [
        {
          data: topContracts.map(item => item.value),
          fullLabels,
          originalLabels,
          rawData: topContracts,
          backgroundColor: '#B795EC',
          borderRadius: { topLeft: 20, topRight: 20 },
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.5
        }
      ]
    });
  }, [JSON.stringify(individualCardData)]);

  const axisLabelTooltipPlugin = {
    id: "axisLabelTooltipPlugin",
    afterEvent(chart, args) {
      const { event } = args;
      if (event.type !== "mousemove") return;
      const xScale = chart.scales.x;
      if (!xScale) return;
      const mouseX = event.x;
      const mouseY = event.y;

      if (mouseY >= xScale.bottom && mouseY <= xScale.bottom + 30) {
        const tickWidth = xScale.width / xScale.ticks.length;
        const index = Math.floor((mouseX - xScale.left) / tickWidth);
        if (index >= 0 && index < chart.data.datasets[0]?.fullLabels.length) {
          chart.tooltip.setActiveElements(
            [{ datasetIndex: 0, index }],
            { x: mouseX, y: xScale.bottom }
          );
          chart.tooltip.update();
          chart.draw();
          return;
        }
      }
      chart.tooltip.setActiveElements([], { x: 0, y: 0 });
      chart.draw();
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        color: '#333',
        font: { weight: 'bold', size: 12 },
        anchor: 'end', // default is 'center'
        align: 'end',  // position outside the bar if too small
        formatter: (value) => `$${value.toLocaleString()}` // exact value
      },
      title: {
        display: true,
        text: "Contract Value vs. Counterparty (Top 10)",
        font: { size: 14, weight: "bold" },
        padding: { top: 10, bottom: 30 },
        color: "#333"
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => chartData.datasets[0].fullLabels[tooltipItems[0].dataIndex],
          label: (context) => {
            const value = context.raw; // exact number
            return `$${value.toLocaleString()}`; // show exact value with commas
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (!elements.length) return;
      const { datasetIndex, index } = elements[0];
      const dataset = chartData.datasets[datasetIndex];
      const selected = dataset.rawData[index];
      setSelectedBar(selected);
      setShowModal(true);
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => "$" + formatShort(value),
          font: { size: 13, weight: "bold" }
        },
        title: {
          display: true,
          text: "Contract Value ($)",
          font: { size: 13, weight: "600", lineHeight: 6 }
        }
      },
      x: {
        ticks: { font: { size: 13, weight: "bold" } },
        title: {
          display: true,
          text: "Counterparty Name",
          font: { size: 13, weight: "600", lineHeight: 6 }
        }
      }
    }
  };

  return (
    <>
      {chartData?.datasets?.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <NewBarChart
          chartData={chartData}
          chartOptions={chartOptions}
          chartTitle="Contract Renewal Type"
          plugins={[axisLabelTooltipPlugin]}
        />
      )}

      {/* Fullscreen Modal */}
      {showModal && selectedBar && (
        <CommonModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          title={`Contract by Contract Value: $${selectedBar.value.toLocaleString()}`}
          size="xl"
          // fullscreen={true} // ensures full-page modal
          bodyStyle={{ padding: '2rem' }} // optional styling
        >
          <div
            className="contract-details-grid"
          >
            <div
              className='text-labeling'
            >
              <div>
                <div className='text-item'>Contract Title</div>{" "}
                <a
                  className='contract-link'
                  href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Contracts/ContractDetails?ContractID=${selectedBar.contractRowKey}`}
                  target="_blank"          // ✅ open in new tab
                  rel="noopener noreferrer" // ✅ security best practice
                >
                  {selectedBar.contractTitle || "Not Specified"}
                </a>
              </div>

              <div>
                <div className='text-item'>Counterparty</div>{" "}
                <a
                  className="counterparty-link"
                  href={`https://koztracts-bweuadcmh3gzhccp.eastus-01.azurewebsites.net/Counterparty/CounterpartyDetail?CounterpartyID=${selectedBar.counterpartyRowKey}`}
                  target="_blank"          // ✅ open in new tab
                  rel="noopener noreferrer" // ✅ security best practice
                >
                  {selectedBar.type || "Not Specified"}
                </a>
              </div>
            </div>

            <div className='text-labelingg'>
              <div>
                <div className='text-item'>Contract Created Date</div>{" "}
                {selectedBar.createdDate
                  ? new Date(selectedBar.createdDate.split("T")[0]).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Not Specified"}
              </div>
              <div>
                <div className='text-item'>Term End Date</div>{" "}
                {selectedBar.termEndDate
                  ? new Date(selectedBar.termEndDate.split("T")[0]).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Not Specified"}
              </div>
              <div>
                <div className='text-item'>Contract Value:</div>{" "}
                {selectedBar.value ? `$${selectedBar.value.toLocaleString()}` : "Not Specified"}
              </div>
            </div>

            <div className='text-labelingg'>
              <div>
                <div className='text-item'>Status</div> {selectedBar.status || "Not Specified"}
              </div>

              <div>
                <div className='text-item'>Region</div> {selectedBar.region?.trim() ? selectedBar.region : "Not Specified"}
              </div>

              <div>
                <div className='text-item'>Counterparty Type</div> {selectedBar.counterPartyType || "Not Specified"}
              </div>
            </div>
          </div>

        </CommonModal>
      )}
    </>
  );
}



export const ContractViewBarChart = ({ individualCardData = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [labelName, setLabelName] = useState();

  // map details with derived renewalType
  const details = individualCardData.map((item) => {
    const autoRenew = item["Contracts.AutoRenew"];
    const renewalType =
      autoRenew === "Yes" ? "Auto Renewal" : autoRenew === "No" ? "Manual" : "-";

    return {
      region: item["Contracts.Region"]?.trim() || "Unknown",
      counterpartyType: item["Counterparty.CounterpartyType"] || "Unknown",
      contractTitle: item["Contracts.ContractTitle"] || "-",
      contractType: item["Contracts.ContractType"] || "-",
      contractRowKey: item["Contracts.RowKey"],
      contractValue: item["Contracts.ContractValue"] || "-",
      counterParty: item["Contracts.Counterparty"] || "-",
      createdDate: item["Contracts.Created"] || "",
      termEndDate: item["Contracts.TermEndDate"] || "",
      status: item["Contracts.Status"] || "-",
      renewal: autoRenew || "-",
      renewalType, // derived for chart and display
      counterpartyRowKey: item["Counterparty.RowKey"]
    };
  });

  // Count contracts by renewalType
  const renewalCounts = details.reduce((acc, d) => {
    if (!d.renewalType || d.renewalType === "-") return acc;
    acc[d.renewalType] = (acc[d.renewalType] || 0) + 1;
    return acc;
  }, {});

  const labels = [];
  const dataPoints = [];
  const originalLabel = [];

  for (let type in renewalCounts) {
    originalLabel.push(type);
    const truncated = type.length > 10 ? type.slice(0, 10) + "..." : type;
    labels.push(truncated);
    dataPoints.push(renewalCounts[type]);
  }

  // Filter contracts for modal
  const filteredContracts = selectedBar
    ? selectedBar.contracts.filter((c) =>
      (c.contractTitle || "")
        .toLowerCase()
        .includes(selectedBar.searchTerm?.toLowerCase() || "")
    )
    : [];

  return (
    <>
      {dataPoints.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <CommonBarChart
          originalLabels={originalLabel}
          labels={labels}
          dataPoints={dataPoints}
          chartTitle="Renewal Type vs. Count"
          renewaltype
          onBarClick={(label, value) => {
            setLabelName(label)
            const contracts = details.filter((d) => d.renewalType === label);
            setSelectedBar({ label, value, contracts, searchTerm: "" });
            setShowModal(true);
          }}
        />
      )}

      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`Contracts by Renewal Type: ${labelName}`}
        fromContractView={true}
        onSearchChange={(val) =>
          setSelectedBar((prev) => ({ ...prev, searchTerm: val }))
        }
        subTitle={`Showing ${filteredContracts.length} Contract${filteredContracts.length > 1 ? "s" : ""
          }`}
        fullscreen
      >
        <CounterTypeChartTable filteredItems={filteredContracts} RenewalTypeChart />
      </CommonModal>
    </>
  );
};



export const CounterTypeChart = ({ individualCardData = [] }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [labelName, setLabelName] = useState();
  const itemsPerPage = 5;
  const details = individualCardData.map((item) => ({
    counterpartyType: item["Counterparty.CounterpartyType"]?.trim() || "Unknown",
    contractTitle: item["Contracts.ContractTitle"],
    region: item["Contracts.Region"],
    contractType: item["Contracts.ContractType"],
    contractRowKey: item["Contracts.RowKey"],
    contractValue: item["Contracts.ContractValue"],
    counterParty: item["Contracts.Counterparty"],
    createdDate: item["Contracts.Created"],
    termEndDate: item["Contracts.TermEndDate"],
    status: item["Contracts.Status"],
    renewal: item["Contracts.AutoRenew"],
    counterpartyRowKey: item["Counterparty.RowKey"]
  }));



  // Count occurrences by Counterparty Type
  const typeCounts = countData(details.map((d) => d.counterpartyType));
  const labels = [];
  const dataPoint = [];
  const originalLabel = [];

  for (let type in typeCounts) {
    const safeType = type ?? "Unknown";
    originalLabel.push(safeType);
    const truncated =
      safeType.length > 10 ? safeType.slice(0, 10) + "..." : safeType;
    labels.push(truncated);
    dataPoint.push(typeCounts[type]);
  }

  // 🔹 Use the custom hook for search + pagination
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    filteredItems,
  } = useSearchAndPagination(
    selectedBar?.contracts || [],
    itemsPerPage,
    "contractTitle"
  );

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
          onBarClick={(label, value) => {
            setLabelName(label)
            const contracts = details.filter(
              (d) => d.counterpartyType === label
            );
            setSelectedBar({ label, value, contracts });
            setCurrentPage(1);
            setSearchTerm(""); // reset search
            setShowModal(true);
          }}
        />
      )}

      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`Contracts by Counterparty Type: ${labelName == "Unknown" ? "Not specified" : labelName  }`}
        fullscreen={true}
        fromContractView={true}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1); // reset pagination on search
        }}

        subTitle={`Showing ${filteredItems.length} Contract${filteredItems.length > 1 ? "s" : ""
          }`}
        pagination={true}               // ✅ enable footer pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        counterPartyType
      >
        <CounterTypeChartTable filteredItems={filteredItems} />
      </CommonModal>
    </>
  );
};



export const RegionTypeChart = ({ individualCardData = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [labelName, setLabelName] = useState()
  const itemsPerPage = 5;

  const details = individualCardData.map((item) => ({
    region: item["Contracts.Region"]?.trim() || "Unknown",
    counterpartyType: item["Counterparty.CounterpartyType"],
    contractTitle: item["Contracts.ContractTitle"],
    contractType: item["Contracts.ContractType"],
    contractRowKey: item["Contracts.RowKey"],
    contractValue: item["Contracts.ContractValue"],
    counterParty: item["Contracts.Counterparty"],
    createdDate: item["Contracts.Created"],
    termEndDate: item["Contracts.TermEndDate"],
    status: item["Contracts.Status"],
    renewal: item["Contracts.AutoRenew"],
    counterpartyRowKey: item["Counterparty.RowKey"]
  }));

  // 🔹 Count occurrences by region
  const typeCounts = countData(details.map((d) => d.region));
  const labels = [];
  const dataPoint = [];
  const originalLabel = [];

  for (let type in typeCounts) {
    const safeType = type ?? "Unknown";
    originalLabel.push(safeType);
    const truncated =
      safeType.length > 10 ? safeType.slice(0, 10) + "..." : safeType;
    labels.push(truncated);
    dataPoint.push(typeCounts[type]);
  }

  // 🔹 Use reusable hook for search + pagination
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    filteredItems,
  } = useSearchAndPagination(
    selectedBar?.contracts || [],
    itemsPerPage,
    "contractTitle"
  );



  return (
    <>
      {dataPoint.length === 0 ? (
        <NoDataAvailable />
      ) : (
        <CommonBarChart
          originalLabels={originalLabel}
          labels={labels}
          dataPoints={dataPoint}
          chartTitle="Region vs. Count"
          onBarClick={(label, value) => {
            setLabelName(label)
            const contracts = details.filter((d) => d.region === label);
            setSelectedBar({ label, value, contracts });
            setCurrentPage(1); // reset pagination
            setSearchTerm(""); // reset search
            setShowModal(true);
          }}
        />
      )}

      {/* 🔹 Modal with Search + Pagination */}
      <CommonModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={`Contracts by Region: ${labelName === "Unknown" ?  "Not specified" : labelName }`}
        fromContractView={true}
        fullscreen={true}
        onSearchChange={setSearchTerm}
        subTitle={`Showing ${filteredItems.length} Contract${filteredItems.length > 1 ? "s" : ""
          }`}
        pagination={true}               // ✅ enable footer pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <CounterTypeChartTable filteredItems={filteredItems} RegionTypeChart />
      </CommonModal>
    </>
  );
};