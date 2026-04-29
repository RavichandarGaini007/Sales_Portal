import React, { useState, useEffect } from 'react';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import ReportFilters from './ReportFilters';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { apiUrls, fetchApiGet, fetchApi } from '../lib/fetchApi';
import { useSelector } from 'react-redux';
import BouncingLoader from '../common/BouncingLoader';
import ReportDataTable from './ReportDataTable';
import { NetworkWiseProductSaleHeaderColumn, NetworkWiseProductSaleHeaderGroupColumn, QuaterWiseProductSaleHeaderColumn, QuaterWiseProductSaleHeaderGroupColumn, NetworkWiseProductYearlySaleHeaderColumn } from '../lib/tableHead';

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
    const [reportType, setReportType] = useState('networkWiseProductWise');
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
                    const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=plant&userid=${data?.data[0]?.userid}&month=${selectedMonth[0]?.value || ''}`)

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
                    const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=brandcode&month=${selectedMonth[0]?.value || ''}`)

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

    // Refresh brands when plant selection changes so Brand dropdown updates
    // immediately after the user picks a plant.
    useEffect(() => {
        async function fetchBrandsForPlant() {
            try {
                if (!generictab) return; // only relevant in generic mode
                if (!selectedDivison || selectedDivison.length === 0) return;

                const DivisonIds = selectedDivison.map((Divison) => Divison.value);
                const plantParam = Array.isArray(selectedplant) ? selectedplant.join(',') : (selectedplant || '');

                if (!plantParam) return; // if no plant is selected, we shouldn't fetch brands since the API expects a plant filter in generic mode

                const url = apiUrls.GetBrandCodeData +
                    `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=brandcode` +
                    (plantParam ? `&plant=${encodeURIComponent(plantParam)}&month=${selectedMonth[0]?.value || ''}` : '');

                const response = await fetchApiGet(url);
                const formatted = (response.data || []).map((item) => ({
                    label: item.BRAND,
                    value: item.BRAND_CODE,
                }));
                setBrand(formatted);

                // reset selected brand to ALL when plant changes so the caller doesn't
                // hold an invalid brand value that doesn't exist in the refreshed list
                setselectedBrand(['ALL']);
            } catch (error) {
                console.error('Error fetching brands for plant:', error);
            }
        }

        fetchBrandsForPlant();
    }, [selectedplant, selectedDivison, selectedYear, generictab]);

    async function GetProduct() {
        try {
            if (selectedBrand[0] === 'ALL') return;
            if (!selectedBrand || selectedBrand.length == 0) return;
            var brand = "";
            if (selectedBrand.length > 0) {
                brand = selectedBrand;
            }
            const DivisonIds = selectedDivison.map((Divison) => Divison.value);  // Collect all selected divison
            const response = await fetchApiGet(apiUrls.GetBrandCodeData + `?div=${DivisonIds}&year=${selectedYear[0].value}&screencode=networkwiseproductsale&fieldname=product&brandcode=${brand}&month=${selectedMonth[0]?.value || ''}`)

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
        setView(e);
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
            var url = reportType === 'networkWiseProductWiseYearly' || reportType === 'networkWiseProductWiseNepalYearly' ? apiUrls.NetworkWiseProductYearlySale
                : apiUrls.NetworkWiseProductSale_S;
            var request = {
                div: div,
                desg: desg,
                mis: Misdesc,
                plant: plant === plant ? "" : plant,
                brand: brand === brand ? "" : brand,
                product: product === product ? "" : product,
                month: month.toString(),
                year: year.toString(),
                type: reportType === 'networkWiseProductWiseYearly' || reportType === 'networkWiseProductWiseNepalYearly' ? reportType : type
            }
            const response1 = await fetchApi(url, request)

            const formatted = response1.data;
            if (formatted.length > 0) {
                setGridData(formatted);

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
            </div>

            {/* Main container */}
            <div className="container bg-white rounded shadow p-4">
                <div className="row gx-3 gy-3 align-items-center">
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h6 className="card-title mb-4"><b>Network Wise Report</b></h6>
                    </div>
                    {/* filters moved to reusable component */}
                    <ReportFilters
                        reportType={reportType}
                        setReportType={setReportType}
                        view={view}
                        setView={fnchangeview}
                        data={data}
                        generictab={generictab}
                        divison={divison}
                        selectedDivison={selectedDivison}
                        setSelectedDivison={setSelectedDivison}
                        Desg={Desg}
                        selectedDesg={selectedDesg}
                        setselectedDesg={setselectedDesg}
                        Mis={Mis}
                        selectedMis={selectedMis}
                        setselectedMis={setselectedMis}
                        plant={plant}
                        selectedplant={selectedplant}
                        setselectedplant={setselectedplant}
                        Brand={Brand}
                        selectedBrand={selectedBrand}
                        setselectedBrand={setselectedBrand}
                        Product={Product}
                        selectedProduct={selectedProduct}
                        setselectedProduct={setselectedProduct}
                        months={months}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        years={years}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        monthyears={monthyears}
                        onGo={DownloadFile}
                    />

                    {GridData && GridData.length > 0 && (
                        <div className="col-12 pt-4">
                            {(() => {
                                const tblHeaders =
                                    view === "quarterwise" ? QuaterWiseProductSaleHeaderColumn :
                                        reportType === "networkWiseProductWiseYearly" || reportType === "networkWiseProductWiseNepalYearly" ? NetworkWiseProductYearlySaleHeaderColumn :
                                            NetworkWiseProductSaleHeaderColumn;

                                const groupHeaders = view === "quarterwise" ? QuaterWiseProductSaleHeaderGroupColumn : NetworkWiseProductSaleHeaderGroupColumn;

                                return (
                                    <ReportDataTable
                                        data={GridData}
                                        columnHeaders={tblHeaders}
                                        groupHeaders={groupHeaders}
                                    />
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


}

export default NetworkProductWise;