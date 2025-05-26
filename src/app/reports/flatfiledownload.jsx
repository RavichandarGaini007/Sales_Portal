// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import facejpg from '../../assets/images/faces/face1.jpg';
// //import '@mdi/font/css/materialdesignicons.min.css';
// import { Link } from 'react-router-dom';
// import MultiSelectDropdown from '../common/MultiSelectDropdown';
// import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
// import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
// import '../../assets/vendors/css/vendor.bundle.base.css';
// import { useSelector } from 'react-redux';
// import Multiselect_dropdown from '../common/Multiselect_dropdown';
// import { Button } from 'reactstrap';
// import { apiUrls } from '../lib/fetchApi';
// import { useRequest } from '../common/RequestContext';
// import { event } from 'jquery';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// const FlatFileDownload=()=>{
//  const { updateRequest } = useRequest();
//   const { data, isAuthorized, isLoading } = useSelector((state) => {
//     return state.app;
//   });
//   const currentMonth = new Date().getMonth() + 1;
//   const currentYear = new Date().getFullYear();
//   const [divisions, setAllDivs] = useState([]);
//     const [brandcode, setbrandcode] = useState([]);
//   const [month, setMonth] = useState(currentMonth);
//   const [year, setYear] = useState(currentYear);
//   const [menuItems, setMenuItems] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOption, setSelectedOption] = useState("");
// //   useEffect(() => {
// //     const storedReqValue = localStorage.getItem('commonRequest');

// //     if (storedReqValue?.div) {
// //       divisions.forEach((col) => {
// //         storedReqValue.div.forEach((item) => {
// //           if (item.div === col.div) {
// //             setSelected(col);
// //           }
// //         });
// //       });
// //     } else if (divisions?.length) {
// //       setSelected(
// //         divisions.map((col) => ({
// //           label: col.name,
// //           value: col.div,
// //         }))
// //       );
// //     }
// //   }, [divisions]);

//   useEffect(() => {
//     // Fetch data from API
//     getUserMenus();
//     getbrandcode("02","2025");
//     axios
//       .get(apiUrls.SalesDiv + '?strEmpCode=' + data?.data[0]?.userid) // Replace with your API endpoint
//       .then((response) => {
//         const resdata = response.data.data;

//         if (
//           data?.data &&
//           Array.isArray(data.data) &&
//           data.data.length > 0 &&
//           data?.data[0]?.enetsale === 'ALL'
//         ) {
//           setAllDivs([...resdata, { div: 'ALL', name: 'ALL' }]);
//         } else {
//           setAllDivs(resdata);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });

//     genRequest();


//   }, []);


// const handleChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   // Handle change for Month dropdown
//   const handleMonthChange = (event) => {
//     setMonth(event.target.value);
//   };

//   // Handle change for Year dropdown
//   const handleYearChange = (event) => {
//     setYear(event.target.value);
//   };

// //   const onChangeSetBrand=(e)=>{
// //     // const div1 = event.target.value;
// //     // setAllDivs(div1);
// //     getBrandCode("02", "2025"); // Call with updated div and current year
// //     console.log("Division",divisions)
// //   }

//   const getUserMenus = async (e) => {
//     let empCode = '41406';
//     let role = 'Admin';
//     const response = await axios.post(
//       apiUrls.DashboardMenus + `?empCode=${empCode}&role=${role}`
//     );
//     const data = await response.data.data;
//     setMenuItems(data);

//   };

//     const getbrandcode = async (strdiv,stryear) => {
//         debugger;
//     let div = strdiv;
//     let year = stryear;
//     const response = await axios.get(
//       apiUrls.GetBrandCodeData + `?div=${div}&year=${year}`
//     ) .catch((error) => {
//         console.error('Error fetching data: ', error.response || error);
//         setLoading(false);
//       });;
//     const data = await response.data.data;
//      setbrandcode(data);
//      setLoading(false);

//   };

//   const handleSearch = () => {
//     genRequest();
//   };

//   const genRequest = () => {
//     const today = new Date();
//     let mnth = month;
//     let yr = year;

//     if (today.getDate() < 5) {
//       mnth -= 1;
//       if (mnth === 0) {
//         mnth = 12;
//         yr -= 1;
//       }

