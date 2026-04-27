import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiUrls, fetchApi, fetchApiGet } from '../lib/fetchApi';
import ReportDataTable from './ReportDataTable';
import BouncingLoader from '../common/BouncingLoader';
import './CustSaleTrendReport.css';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => {
    const start = currentYear - i;
    const end = start + 1;
    return `${start}-${end}`;
});

const capitalizeLabel = (key) =>
    key
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();

const CustProdSalesTrend = () => {
    const { data: authData } = useSelector((state) => state.app || {});
    const employeeCode = authData?.data?.[0]?.userid;

    const [filters, setFilters] = useState({
        year: '',
        div: '',
        type: 'value',
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
        const { div, year } = filters;
        if (!div) {
            setError('Please select a division before running the report.');
            setShouldFetch(false);
            return;
        }
        fetchData();
    }, [shouldFetch, filters]);

    const fetchDivisions = async () => {
        try {
            const response = await fetchApiGet(apiUrls.SalesDiv + `?strEmpCode=${employeeCode}`);
            const fetchedDivisions = response?.data ?? response;
            setDivisions(Array.isArray(fetchedDivisions) ? fetchedDivisions : []);
        } catch (err) {
            console.error('Error fetching divisions:', err);
            setError('Unable to load divisions.');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        const request = {
            year: filters.year,
            div: filters.div,
            type: filters.type,
            empcode: employeeCode,
        };

        try {
            const response = await fetchApi(apiUrls.custSalesProductTrendReport, request);
            const responseData = response?.data ?? response;
            setData(Array.isArray(responseData) ? responseData : []);
        } catch (err) {
            console.error('Error fetching product sales trend:', err);
            setError('Unable to load product sales trend data.');
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
        return Object.keys(firstRecord).map((key) => ({ label: capitalizeLabel(key), key }));
    }, [data]);

    return (
        <section className="cust-sale-report">
            <div className="cust-sale-card">
                <div className="cust-sale-card-header">
                    <div>
                        <h1 className="cust-sale-title">Customer Product Sales Trend Report</h1>
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
                            <select
                                value={filters.div}
                                onChange={(e) => handleFilterChange('div', e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="">Select division</option>
                                {divisions.map((division) => (
                                    <option key={division.id || division.div} value={division.id || division.div}>
                                        {division.name || division.division || division.div_Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="value">Value</option>
                                <option value="qty">Quantity</option>
                            </select>
                        </div>

                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Financial Year</label>
                            <select
                                value={filters.year}
                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                className="cust-sale-select"
                            >
                                {years.map((yr) => (
                                    <option key={yr} value={yr}>
                                        {yr}
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
                                <div className="cust-sale-empty">No report data available. Change filters and run the report.</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CustProdSalesTrend;
