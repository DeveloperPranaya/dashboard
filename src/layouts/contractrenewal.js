import { useEffect, useState, useMemo, lazy, Suspense, useCallback } from 'react';
import { dashboardbtn, contractRenewalInfo } from '../mockdata/mockdata';
import Iicon from "../assets/images/header/icon.png";
import TooltipWrapper from '../components/ui/TooltipWrapper';
import { filterByType, filterByValueRange, getHandleRenewalTypeClick } from "../commonFunction/commonfunction";
import {
  ContractRenewalBody,
  ContractRenewalTitle,
  ToolbarMain,
  ContractRenewalBarChart,
  ButtonContainer,
  LeftSection,
  CenterSection,
  EndSection
} from "../style/contractrenewalStyle";
import Card from "../components/ui/card";
import ToggleButton from '../components/ui/togglebutton';
import Button from '../components/ui/Button';
import CommonTable from '../components/ui/CommonTable';
import MultipleDropDown from '../components/ui/MultipleDropDown';
import ChartSwitcher from '../components/ui/ChartSwitcher';
import {GraphSkeleton} from "../style/ActivityDetailGraphStyle"


function ContractRenewal({ carddata }) {

  const firstCardKey = useMemo(() => Object.keys(carddata || {})[0], [carddata]);
  const [activeFilterTypes, setActiveFilterTypes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState([]);
  const [selectCard, setSelectCard] = useState(firstCardKey);
  const [activeBtn, setActiveBtn] = useState("Contract Value");
  const [viewType, setViewType] = useState({ type: "graph" });
  const [selectedRenewalTypes, setSelectedRenewalTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [counterpartyValue, setCounterPartyValue] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    renewal: [],
    region: [],
    counterparty: [],
    value: []
  });
  const [region, setRegion] = useState([]);

  const handleCardClick = (key) => {
    if (key !== selectCard) setSelectCard(key);
    if (activeDropdown.length) setActiveDropdown([]);
    if (selectedRenewalTypes.length) setSelectedRenewalTypes([]);
    setActiveFilters([]);
    setToggle(false);
  };

  const handleClearDropDown = () => {
    setActiveDropdown([]);
    setSelectedRenewalTypes([]);
    setActiveFilters([]);
  };

  const toggleDropdown = (btnName) => {
    setActiveDropdown(prev =>
      prev?.includes(btnName) ? prev.filter(item => item !== btnName) : [...(prev || []), btnName]
    );
  };

  const toggleSelectedTypes = (value) => {
    setSelectedTypes(prev =>
      prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
    );
  };

  const updateFilterTypes = (value, type) => {
    setActiveFilterTypes(prev =>
      selectedTypes.includes(value) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };


  const onClickHandle = (label) => setActiveBtn(label);

  const details = useMemo(() => {
    const filtered = Object.entries(carddata).filter(([key]) => key === selectCard);
    return filtered[0]?.[1]?.details || [];
  }, [carddata, selectCard]);

  const handleRenewalTypeClick = useCallback(
    getHandleRenewalTypeClick({
      toggleDropdown,
      toggleSelectedTypes,
      updateFilterTypes,
      filterByType,
      filterByValueRange,
      details,
      selectedTypes,
      setSelectedRenewalTypes,
      setActiveFilters,
      activeFilters
    }),
    [
      toggleDropdown,
      toggleSelectedTypes,
      updateFilterTypes,
      filterByType,
      filterByValueRange,
      details,
      selectedTypes,
      setSelectedRenewalTypes,
      setActiveFilters,
      activeFilters
    ]
  );

  useEffect(() => {
    if (firstCardKey) {
      setSelectCard(firstCardKey);
    }
  }, [firstCardKey]);

  useEffect(() => {
    if (!details || !Array.isArray(details)) return;

    const counterpartySet = new Set();
    const regionSet = new Set();

    details.forEach(item => {
      if (item['Counterparty.CounterpartyType']) counterpartySet.add(item['Counterparty.CounterpartyType']);
      if (item['Contracts.Region']) regionSet.add(item['Contracts.Region']);
    });

    setCounterPartyValue([...counterpartySet]);
    setRegion([...regionSet]);
  }, [details]);


  if (!carddata || Object.keys(carddata).length === 0) {
    return (
      <div style={{  }}>
        <GraphSkeleton />
      </div>
    );
  }

  

  return (
    <ContractRenewalBody style={{ border: "1px solid #E5DAF8" }}>
        <div className='inbetween-item marginb'>
          <ContractRenewalTitle>Contract Renewals</ContractRenewalTitle>
          <TooltipWrapper title={contractRenewalInfo} placement="top" customClass="my-tooltip">
            <img
              src={Iicon}
              alt="info"
              style={{ cursor: 'pointer' }}
            />
          </TooltipWrapper>
        </div>

        <Card
          carddata={carddata}
          onCardClick={handleCardClick}
          selectCard={selectCard}
        />
      <ToolbarMain>
        <ButtonContainer>
          <LeftSection>
            <Suspense fallback={<div>Loading Toggle...</div>}>
              <ToggleButton
                setView={setViewType}
                view={viewType}
                visibleButtons={['graph', 'table']}
              />
            </Suspense>
          </LeftSection>

          {viewType.type === 'table' ? (
            <EndSection>
              <Suspense fallback={<div>Loading Filters...</div>}>
                <MultipleDropDown
                  region={region}
                  counterpartyValue={counterpartyValue}
                  handleClearDropDown={handleClearDropDown}
                  handleRenewalTypeClick={handleRenewalTypeClick}
                  activeDropdown={activeDropdown}
                  selectedRenewalTypes={selectedRenewalTypes}
                  activeFilterTypes={activeFilterTypes}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                />
              </Suspense>
            </EndSection>
          ) : (
            <CenterSection>
              <div className="toolbar">
                {dashboardbtn.map((value, key) => (
                  <Suspense key={key} fallback={<div>Loading Button...</div>}>
                    <Button
                      key={key}
                      active={activeBtn === value.name}
                      onClick={() => onClickHandle(value.name)}
                      iIcon={Iicon}
                      title={value.desc}
                    >
                      {value.name}
                    </Button>
                  </Suspense>
                ))}
              </div>
            </CenterSection>
          )}
        </ButtonContainer>

        {viewType.type === 'table' ? (
          <Suspense fallback={<div>Loading Table...</div>}>
            <CommonTable
              data={activeDropdown.length ? selectedRenewalTypes : details}
              selectCard={selectCard}
              toggle={toggle}
              setToggle={setToggle}
            />
          </Suspense>
        ) : (
          <ContractRenewalBarChart>
            <Suspense fallback={<div>Loading Chart...</div>}>
              <ChartSwitcher activeBtn={activeBtn} details={details} />
            </Suspense>
          </ContractRenewalBarChart>
        )}
      </ToolbarMain>
    </ContractRenewalBody>
  );
}

export default ContractRenewal;
