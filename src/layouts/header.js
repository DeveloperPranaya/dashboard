import React, { useState, useEffect } from "react";
import downloadImg from "../assets/images/header/download.png";
import refreshImg from "../assets/images/header/refresh.png";
import icon from "../assets/images/header/icon.png"
import { IconGroup, Icon, TopBar, HeaderWrapper, ModalContainer, Heading, Description } from "../style/dashboardStyle";
import CommonDropdown from "../components/ui/CommonDropDown";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../redux/dashboardSlice";
import CommonModal from "../components/ui/commonModal";

function Header() {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('Global-Dashboard');
  const [showModal, setShowModal] = useState(false);
  const WG018 = dashboardData?.WG018;
  const businessData = WG018?.Result?.Data?.BAInfo;
  const businessHeading = WG018?.Result?.Data?.BAInfo;

const handleDropdownChange = async (e) => {
  
  const value = e.target.value;
  setSelected(value);
  setLoading(true); // Show loader

  try {
    await dispatch(fetchDashboardData({
      business_area: value,
      layout: 'Cs_Layout',
    }));
  } finally {
    setLoading(false); // Hide loader
  }
};


  useEffect(() => {
    if (dashboardData) {
      // console.log("Dashboard Data:", dashboardData);
    }
  }, [dashboardData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/dashboard/business-areas')
        const data = await response.json();
        setOptions(data)
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      <HeaderWrapper>
        <TopBar>
          <CommonDropdown
            label="Choose Framework"
            options={options}
            selectedValue={selected}
            onChange={handleDropdownChange}
            placeholder="Select a Business Area"
            name="framework"
          />
          <IconGroup>
            <CommonModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              title="About Business Area"
              size="xl"
              customClass="custom-width-modal"
            >
              {businessData && businessData.map((data) => {
                return <div>
                  <ModalContainer>
                    <div style={{ width: '416px' }}>
                      <Heading>Business Area Name</Heading>
                      <Description>{data.BusinessAreaName}</Description>
                    </div>
                    <div>
                      <Heading>Business Area Name</Heading>
                      <Description>{data.BusinessAreaName}</Description>
                    </div>
                  </ModalContainer>
                   <ModalContainer>
                    <div>
                      <Heading>Owner</Heading>
                      <Description>{data.Owner}</Description>
                    </div>
                  </ModalContainer>
                  <ModalContainer>
                    <div>
                      <Heading>Description</Heading>
                      <Description>{data.Description}</Description>
                    </div>
                  </ModalContainer>
                </div>
              })}
            </CommonModal>
            <Icon src={icon} alt="refresh" onClick={() => setShowModal(true)} />
            <Icon src={downloadImg} alt="download" />
            <Icon src={refreshImg} alt="refresh" />
          </IconGroup>
        </TopBar>
      </HeaderWrapper>
    </>
  )
}

export default Header;