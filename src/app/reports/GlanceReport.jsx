import React, { useState, useEffect } from 'react';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import ReportFilters from './ReportFilters';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import './CustSaleTrendReport.css';
import { apiUrls, fetchApiGet, fetchApi } from '../lib/fetchApi';
import { useSelector } from 'react-redux';
import BouncingLoader from '../common/BouncingLoader';
import ReportDataTable from './ReportDataTable';
import { GlanceReportHeaderColumn } from '../lib/tableHead';

const GlanceReport = ({ repoType }) => {
    const [view, setView] = useState('allindia');
    const [divison, setdivison] = useState([]);
    const [Desg, setDesg] = useState([]);
    const [Mis, setMis] = useState([]);
    const [selectedDivison, setSelectedDivison] = useState([]);
    const [selectedMis, setselectedMis] = useState([]);
    const [selectedDesg, setselectedDesg] = useState([]);
    const [GridData, setGridData] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const [reportType, setReportType] = useState('glanceReport');
    const { data, isAuthorized, isLoading } = useSelector((state) => {
        return state.app;
    });

    const [finyears] = useState(() => {
        return Array.from({ length: 3 }, (_, i) => {
            const year = currentYear - i;
            return {
                label: `${year}-${year + 1}`,
                value: year,
            };
        });
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

    // Fetch divison on load
    useEffect(() => {
        async function fetchDivision() {
            try {
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
                    if (selectedDivison.length == divison.length) {
                        DivisonIds = "ALL"
                    }
                    else {
                        DivisonIds = (selectedDivison.map((Divison) => Divison.value)).join(',');
                    }
                    const response = await fetchApiGet(apiUrls.GetDesGetDesgEmp + `?division=${DivisonIds}&userid=${data?.data[0]?.userid}&flag=des&designation=null&accesstype=null`)
                    const formatted = response.data;
                    setDesg(formatted)
                }
                catch (error) {
                    console.error('Error fetching designation:', error);
                }
            }

            GetDesgEmp();
        } else {
            setDesg([]);
            setselectedDesg([]);
            setselectedMis([]);
        }
    }, [selectedDivison])

    useEffect(() => {
        if (selectedDivison.length > 0 && selectedDesg.length > 0) {
            async function GetDesgMiscEmp() {
                try {
                    var DivisonIds;
                    if (selectedDivison.length == divison.length) {
                        DivisonIds = "ALL"
                    }
                    else {
                        DivisonIds = (selectedDivison.map((Divison) => Divison.value)).join(',');
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
                    console.error('Error fetching MIS:', error);
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
        setselectedDesg([]);
        setselectedMis([]);
    }

    const FetchReportData = async () => {
        var errrmsg = "";
        if (selectedDivison.length == 0) {
            errrmsg += "Please Select Division. \n";
        }

        if (view == "networkwise") {
            if (selectedDesg.length == 0) {
                errrmsg += "Please Select Designation. \n"
            }
            if (selectedMis.length == 0) {
                errrmsg += "Please Select MIS Desc."
            }
        }

        if (errrmsg != "") {
            alert(errrmsg);
        }

        if (errrmsg == "") {
            try {
                setLoading(true);
                var div = selectedDivison.map((Divison) => Divison.value).join(',')
                var desg = selectedDesg?.[0]?.value ?? "";
                var Misdesc = selectedMis?.[0]?.value ?? "";
                var year = selectedYear[0].value;

                var request = {
                    div: div,
                    desg: desg,
                    mis: Misdesc,
                    year: year.toString(),
                    type: repoType
                }
                const response1 = await fetchApi(apiUrls.glanceReport, request)

                const formatted = response1.data;
                if (formatted.length > 0) {
                    setGridData(formatted);
                } else {
                    alert("No Record Found");
                    setGridData(null);
                }

                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching report data:", error);
                alert("An error occurred while fetching the report data. Please try again later.");
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (selectedYear.length === 0 && finyears.length > 0) {
            setSelectedYear([finyears[0]]);
        }
    }, [finyears]);

    if (loading) {
        return <BouncingLoader></BouncingLoader>;
    }

    return (
        <section className="cust-sale-report">
            <div className="cust-sale-card">
                <div className="cust-sale-card-header">
                    <div>
                        <h1 className="cust-sale-title">{repoType} At Glance Report</h1>
                    </div>
                    <button className="cust-sale-button" onClick={FetchReportData} disabled={loading}>
                        {loading ? 'Loading...' : 'Run Report'}
                    </button>
                </div>

                <div className="cust-sale-filter-card">
                    <div className="cust-sale-filter-grid">
                        <ReportFilters
                            reportType={reportType}
                            setReportType={setReportType}
                            view={view}
                            setView={fnchangeview}
                            data={data}
                            divison={divison}
                            selectedDivison={selectedDivison}
                            setSelectedDivison={setSelectedDivison}
                            Desg={view === 'networkwise' ? Desg : []}
                            selectedDesg={selectedDesg}
                            setselectedDesg={setselectedDesg}
                            Mis={view === 'networkwise' ? Mis : []}
                            selectedMis={selectedMis}
                            setselectedMis={setselectedMis}
                            years={finyears}
                            selectedYear={selectedYear}
                            setSelectedYear={setSelectedYear}
                            finyears={finyears}
                            useCustSaleStyles={true}
                        />
                    </div>
                </div>

                <div className="cust-sale-table-wrap">
                    {GridData && GridData.length > 0 ? (
                        <ReportDataTable
                            data={GridData}
                            columnHeaders={GlanceReportHeaderColumn}
                        />
                    ) : (
                        <div className="cust-sale-empty">No data available. Run report to see results.</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default GlanceReport;
