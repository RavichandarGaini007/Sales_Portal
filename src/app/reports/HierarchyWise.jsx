import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from 'reactstrap';
import ReportDataTable from './ReportDataTable';
import { apiUrls, fetchApiGet, fetchApi } from '../lib/fetchApi';
import '../css/commonCss.css';
import { hierarchyWiseReportHeader } from '../lib/tableHead';

const HierarchyWise = () => {
    const { data } = useSelector((state) => state.app);
    const currentYear = new Date().getFullYear();

    const [selectedDiv, setSelectedDiv] = useState('');
    const [selectedDesg, setSelectedDesg] = useState('');
    const [selectedMis, setSelectedMis] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [selectedYear, setSelectedYear] = useState([]);
    const [GridData, setGridData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [mis, setMis] = useState([]);
    const [loadingDivisions, setLoadingDivisions] = useState(false);
    const [loadingDesignations, setLoadingDesignations] = useState(false);
    const [loadingMis, setLoadingMis] = useState(false);
    const [months, setMonths] = useState([]);

    const [years] = useState(() => {
        return Array.from({ length: 3 }, (_, i) => {
            const year = currentYear - i;
            return {
                label: year,
                value: year,
            };
        });
    });

    // Initialize months and default values
    useEffect(() => {
        const monthArray = Array.from({ length: 12 }, (_, i) => {
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i, 1));
            return { label: monthName, value: i + 1 };
        });

        setMonths(monthArray);
        const defaultYear = years.find(year => year.value === currentYear) || years[0];
        setSelectedYear([defaultYear]);
        const currentMonth = new Date().getMonth() + 1;
        const defaultMonth = monthArray.find(month => month.value === currentMonth) || monthArray[0];
        setSelectedMonth([defaultMonth]);
    }, []);

    // Fetch divisions on component mount
    useEffect(() => {
        if (!data?.data?.[0]?.userid) return;

        const fetchDivisions = async () => {
            setLoadingDivisions(true);
            try {
                const response = await fetchApiGet(apiUrls.SalesDiv + `?strEmpCode=${data?.data[0]?.userid}`);
                if (response?.data) {
                    setDivisions(response.data);
                    setSelectedDiv('');
                }
            } catch (error) {
                console.error('Error fetching divisions:', error);
            } finally {
                setLoadingDivisions(false);
            }
        };

        fetchDivisions();
    }, [data?.data?.[0]?.userid]);

    // Fetch designations when division is selected
    useEffect(() => {
        if (!selectedDiv || !data?.data?.[0]?.userid) {
            setDesignations([]);
            setSelectedDesg('');
            setMis([]);
            setSelectedMis([]);
            return;
        }

        const fetchDesignations = async () => {
            setLoadingDesignations(true);
            try {
                const response = await fetchApiGet(
                    apiUrls.GetDesGetDesgEmp + `?division=${selectedDiv}&userid=${data?.data[0]?.userid}&flag=des&designation=null&accesstype=null`
                );
                if (response?.data) {
                    setDesignations(response.data);
                    setSelectedDesg('');
                    setMis([]);
                    setSelectedMis([]);
                }
            } catch (error) {
                console.error('Error fetching designations:', error);
            } finally {
                setLoadingDesignations(false);
            }
        };

        fetchDesignations();
    }, [selectedDiv, data?.data?.[0]?.userid]);

    // Fetch MIS when designation is selected
    useEffect(() => {
        if (!selectedDiv || !selectedDesg || !data?.data?.[0]?.userid) {
            setMis([]);
            setSelectedMis([]);
            return;
        }

        const fetchMis = async () => {
            setLoadingMis(true);
            try {
                const response = await fetchApiGet(
                    apiUrls.GetDesGetDesgEmp + `?division=${selectedDiv}&userid=${data?.data[0]?.userid}&flag=mis&designation=${selectedDesg}&accesstype=null`
                );
                if (response?.data) {
                    const formatted = response.data.map((item) => ({
                        label: item.name,
                        value: item.value,
                    }));
                    setMis(formatted);
                    setSelectedMis([]);
                }
            } catch (error) {
                console.error('Error fetching MIS:', error);
            } finally {
                setLoadingMis(false);
            }
        };

        fetchMis();
    }, [selectedDiv, selectedDesg, data?.data?.[0]?.userid]);

    // Function to flatten hierarchical data
    const flattenHierarchyData = (data, level = 0) => {
        let flatData = [];

        if (!Array.isArray(data)) return flatData;

        data.forEach(item => {
            // Add the parent item with level and indent
            const flatItem = {
                ...item,
                _level: level,
                _indent: level * 20, // 20px indentation per level
                _displayName: '\u00A0'.repeat(level * 4) + item.name, // Non-breaking spaces for indentation
            };
            flatData.push(flatItem);

            // Recursively add children
            if (item.children && item.children.length > 0) {
                flatData = flatData.concat(flattenHierarchyData(item.children, level + 1));
            }
        });

        return flatData;
    };

    const handleSubmit = async () => {
        if (!selectedDiv) {
            alert('Please select a Division');
            return;
        }
        if (!selectedDesg) {
            alert('Please select a Designation');
            return;
        }
        if (!selectedMis[0]) {
            alert('Please select a MIS');
            return;
        }
        if (!selectedMonth[0]) {
            alert('Please select a Month');
            return;
        }
        if (!selectedYear[0]) {
            alert('Please select a Year');
            return;
        }

        setIsLoading(true);
        try {
            const request = {
                div: selectedDiv,
                desg: selectedDesg,
                month: selectedMonth[0].value.toString(),
                year: selectedYear[0].value.toString(),
                empcode: selectedMis[0].value != "" ? selectedMis[0].value : data?.data[0]?.userid,
            };

            const response = await fetchApi(apiUrls.getHierarchyWiseValueWiseReport, request);

            if (response && response.data) {
                // Flatten hierarchical data
                const flattenedData = flattenHierarchyData(response.data);
                setGridData(flattenedData);

                // Set column headers from response or default
                if (response.columnHeaders && response.columnHeaders.length > 0) {
                    setTblHeaders(response.columnHeaders);
                } else {
                    // Fallback: use fields relevant to the hierarchy display

                    setTblHeaders(hierarchyWiseReportHeader);
                }
            } else {
                alert('No data found for the selected criteria');
                setGridData([]);
            }
        } catch (error) {
            console.error('Error fetching hierarchy wise report:', error);
            alert('Error fetching report. Please try again.');
            setGridData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedDiv('');
        setSelectedDesg('');
        setSelectedMis([]);
        setSelectedMonth([]);
        setSelectedYear([]);
        setGridData([]);
        setTblHeaders([]);
    };

    return (
        <div className="grid-margin">
            {/* FILTER CARD */}
            <Card className="card-statistics" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <CardHeader className="card-title" style={{ background: 'linear-gradient(90deg, #0d47a1, #1e88e5)', color: 'white', padding: '15px 20px' }}>
                    <i className="mdi mdi-filter-outline mr-2" />
                    Hierarchy Wise Report - Filters
                </CardHeader>
                <CardBody style={{ padding: '25px' }}>
                    <Row className="g-3">
                        {/* Division Filter */}
                        <Col xs="12" sm="6" md="3" lg="3">
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                                    Division
                                </label>
                                <select
                                    value={selectedDiv}
                                    onChange={(e) => setSelectedDiv(e.target.value)}
                                    className="form-control"
                                    disabled={loadingDivisions}
                                    style={{
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <option value="">
                                        {loadingDivisions ? 'Loading...' : 'Select Division'}
                                    </option>
                                    {divisions.map((div) => (
                                        <option key={div.div} value={div.div}>
                                            {div.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>

                        {/* Designation Filter */}
                        <Col xs="12" sm="6" md="3" lg="3">
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                                    Designation
                                </label>
                                <select
                                    value={selectedDesg}
                                    onChange={(e) => setSelectedDesg(e.target.value)}
                                    className="form-control"
                                    disabled={!selectedDiv || loadingDesignations}
                                    style={{
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <option value="">
                                        {!selectedDiv ? 'Select Division First' : loadingDesignations ? 'Loading...' : 'Select Designation'}
                                    </option>
                                    {designations.map((desg) => (
                                        <option key={desg.Mdesc} value={desg.Mdesc}>
                                            {desg.Mdesc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>

                        {/* MIS Filter */}
                        <Col xs="12" sm="6" md="3" lg="3">
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                                    MIS
                                </label>
                                <select
                                    value={selectedMis[0]?.value || ''}
                                    onChange={(e) => {
                                        const miItem = mis.find(m => m.value === e.target.value);
                                        setSelectedMis(miItem ? [miItem] : []);
                                    }}
                                    className="form-control"
                                    disabled={!selectedDesg || loadingMis}
                                    style={{
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <option value="">
                                        {!selectedDesg ? 'Select Designation First' : loadingMis ? 'Loading...' : 'Select MIS'}
                                    </option>
                                    {mis.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>

                        {/* Month Filter */}
                        <Col xs="12" sm="6" md="3" lg="3">
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                                    Month
                                </label>
                                <select
                                    value={selectedMonth[0]?.value || ''}
                                    onChange={(e) => {
                                        const month = months.find(m => m.value === parseInt(e.target.value));
                                        setSelectedMonth(month ? [month] : []);
                                    }}
                                    className="form-control"
                                    style={{
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <option value="">Select Month</option>
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>
                                            {month.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Col>

                        {/* Year Filter */}
                        <Col xs="12" sm="6" md="3" lg="3">
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                                    Year
                                </label>
                                <select
                                    value={selectedYear[0]?.value || ''}
                                    onChange={(e) => {
                                        const year = years.find(y => y.value === parseInt(e.target.value));
                                        setSelectedYear(year ? [year] : []);
                                    }}
                                    className="form-control"
                                    style={{
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        fontSize: '14px',
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
                        </Col>
                    </Row>

                    {/* Action Buttons */}
                    <Row className="mt-4">
                        <Col xs="12" className="d-flex gap-2 justify-content-center">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                disabled={isLoading}
                                style={{
                                    borderRadius: '4px',
                                    padding: '10px 25px',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    minWidth: '120px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <i className="mdi mdi-magnify mr-2" />
                                {isLoading ? 'Loading...' : 'Generate Report'}
                            </button>
                            <button
                                onClick={handleReset}
                                className="btn btn-secondary"
                                style={{
                                    borderRadius: '4px',
                                    padding: '10px 25px',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    minWidth: '120px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <i className="mdi mdi-refresh mr-2" />
                                Reset
                            </button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/* DATA TABLE CARD */}
            {GridData.length > 0 && (
                <Card className="card-statistics mt-4" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardHeader className="card-title" style={{ background: 'linear-gradient(90deg, #1565c0, #1e88e5)', color: 'white', padding: '15px 20px' }}>
                        <i className="mdi mdi-table-large mr-2" />
                        Report Results
                    </CardHeader>
                    <CardBody style={{ padding: '20px', overflowX: 'auto' }}>
                        {/* <HierarchyTable
                            data={GridData}
                            headers={tblHeaders}
                        /> */}
                        <ReportDataTable
                            data={GridData}
                            columnHeaders={hierarchyWiseReportHeader}

                        />
                    </CardBody>
                </Card>
            )}

            {/* Empty State Message */}
            {GridData.length === 0 && !isLoading && (
                <Card className="mt-4" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
                    <CardBody style={{ padding: '40px', textAlign: 'center' }}>
                        <i
                            className="mdi mdi-file-search-outline"
                            style={{ fontSize: '48px', color: '#bdbdbd', marginBottom: '16px', display: 'block' }}
                        />
                        <p style={{ color: '#999', fontSize: '16px', margin: '0' }}>
                            No reports generated yet. Select filters and click "Generate Report" to view results.
                        </p>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default HierarchyWise;