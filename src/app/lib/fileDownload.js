import React, { useRef, useState } from 'react'; // Ensure you import useRef and useState
import { CSVLink } from 'react-csv'; // For CSV export
import * as XLSX from 'xlsx'; // For Excel export
import { saveAs } from 'file-saver'; // For saving files

export const FileDownload = ({ data }) => {
  const csvLinkRef = useRef(); // Create a ref for CSVLink
  const [csvData, setCsvData] = useState([]); // State to store CSV data

  // Function to trigger CSV download programmatically and pass data
  const downloadCSV = (data) => {
    setCsvData(data); // Update state with new data
    csvLinkRef.current.link.click(); // Programmatically trigger the download
  };

  return (
    <div>
      {/* Button to trigger CSV download */}
      <button onClick={() => downloadCSV(data)}>Download CSV</button>

      {/* Hidden CSVLink element for downloading CSV */}
      <CSVLink
        data={csvData} // Use the dynamic data passed through state
        filename="data.csv"
        ref={csvLinkRef} // Attach the ref
        style={{ display: 'none' }} // Make the link invisible
      >
        Download CSV
      </CSVLink>
    </div>
  );
}

export const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelFile], { bookType: 'xlsx', type: 'application/octet-stream' });
  saveAs(blob, 'data.xlsx');
};