//       setMonth(mnth);
//       setYear(yr);
//     }

//     const comReq = {
//       tbl_name: 'FTP_' + mnth + '_' + yr,
//       empcode: data?.data[0]?.userid,
//       div:
//         selected.length === divisions.length &&
//         data?.data[0]?.enetsale === 'ALL'
//           ? data?.data[0]?.enetsale
//           : Array(selected.map((items) => items.value)).join(','),
//       month: mnth.toString(),
//       year: yr.toString(),
//       flag: 'monthly',
//     };
//     //console.log(comReq);
//     updateRequest(comReq);
//     localStorage.setItem('commonRequest', JSON.stringify(comReq));
//   };

//   return(
// <div className="container py-4" style={{height:"100vh"}}>
//       <div className="row">
//         {/* Year Dropdown */}
//         <div className="col-md-4 mb-3">
//           <div className="form-group">
//             <label htmlFor="year" className="form-label">Year:</label>
//             <select
//               id="year"
//               value={year}
//               onChange={handleYearChange}
//               className="form-select form-select-sm"
//               style={{  height: "6.5vh"}}
//               aria-label="Select Year"
//             >
//               <option value="">Select Year</option>
//               <option value="2023">2023-2024</option>
//               <option value="2024">2024-2025</option>
//               <option value="2025">2025-2026</option>
//             </select>
//           </div>
//         </div>

//         {/* Division Dropdown */}
//         <div className="col-md-3 mb-3">
//           <div className="form-group">
//             <label htmlFor="division" className="form-label">Division:</label>
//             <Multiselect_dropdown
//               className="mx-3"
//               options={divisions.map((col) => ({
//                 label: col.name,
//                 value: col.div,
//               }))}
//               selectedList={selected}
//               setSelected={setSelected}


//             />
//           </div>
//         </div>
// <div className="col-md-2 mb-3">
//           <div className="form-group">
//             <label htmlFor="division" className="form-label">Brand :</label>
//          {/* Brand Code Dropdown */}
//             {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <select
//           value={selectedOption}
//           onChange={handleChange}
//           className="form-select"
//         >
//           <option value="">Select an option</option>
//           {brandcode.map((option) => (
//             <option key={option.brand_code} value={option.brand_code}>
//               {option.brand}
//             </option>
//           ))}
//         </select>
//       )}
//       {selectedOption && <p>Selected Option ID: {selectedOption}</p>}
//       </div>
//       </div>
//       </div>

//       {/* Optional: Add Download Buttons */}
//       <div className="text-center mt-4">
//         <button className="btn btn-primary" disabled={!year || selected.length === 0}>
//           Download Excel
//         </button>
//         &nbsp;
//         <button className="btn btn-secondary ml-3" disabled={!year || selected.length === 0}>
//           Brand Wise Download Excel
//         </button>
//       </div>
//     </div>)
// }

// export default FlatFileDownload;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls } from '../lib/fetchApi';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
// import XlsxPopulate from 'xlsx-populate';
import { saveAs } from "file-saver";

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

  // Fetch divison on load
  useEffect(() => {

    const currentYear = new Date().getFullYear();
    const defaultYear = years.find(year => year.value === currentYear) || years[0];  // Fall back to the first year if current year is not in the list
    setSelectedYear([defaultYear]);

    async function fetchDivision() {
      try {

        // const response = await axios.get('/api/divison');
        let empCode = '041406';
        let role = 'Admin';
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
          empcode: "041406",
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
      // Insert data starting from cell A2
      //sheet.cell("A1").value(data);

      const sheet = workbook.sheet(2);

      const headers = Object.keys(Data[0]);

      // Set headers in A1, B1, etc.
      // headers.forEach((header, colIndex) => {
      //   sheet.cell(1, colIndex + 1).value(header); // Row 1, Columns start at 1
      // });
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

      const response = await axios.get(apiUrls.DownloadFileFromFTP, {
        params: {
          fileName: filename

        },
      }, {
        responseType: 'blob',
      });
      if ((response.data)) {
        saveAs(response.data, filename);
      }
      else {
        alert("File not found")
      }

    } catch (error) {
      console.error('Download failed', error);
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
