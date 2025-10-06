  import { ContractsBarChart, ContractViewBarChart, CounterTypeChart, RegionTypeChart } from '../ui/ContractsBarChart';

  const ChartSwitcher = ({ activeBtn, details }) => {
    switch (activeBtn) {
      case "Renewal Type": return <ContractViewBarChart individualCardData={details} />;
      case "Counterparty Type": return <CounterTypeChart individualCardData={details} />;
      case "Region": return <RegionTypeChart individualCardData={details} />;
      default: return <ContractsBarChart individualCardData={details} />;
    }
  };

  export default ChartSwitcher;