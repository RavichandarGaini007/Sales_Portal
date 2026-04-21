import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import '../css/commonCss.css';

const Multiselect_dropdown = ({ options, selectedList, setSelected, className = '' }) => {
  // Default classes for the wrapper div
  const defaultClasses = 'me-2 w-100 multiselect-responsive-width';
  // Merge custom classes with defaults (custom classes can override defaults)
  const wrapperClass = className ? `${className}` : defaultClasses;

  return (
    <div className={wrapperClass}>
      <MultiSelect
        options={options}
        value={selectedList}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Multiselect_dropdown;
