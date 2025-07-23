import React, { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { DashboardContainer, MainContainer } from "../../style/dashboardStyle";
import UpcomingMilestone from '../../layouts/UpcomingMilestone';
import RecentActivity from '../../layouts/RecentActivity';
import { keysToInclude } from '../../mockdata/mockdata';
import Skeleton from '../skeleton';
const CounterParty = lazy(() => import('../../layouts/counterparty'));
const ContractStack = lazy(() => import('../../layouts/contractstack'));
const ContractRenewal = lazy(() => import('../../layouts/contractrenewal'));
const RenewalType = lazy(() => import('../../layouts/renewaltype'));
const ContractTypeDesctribution = lazy(()=>import('../../layouts/contractTypeDesctribution'))
const UpComingObligation = lazy(()=>import('../../layouts/upcomingobligation'));

const SaleBusinessAreaDashboard = ({cardContainer}) =>{
      const [counterPartyData, setCounterPartyData] = useState();
      const [renewalType, setRenewalType] = useState();
      const [constractTypeDestribution, setContractTypeDestribution] = useState();
      const [upcomingObligation, setUpcomingObligation] = useState(); 
      const [upComingMilestone, setUpcomingMilestone] = useState();
      const [selectCard, setSelectCard] = useState();
      const [view, setView] = useState({ type: "chart", cardSelected: "Renewals Breakdown 0-30 Days" });
      const WG008 = cardContainer?.WG008;
      const WG007 = cardContainer?.WG007;
      const WG013 = cardContainer?.WG013;
      const WG009 = cardContainer?.WG009;
      const WG010 = cardContainer?.WG010;
      const WG012 = cardContainer?.WG012;
     
      useEffect(() => {
    
           if (!cardContainer) return;
    
            if (WG007?.Result?.Data) {
             setRenewalType(WG007?.Result?.Data);
           }
        
           if (WG008?.Result?.Data?.RecentCounterpartyList) {
             setCounterPartyData(WG008.Result.Data.RecentCounterpartyList);
           }
    
           if (WG009?.Result?.Data.Contract_details) {
             setContractTypeDestribution(WG009?.Result?.Data.Contract_details);
           }
    
           if (WG010?.Result?.Data) {
             setUpcomingObligation(WG010?.Result?.Data);
           }
           
    
          if (WG012?.Result?.Data) {
             setUpcomingMilestone(WG012?.Result?.Data);
           }
          
    
            if (WG013?.Result?.Data) {
          const firstKey = Object.keys(WG013.Result.Data)[0];
          setSelectCard(firstKey);
        }
     
      }, [cardContainer]);
    
        const contractStack = useMemo(() => {
        return Object.entries(cardContainer || {})
          .filter(([key]) => keysToInclude.includes(key))
          .map(([_, value]) => value);
      }, [cardContainer]);
      if (!cardContainer) return <Skeleton  height="60px" width="100%" count={3}/>;
    return(<>
          <ContractRenewal carddata={WG013?.Result?.Data || {}} />
                
                <div className='inbetween-item' style={{ gap: "16px" }}>
                  <RenewalType renewalType={renewalType}/>
                  <CounterParty counterPartyData={counterPartyData} />
                </div>
                <div className='inbetween-item' style={{ gap: "16px" }}>
                  <ContractTypeDesctribution constractTypeDestribution={constractTypeDestribution}/>
                  <UpComingObligation upcomingObligation={upcomingObligation} />
                </div>
                 <div className='inbetween-item' style={{ gap: "16px" }}>
                  <RecentActivity counterPartyData={counterPartyData} /> 
                  <UpcomingMilestone upComingMilestone={upComingMilestone}/>
                </div>
                <ContractStack contractStack={contractStack} />
    </>);
}

export default SaleBusinessAreaDashboard