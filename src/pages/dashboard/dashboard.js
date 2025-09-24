import { lazy, Suspense, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DashboardContainer, MainContainer } from "../../style/dashboardStyle";
import { fetchWidgetData, resetWidgets } from "../../redux/fetchWidgetDataSlice";
import { Skeleton } from "../skeleton";
import DashboardContent from "../../components/ui/DashboardContent";
import useBusinessArea from "../../hooks/useBusinessArea";
import buildDataMap from "../../components/ui/DataMapper.js";

const Navbar = lazy(() => import("../../layouts/navbar"));
const Header = lazy(() => import("../../layouts/header"));
const SaleBusinessAreaDashboard = lazy(() => import("./SaleBusinessAreaDashboard"));

const CRITICAL_LAYOUTS = ["WG001", "WG003", "WG006"];
const HEAVY_LAYOUTS = ["WG013", "WG007", "WG008", "WG009", "WG010", "WG012", "WG014", "WG015", "WG016", "WG017"];

function Dashboard() {
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state?.dashboardfetchData?.widgets);
  const cardContainer = useSelector((state) => state?.dashboard?.data?.dashboard);
  const { selected, setSelected, activeBA, businessAreaData, dropdownDataset, businessAreaReadData } = useBusinessArea();
  const [selectedData, setSelectedData] = useState("All Activity");

  // DataMap memoized
  const dataMap = useMemo(() => buildDataMap(widgets, selectedData), [selectedData, widgets]);

  // Fire widgets when selected BA changes
  useEffect(() => {
    if (!selected) return;

    // Clear previous widgets immediately
    dispatch(resetWidgets());

    [...CRITICAL_LAYOUTS, ...HEAVY_LAYOUTS].forEach((layout) => {
      dispatch(fetchWidgetData({ business_area: selected, layout }));
    });
  }, [selected, dispatch]);

  // Update URL param
  useEffect(() => {
    if (selected) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("businessArea", selected);
      const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selected]);

  if (!activeBA) return <Skeleton height="60px" width="100%" count={3} />;

  return (
    <DashboardContainer>
      <Suspense fallback={<Skeleton height="60px" width="100%" count={3} />}>
        <Navbar cardContainer={cardContainer} dropdownDataset={dropdownDataset} />
        <MainContainer>
          <Header options={businessAreaData} selected={selected} handleDropdownChange={(e) => {
            const value = e.target.value;
            setSelected(value);
            dispatch(resetWidgets());
          }} />
          <SaleBusinessAreaDashboard
            userType={{}}
            businessAreaReadData={businessAreaReadData}
            expiredContract={widgets["WG017"]?.output?.Result?.Data?.Contracts_Expired ?? []}
            newContract={widgets["WG016"]?.output?.Result?.Data?.Contracts_New ?? []}
            amendementData={widgets["WG014"]?.output?.Result?.Data ?? []}
            issueData={widgets["WG015"]?.output?.Result?.Data ?? []}
            combinedData={[widgets["WG001"]?.output ?? [], widgets["WG003"]?.output ?? [], widgets["WG006"]?.output ?? []].filter(Boolean)}
            milestoneData={widgets["WG012"]?.output?.Result ?? []}
            obligationData={widgets["WG010"]?.output?.Result ?? []}
            contractTypeData={widgets["WG009"]?.output?.Result ?? []}
            counterPartyData={widgets["WG008"]?.output?.Result?.Data ?? []}
            contractRenewalData={widgets["WG013"]?.output?.Result?.Data ?? []}
            contractRenewalTypeData={widgets["WG007"]?.output?.Result?.Data ?? []}
            selected={selected}
            dataMap={dataMap}
          />
          <DashboardContent business_area={selected} />
        </MainContainer>
      </Suspense>
    </DashboardContainer>
  );
}

export default Dashboard;

