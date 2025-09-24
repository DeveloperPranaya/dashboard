import React, { useState, useEffect } from "react";
import { ButtonContainer } from "../style/dashboardStyle";
import { useDispatch } from "react-redux";
import { dropDownData } from "../redux/dropdownSlice";
import { dropdownData } from "../mockdata/mockdata";
import { mapFrequencyToOption } from "../commonFunction/commonfunction";
import {
  SettingData,
  SettingItem,
  Refrestcontainer,
  RefreshImage,
  SettingContainer,
  SettingMainContainer,
  DashboardSettingContainer,
  DashBoardContainer,
  HeadingItem,
  BorderHighlight,
  RefrestcontainerDeactive
} from "../style/DashboardSettingStyle";
import InformationDescription from "../components/ui/InformationDescription";
import {
  businessAreaSetting,
  globalAutoRefreshSetting,
} from "../mockdata/mockdata";
import { GraphSkeleton } from "../style/ActivityDetailGraphStyle";
import CommonDropdown from "../components/ui/CommonDropDown";
import RefreshIcon from "../assets/images/topnavbar/ionicons-refresh.png";
import CloseButton from "../assets/images/topnavbar/closeButton.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusinessAreaMultiDropDown from "../components/ui/BusinessAreaMultiDropDown";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

