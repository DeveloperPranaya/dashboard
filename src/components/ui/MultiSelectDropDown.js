import { useState, useEffect, useRef } from "react";
import { Dropdown, MultiDropdownList } from "../../style/MultiSelectDropDown";

const MultiSelectDropDown = ({ handleSubmit, selectedOptions, handleDeactivateBA, handleOptionClick, options, width, height, notesTaker }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Dropdown ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            padding: "8px",
            cursor: "pointer",
            background: "#fff",
            borderRadius: "2px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            overflowY: "auto",
            overflowX: notesTaker ? "auto" : "hidden",  // <-- scroll if notesTaker
            maxHeight: notesTaker ? "65px" : "100%",     // <-- restrict width if notesTaker
            height: "100%",
          }}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div
                key={option}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#e5e7eb",
                  padding: "6px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  height: "20px",
                  whiteSpace: "nowrap", // prevent wrapping
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {option}
                <span
                  onClick={() => handleDeactivateBA(option)}
                  style={{
                    marginLeft: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </span>
              </div>
            ))
          ) : (
            notesTaker ? <span>Add Notify user</span> : <span>Choose Business Area</span>
          )}
          <span style={{ marginLeft: "auto" }}>▼</span>
        </div>



        {isOpen && (
          < MultiDropdownList width={width && width} height={height && height}>
            {options.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt.value)}
                  onChange={() => handleOptionClick(opt.value)}
                  style={{ marginRight: "8px" }}
                />
                <div>{opt.label}</div>
              </label>
            ))}
          </ MultiDropdownList>
        )}

      </form>
    </Dropdown>
  );
};

export default MultiSelectDropDown;


