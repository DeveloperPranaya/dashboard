export function getTimeDifference(timestamp) {
  if (!timestamp) {
    return { days: NaN, hours: NaN, minutes: NaN, isExactDay: false };
  }

  // Ensure timestamp is a string
  const tsStr = String(timestamp);

  // Truncate to milliseconds if extra precision is present
  const safeTimestamp = tsStr.replace(/(\.\d{3})\d+Z$/, "$1Z");
  const targetDate = new Date(safeTimestamp);

  if (isNaN(targetDate.getTime())) {
    return { days: NaN, hours: NaN, minutes: NaN, isExactDay: false };
  }

  const currentDate = new Date();
  const diffMs = Math.abs(targetDate - currentDate);

  const diffMinutesTotal = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(diffMinutesTotal / (60 * 24));
  const hours = Math.floor((diffMinutesTotal % (60 * 24)) / 60);
  const minutes = diffMinutesTotal % 60;

  const isExactDay = hours === 0 && minutes === 0;

  return { days, hours, minutes, isExactDay };
}


export const filterByLast48Hours = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInHours = (now - createdTime) / (1000 * 60 * 60); // milliseconds to hours
    return timeDiffInHours < 48;
  });
};


export const filterByLast14Days = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInDays = (now - createdTime) / (1000 * 60 * 60 * 24); // ms to days
    return timeDiffInDays < 14;
  });
};

export const filterByLast30Days = (data = []) => {
  const now = new Date().getTime();

  return data.filter((item) => {
    const createdTime = new Date(item.Created).getTime();
    const timeDiffInDays = (now - createdTime) / (1000 * 60 * 60 * 24); // convert ms to days
    return timeDiffInDays < 30;
  });
};

export const getTimeDifferencee = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);

  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    isExactDay: diffMs >= 1000 * 60 * 60 * 24, // if it's more than 1 day
    days,
    hours,
    minutes,
    seconds,
  };
};





export const getFilteredData = (selected, data) => {
  const now = new Date();
  let filteredData = data || [];

  // Apply time filter if selected is a specific time range
  switch (selected) {
    case "Last 48 hours":
      filteredData = filteredData.filter(item => {
        const createdDate = new Date(item.Created);
        return (now - createdDate) <= 48 * 60 * 60 * 1000; // 48 hours in ms
      });
      break;

    case "Last 14 days":
      filteredData = filteredData.filter(item => {
        const createdDate = new Date(item.Created);
        return (now - createdDate) <= 14 * 24 * 60 * 60 * 1000;
      });
      break;

    case "Last 1 month":
      filteredData = filteredData.filter(item => {
        const createdDate = new Date(item.Created);
        return (now - createdDate) <= 30 * 24 * 60 * 60 * 1000;
      });
      break;

    case "All Activity":
    default:
      // no filter needed
      break;
  }

  // ✅ Sort by Created date in increasing order (oldest first)
  return [...filteredData].sort((a, b) => new Date(b.Created) - new Date(a.Created));
};


export const filterByType = (data, filterValue, key) => {
  return data.filter(item => filterValue.includes(item[key]));
};

const normalize = (v) =>
  String(v ?? '')
    .trim()
    .replace(/\s+/g, ' '); // collapse multiple spaces

export function countData(details, { includeUnknown = true } = {}) {
  const acc = {};
  for (const item of details || []) {
    let label = normalize(item);
    if (!label) {
      if (!includeUnknown) continue;
      label = 'Unknown';
    }
    acc[label] = (acc[label] || 0) + 1;
  }
  return acc;
}


export const filterByValueRange = (data, rangeKeys) => {

  // Helper to convert a key into min/max
  const getRange = (key) => {
    switch (key) {
      case 'Below $20,000':
      case 'below-20000': 
        return { min: 0, max: 20000 };

      case '$20,001 to $49,999':
      case '20001-49999': 
        return { min: 20001, max: 49999 };

      case '$50,001 to $99,999':
      case '50001-99999': 
        return { min: 50001, max: 99999 };

      case '$100,000 and above':
      case '100000-above': 
        return { min: 100000, max: Infinity };

      default: 
        return { min: 0, max: Infinity };
    }
  };

  return data.filter(item => {
    const val = parseFloat(item['Contracts.ContractValue']);

    // check if value falls into ANY of the selected ranges
    return rangeKeys.some(key => {
      const { min, max } = getRange(key);
      return val >= min && val <= max;
    });
  });
};

 const renewalMappings = {
  "Manual": "No",
  "Auto Renewal": "Yes",
};
// utils/handleRenewalTypeClick.js
export const getHandleRenewalTypeClick = ({
  toggleDropdown,
  filterByType,
  filterByValueRange,
  details,
  setSelectedRenewalTypes,
  setActiveFilters,
}) => {
  return (e, filterValue, btnName, filterType) => {
    e.preventDefault();

    toggleDropdown(btnName);

    setActiveFilters((prev) => {
      // Toggle the selected value inside its filter group
      const updatedGroup = prev[filterType]?.includes(filterValue)
        ? prev[filterType].filter((v) => v !== filterValue)
        : [...(prev[filterType] || []), filterValue];

      const newActiveFilters = { ...prev, [filterType]: updatedGroup };

      // 🔑 Apply all filters together
      let filteredItems = [...details];

      // ✅ Renewal Filter (map Manual ↔ No, Auto ↔ Yes)
      if (newActiveFilters.renewal?.length) {
        const mappedRenewals = newActiveFilters.renewal.map(
          (val) => renewalMappings[val] || val
        );
        filteredItems = filterByType(filteredItems, mappedRenewals, "Contracts.AutoRenew");
      }

      if (newActiveFilters.region?.length) {
        filteredItems = filterByType(
          filteredItems,
          newActiveFilters.region,
          "Contracts.Region"
        );
      }
      if (newActiveFilters.counterparty?.length) {
        filteredItems = filterByType(
          filteredItems,
          newActiveFilters.counterparty,
          "Counterparty.CounterpartyType"
        );
      }
      if (newActiveFilters.value?.length) {
        filteredItems = filterByValueRange(
          filteredItems,
          newActiveFilters.value
        );
      }

      setSelectedRenewalTypes(filteredItems);

      return newActiveFilters; // ✅ update state correctly
    });
  };
};




export const mapFrequencyToOption = (frequency, type) => {
  if (frequency === 30 && type === "Minute") return "Every 30 Minute (Default)";
  if (frequency === 1 && type === "Hour") return "Every 1 Hour";
  if (frequency === 24 && type === "Hour") return "Every 24 Hour";
  return "";
};

