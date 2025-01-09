import React, { useState, useEffect, useRef } from 'react';
import '../css/MultiSelectDropdown.css';

const MultiSelectDropdown = ({ options, displayValue, onSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof onSelect === 'function') {
      onSelect(selectedOptions);
    }
  }, [selectedOptions]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item[displayValue] !== option[displayValue])
        : [...prev, option]
    );
  };

  const filteredOptions = options.filter((option) =>
    option[displayValue].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div className="msd-dropdown-input">
        <input
          type="text"
          placeholder={
            selectedOptions.length
              ? `${selectedOptions.length} selected`
              : 'Select options'
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            console.log('on focus call');
            setIsDropdownOpen(true);
          }}
        />
      </div>
      {isDropdownOpen && (
        <div className="msd-dropdown-menu">
          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <label key={option[displayValue]} className="msd-dropdown-item">
                <input
                  type="checkbox"
                  className="mx-3"
                  checked={selectedOptions.some(
                    (s) => s[displayValue] == option[displayValue]
                  )}
                  onChange={() => toggleOption(option)}
                />
                {option[displayValue]}
              </label>
            ))
          ) : (
            <div className="msd-no-options">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
