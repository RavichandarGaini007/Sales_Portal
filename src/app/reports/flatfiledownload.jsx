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
import facejpg from '../../assets/images/faces/face1.jpg';
import { Link } from 'react-router-dom';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { apiUrls } from '../lib/fetchApi';
import { useRequest } from '../common/RequestContext';
import { event } from 'jquery';
import * as XLSX from 'xlsx';  // Import xlsx library
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
  const [companies, setCompanies] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [flatfiledata, setflatfiledata] = useState([]);
  // Fetch companies on load
  useEffect(() => {

      const currentYear = new Date().getFullYear();
    const defaultYear = years.find(year => year.value === currentYear) || years[0];  // Fall back to the first year if current year is not in the list
    setSelectedYear([defaultYear]);
    
    async function fetchCompanies() {
      try {
 
        // const response = await axios.get('/api/companies');
         let empCode = '41406';
    let role = 'Admin';
    const response = await axios.get(
      apiUrls.SalesDiv  + `?strEmpCode=${empCode}`
    );
        const formatted = response.data.data.map((item) => ({
          label: item.name,
          value: item.div,
        }));
        setCompanies(formatted);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }

    fetchCompanies();
  }, []);

  // Fetch brands when both year and company are selected
  useEffect(() => {
    if (selectedYear.length > 0 && selectedCompany.length > 0) {
      async function fetchBrands() {
        try {
          const companyIds = selectedCompany.map((company) => company.value);  // Collect all selected companies

          const response = await axios.get(apiUrls.GetBrandCodeData, {
            params: {
              div:  companyIds.join(','),
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
  }, [selectedYear, selectedCompany]);

  useEffect(()=>{

    if (selectedYear.length > 0 && selectedCompany.length > 0 && selectedBrand.length > 0 ) {
      async function getData() {
      try {
 
        
          const companyIds = selectedCompany.map((company) => company.value);  // Collect all selected companies

          const response = await axios.get(apiUrls.GetFlatFileDataPrimary, {
            params: {
              div:  companyIds.join(','),
              brand_code: selectedBrand[0].value,
            },
          });
          const formatted = response.data.data;
          setflatfiledata(formatted);
      } catch (error) {
        console.error('Error fetching flat file data:', error);
      }
    }

       getData();
    }
  },[selectedYear, selectedCompany,selectedBrand])

    const generateExcel = async () => {
      debugger;
    // Create a worksheet from the data
    // const ws = XLSX.utils.json_to_sheet(flatfiledata);

    // // Create a workbook with the worksheet
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'BASE DATA');

    // // Generate the Excel file and trigger download
    // XLSX.writeFile(wb, 'Flat File Primary Sales.xlsx');

     // Step 1: Load the template file

     const response1 =await fetch('/test.xlsx')
      .then(response1 =>  response1.arrayBuffer())
      .then(arrayBuffer => {
        debugger;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Get first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        // Show data in alert (stringify first few rows to avoid overflow)
        alert(JSON.stringify(jsonData.slice(0, 5), null, 2));
      })
      .catch(error => {
        console.error('Error reading Excel file:', error);
        alert('Failed to read Excel file.');
      });


    const response = await fetch("/template.xlsx");
    const arrayBuffer = await response.arrayBuffer();

    // Step 2: Populate with data
    const workbook = await XlsxPopulate.fromDataAsync(arrayBuffer);

    const sheet = workbook.sheet(2);
    
     const headers = Object.keys(flatfiledata[0]);

     // Set headers in A1, B1, etc.
      headers.forEach((header, colIndex) => {
        sheet.cell(1, colIndex + 1).value(header); // Row 1, Columns start at 1
      });

      // Write data starting from row 2
      data.forEach((row, rowIndex) => {
        headers.forEach((header, colIndex) => {
          sheet
            .cell(rowIndex + 2, colIndex + 1) // Row 2 onward
            .value(row[header]);
        });
      });

    // Insert data starting from cell A2
    //sheet.cell("A1").value(data);

    // Step 3: Export and download
    const blob = await workbook.outputAsync();
    saveAs(blob, "Flat File Primary Sales.xlsx");

  };

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

      {/* Division (Company) Dropdown */}
      <div className="col-auto d-flex align-items-center gap-2">
        <label className="form-label mb-0">Division:</label>
        <div style={{ width: '200px' }}>
          <Multiselect_dropdown
            options={companies}
            selectedList={selectedCompany}
            setSelected={setSelectedCompany}
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
  </div>
);



};

export default FlatFileDownload;
