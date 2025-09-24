import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { contractValue, renewalType, Region, CounterPartyType } from "../../mockdata/mockdata";
import filterImage from "../../assets/images/contractstack/filter.svg";
import RightMark from "../../assets/images/contractstack/MenuElements-right.png";
import RightIcon from "../../assets/images/contractstack/right-icon.png";
import Tooltip from './tooltip';

const DropdownItemGroup = ({ title, values, activeFilters, setActiveFilters, onClick, groupKey, activeDropdown }) => {
  const [open, setOpen] = useState(false);
  const isActive = (label) => activeDropdown?.includes(label);

    const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation
  };

  return (
    <li className={`dropdown-submenu position-relative ${activeFilters[groupKey]?.length ? 'activedropdown' : ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>

      <a className="dropdown-item dropdown-toggle" href="#">
        <div className='inbetween-item textSize'>
          {title}
          <img src={RightIcon} alt='icon' />
        </div>
      </a>

      <ul className={`dropdown-menu position-absolute start-100 top-0 ${open ? 'show' : ''}`}>
        {values?.map((val, idx) => {
          const label = typeof val === 'string' ? val : val.label;
          const key = typeof val === 'string' ? val : val.key;

          return (
            <li key={key || idx}>
              <a
                className={`dropdown-item ${isActive ? 'active-dropdown' : ''}`}
                href="#"
                onClick={label === "No Data available Right now" ? handleClick : (e) => onClick(e, key, label, groupKey)}
              >
                 <div className={label === "No Data available Right now" ? 'not-clickable' : 'inbetween-item textSize'} style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px'  
                }}>
                  {label.length > 25 ? 
                   <Tooltip text={label}>
                     {label.slice(0, 20) + '...'}
                  </Tooltip>:
                   label
                  }
                  
                  {label === "No Data available Right now" ? "" : isActive(label) && <img src={RightMark} alt="selected" />}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
};


const MultipleDropDown = ({
  region,
  counterpartyValue,
  handleRenewalTypeClick,
  activeDropdown,
  selectedRenewalTypes,
  handleClearDropDown,
  activeFilterTypes,
  activeFilters,
  setActiveFilters
}) => {

  const filterCount = activeDropdown?.length || 0;

  return (
    <ul className="navbar-nav ms-auto position-relative filter-container">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLinkRight"
          role="button"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <div className='center-item gapinfilter'>
            <img src={filterImage} alt="filter" /> Filter
            {filterCount > 0 && <div className="filter-count">{filterCount}</div>}
          </div>
        </a>

        <ul
          className="dropdown-menu"
          style={{ width: '261px', position: "absolute", right: "20px" }}
          aria-labelledby="navbarDropdownMenuLinkRight"
        >
          <DropdownItemGroup
            title="Renewal Type"
            values={renewalType}
            activeDropdown={activeDropdown}
            onClick={handleRenewalTypeClick}
            groupKey="renewal"
            activeFilterTypes={activeFilterTypes}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <DropdownItemGroup
            title="Region"
            values={region.length === 0 ? Region : region}
            activeDropdown={activeDropdown}
            onClick={handleRenewalTypeClick}
            groupKey="region"
            activeFilterTypes={activeFilterTypes}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <DropdownItemGroup
            title="Value"
            values={contractValue}
            activeDropdown={activeDropdown}
            onClick={handleRenewalTypeClick}
            groupKey="value"
            activeFilterTypes={activeFilterTypes}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <DropdownItemGroup
            title="CounterParty Type"
            values={counterpartyValue.length === 0 ? CounterPartyType : counterpartyValue}
            activeDropdown={activeDropdown}
            onClick={handleRenewalTypeClick}
            groupKey="counterparty"
            activeFilterTypes={activeFilterTypes}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <li>
            <a className="dropdown-item clear-item textSize" onClick={handleClearDropDown} href="#">
              Clear All Filter
            </a>
          </li>
          <li>
            <a className="dropdown-item textSize fontend" href="#">
              Showing {selectedRenewalTypes?.length || 0} result
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default MultipleDropDown;
