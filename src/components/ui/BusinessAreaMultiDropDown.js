import { useState, useRef, useEffect } from "react";
import MultiSelectDropDown from "./MultiSelectDropDown";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;


const BusinessAreaMultiDropDown = ({dropdownDataset}) =>{
     const [selectedOptions, setSelectedOptions] = useState([]);
   
      const options = dropdownDataset
        .map((data) => ({
          value: data.businessAreaName,
          label: data.businessAreaName,
          isActive: data.isActive
    
        }));
      
      const dropdownRef = useRef(null);
    
      useEffect(() => {
        const activeOptions = options
          .filter(opt => opt.isActive === 'true')
          .map(opt => opt.value);
        setSelectedOptions(activeOptions);
      }, [dropdownDataset]);
    
    
      const handleOptionClick = async (value) => {
        try {
        const response = await fetch(
          `${API_BASE_URL}/Dashboard/activate-ba`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              baName: value, // sending the name of BA
              isActive: true, // deactivating
            }),
          }
        );
    
        if (response.ok) {
          // update UI state after API call succeeds
          setSelectedOptions((prevSelected) =>
          prevSelected.includes(value)
            ? prevSelected.filter((v) => v !== value)
            : [...prevSelected, value]
        );
        } else {
          console.error("Failed to active BA");
        }
      } catch (error) {
        console.error("Error while deactivating BA:", error);
      }
        
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        selectedOptions.forEach((val) => params.append("tags[]", val));
        const newUrl = `?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
        alert(`Submitted! URL is now: ${newUrl}`);
      };
    
      const handleDeactivateBA = async (option) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Dashboard/deactivate-ba`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              baName: option, // sending the name of BA
              isActive: false, // deactivating
            }),
          }
        );
    
        if (response.ok) {
          setSelectedOptions((prev) => prev.filter((item) => item !== option));
        } else {
          console.error("Failed to deactivate BA");
        }
      } catch (error) {
        console.error("Error while deactivating BA:", error);
      }
    };
    
    return(
      <MultiSelectDropDown 
        //  dropdownRef={dropdownRef} 
         options={options}
         handleSubmit={handleSubmit}
         selectedOptions={selectedOptions}
         handleDeactivateBA={handleDeactivateBA}
         handleOptionClick={handleOptionClick}
      />  
    )
}

export default BusinessAreaMultiDropDown;