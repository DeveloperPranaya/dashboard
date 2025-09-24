// import { getFilteredData } from "../../../commonFunction/commonfunction";
import { getFilteredData } from "../../commonFunction/commonfunction";

export default function buildDataMap(widgets, selectedData) {
  const amendementData = widgets["WG014"]?.output?.Result?.Data ?? [];
  const issueData = widgets["WG015"]?.output?.Result?.Data ?? [];
  const newContract = widgets["WG016"]?.output?.Result?.Data?.Contracts_New ?? [];
  const expiredContract = widgets["WG017"]?.output?.Result?.Data?.Contracts_Expired ?? [];

  const allData = [
    ...getFilteredData(selectedData, amendementData),
    ...getFilteredData(selectedData, issueData),
    ...getFilteredData(selectedData, newContract),
    ...getFilteredData(selectedData, expiredContract),
  ];

  return {
    All: allData,
    Amendments: getFilteredData(selectedData, amendementData),
    Issues: getFilteredData(selectedData, issueData),
    "New Contracts": getFilteredData(selectedData, newContract),
    "Expired Contracts": getFilteredData(selectedData, expiredContract),
  };
}