function DashboardSetting({ handleClose ,  dropdownDataset}) {
  const dispatch = useDispatch();
  const [globalDropdownData, setGlobalDropdownData] = useState({ frequency: 0, frequencyType: "", manualRefresh: false });
  const [businessDropdownData, setBusinessDropdownData] = useState({ frequency: 0, frequencyType: "", manualRefresh: false });
  const [globalFrequency, setGlobalFrequency] = useState("");
  const [businessAreaDataFrequency, setBusinessAreaFrequency] = useState("");
  const [multiSelectValues, setMultiSelectValues] = useState([]);
  const [individualBA, setIndividualBA] = useState();
  const bName = individualBA && individualBA.map(data => data.baName);
  const [disabledButtons, setDisabledButtons] = useState({
    global: false,
    business: false,
  });

  const startCooldown = (key) => {
    setDisabledButtons(prev => ({ ...prev, [key]: true }));

    setTimeout(() => {
      setDisabledButtons(prev => ({ ...prev, [key]: false }));
    }, 300000); // 5 minutes = 300,000 ms
  };

  useEffect(() => {
    setGlobalFrequency(mapFrequencyToOption(globalDropdownData.frequency, globalDropdownData.frequencyType));
  }, [globalDropdownData]);

  useEffect(() => {
    setBusinessAreaFrequency(mapFrequencyToOption(businessDropdownData.frequency, businessDropdownData.frequencyType));
  }, [businessDropdownData]);


  const updateFrequency = async (selectedValue, baName) => {
    const value = selectedValue
      .replace(/Every\s*/i, "")
      .replace(/\(Default\)/i, "")
      .replace(/\s+/g, "");

    try {
      const response = await fetch(
        `${API_BASE_URL}/Dashboard/update-frequency`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            baName: baName,
            lapDuration: value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      toast.error(`❌ Error updating frequency for ${baName}`);
      console.error(`Error updating frequency for ${baName}:`, error);
    }
  };

  // Run all API calls on Submit
  const handleSubmitAll = async () => {
    const tasks = [];

    if (globalFrequency) {
      tasks.push(updateFrequency(globalFrequency, "Global-Dashboard"));
      // tasks.push(updateRefresh("Global-Dashboard"));
    }

    if (businessAreaDataFrequency) {

      tasks.push(updateFrequency(businessAreaDataFrequency, "AllBusinessAreas"));
      // tasks.push(updateRefresh("AllBusinessArea"));
    }


    await Promise.all(tasks);

    toast.success("✅ Settings updated successfully!");

    setTimeout(() => {
      dispatch(dropDownData());
      handleClose();
    }, 2000); // 0.8s delay so toast is visible first

  };


  const updateRefresh = async (baName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Dashboard/set-manual-refresh`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            "baNames": [
              baName
            ],
            "manualRefresh": true
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success(`Refresh successful for ${baName}`);
    } catch (error) {
      toast.error(`❌ Error in Refreshment ${baName}`);
      console.error(`Error updating frequency for ${baName}:`, error);
    }
  };

  const handleGlobalRefresh = () => {
    // updateRefresh("Global-Dashboard");
      if (disabledButtons.global) return; // already cooling down
    updateRefresh("Global-Dashboard");
    startCooldown("global");
  };

  const handleBusinessAreaRefresh = () => {
    // updateRefresh("AllBusinessArea");
    if (disabledButtons.business) return; // already cooling down
    updateRefresh("AllBusinessArea");
    startCooldown("business");
  };

  const individualBusinessAreaRefresh = (data) => {
    updateRefresh(data);
  }



  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [globalRes, businessRes] = await Promise.all([
          fetch(`${API_BASE_URL}/Dashboard/get-ba-frequency?baType=Global-Dashboard`),
          fetch(`${API_BASE_URL}/Dashboard/get-ba-frequency?baType=All-BusinessArea`)
        ]);

        const [globalData, businessData] = await Promise.all([
          globalRes.json(),
          businessRes.json()
        ]);
        setGlobalDropdownData({ frequency: globalData.frequency, frequencyType: globalData.frequencyType, manualRefresh: globalData.manualRefresh });
        setBusinessDropdownData({
          frequency: businessData[0]?.frequency,
          frequencyType: businessData[0]?.frequencyType,
          manualRefresh: businessData[0].manualRefresh
        });
        setIndividualBA(businessData);

      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);


  return (
    <DashBoardContainer style={{ marginTop: "250px" }}>
      <DashboardSettingContainer>
        <HeadingItem>
          <div>
            Kozmo Dashboard Setting
          </div>
          <img src={CloseButton} alt="closeItem" onClick={handleClose} />

        </HeadingItem>
        <BorderHighlight />

        <SettingData dynamicHeight="200px">
          <SettingItem>
            Business Area(s) Display Setting
            <InformationDescription title={businessAreaSetting} />
          </SettingItem>
          {/* { (Object.keys(cardContainer || {}).length > 0) ?
          <GraphSkeleton height="100px" />
          : */}
          <div style={{ marginBottom: "120px" }}>
           <BusinessAreaMultiDropDown dropdownDataset={dropdownDataset}/>
          </div>
          {/* } */}
          
        </SettingData>

        <SettingData>
          <SettingItem>
            Global Auto-Refresh Setting
            <InformationDescription title={globalAutoRefreshSetting} />
          </SettingItem>
          <div>
            <CommonDropdown
              options={dropdownData}
              selectedValue={globalFrequency}
              onChange={(e) => setGlobalFrequency(e.target.value)}
              dynamicWidth="100%"
              dynamicHeight="32px"
              dynamicBackground="#fff"
              dynamicBorder="1px solid #E7E7E8"
              dynamicfontWight="400"
              dynamicFont="14px"
              dynamicLineHeight="24"
            />
            <div style={{ display: "flex" }}  onClick={handleGlobalRefresh}>
            {disabledButtons.global ? <RefrestcontainerDeactive>Refresh Now</RefrestcontainerDeactive> : <Refrestcontainer>Refresh Now</Refrestcontainer>}
              <RefreshImage src={RefreshIcon} alt="refresh"/>
            </div>
             <div style={{fontSize:"11px"}}>{disabledButtons.global ? "Please wait 5 minutes to refresh again" : ""}</div>
          </div>
        </SettingData>

        <SettingData>
          <SettingItem>Business Area Auto-Refresh Setting</SettingItem>
          <div>
            <CommonDropdown
              options={dropdownData}
              selectedValue={businessAreaDataFrequency}
              onChange={(e) => setBusinessAreaFrequency(e.target.value)}
              dynamicWidth="100%"
              dynamicHeight="32px"
              dynamicBackground="#fff"
              dynamicBorder="1px solid #E7E7E8"
              dynamicfontWight="400"
              dynamicFont="14px"
              dynamicLineHeight="24"
            />
            <div style={{ display: "flex" }} onClick={handleBusinessAreaRefresh}>
            {disabledButtons.business ? <RefrestcontainerDeactive>Refresh Now</RefrestcontainerDeactive> : <Refrestcontainer>Refresh Now</Refrestcontainer>}  
              <RefreshImage src={RefreshIcon} alt="refresh"  />
            </div>
           
            <div style={{fontSize:"11px"}}> {disabledButtons.business
          ? "Please wait 5 minutes to refresh again"
          : ""}</div> 
          </div>

        </SettingData>

        <SettingData>
          <SettingItem>Individual Business Area Auto-Refresh Setting</SettingItem>
          <div>
            <CommonDropdown
              options={bName}
              selectedValue={businessAreaDataFrequency}
              onChange={(e) => setBusinessAreaFrequency(e.target.value)}
              dynamicWidth="100%"
              dynamicHeight="32px"
              dynamicBackground="#fff"
              dynamicBorder="1px solid #E7E7E8"
              dynamicfontWight="400"
              dynamicFont="14px"
              dynamicLineHeight="24"
              placeholder="Select Business Area"
            />

            <div style={{ display: "flex" }} onClick={() => individualBusinessAreaRefresh(businessAreaDataFrequency)}>
              <Refrestcontainer>Refresh Now</Refrestcontainer>
              <RefreshImage src={RefreshIcon} alt="refresh"  />
            </div>
          </div>

        </SettingData>

        {/* Submit Button */}
        <SettingMainContainer>
          <SettingContainer
            onClick={handleSubmitAll}
          >
            Save Changes
          </SettingContainer>
          <ButtonContainer
            dynamicBackground="white"
            dynamicColor="black"
            dynamicFontSize="14px"
            dynamicFontWeight="600"
            onClick={handleClose}
          >
            Cancel
          </ButtonContainer>
        </SettingMainContainer>

        <ToastContainer
          toastClassName="toast-custom"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </DashboardSettingContainer>
    </DashBoardContainer>
  );
}

export default DashboardSetting;
