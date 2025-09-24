import { useState, useEffect, useCallback, useMemo } from 'react';
import { counterparty } from "../mockdata/mockdata";
import Select from "react-select";
import Button from '../components/ui/Button';
import ItemList from '../components/ui/itemlist';
import PieChart from '../components/ui/piechart';
import ContractHeader from '../components/ui/contractheader';
import { CounterpartyContainer, CounterPartyToolContainer, CounterpartToolbar, SubToolbarCounterparty, Dropdown } from "../style/counterpartyStyle";
import NoDataAvailable from '../components/ui/NoDataAvailable';
import "../style/counterparty.css";

function CounterParty({ counterPartyData }) {
  const counterPartyDetails = counterPartyData && counterPartyData?.RecentCounterpartyList;
  const [filterbar, setFilterbar] = useState("CounterpartyType");
  const [country, setCountry] = useState("Country");
  const [activeBtn, setActiveBtn] = useState("Counterparty Type");
  const [filterData, setFilterData] = useState();
  const [view, setView] = useState({ type: "graph" });

  const options = [
    { value: "", label: "Select an Option" },
    ...[...new Set(counterPartyDetails?.map(item => item[filterbar]))].map(value => ({
      value,
      label: value
    }))
  ];

  // const countryOptions = [
  //   { value: "", label: "Select a Country" },
  //   ...[...new Set(counterPartyDetails?.map(item => item[country]))].map(value => ({
  //     value,
  //     label: value
  //   }))
  // ];

  const countryOptions = [
    { value: "", label: "Select a Country" },
    ...[...new Set(
      counterPartyDetails?.map(item => {
        const val = item[country];
        return !val || val === 0 || val === "0" ? "NA" : val;  // unify to "NA"
      })
    )].map(value => ({
      value,
      label: value
    }))
  ];


  const [currentPage, setCurrentPage] = useState(1);
 
  const data = useMemo(() => {
    return filterData
      ? counterPartyDetails.filter(item => {
        const val = item[filterbar];
        const normalized = !val || val === 0 || val === "0" ? "NA" : val;
        return normalized === filterData;
      })
      : counterPartyDetails;
  }, [filterData, filterbar, counterPartyDetails]);

  const ITEMS_PER_PAGE = 15;
  const startCount = data && data.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endCount = Math.min(currentPage * ITEMS_PER_PAGE, data?.length || 0);

  const handleButtonClick = useCallback((name) => {
    if (name === "By Country") {
      setFilterbar("Country");     // ✅ handle country case
      setActiveBtn(name);
    } else {
      const selected = counterparty.find(c => c.name === name);
      if (selected) {
        setFilterbar(selected.key);
        setActiveBtn(name);
      }
    }
  }, []);

  useEffect(() => {
    setFilterData("");
  }, [filterbar]);

  if (counterPartyData && counterPartyData.length === 0) {
    return <div className="graph-skeleton large" />
  }

  return (
    <CounterpartyContainer className="renewaltype-container">
      <ContractHeader
        heading="Counterparty Type Summary"
        visibleButtons={["list", "graph"]}
        setView={setView}
        view={view}
        desc="Pie chart / Tabular breakdown of contracts based on counterparty type (e.g., Distributors, Dealers, GPOs). Toggle tabs to view data by country or contract status"
      />
      <CounterPartyToolContainer>
        <CounterpartToolbar>
          <div className='toolbar-counterparty'>
            {counterparty.map((value, key) => {
              return (
                <Button
                  children={value.name}
                  active={activeBtn === value.name}
                  key={key}
                  onClick={() => handleButtonClick(value.name)}
                />
              );
            })}
          </div>
        </CounterpartToolbar>
        {view.type !== "graph" &&
          <CounterpartToolbar>
            <SubToolbarCounterparty>
              Showing {startCount}-{endCount} counterparties (out of {data && data.length})
            </SubToolbarCounterparty>
            <div className='counterpart-filter'>
              <Select
                value={activeBtn === "By Country"
                  ? countryOptions.find(opt => opt.value === filterData)
                  : options.find(opt => opt.value === filterData)
                }
                onChange={(selected) => setFilterData(selected?.value || "")}
                options={activeBtn === "By Country" ? countryOptions : options}
                styles={{
                  control: (base) => ({
                    ...base,
                    width: 200,
                    minHeight: 32,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "180px"
                  })
                }}
              />
            </div>
          </CounterpartToolbar>
        }
      </CounterPartyToolContainer>
      <div className='counterparty-body'>
        {view.type === "graph" ? (
          counterPartyDetails?.length > 0 ? (
            <PieChart filterbar={filterbar} counterPartyData={counterPartyDetails} />
          ) : (
            <NoDataAvailable />
          )
        ) : data?.length > 0 ? (
          <ItemList
            data={data.map(item => ({
              ...item,
              Country: !item.Country || item.Country === 0 || item.Country === "0" ? "NA" : item.Country,
              CounterpartyType: !item.CounterpartyType || item.CounterpartyType === 0 || item.Country === "0" ? "NA" : item.CounterpartyType,
            }))}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </CounterpartyContainer>
  )
}

export default CounterParty;
