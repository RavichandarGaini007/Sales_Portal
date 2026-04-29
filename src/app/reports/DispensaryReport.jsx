import React, { useState, useEffect, useMemo } from 'react';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import ReportDataTable from './ReportDataTable';
import BouncingLoader from '../common/BouncingLoader';
import './CustSaleTrendReport.css';

// ✅ type options (label + value)
const TYPE_OPTIONS = [
    { label: 'Doctor', value: 'D' },
    { label: 'Hospital', value: 'H' },
    { label: 'Trade', value: 'T' },
];

const initialFilters = {
    type: 'D', // ✅ default mapped value
    division: '',
    brand: '',
    product: '',
    financialYear: '',
};

const initialOptions = {
    types: TYPE_OPTIONS,
    divisions: [],
    brands: [],
    products: [],
    years: [],
};

// 🔹 normalize API filters
const normalizeFilters = (response) => {
    const payload = response?.filters || response || {};

    return {
        divisions: payload.divisions || [],
        brands: payload.brands || [],
        products: payload.products || [],
        years:
            payload.financialYears ||
            payload.years ||
            payload.financialYear ||
            [],
    };
};

// 🔹 convert key → Label
const formatLabel = (key) =>
    key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

const DispensaryReport = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 load filter options
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const res = await fetchApi(apiUrls.glanceReport, { metadata: true });
                const normalized = normalizeFilters(res);

                setOptions((prev) => ({
                    ...prev,
                    ...normalized,
                }));
            } catch (err) {
                console.error(err);
                setError('Failed to load filters');
            }
        };

        loadFilters();
    }, []);

    // 🔹 handle change
    const handleChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // 🔹 run report
    const handleRunReport = async () => {
        setLoading(true);
        setError(null);

        try {
            // ✅ filters already API-ready
            const res = await fetchApi(apiUrls.glanceReport, filters);
            const responseData = res?.data ?? res;

            setData(Array.isArray(responseData) ? responseData : []);

            if (res?.filters) {
                setOptions((prev) => ({
                    ...prev,
                    ...normalizeFilters(res.filters),
                }));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch report data');
        } finally {
            setLoading(false);
        }
    };

    // 🔹 dynamic columns
    const columns = useMemo(() => {
        if (!data.length) return [];

        return Object.keys(data[0]).map((key) => ({
            label: formatLabel(key),
            key,
        }));
    }, [data]);

    return (
        <section className="cust-sale-report">
            <div className="cust-sale-card">

                {/* HEADER */}
                <div className="cust-sale-card-header">
                    <div>
                        <h1 className="cust-sale-title">Dispensary Report</h1>
                        <p className="cust-sale-description">
                            View sales trends across division, brand and products
                        </p>
                    </div>

                    <button
                        className="cust-sale-button"
                        onClick={handleRunReport}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Run Report'}
                    </button>
                </div>

                {/* FILTERS */}
                <div className="cust-sale-filter-card">
                    <div className="cust-sale-filter-grid">

                        {/* ✅ TYPE */}
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                className="cust-sale-select"
                            >
                                {options.types.map((t) => (
                                    <option key={t.value} value={t.value}>
                                        {t.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DIVISION */}
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Division</label>
                            <select
                                value={filters.division}
                                onChange={(e) => handleChange('division', e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="">All</option>
                                {options.divisions.map((d) => (
                                    <option key={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* BRAND */}
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Brand</label>
                            <select
                                value={filters.brand}
                                onChange={(e) => handleChange('brand', e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="">All</option>
                                {options.brands.map((b) => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>
                        </div>

                        {/* PRODUCT */}
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Product</label>
                            <select
                                value={filters.product}
                                onChange={(e) => handleChange('product', e.target.value)}
                                className="cust-sale-select"
                            >
                                <option value="">All</option>
                                {options.products.map((p) => (
                                    <option key={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {/* YEAR */}
                        <div className="cust-sale-field">
                            <label className="cust-sale-label">Financial Year</label>
                            <select
                                value={filters.financialYear}
                                onChange={(e) =>
                                    handleChange('financialYear', e.target.value)
                                }
                                className="cust-sale-select"
                            >
                                <option value="">All</option>
                                {options.years.map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* ERROR */}
                {error && <div className="cust-sale-alert">{error}</div>}

                {/* TABLE */}
                <div className="cust-sale-table-wrap">
                    {loading ? (
                        <div className="cust-sale-loader">
                            <BouncingLoader />
                        </div>
                    ) : data.length > 0 ? (
                        <ReportDataTable data={data} columnHeaders={columns} />
                    ) : (
                        <div className="cust-sale-empty">
                            No data available. Run report to see results.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DispensaryReport;