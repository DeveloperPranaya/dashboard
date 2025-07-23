import React, {lazy} from 'react';
import { useSelector } from 'react-redux';
import { DashboardContainer, MainContainer } from "../../style/dashboardStyle";
import Skeleton from '../skeleton';
import SaleBusinessAreaDashboard from './SaleBusinessAreaDashboard';
const Navbar = lazy(() => import('../../layouts/navbar'));
const Header = lazy(() => import('../../layouts/header'));

function Dashboard() {
  const { data: cardContainer } = useSelector((state) => state.dashboard);
  console.log("cardContainer:-",cardContainer)

  return (
    <DashboardContainer>
      <Navbar />
      <MainContainer>
        <Header />
        {cardContainer ?  <SaleBusinessAreaDashboard cardContainer={cardContainer}/>:
           <Skeleton  height="60px" width="100%" count={3}/>
        }
      </MainContainer>
    </DashboardContainer>
  )
}

export default Dashboard