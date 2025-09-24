

const ContractTypeChart = (contracts = []) => {
  const grouped = {};

  contracts.forEach(item => {
    const type = item.ContractType;
    const status = item.Status?.toLowerCase();

    if (!grouped[type]) {
      grouped[type] = {
        signed: 0,
        new: 0,
        active: 0,
        expired: 0,
        cancelled: 0,
        readyforsignature: 0,
      };
    }

    if (status === 'signed') grouped[type].signed++;
    else if (status === 'new') grouped[type].new++;
    else if (status === 'active') grouped[type].active++;
    else if (status === 'expired') grouped[type].expired++;
    else if (status === 'cancelled') grouped[type].cancelled++;
    else if (status === 'ready for signature') grouped[type].readyforsignature++;
  });

  const sorted = Object.entries(grouped)
    .sort(([, a], [, b]) => b.active + b.signed - (a.active + a.signed))
    .slice(0, 5);

  const labels = sorted.map(([name]) => name);
  const datasetKeys = ['active', 'expired', 'cancelled', 'new', 'signed', 'readyforsignature'];
  const colors = ['#3B1676', '#4F1D9E', '#6023C0', '#7434DB', '#8952E0', '#A379E7'];

  const datasets = datasetKeys.map((key, i) => ({
    label: key,
    data: labels.map(label => grouped[label]?.[key] ?? 0),
    backgroundColor: colors[i],
  }));

  return { labels, datasets };
};

export default ContractTypeChart;
