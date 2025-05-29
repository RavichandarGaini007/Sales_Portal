import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import '../css/commonCss.css';

const Multiselect_dropdown = ({ options, selectedList, setSelected }) => {
  return (
    <div className="me-2 w-100 multiselect-responsive-width">
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
