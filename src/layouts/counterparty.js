import React, { useState, useEffect } from 'react';
import { counterparty } from "../mockdata/mockdata";
import Button from '../components/ui/Button';
import ItemList from '../components/ui/itemlist';
import PieChart from '../components/ui/piechart';
import ContractHeader from '../components/ui/contractheader';
import {CounterpartyContainer, CounterPartyToolContainer,CounterpartToolbar, SubToolbarCounterparty, Dropdown} from "../style/counterpartyStyle";
import "../style/counterparty.css";

function CounterParty({ counterPartyData }) {
    const [filterbar, setFilterbar] = useState("All");
    const [activeBtn, setActiveBtn] = useState("Country");
    const [filterData, setFilterData] = useState();
    const [view, setView] = useState({ type: "graph"});
    const onClickHandel = (data) => {
        setFilterbar(data.replaceAll(" ", ""))
        setActiveBtn(data);
    }

    const data = filterData
        ? counterPartyData.filter(item => item[filterbar] === filterData)
        : counterPartyData;

    useEffect(() => {
        setFilterData("");
    }, [filterbar]);

    return (
        <CounterpartyContainer className="renewaltype-container">
            <ContractHeader heading = "Counterparty Type Summary" visibleButtons={["list", "graph"]} setView={setView} view={view}/>
             <CounterPartyToolContainer>
                    <CounterpartToolbar>
                        <div className='toolbar-counterparty'>
                            {counterparty.map((value, key) => {
                                return <Button children={value.name} active={activeBtn === value.name} key={key} onClick={() => onClickHandel(value.name)} />
                            }
                            )}
                        </div>
                    </CounterpartToolbar>
                   {view.type !== "graph" && <CounterpartToolbar>
                        <SubToolbarCounterparty>Showing 1-15 counterparties (out of {data && data.length})</SubToolbarCounterparty>
                        <div className='counterpart-filter'>
                            <Dropdown value={filterData}  onChange={(e) => setFilterData(e.target.value)}>
                                <option value="">-- All --</option>
                                {[...new Set(counterPartyData && counterPartyData.map(item => item[filterbar]))].map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </Dropdown>
                        </div>
                    </CounterpartToolbar>
                   }
                </CounterPartyToolContainer>
            <div className='counterparty-body'>
                {view.type === "graph" ? <PieChart filterbar={filterbar} counterPartyData={counterPartyData}/>
                    : <ItemList data={data} />}
            </div>
        </CounterpartyContainer>
    )
}

export default CounterParty