import {lazy, Suspense  } from 'react';
import {Skeleton} from '../skeleton';
const ContractRenewal = lazy(() => import('../../layouts/contractrenewal'));
const RenewalType = lazy(() => import('../../layouts/renewaltype'));
const CounterParty = lazy(() => import('../../layouts/counterparty'));
const ContractTypeDesctribution = lazy(() => import('../../layouts/contractTypeDesctribution'));
const UpComingObligation = lazy(() => import('../../layouts/upcomingobligation'));
const RecentActivity = lazy(() => import('../../layouts/RecentActivity'));
const UpcomingMilestone = lazy(() => import('../../layouts/UpcomingMilestone'));
const ContractStack = lazy(() => import('../../layouts/contractstack'));

const SaleBusinessAreaDashboard = ({businessAreaReadData,amendementData, issueData, newContract, expiredContract, combinedData,setSelectedData, dataMap, milestoneData, obligationData, contractTypeData, contractRenewalData, contractRenewalTypeData, counterPartyData, cardContainer, selected }) => {

  return (
   <>
       <Suspense fallback={<Skeleton height="60px" width="100%" count={1} />}> 
        <ContractRenewal carddata={contractRenewalData} />
       </Suspense>

       <div className='inbetween-item' style={{ gap: "16px" }}>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <RenewalType renewalType={contractRenewalTypeData} selectedDropdown={selected}/>
        </Suspense>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <CounterParty counterPartyData={counterPartyData} />
        </Suspense>
      </div>

      <div className='inbetween-item' style={{ gap: "16px" }}>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <ContractTypeDesctribution constractTypeDestribution={contractTypeData} />
        </Suspense>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <UpComingObligation upcomingObligation={obligationData} selected={selected} businessAreaRead={businessAreaReadData} />
        </Suspense>
      </div>

      <div className='inbetween-item' style={{ gap: "16px" }}>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <RecentActivity dataMap={dataMap} setSelectedData={setSelectedData} expiredContract={expiredContract} newContract={newContract} amendementData={amendementData} issueData={issueData}/>
        </Suspense>
        <Suspense fallback={<Skeleton height="60px" width="48%" />}>
          <UpcomingMilestone upComingMilestone={milestoneData} selected={selected} businessAreaRead={businessAreaReadData}/>
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton height="60px" width="100%" />}>
        <ContractStack contractStack={combinedData} />
      </Suspense> 
    </>
  );
};

export default SaleBusinessAreaDashboard;
