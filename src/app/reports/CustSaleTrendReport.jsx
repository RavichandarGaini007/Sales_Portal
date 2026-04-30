import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { apiUrls, fetchApi, fetchApiGet } from '../lib/fetchApi';
import ReportDataTable from './ReportDataTable';
import BouncingLoader from '../common/BouncingLoader';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import './CustSaleTrendReport.css';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const capitalizeLabel = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();
};

const getMonthArray = () =>
    Array.from({ length: 12 }, (_, i) => {
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i, 1));
        return { label: monthName, value: String(i + 1).padStart(2, '0') };
    });

const CustSaleTrendReport = () => {
    const months = useMemo(() => getMonthArray(), []);
    const { data: authData } = useSelector((state) => state.app || {});
    const employeeCode = authData?.data?.[0]?.userid;

    const [filters, setFilters] = useState({
        fromMonth: '01',
        fromYear: currentYear.toString(),
        toMonth: '12',
        toYear: currentYear.toString(),
        div: [],
    });
    const [divisions, setDivisions] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (!employeeCode) return;
        fetchDivisions();
    }, [employeeCode]);

    useEffect(() => {
        if (!shouldFetch) return;

        const { fromMonth, fromYear, toMonth, toYear, div } = filters;
        if (fromMonth && fromYear && toMonth && toYear && Array.isArray(div) && div.length > 0) {
            fetchData();
        } else {
            setError('Please select a division and valid date range before running the report.');
            setLoading(false);
            setShouldFetch(false);
        }
    }, [shouldFetch, filters]);

    const fetchDivisions = async () => {
        try {
            const response = await fetchApiGet(apiUrls.SalesDiv + `?strEmpCode=${employeeCode}`);
            const fetchedDivisions = response?.data ?? response;
            const normalizedDivisions = Array.isArray(fetchedDivisions)
                ? fetchedDivisions.map((division) => ({
                    label: division.name,
                    value: division.div,
                }))
                : [];
            setDivisions(normalizedDivisions);
        } catch (fetchError) {
            console.error('Error fetching divisions:', fetchError);
            setError('Unable to load divisions.');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const request = {
            f_month: filters.fromMonth,
            f_year: filters.fromYear,
            month: filters.toMonth,
            year: filters.toYear,
            div: Array.isArray(filters.div) ? filters.div.map((item) => item.value).join(',') : filters.div,
        };

        try {
            const response = await fetchApi(apiUrls.custSalesTrendReport, request);
            const responseData = response?.data ?? response;
            setData(Array.isArray(responseData) ? responseData : []);
        } catch (fetchError) {
            console.error('Error fetching customer sales trend data:', fetchError);
            setError('Unable to load customer sales trend data.');
        } finally {
            setLoading(false);
            setShouldFetch(false);
        }
    };

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleRunReport = () => {
        setError(null);
        setShouldFetch(true);
    };

    const dynamicColumns = useMemo(() => {
        if (!data || data.length === 0) return [];
        const firstRecord = data[0];
        return Object.keys(firstRecord).map((key) => ({
            label: capitalizeLabel(key),
            key,
        }));
    }, [data]);

    return (
        <section className="cust-sale-report">
            <div className="cust-sale-card">
                <div className="cust-sale-card-header">
                    <div>
                        <h1 className="cust-sale-title">Customer Sales Trend Report</h1>

                    </div>
                    <button
                        type="button"
                        className="cust-sale-button"
                        onClick={handleRunReport}
                        disabled={loading || !divisions.length}
                    >
                        {loading ? 'Loading...' : 'Run Report'}
                    </button>
                </div>

                <div className="cust-sale-filter-card">
                    <div className="cust-sale-filter-grid">
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Division</label>
                            <Multiselect_dropdown
                                className="mb-0"
                                options={divisions}
                                selectedList={filters.div}
                                setSelected={(value) => handleFilterChange('div', value)}
                            />
                        </div>
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">From Month</label>
                            <select
                                value={filters.fromMonth}
                                onChange={(e) => handleFilterChange('fromMonth', e.target.value)}
                                className="cust-sale-select"
                            >
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">From Year</label>
                            <select
                                value={filters.fromYear}
                                onChange={(e) => handleFilterChange('fromYear', e.target.value)}
                                className="cust-sale-select"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">To Month</label>
                            <select
                                value={filters.toMonth}
                                onChange={(e) => handleFilterChange('toMonth', e.target.value)}
                                className="cust-sale-select"
                            >
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">To Year</label>
                            <select
                                value={filters.toYear}
                                onChange={(e) => handleFilterChange('toYear', e.target.value)}
                                className="cust-sale-select"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year.toString()}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {error && <div className="cust-sale-alert">{error}</div>}

                <div className="cust-sale-table-wrap">
                    {loading ? (
                        <div className="cust-sale-loader">
                            <BouncingLoader />
                        </div>
                    ) : (
                        <>
                            {data.length > 0 ? (
                                <ReportDataTable data={data} columnHeaders={dynamicColumns} />
                            ) : (
                                <div className="cust-sale-empty">
                                    No report data available. Change filters and run the report.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CustSaleTrendReport;
