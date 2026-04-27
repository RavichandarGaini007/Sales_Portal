import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import ReportDataTable from './ReportDataTable';
import BouncingLoader from '../common/BouncingLoader';
import './CustSaleTrendReport.css';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const getMonthArray = () =>
    Array.from({ length: 12 }, (_, i) => {
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2020, i, 1));
        return { label: monthName, value: String(i + 1).padStart(2, '0') };
    });

const getFinancialYears = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const years = [];

    // Financial year starts from April
    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        const label = `${startYear}-${endYear.toString().slice(-2)}`;
        years.push({
            label,
            value: `${startYear}-${endYear}`,
            startYear,
            endYear
        });
    }
    return years;
};


const capitalizeLabel = (key) =>
    key
        .replace(/([A-Z])/g, ' $1')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();


const CorporatePerformance = () => {
    const months = useMemo(() => getMonthArray(), []);
    const financialYears = useMemo(() => getFinancialYears(), []);
    const { data: authData } = useSelector((state) => state.app || {});
    const employeeCode = authData?.data?.[0]?.userid;

    const [reportType, setReportType] = useState('performance');
    const [filters, setFilters] = useState({
        month: String(new Date().getMonth() + 1).padStart(2, '0'),
        year: currentYear.toString(),
        financialYear: `${currentYear}-${currentYear + 1}`,
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (reportType === 'performance') {
            // Reset to current month/year for performance
            setFilters(prev => ({
                ...prev,
                month: String(new Date().getMonth() + 1).padStart(2, '0'),
                year: currentYear.toString()
            }));
        } else {
            // Reset to current financial year for sales/tgt
            setFilters(prev => ({
                ...prev,
                financialYear: `${currentYear}-${currentYear + 1}`
            }));
        }
    }, [reportType]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleRunReport = async () => {
        setLoading(true);
        setError(null);

        let request = {};

        if (reportType === 'performance') {
            request = {
                month: filters.month,
                year: filters.year,
                type: 'performance'
            };
        } else {
            request = {
                year: filters.financialYear.split('-')[0], // Use start year for the request
                type: 'sales_tgt'
            };
        }

        try {
            const response = await fetchApi(apiUrls.corpPerformanceReport, request);
            const responseData = response?.data ?? response;
            setData(Array.isArray(responseData) ? responseData : []);
        } catch (fetchError) {
            console.error('Error fetching corporate performance data:', fetchError);
            setError('Unable to load corporate performance data.');
        } finally {
            setLoading(false);
        }
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
                        <h1 className="cust-sale-title">Corporate Performance Report</h1>
                        <p className="cust-sale-description">Monitor corporate performance metrics and sales targets</p>
                    </div>
                    <button
                        type="button"
                        className="cust-sale-button"
                        onClick={handleRunReport}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Run Report'}
                    </button>
                </div>

                <div className="cust-sale-filter-card">
                    <div className="cust-sale-filter-grid">
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Report Type</label>
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="performance">Performance</option>
                                <option value="sales_tgt">Month Wise Sales/Target</option>
                            </select>
                        </div>

                        {reportType === 'performance' ? (
                            <>
                                <div className="cust-sale-field">
                                    <label className="cust-sale-label">Month</label>
                                    <select
                                        value={filters.month}
                                        onChange={(e) => handleFilterChange('month', e.target.value)}
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
                                    <label className="cust-sale-label">Year</label>
                                    <select
                                        value={filters.year}
                                        onChange={(e) => handleFilterChange('year', e.target.value)}
                                        className="cust-sale-select"
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year.toString()}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        ) : (
                            <div className="cust-sale-field">
                                <label className="cust-sale-label">Financial Year</label>
                                <select
                                    value={filters.financialYear}
                                    onChange={(e) => handleFilterChange('financialYear', e.target.value)}
                                    className="cust-sale-select"
                                >
                                    {financialYears.map((fy) => (
                                        <option key={fy.value} value={fy.value}>
                                            {fy.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
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
                                    No report data available. Select filters and run the report.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CorporatePerformance;
