import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls } from '../lib/fetchApi';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { saveAs } from "file-saver";
import { useSelector } from 'react-redux';
import { downloadCSVWithoutHeader } from '../lib/fileDownload';

const FlatFileDownload = () => {
  const [years] = useState([
    { label: '2023-2024', value: 2023 },
    { label: '2024-2025', value: 2024 },
    { label: '2025-2026', value: 2025 },
  ]);
  const [divison, setdivison] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedDivison, setSelectedDivison] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const { data, isAuthorized, isLoading } = useSelector((state) => {
    return state.app;
  });

  // Fetch divison on load
  useEffect(() => {

    const currentYear = new Date().getFullYear();
    const defaultYear = years.find(year => year.value === currentYear) || years[0];  // Fall back to the first year if current year is not in the list
    setSelectedYear([defaultYear]);

    async function fetchDivision() {
      try {
        let empCode = data?.data[0]?.userid;
        const response = await axios.get(
          apiUrls.SalesDiv + `?strEmpCode=${empCode}`
        );
        const formatted = response.data.data.map((item) => ({
          label: item.name,
          value: item.div,
        }));
        setdivison(formatted);
      } catch (error) {
        console.error('Error fetching divison:', error);
      }
    }

    fetchDivision();
  }, []);

  // Fetch brands when both year and Divison are selected
  useEffect(() => {
    if (selectedYear.length > 0 && selectedDivison.length > 0) {
      async function fetchBrands() {
        try {
          const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison

          const response = await axios.get(apiUrls.GetBrandCodeData, {
            params: {
              div: DivisonIds.join(','),
              year: selectedYear[0].value,
            },
          });
          const formatted = response.data.data.map((item) => ({
            label: item.brand,
            value: item.brand_code,
          }));
          setBrands(formatted);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      }

      fetchBrands();
    } else {
      setBrands([]);
      setSelectedBrand([]);
    }
  }, [selectedYear, selectedDivison]);

  const generateExcel = async () => {
    var Data;
    var errrmsg = "";
    debugger;
    if (selectedYear.length > 0 && selectedDivison.length > 0 && selectedBrand.length > 0) {
      var DivisonIds;
      var strbrand;
      if (selectedDivison.length == divison.length) {
        DivisonIds = "ALL"
      }
      else {
        DivisonIds = (selectedDivison.map((Divison) => Divison.value)).join(',');  // Collect all selected divison
      }
      if (selectedBrand.length == brands.length) {
        strbrand = "ALL"
      }
      else {
        strbrand = (selectedBrand.map((brand) => brand.value)).join(',');  // Collect all selected divison
      }
      const response1 = await axios.get(apiUrls.GetFlatFileDataPrimary, {
        params: {
          DownloadFor: "D",
          year: selectedYear[0].label,
          empcode: data?.data[0]?.userid,
          div: DivisonIds,
          brand_code: strbrand,
        },
      });
      const formatted = response1.data.data;
      Data = formatted;

      if (!Data) {
        alert('No Data Found')
        return
      }
      const response = await fetch("/sales_portal_new/template.xlsx");
      const arrayBuffer = await response.arrayBuffer();

      // Step 2: Populate with data
      const workbook = await XlsxPopulate.fromDataAsync(arrayBuffer);
      const sheet = workbook.sheet(2);
      const headers = Object.keys(Data[0]);

      headers.forEach((header, colIndex) => {
        const cell = sheet.cell(1, colIndex + 1);
        cell.value(header);
        cell.style({
          bold: true,
          fill: "CCCCFF", // Light blue background
          horizontalAlignment: "center"
        });
      });
      // Write data starting from row 2
      Data.forEach((row, rowIndex) => {
        headers.forEach((header, colIndex) => {
          sheet
            .cell(rowIndex + 2, colIndex + 1) // Row 2 onward
            .value(row[header]);
        });
      });


      // Step 3: Export and download
      const blob = await workbook.outputAsync();
      saveAs(blob, "Flat File Primary Sales.xlsx");
    }
    if (selectedDivison.length == 0) {
      errrmsg += "Please Select Divison. \n";
    }
    if (selectedBrand.length == 0) {
      errrmsg += "Please Select Brand."
    }
    if (errrmsg != "") {
      alert(errrmsg);
    }
  }


  const downloadfile = async (filename) => {
    try {
      var file = filename;
      const response = await axios.get(apiUrls.DownloadFileFromFTP, {
        params: {
          fileName: file
        },
      }, {
        responseType: 'blob',
      });
      if (response.data) {
        //saveAs(response.data, file);
        downloadCSVWithoutHeader(response.data, file);
      }
      else {
        alert("File not found")
      }

    } catch (error) {
      //console.error('Download failed', error);
      console.log('Download failed', error);
    }
  }

  return (
    <div className="container-fluid py-4" style={{ height: '100vh' }}>
      <div className="row gx-4">

        <h2 className='p-4 mb-lg-4'>Flat File Download</h2>
        {/* Year Dropdown */}
        <div className="col-auto d-flex align-items-center gap-2">
          <label htmlFor="yearDropdown" className="form-label mb-0">Year:</label>
          <select
            id="yearDropdown"
            className="form-select form-select-sm"
            style={{ width: '150px' }}
            value={selectedYear[0]?.value || ''}
            onChange={(e) => {
              const selected = years.find((y) => y.value === parseInt(e.target.value));
              setSelectedYear(selected ? [selected] : []);
            }}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        {/* Division (Divison) Dropdown */}
        <div className="col-auto d-flex align-items-center gap-2">
          <label className="form-label mb-0">Division:</label>
          <div style={{ width: '200px' }}>
            <Multiselect_dropdown
              options={divison}
              selectedList={selectedDivison}
              setSelected={setSelectedDivison}
            />
          </div>
        </div>

        {/* Brand Dropdown */}
        <div className="col-auto d-flex align-items-center gap-2">
          <label className="form-label mb-0">Brand:</label>
          <div style={{ width: '200px' }}>
            <Multiselect_dropdown
              options={brands}
              selectedList={selectedBrand}
              setSelected={setSelectedBrand}
            />
          </div>
        </div>
        <div className="col-auto">
          <button onClick={generateExcel} className="btn btn-primary">
            Download Excel
          </button>
        </div>
      </div>
      <br></br><br></br>
      <div>
        <button onClick={() => downloadfile("MIS_FLAT_FILE_2025_ANTIBIOTIC.csv")} className="btn btn-primary">MIS_FLAT_FILE_2025_ANTIBIOTIC</button> &nbsp;&nbsp;
        <button onClick={() => downloadfile("MIS_FLAT_FILE_2025_CALCIUM.csv")} className="btn btn-primary">MIS_FLAT_FILE_2025_CALCIUM</button>&nbsp;&nbsp;
        <button onClick={() => downloadfile("MIS_FLAT_FILE_2025_CRONIC I.csv")} className="btn btn-primary">MIS_FLAT_FILE_2025_CRONIC I</button>&nbsp;&nbsp;
        <button onClick={() => downloadfile("MIS_FLAT_FILE_2025_GENERIC.csv")} className="btn btn-primary">MIS_FLAT_FILE_2025_GENERIC</button>&nbsp;&nbsp;
        <button onClick={() => downloadfile("MIS_FLAT_FILE_2025_CRONIC II.csv")} className="btn btn-primary">MIS_FLAT_FILE_2025_CRONIC II</button>
      </div>
    </div>
  );


};

export default FlatFileDownload;
