import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls, fetchApiGet } from '../lib/fetchApi';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import { useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import BouncingLoader from '../common/BouncingLoader';
import { NetworkWiseProductSaleHeaderColumn, NetworkWiseProductSaleHeaderGroupColumn, QuaterWiseProductSaleHeaderColumn, QuaterWiseProductSaleHeaderGroupColumn } from '../lib/tableHead';

const NetworkProductWise = () => {
    const [generictab, setgenerictab] = useState(false);
    const [view, setView] = useState('network'); // empty, 'product', or 'yearly'
    const [divison, setdivison] = useState([]);
    const [Desg, setDesg] = useState([]);
    const [plant, setplant] = useState([]);
    const [Brand, setBrand] = useState([]);
    const [Product, setProduct] = useState([]);
    const [Mis, setMis] = useState([]);
    const [enetsale, setenetsale] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState([]);
    const [selectedMis, setselectedMis] = useState([]);
    const [selectedplant, setselectedplant] = useState([]);
    const [selectedBrand, setselectedBrand] = useState(['ALL']);
    const [selectedProduct, setselectedProduct] = useState(['ALL']);
    const [selectedDesg, setselectedDesg] = useState([]);
    const [GridData, setGridData] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const { data, isAuthorized, isLoading } = useSelector((state) => {
        return state.app;
    });

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

    const [months, setMonths] = useState([]);

    useEffect(() => {
        // Create an array with numbers 0 to 11 representing months Jan-Dec
        const monthArray = Array.from({ length: 12 }, (_, i) => {
            // Use Intl.DateTimeFormat to get the month name dynamically
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i, 1));
            return { label: monthName, value: i + 1 };
        });

        setMonths(monthArray);
        const currentYear = new Date().getFullYear();
        const defaultYear = years.find(year => year.value === currentYear) || years[0];  // Fall back to the first year if current year is not in the list
        setSelectedYear([defaultYear]);
        const currentMonth = new Date().getMonth() + 1;
        const defaultMonth = monthArray.find(month => month.value === currentMonth) || months[0];  // Fall back to the first year if current year is not in the list
        setSelectedMonth([defaultMonth]);

    }, []);

    // Fetch divison on load

    useEffect(() => {
        async function fetchDivision() {
            try {
                setenetsale();
                let empCode = data?.data[0]?.userid;
                const response = await fetchApiGet(apiUrls.SalesDiv + `?strEmpCode=${empCode}`)
                if (data) {
                    const formatted = response.data?.map((item) => ({
                        label: item.name,
                        value: item.div,
                    }));
                    setdivison(formatted);
                }
            } catch (error) {
                console.error('Error fetching divison:', error);
            }
        }
        fetchDivision();
    }, []);

    function getFinancialYear(selectedMonth, selectedYear) {
        const month = selectedMonth.slice(0, 3).toUpperCase();
        let fiscalYearStart, fiscalYearEnd;

        // Months Jan, Feb, Mar belong to previous fiscal year
        if (month === "JAN" || month === "FEB" || month === "MAR") {
            fiscalYearStart = selectedYear - 1;
            fiscalYearEnd = selectedYear;
        } else {
            fiscalYearStart = selectedYear;
            fiscalYearEnd = selectedYear + 1;
        }


        const financialYearStr = `YTD APR TO ${month} ${fiscalYearStart}-${fiscalYearEnd.toString().substring(2)}`;
        const financialYear = `${month} ${fiscalYearStart.toString().slice(-2)}`
        return { financialYearStr, financialYear };
    }

    useEffect(() => {
        if (selectedDivison.length > 0) {
            async function GetDesgEmp() {
                try {
                    var DivisonIds;
                    var strbrand;
                    //setLoading(true);
                    if (selectedDivison.length == divison.length) {
                        DivisonIds = "ALL"
                    }
                    else {
                        DivisonIds = (selectedDivison.map((Divison) => Divison.value)).join(',');  // Collect all selected divison
                    }
                    const response = await fetchApiGet(apiUrls.GetDesGetDesgEmp + `?division=${DivisonIds}&userid=${data?.data[0]?.userid}&flag=des&designation=null&accesstype=null`)
                    const formatted = response.data;
                    setDesg(formatted)
                }
                catch (error) {

                }
            }


            async function GetPlant() {
                try {
                    const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison
                    const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=plant&userid=${data?.data[0]?.userid}`)

                    const formatted = response.data.map((item) => ({
                        label: item.ort01,
                        value: item.werks,
                    }));
                    setplant(formatted);
                } catch (error) {
                    console.error('Error fetching brands:', error);
                }
            }

            async function GetBrand() {
                try {
                    const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison
                    const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=brandcode`)

                    const formatted = response.data.map((item) => ({
                        label: item.BRAND,
                        value: item.BRAND_CODE,
                    }));
                    setBrand(formatted);
                } catch (error) {
                    console.error('Error fetching brands:', error);
                }
            }
            const gernicdiv = ['07', '28'];
            const isAnyMatch = gernicdiv.some(value =>
                selectedDivison.some(item => item.value === value)
            );

            setgenerictab(isAnyMatch);
            GetDesgEmp();
            if (isAnyMatch) {
                GetPlant();
                GetBrand();
                GetProduct();
            }

        } else {
            setDesg([]);
            setBrand([]);
            setplant([]);
            setgenerictab(false);
            setselectedplant([]);
            setselectedBrand([]);
            setselectedDesg([]);
            setselectedMis([]);
        }

    }, [selectedDivison])

    async function GetProduct() {
        try {
            var brand = "";
            if (selectedBrand.length > 0) {
                brand = selectedBrand;
            }
            const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison
            const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=product&brandcode=${brand}`)

            const formatted = response.data.map((item) => ({
                label: item.PROD_DESC,
                value: item.PRODUCT,
            }));
            setProduct(formatted);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    useEffect(() => {
        if (selectedBrand.length > 0) {
            GetProduct();
        } else {
            GetProduct();
            setselectedProduct([]);
        }
    }, [selectedBrand])

    useEffect(() => {
        if (selectedDivison.length > 0 && selectedDesg.length > 0) {
            async function GetDesgMiscEmp() {
                try {
                    var DivisonIds;
                    var strbrand;
                    //setLoading(true);
                    if (selectedDivison.length == divison.length) {
                        DivisonIds = "ALL"
                    }
                    else {
                        DivisonIds = (selectedDivison.map((Divison) => Divison.value)).join(',');  // Collect all selected divison
                    }
                    const response = await fetchApiGet(apiUrls.GetDesGetDesgEmp + `?division=${DivisonIds}&userid=${data?.data[0]?.userid}&flag=mis&designation=${selectedDesg}&accesstype=null`)

                    const formatted = response.data.map((item) => ({
                        label: item.name,
                        value: item.value,
                    }));
                    setMis(formatted);
                    setselectedMis([]);
                }
                catch (error) {

                }
            }
            GetDesgMiscEmp();
        } else {
            setMis([]);
            setselectedMis([]);
        }
    }, [selectedDivison, selectedDesg])


    const fnchangeview = (e) => {
        setView(e.target.value);
        setselectedplant([]);
        setselectedBrand([]);
        setselectedDesg([]);
        setselectedMis([]);
    }
    const DownloadFile = async () => {
        var errrmsg = "";
        if (selectedDivison.length == 0) {
            errrmsg += "Please Select Division. \n";
        }

        if (view == "network") {
            if (!generictab) {
                if (selectedDesg.length == 0) {
                    errrmsg += "Please Select Desg. \n"
                }
                if (selectedMis.length == 0) {
                    errrmsg += "Please Select MIS Desc."
                }
            }
            else {
                if (selectedplant.length == 0) {
                    errrmsg += "Please Select Plant."
                }
            }
        }

        if (errrmsg != "") {
            alert(errrmsg);
        }

        if (errrmsg == "") {
            setLoading(true);
            var div = selectedDivison[0].value;
            var desg = selectedDesg ?? "";
            var Misdesc = selectedMis?.[0]?.value ?? "";
            var plant = selectedplant ?? "";
            var brand = selectedBrand ?? "";
            var product = selectedProduct ?? "";
            var month = selectedMonth[0].value;
            var year = selectedYear[0].value;
            var type = "";
            if (view == "quarterwise") {
                type = "quarterwise";
            } else {
                type = "networkwise";
            }
            const response1 = await fetchApiGet(apiUrls.NetworkWiseProductSale_S + `?div=${div}&desg=${desg}&Misdesc=${Misdesc}&plant=${plant}&brand=${brand}&product=${product}&month=${month}&year=${year}&type=${type}`)

            const formatted = response1.data;
            if (formatted.length > 0) {
                setGridData(formatted);
                const { financialYearStr, financialYear } = getFinancialYear(selectedMonth[0].label, selectedYear[0].value);
                NetworkWiseProductSaleHeaderGroupColumn.map((a) => {
                    if (a.label == "financYear") {
                        a.label = financialYear;
                    }
                    else if (a.label == "financYearStr") {
                        a.label = financialYearStr;
                    }
                })
            } else {
                alert("No Record Found");
                setGridData(null);
            }

            setLoading(false);
        }


    }

    if (loading) {
        return <BouncingLoader></BouncingLoader>;
    }

    return (
        <div className="bg-light min-vh-100">
            {/* Heading */}
            <div className="text-center py-4">
                {/* <h5>Network Wise Product Sales Details</h5> */}
            </div>

            {/* Main container */}
            <div className="container bg-white rounded shadow p-4">
                <div className="row gx-3 gy-3 align-items-center">
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h6 className="card-title mb-4"><b>Network Wise Product Sales Details</b></h6>
                    </div>
                    {/* View Selector */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                        <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>View:</label>
                        <select
                            className="form-select"
                            onChange={fnchangeview}
                            value={view}
                        >
                            {data?.data[0]?.enetsale === "ALL" && (
                                <option value="allindia">All India</option>
                            )}
                            <option value="network">Networkwise</option>
                            <option value="quarterwise">Quarterwise</option>
                        </select>
                    </div>

                    {/* Division */}
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                        <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>Division:</label>
                        <div style={{ width: '300px' }}>
                            <Multiselect_dropdown
                                options={divison}
                                selectedList={selectedDivison}
                                setSelected={setSelectedDivison}
                            />
                        </div>
                    </div>

                    {/* Filters when not All India */}
                    {view !== "allindia" && (
                        <>


                            {!generictab ? (
                                <>
                                    {/* Designation */}
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                                        <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>Desg:</label>
                                        <select
                                            className="form-select"
                                            style={{ width: '200px' }}
                                            value={selectedDesg}
                                            onChange={(e) => setselectedDesg(e.target.value)}
                                        >
                                            <option value="">--Select--</option>
                                            {Desg.map((a) => (
                                                <option key={a.Mdesc} value={a.Mdesc}>{a.Mdesc}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* MIS Desc */}
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                                        <label className="form-label mb-0">MIS Desc:</label>
                                        <div style={{ width: '200px' }}>
                                            <Multiselect_dropdown
                                                options={Mis}
                                                selectedList={selectedMis}
                                                setSelected={setselectedMis}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </>
                    )}
                    {generictab ? (
                        <>
                            {/* Plant */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                                <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>Plant:</label>
                                <select
                                    className="form-select"
                                    style={{ width: '200px' }}
                                    value={selectedplant}
                                    onChange={(e) => setselectedplant(e.target.value)}
                                >
                                    <option value="">--Select--</option>
                                    {plant.map((a) => (
                                        <option key={a.value} value={a.value}>{a.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Brand */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                                <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>Brand:</label>
                                <select
                                    className="form-select"
                                    style={{ width: '200px' }}
                                    value={selectedBrand}
                                    onChange={(e) => setselectedBrand(e.target.value)}
                                >
                                    <option value="ALL">--ALL--</option>
                                    {Brand.map((a) => (
                                        <option key={a.value} value={a.value}>{a.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Product */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center gap-2">
                                <label className="form-label mb-0" style={{ whiteSpace: 'nowrap' }}>Product:</label>
                                <select
                                    className="form-select"
                                    style={{ width: '200px' }}
                                    value={selectedProduct}
                                    onChange={(e) => setselectedProduct(e.target.value)}
                                >
                                    <option value="ALL">--ALL--</option>
                                    {Product.map((a) => (
                                        <option key={a.value} value={a.value}>{a.label}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : null}
                    {/* Month (conditionally rendered) */}
                    {view !== "quarterwise" && (
                        <div className="col-6 col-sm-3 col-md-2 d-flex align-items-center gap-2">
                            <label className="form-label mb-0">Month:</label>
                            <select
                                className="form-select"
                                value={selectedMonth[0]?.value || ''}
                                onChange={(e) => {
                                    const selected = months.find((y) => y.value === parseInt(e.target.value));
                                    setSelectedMonth(selected ? [selected] : []);
                                }}
                            >
                                <option value="">Select Month</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Year (always shown, adjusts position) */}
                    <div className="col-6 col-sm-3 col-md-2 d-flex align-items-center gap-2">
                        <label className="form-label mb-0">Year:</label>
                        <select
                            className="form-select"
                            value={selectedYear[0]?.value || ''}
                            onChange={(e) => {
                                const selected = (view !== "quarterwise" ? years : monthyears).find(
                                    (y) => y.value === parseInt(e.target.value)
                                );
                                setSelectedYear(selected ? [selected] : []);
                            }}
                        >
                            <option value="">Select Year</option>
                            {(view !== "quarterwise" ? years : monthyears).map((year) => (
                                <option key={year.value} value={year.value}>{year.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Go Button */}
                    <div className="col-12 col-sm-6 col-md-2 d-flex align-items-center">
                        <button className="btn btn-success w-25" onClick={DownloadFile}>
                            Go
                        </button>
                    </div>

                    {view === "quarterwise" && (

                        <div className="col-12 pt-4">
                            <DataTable data={GridData} filename="NetworkWiseProductSaleReport" headername="Network Wise Product Sales Details"
                                columnHeaders={QuaterWiseProductSaleHeaderColumn}
                                groupHeaders={QuaterWiseProductSaleHeaderGroupColumn} name={data?.data[0]?.name} />
                        </div>
                    )}
                    {view !== "quarterwise" && (
                        <div className="col-12 pt-4">
                            <DataTable data={GridData} filename="NetworkWiseProductSaleReport" headername="Network Wise Product Sales Details"
                                columnHeaders={NetworkWiseProductSaleHeaderColumn}
                                groupHeaders={NetworkWiseProductSaleHeaderGroupColumn}
                                name={data?.data[0]?.name} />
                        </div>

                    )}
                </div>
            </div>
        </div>
    );


}

export default NetworkProductWise;