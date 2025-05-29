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
const NetworkWiseProductWise = () => {

    const [divison, setdivison] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [years] = useState([
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
    ]);
    const [months] = useState([
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'Auguest', value: 8 },
        { label: 'September', value: 9 },
        { label: 'Octomber', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 },

    ]);

    // Fetch divison on load
    useEffect(() => {


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


    return (<div>
        <div className="container-fluid py-4" style={{ height: '100vh' }}>
            <div className="row gx-4">

                <h2 className='p-4 mb-lg-4'>Network Wise Product Sales Details</h2>
                <div className="col-auto d-flex align-items-center gap-2"></div>
                <select className="form-select form-select-sm"
                    style={{ width: '150px' }}>
                    <option value={"allindia"}>ALL India</option>
                    <option value={"network"}>Networkwise</option>
                    <option value={"quarterwise"}>Quarterwise</option>
                </select>

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

                {/* Year Dropdown */}
                <div className="col-auto d-flex align-items-center gap-2">
                    <label htmlFor="yearDropdown" className="form-label mb-0">Month & Year:</label>
                    <select
                        id="yearDropdown"
                        className="form-select form-select-sm"
                        style={{ width: '150px' }}
                        value={selectedYear[0]?.value || ''}

                    >
                        <option value="">Select Month</option>
                        {months.map((year) => (
                            <option key={year.value} value={year.value}>
                                {year.label}
                            </option>
                        ))}
                    </select>
                    <select
                        id="yearDropdown"
                        className="form-select form-select-sm"
                        style={{ width: '150px' }}
                        value={selectedYear[0]?.value || ''}

                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year.value} value={year.value}>
                                {year.label}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="col-auto">
                    <button className="btn btn-primary">
                        Go
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NetworkWiseProductWise;