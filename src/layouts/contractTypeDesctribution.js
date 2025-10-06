import { useState } from 'react';
import ContractHeader from "../components/ui/contractheader";
import { countData } from "../commonFunction/commonfunction"
import { CounterpartToolbar } from "../style/counterpartyStyle";
import { contractType } from "../mockdata/mockdata";
import Button from "../components/ui/Button";
import { CommonHorizontalBarChart } from '../components/ui/CommonHorizontalBarChart';
import ContractTypeChart from '../components/ui/ContractTypeChart';
import NoDataAvailable from '../components/ui/NoDataAvailable';
import { PieChartContractType } from '../components/ui/piechart';

function ContractTypeDesctribution({ constractTypeDestribution }) {
    const contractTypeDetal = constractTypeDestribution?.Data?.Contract_details;
    const [activeBtn, setActiveBtn] = useState("Contracts Count by Type");
    // const contractTypeData = contractTypeDetal && contractTypeDetal.map(value => value.ContractType);
    const contractTypeData = contractTypeDetal && contractTypeDetal.map(item => ({
        contractType: item.ContractType || 'Unknown', // fallback if empty
        contractTitle: item.ContractTitle || 'Not Specified',
        counterparty: item.Counterparty || "-",
        createdBy: item.CreatedBy || "-",
        createdDate:item.Created || "-",
        status: item.Status || "-",
        rowKey: item.RowKey
    }));

    

    const detailsData = contractTypeData && contractTypeData.reduce((acc, item) => {
        const { contractType, contractTitle, counterparty, createdBy,  status, createdDate,  rowKey } = item;
        if (!acc[contractType]) {
            acc[contractType] = [];
        }
        acc[contractType].push({ contractType, contractTitle, counterparty, createdBy,  status, createdDate,  rowKey  });
        return acc;
    }, {});

    const groupedArray = detailsData && Object.entries(detailsData).map(([contractType, contracts]) => ({
        contractType,
        contracts, // array of { ContractTitle, RowKey }
        count: contracts.length // optional: number of contracts per type
    }));

    const { labels, datasets, groupedContracts} = ContractTypeChart(contractTypeDetal);
    
    const onClickHandel = (data) => {
        setActiveBtn(data);
    }

    if (constractTypeDestribution && constractTypeDestribution.length === 0) {
        return <div className="graph-skeleton large" />
    }

    return (
        <div className="renewaltype-container">
            <ContractHeader heading="Contract Type Distribution" desc="This chart displays the distribution of contracts by type and status. Use the tabs to switch between viewing the count of contracts by type or by status. This helps you track contract diversity and volume." />
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
                        <PieChartContractType filterbar="Contracts Count by Type" counterPartyData={groupedArray} />

                        :
                        <CommonHorizontalBarChart
                            labels={labels}
                            datasets={datasets}
                            title="Top 5 Contract Types by Status"
                             groupedContracts={groupedContracts}
                        />
                    }
                </div>
            )}

        </div>
    )
}

export default ContractTypeDesctribution