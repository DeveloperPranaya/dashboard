import React,{useState} from 'react';
import ContractHeader from "../components/ui/contractheader";
import HorizontalBarChart from "../components/ui/horizontalBarChart";
import {CounterpartToolbar} from "../style/counterpartyStyle";
import {contractType} from "../mockdata/mockdata";
import Button from "../components/ui/Button";
function ContractTypeDesctribution({constractTypeDestribution}){ 
    const [activeBtn, setActiveBtn] = useState("Status Count by Type");
       const onClickHandel = (data) => {
        setActiveBtn(data);
    }
    return(
         <div className="renewaltype-container"> 
            <ContractHeader heading="Contract type Distibution"/>
            <CounterpartToolbar>
                        <div className='toolbar-counterparty'>
                            {contractType.map((value, key) => {
                                return <Button children={value.name} active={activeBtn === value.name} key={key} onClick={() => onClickHandel(value.name)} />
                            }
                            )}
                        </div>
                    </CounterpartToolbar>
            <div className="commoncontractbody">
               <HorizontalBarChart constractTypeDestribution={constractTypeDestribution}/>
            </div>
        </div>
    )
}

export default ContractTypeDesctribution