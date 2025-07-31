import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls, fetchApiGet } from '../lib/fetchApi';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { saveAs } from "file-saver";
import { useSelector } from 'react-redux';
import { downloadCSVWithoutHeader } from '../lib/fileDownload';
import BouncingLoader from '../common/BouncingLoader';
const FlatFileDownload = () => {

  const currentYear = new Date().getFullYear();

  const [years] = useState(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const year = currentYear - i;
      return {
        label: `${year}-${year + 1}`,
        value: year,
      };
    });
  });

  const [divison, setdivison] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedDivison, setSelectedDivison] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllowFlatFileDownload, setisAllowFlatFileDownload] = useState(false);
  const [lastmodifieddate, setlastmodifieddate] = useState();
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
        const response = await axios.get(apiUrls.SalesDiv + `?strEmpCode=${empCode}`)
        const formatted = response?.data.data.map((item) => ({
          label: item.name,
          value: item.div,
        }));
        setdivison(formatted);
      } catch (error) {
        console.error('Error fetching divison:', error);
      }
    }

    async function fn_IsAllowFlatFileDownload() {
      try {
        let empCode = data?.data[0]?.userid;
        const response = await fetchApiGet(apiUrls.GetCustomizeTabUser + `?userid=${empCode}`)
        const AllowFlatFileDownload = response.data[0]?.IsAllowFlatFileDownload;
        setisAllowFlatFileDownload(AllowFlatFileDownload);
      } catch (error) {
        console.error('Error fetching Allow Flat File Download:', error);
      }
    }

    fetchDivision();
    fn_IsAllowFlatFileDownload();
  }, []);

  useEffect(() => {
    if (selectedYear.length > 0) {
      fn_lastModified_date();
    }
  }, [selectedYear]);


  async function fn_lastModified_date() {
    try {
      const filename = `MIS_FLAT_FILE_${selectedYear[0].value}_GENERIC.csv`;
      const response = await fetchApiGet(apiUrls.GetFtpFileLastModifiedDateTime + `?fileName=${filename}`)
      if (response) {
        setlastmodifieddate(response.data);
      }

    } catch (error) {
      console.error('Error fetching Flat File Last Modified Date Time:', error);
    }
  }

  // Fetch brands when both year and Divison are selected
  useEffect(() => {
    if (selectedYear.length > 0 && selectedDivison.length > 0) {
      async function fetchBrands() {
        try {
          const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison
          const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=flatfiledownload&fieldname=brandcode`)

          const formatted = response.data.map((item) => ({
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

  const generateExcel = async (downloadfor) => {
    var Data;
    var errrmsg = "";
    if (selectedYear.length > 0 && selectedDivison.length > 0 && selectedBrand.length > 0) {
      var DivisonIds;
      var strbrand;
      setLoading(true);
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

      const response1 = await fetchApiGet(apiUrls.GetFlatFileDataPrimary + `?DownloadFor=${downloadfor}&year=${selectedYear[0].value}&empcode=${data?.data[0]?.userid}&div=${DivisonIds}&brand_code=${strbrand}`)

      const formatted = response1.data;
      Data = formatted;
      setLoading(false);
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
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, '0');
      const MM = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const yyyy = date.getFullYear();
      const HH = String(date.getHours()).padStart(2, '0');
      const mm = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      var filename = `mis_flat_file_${dd}-${MM}-${yyyy} ${HH}${mm}${ss}.xlsx`;

      saveAs(blob, filename);
    }
    if (selectedDivison.length == 0) {
      errrmsg += "Please Select Division. \n";
    }
    if (selectedBrand.length == 0) {
      errrmsg += "Please Select Brand."
    }
    if (errrmsg != "") {
      alert(errrmsg);
    }
  }


  const downloadfile = async (filename) => {
    setLoading(true);
    try {
      var file = filename;
      const response = await fetchApiGet(apiUrls.DownloadFileFromFTP + `?fileName=${file}`);//, {
      if (response) {
        // Convert base64 string to Blob
        const byteCharacters = atob(response.data);

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: 'application/octet-stream' });

        // Create a download link and click it
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setLoading(false);
      }
      else {

        alert("File not found")
        setLoading(false);
      }

    } catch (error) {
      //console.error('Download failed', error);
      console.log('Download failed', error);
    }
  }

  function bytesToString(bytes) {
    try {
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    } catch (error) {
      console.error("Error decoding bytes:", error);
      return "";
    }
  }

  if (loading) {
    return <BouncingLoader></BouncingLoader>;
  }


  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh' }}>
      {/* Card with All Controls */}
      <div className="card shadow mb-4">
        <div className="card-body mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
            <h2 className="card-title mb-4">Flat File Download</h2>
            <h5 className="card-title mb-4 text-end" style={{ fontSize: "13px" }}>Last Updated Date: {lastmodifieddate}</h5>
          </div>
          <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center">
            {/* Year Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="yearDropdown" className="form-label mb-0">Year:</label>
              <select
                id="yearDropdown"
                className="form-select"
                style={{ minWidth: '150px' }}
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

            {/* Division Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0">Division:</label>
              <Multiselect_dropdown
                options={divison}
                selectedList={selectedDivison}
                setSelected={setSelectedDivison}
              />
            </div>

            {/* Brand Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0">Brand:</label>
              <Multiselect_dropdown
                options={brands}
                selectedList={selectedBrand}
                setSelected={setSelectedBrand}
              />
            </div>

            {/* Download Button */}
            <div>
              <button onClick={() => generateExcel("D")}
                className="btn btn-success">
                Download Excel
              </button> &nbsp;
              {isAllowFlatFileDownload && (<button onClick={() => generateExcel("B")}
                className="btn btn-success">
                Brandwise Download
              </button>)}

            </div>
          </div>
        </div>
      </div>


      {/* Card with Download Buttons (if Year selected) */}
      {(isAllowFlatFileDownload && selectedYear[0]?.value) && (
        <div className="card shadow">
          <div className="card-body mb-4 mt-3">
            <h5 className="card-title mb-5">Download Misc Flat Files</h5>
            <div className="row g-3 justify-content-center">
              {[
                "ANTIBIOTIC",
                "CALCIUM",
                "CRONIC I",
                "GENERIC",
                "CRONIC II"
              ].map((type) => (
                <div className="col-6 col-md-4 col-lg-3" key={type}>
                  <button
                    onClick={() => downloadfile(`MIS_FLAT_FILE_${selectedYear[0].value}_${type}.csv`)}
                    className="btn btn-outline-success w-100"
                  >
                    {type}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );


};

export default FlatFileDownload;
