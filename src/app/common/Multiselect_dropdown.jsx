import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const Multiselect_dropdown = ({ options, selectedList, setSelected }) => {
  return (
    <div className="me-2 w-64" style={{ width: '200px' }}>
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
