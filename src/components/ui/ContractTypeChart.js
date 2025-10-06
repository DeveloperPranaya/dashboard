const ContractTypeChart = (contracts = []) => {
  const grouped = {};

  contracts.forEach(item => {
    const type = item.ContractType || "Unknown";

    // Normalize status
    const rawStatus = item.Status?.toLowerCase() || "unknown";
    const statusKey = rawStatus.replace(/\s+/g, ""); // e.g. "ready for signature" → "readyforsignature"

    // Initialize grouped type if not exists
    if (!grouped[type]) {
      grouped[type] = {
        signed: 0,
        new: 0,
        active: 0,
        expired: 0,
        cancelled: 0,
        readyforsignature: 0,
        unknown: 0,
        contracts: [], // all contracts for this type
        byStatus: {    // ✅ subgroup by status
          signed: [],
          new: [],
          active: [],
          expired: [],
          cancelled: [],
          readyforsignature: [],
          unknown: [],
        }
      };
    }

    // Count statuses
    if (grouped[type][statusKey] !== undefined) {
      grouped[type][statusKey]++;
    } else {
      grouped[type].unknown++;
    }

    // Store contract details
    const contractData = {
      contractTitle: item.ContractTitle,
      counterparty: item.Counterparty,
      createdDate: item.Created,
      createdBy: item.CreatedBy,
      status: item.Status,
    };

    grouped[type].contracts.push(contractData);

    // Push into respective status array
    if (grouped[type].byStatus[statusKey] !== undefined) {
      grouped[type].byStatus[statusKey].push(contractData);
    } else {
      grouped[type].byStatus.unknown.push(contractData);
    }
  });

  // Sort by sum of active + signed and take top 5 types
  const sorted = Object.entries(grouped)
    .sort(([, a], [, b]) => (b.active + b.signed) - (a.active + a.signed))
    .slice(0, 5);

  const labels = sorted.map(([name]) => name);
  const datasetKeys = ['active', 'expired', 'cancelled', 'new', 'signed', 'readyforsignature'];
  const colors = ['#3B1676', '#4F1D9E', '#6023C0', '#7434DB', '#8952E0', '#A379E7'];



  const datasets = datasetKeys.map((key, i) => ({
  label: key,
  data: labels.map(label => grouped[label]?.[key] ?? 0),
  backgroundColor: colors[i],
  rawData: labels.map(label => grouped[label]?.byStatus?.[key] ?? []), // ✅ attach contracts per status
}));

  // Prepare contracts data for top 5 types (with byStatus)
  const topContracts = labels.map(label => ({
    type: label,
    counts: datasetKeys.reduce((acc, key) => {
      acc[key] = grouped[label][key];
      return acc;
    }, {}),
    contracts: grouped[label].contracts,
    byStatus: grouped[label].byStatus, // ✅ contracts split by status
  }));

  

  return { 
    labels, 
    datasets, 
    topContracts,        // top 5 with byStatus
    groupedContracts: grouped // all grouped with details
  };
};

export default ContractTypeChart;

