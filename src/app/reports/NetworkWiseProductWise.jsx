import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls } from '../lib/fetchApi';
import Multiselect_dropdown from '../common/Multiselect_dropdown';

const NetworkProductWise = () => {
    const [view, setView] = useState('allindia'); // empty, 'product', or 'yearly'
    const [divison, setdivison] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedMonth, setselectedMonth] = useState([]);
    const [selectedNetworkwise, setselectedNetworkwise] = useState([]);
    const currentYear = new Date().getFullYear();
    const [years] = useState(() => {
        return Array.from({ length: 3 }, (_, i) => {
            const year = currentYear - i;
            return {
                label: year,
                value: year,
            };
        });
    });
    const [monthyears] = useState(() => {
        return Array.from({ length: 3 }, (_, i) => {
            const year = currentYear - i;
            return {
                label: `${year}-${year + 1}`,
                value: year,
            };
        });
    });
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

    const [desg] = useState([
        { label: 'NSM', value: 'NSM' },
        { label: 'SM', value: 'SM' },
        { label: 'ZSM', value: 'ZSM' },
        { label: 'DSM', value: 'DSM' },
        { label: 'SRM', value: 'SRM' },
        { label: 'RM', value: 'RM' },
        { label: 'ABM', value: 'ABM' },
        { label: 'HQ', value: 'HQ' },


    ]);

    // Fetch divison on load
    useEffect(() => {


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

    const fnChangeNetworkWise = (value) => {
        setView(view);
    }
    return (<div>
        <div className="container-fluid py-4" style={{ height: '100vh' }}>
            <div className="row gx-4">

                <h2 className='p-4 mb-lg-4'>Network Wise Product Sales Details</h2>
                <div className="col-auto d-flex align-items-center gap-2">

                    <select className="form-select form-select-sm" onChange={(e) => { setView(e.target.value) }}
                        style={{ width: '150px' }}>
                        <option value={"allindia"}>All India</option>
                        <option value={"network"}>Networkwise</option>
                        <option value={"quarterwise"}>Quarterwise</option>
                    </select>
                </div>
                {view != "allindia" && (
                    <>
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
                        <div className="col-auto d-flex align-items-center gap-2">
                            <label className="form-label mb-0">Desg:</label>
                            <select
                                id="ddldesg"
                                className="form-select form-select-sm"
                                style={{ width: '150px' }}
                            >
                                <option value="">--Select--</option>
                                {desg.map((a) => (
                                    <option key={a.value} value={a.value}>
                                        {a.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}


                {/* Year Dropdown */}
                <div className="col-auto d-flex align-items-center gap-2">
                    <label htmlFor="yearDropdown" className="form-label mb-0">Month & Year:</label>
                    {view !== "quarterwise" && (
                        <><select
                            id="yearDropdown"
                            className="form-select form-select-sm"
                            style={{ width: '150px' }}
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
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year.value} value={year.value}>
                                        {year.label}
                                    </option>
                                ))}
                            </select></>
                    )}
                    {view === "quarterwise" && (<><select
                        id="yearDropdown"
                        className="form-select form-select-sm"
                        style={{ width: '150px' }}
                    >
                        <option value="">Select Year</option>
                        {monthyears.map((myear) => (
                            <option key={myear.value} value={myear.value}>
                                {myear.label}
                            </option>
                        ))}
                    </select>
                    </>)}


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

export default NetworkProductWise;