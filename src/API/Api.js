import { toast } from 'react-toastify';
import axios from "axios";
import { apiSummeryAPI } from "../mockdata/mockdata";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

export const updateMileStoneStatus = async (secondaysRowKey, contractId, api, statusKey,
  statusValue = "Complete") => {

  try {
    const response = await axios.put(api,
      {
        "_SecondaryRowKey": secondaysRowKey,
        "contractID": contractId,
        [statusKey]: statusValue,
      }
    );
   toast.success(`${response?.data?.message}.`);
    return response.data;
  } catch (e) {
    console.log("error:-", e)
  }

}

export const getBusinessAreas = async () => {
  const token = localStorage.getItem("token");
  const searchParams = new URLSearchParams(window.location.search);
  const rowKey = searchParams.get("rowKey");
  const userName = searchParams.get("userName");

  let businessAreasUrl;
  let userUrl;

  if (!rowKey || !userName) {
    businessAreasUrl =
      `${API_BASE_URL}/Dashboard/business-areas?rowKey=THEOEXvz&userName=Santosh%20Dutta`;
    // userUrl =
      // `${API_BASE_URL}/Dashboard/load-user?rowKey=l6M1dQ9d&userName=Samee%20Ahmad`;
  } else {
    businessAreasUrl = `${API_BASE_URL}/Dashboard/business-areas?rowKey=${rowKey}&userName=${encodeURIComponent(userName)}`;
    // userUrl = `${API_BASE_URL}/Dashboard/load-user?rowKey=${rowKey}&userName=${encodeURIComponent(userName)}`;
  }

  try {
    // Call both APIs in parallel
    const [businessAreasResponse, userResponse] = await Promise.all([
      axios.get(businessAreasUrl, { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(userUrl, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    return {
      businessAreas: businessAreasResponse.data,
      // user: userResponse.data,
    };
  } catch (error) {
    console.error("Error fetching APIs:", error);
    throw error;
  }
};



export const apiSummery = async (secondaysRowKey, contractId, api, statusKey,
  statusValue = "Complete") => {
  try {
    const response = await axios.put(apiSummeryAPI,
      {
        "contractId": "C-2025-001",
        "primaryData": {
          "ContractTitle": "Dental Services Agreement",
          "Parties": [
            "Acme Dental Corp.",
            "Bright Smiles Insurance"
          ],
          "EffectiveDate": "2024-01-01",
          "TermEndDate": "2024-12-31",
          "RenewalType": "Manual",
          "AutoRenewal": false,
          "ContractValue": 150000,
          "Status": "Active"
        },
        "additionalData": {}

      }
    );
    return response.data;
  } catch (e) {
    console.log("error:-", e)
  }

}




