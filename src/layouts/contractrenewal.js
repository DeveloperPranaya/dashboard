import React, { useEffect, useState, useMemo } from 'react';
import Card from "../components/ui/card";
import ToggleButton from "../components/ui/togglebutton";
import Button from "../components/ui/Button";
import CommonTable from "../components/ui/CommonTable";
import BarChart from "../components/ui/barchart";
import { dashboardbtn, tableHeaders } from '../mockdata/mockdata';
import {ContractsBarChart, ContractViewBarChart} from '../components/ui/ContractsBarChart';
import SearchFilter from '../style/newpage';
import {
  ContractRenewalBody,
  ContractRenewalTitle,
  ToolbarMain,
  ContractRenewalBarChart,
  ButtonContainer,
} from "../style/contractrenewalStyle";

function ContractRenewal({ carddata }) {
  const firstCardKey = useMemo(() => Object.keys(carddata || {})[0], [carddata]);
  const [selectCard, setSelectCard] = useState(firstCardKey);
  const [activeBtn, setActiveBtn] = useState("Contract View");
  console.log("activeBtn:-",activeBtn)
  const [viewType, setViewType] = useState({ type: "graph" });
   const filterData = Object.entries(carddata).filter(([key, values]) => {
        return key === selectCard
    })
const details = filterData[0]?.[1]?.details;

console.log("details:-",details);
  const onClickHandel = (data) => {
        setActiveBtn(data);
    }
 
  useEffect(() => {
    if (firstCardKey) {
      setSelectCard(firstCardKey);
    }
  }, [firstCardKey]);

  const handleCardClick = (key) => {
    setSelectCard(key);
  };

  return (
    <ContractRenewalBody>
      <ContractRenewalTitle>Contract Renewals</ContractRenewalTitle>

      <Card
        carddata={carddata}
        onCardClick={handleCardClick}
        selectCard={selectCard}
      />
      <ToolbarMain>
        <ButtonContainer>
          <ToggleButton
            setView={setViewType}
            // setView={({ type }) => setViewType(type)}
            view={viewType}
            visibleButtons={['graph', 'table']}
          />

          <div className="toolbar">
            {dashboardbtn.map((value, key) => (
              <Button children={value.name} active={activeBtn === value.name} key={key} onClick={() => onClickHandel(value.name)} />
            ))}
          </div>
        </ButtonContainer>

        {/* {viewType.type === 'table' ? (
          <CommonTable
            headers={tableHeaders}
            data={carddata}
            selectCard={selectCard}
          />
        ) : (
          <ContractRenewalBarChart>
            <BarChart individualCardData={details} selectedCard={selectCard} />
          </ContractRenewalBarChart>
        )} */}

         {viewType.type === 'table' ? (
          <CommonTable
            headers={tableHeaders}
            data={carddata}
            selectCard={selectCard}
          />
        ) : activeBtn  === "Renewal Type"?
         (
          <ContractRenewalBarChart>
            <ContractViewBarChart individualCardData={details}/>
            {/* <BarChart individualCardData={details} selectedCard={selectCard} /> */}
          </ContractRenewalBarChart>
        )
        :(
          <ContractRenewalBarChart>
            <ContractsBarChart individualCardData={details}/>
            {/* <BarChart individualCardData={details} selectedCard={selectCard} /> */}
          </ContractRenewalBarChart>
        )}
      </ToolbarMain>
    </ContractRenewalBody>
  );
}

export default ContractRenewal;
