import { useState, useEffect } from "react";
import axios from 'axios';
import icon from "../assets/images/header/icon.png"
import { IconGroup, Icon, TopBar, HeaderWrapper, ModalContainer, Heading, Description } from "../style/dashboardStyle";
import CommonDropdown from "../components/ui/CommonDropDown";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../redux/dashboardSlice";
import CommonModal from "../components/ui/commonModal";
import TooltipWrapper from "../components/ui/TooltipWrapper";
import { aboutDesc } from "../mockdata/mockdata";
import { getTimeDifferencee } from "../commonFunction/commonfunction";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

function Header({ options, selected, handleDropdownChange }) {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);
  const [businessData, setBusinessAreaData] = useState();
  const [lastRefreshTime, setLastRefrestData] = useState();
  const [result, setResult] = useState();
  const [, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const WG018 = dashboardData?.dashboard?.WG018;
  const { businessAreaName, owner, description } = businessData || {};
  const index = options.indexOf("Global-Dashboard");

  if (index > -1) {
    // Remove it from current position
    options.splice(index, 1);
    // Add it at the 0th position
    options.unshift("Global-Dashboard");
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(fetchDashboardData({
            business_area: selected,
            layout: 'Cs_Layout',
          })),
          axios.get(
            `${API_BASE_URL}/Dashboard/scheduler?baName=${encodeURIComponent(selected)}`
          ).then(res => {
            setLastRefrestData(res.data)
            // dispatch to Redux if needed
          })
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dispatch, selected]);

  useEffect(() => {
    if (lastRefreshTime?.lastRun) {
      const diff = getTimeDifferencee(lastRefreshTime.lastRun);
      setResult(diff);
    }
  }, [lastRefreshTime]);

   useEffect(() => {
  if (!selected) return; // avoid unnecessary call

  // reset old data
  setBusinessAreaData(undefined);

  // if it's Global-Dashboard, skip API and hardcode
  if (selected === "Global-Dashboard") {
    setBusinessAreaData({
      businessAreaName: "Global-Dashboard",
      owner: "Admin user", // 👈 put your hardcoded values
      description: "This dashboard provides a global overview of business areas.",
    });
    return;
  }

  // otherwise call API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/get-ba-description`,
        {
          params: { businessAreaName: selected },
        }
      );
      setBusinessAreaData(response.data);
    } catch (e) {
      console.error("Error fetching business area data:", e);
    }
  };

  fetchData();
}, [selected]);


  return (
    <>
      <HeaderWrapper>
        <TopBar>
          <CommonDropdown
            options={options}
            selectedValue={selected}
            onChange={handleDropdownChange}
            name="framework"
            dynamicWidth="324px"
          />
          <IconGroup>
            <CommonModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              title="About Business Area"
              size="xl"
              customClass="custom-width-modal"
            >
              {/* {businessData && businessData.map((data, key) => { */}
                {/* return <div> */}
                  <ModalContainer>
                    <div style={{ width: '416px' }}>
                      <Heading>Business Area Name</Heading>
                      <Description>{businessAreaName}</Description>
                    </div>
                  </ModalContainer>
                  <ModalContainer>
                    <div>
                      <Heading>Owner</Heading>
                      <Description>{owner}</Description>
                    </div>
                  </ModalContainer>
                  <ModalContainer>
                    <div>
                      <Heading>Description</Heading>
                      <Description>{description}</Description>
                    </div>
                  </ModalContainer>
                {/* </div> */}
              {/* })} */}
            </CommonModal>
            <div className="center-item">
              {result && (
                <div className="spaceright textSize" style={{ color: "gray" }}>
                  Last Update{" "}
                  {result.days > 0 && `${result.days}d `}
                  {result.hours > 0 && `${result.hours}h `}
                  {result.minutes > 0 && `${result.minutes}m `} 
                  {result.seconds > 0 && `${result.seconds}s`} ago
                </div>
              )}
              <TooltipWrapper title={aboutDesc} placement="top" customClass="my-tooltip">
                <Icon src={icon} alt="refresh" onClick={() => setShowModal(true)} />
              </TooltipWrapper>
            </div>
          </IconGroup>
        </TopBar>
      </HeaderWrapper>
    </>
  )
}

export default Header;