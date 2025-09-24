import { useState } from 'react';
import ContractHeader from "../components/ui/contractheader";
import { countData } from "../commonFunction/commonfunction"
import { CounterpartToolbar } from "../style/counterpartyStyle";
import { contractType } from "../mockdata/mockdata";
import Button from "../components/ui/Button";
import { CommonHorizontalBarChart } from '../components/ui/CommonHorizontalBarChart';
import ContractTypeChart from '../components/ui/ContractTypeChart';
import NoDataAvailable from '../components/ui/NoDataAvailable';
import PieChart from '../components/ui/piechart';

function ContractTypeDesctribution({ constractTypeDestribution }) {
    const contractTypeDetal = constractTypeDestribution?.Data?.Contract_details;
    const [activeBtn, setActiveBtn] = useState("Contracts Count by Type");
    const contractTypeData = contractTypeDetal && contractTypeDetal.map(value => value.ContractType);
    const detailsData = (contractTypeData && contractTypeData.length > 0)
        ? countData(contractTypeData, { includeUnknown: true })
        : {}; 
    const { labels, datasets } = ContractTypeChart(contractTypeDetal);
    const onClickHandel = (data) => {
        setActiveBtn(data);
    }

    if(constractTypeDestribution && constractTypeDestribution.length === 0){
          return <div className="graph-skeleton large" />
        }

    return (
        <div className="renewaltype-container">
            <ContractHeader heading="Contract Type Distribution" desc="Displays the distribution of contracts by type (e.g., Sales Agreement, Dealer Contract) and optionally by status. Helps track contract diversity and volume." />
            <CounterpartToolbar>
                <div className='toolbar-counterparty'>
                    {contractType.map((value, key) => {
                        return <Button children={value.name} active={activeBtn === value.name} key={key} onClick={() => onClickHandel(value.name)} />
                    }
                    )}
                </div>
            </CounterpartToolbar>
            {Object.keys(detailsData).length === 0 || detailsData.length === 0 ? (
                <NoDataAvailable />
            ) : (
                <div className="commoncontractbody">
                    {activeBtn === "Contracts Count by Type" ?
                        <PieChart filterbar="Contracts Count by Type" counterPartyData={detailsData} /> :
                        <CommonHorizontalBarChart
                            labels={labels}
                            datasets={datasets}
                            title="Top 5 Contract Types by Status"
                        />
                    }
                </div>
            )}

        </div>
    )
}

export default ContractTypeDesctribution