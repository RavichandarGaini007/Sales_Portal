import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { apiUrls, fetchApi, fetchApiGet } from '../lib/fetchApi';
import ReportDataTable from './ReportDataTable';
import BouncingLoader from '../common/BouncingLoader';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import './CustSaleTrendReport.css';

const TYPE_OPTIONS = [
    { label: 'Doctor', value: 'D' },
    { label: 'Hospital', value: 'H' },
    { label: 'Trade', value: 'T' },
];

const FILTER_FIELDS = [
    {
        label: 'Type',
        name: 'type',
        optionsKey: 'types',
    },
    {
        label: 'Division',
        name: 'division',
        optionsKey: 'divisions',
    },
    {
        label: 'Brand',
        name: 'brand',
        optionsKey: 'brands',
    },
    {
        label: 'Product',
        name: 'product',
        optionsKey: 'products',
    },
    {
        label: 'Financial Year',
        name: 'financialYear',
        optionsKey: 'years',
    },
];

const CURRENT_FINANCIAL_YEAR = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

const YEARS = Array.from({ length: 10 }, (_, i) => {
    const start = new Date().getFullYear() - i;
    return { label: `${start}-${start + 1}`, value: `${start}-${start + 1}` };
});

const initialFilters = {
    type: [TYPE_OPTIONS[0]],
    division: [],
    brand: [],
    product: [],
    financialYear: YEARS[0].value,
};

const initialOptions = {
    types: TYPE_OPTIONS,
    divisions: [],
    brands: [],
    products: [],
    years: YEARS,
    empCode: '',
};

const formatDivisionItem = (item) => {
    if (typeof item === 'string') return { label: item, value: item };
    if (item && typeof item === 'object') {
        return { label: item.name, value: item.div };
    }
    const asString = String(item);
    return { label: asString, value: asString };
};

const formatBrandItem = (item) => {
    if (typeof item === 'string') return { label: item, value: item };
    if (item && typeof item === 'object') {
        return { label: item.brand, value: item.brand_code };
    }
    const asString = String(item);
    return { label: asString, value: asString };
};

const formatProductItem = (item) => {
    if (typeof item === 'string') return { label: item, value: item };
    if (item && typeof item === 'object') {
        return { label: item.product, value: item.Product_Code };
    }
    const asString = String(item);
    return { label: asString, value: asString };
};

const formatYearItem = (item) => {
    if (typeof item === 'string') return { label: item, value: item };
    if (item && typeof item === 'object') {
        if ('label' in item && 'value' in item) return item;
        return { label: item.financialYear, value: item.financialYear };
    }
    const asString = String(item);
    return { label: asString, value: asString };
};

const normalizeFilters = (response) => {
    const payload = response?.filters || response || {};
    const toOptionList = (items, formatter) => {
        if (!items) return [];
        if (typeof items === 'string') return [formatter(items)];
        if (!Array.isArray(items)) return [];
        return items.map(formatter);
    };

    return {
        divisions: toOptionList(payload.divisions || payload.div || [], formatDivisionItem),
        brands: toOptionList(payload.brands || [], formatBrandItem),
        products: toOptionList(payload.products || [], formatProductItem),
        years: toOptionList(payload.financialYears || payload.years || payload.financialYear || [], formatYearItem),
    };
};

const formatLabel = (key) =>
    key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

const FilterSelect = ({ label, name, value, optionsList, onChange }) => {
    const isFinancialYear = name === 'financialYear';

    return (
        <div className="cust-sale-field">
            <label className="cust-sale-label">{label}</label>
            {isFinancialYear ? (
                <select
                    className="cust-sale-select"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {optionsList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <Multiselect_dropdown
                    className="mb-0"
                    options={optionsList}
                    selectedList={value}
                    setSelected={onChange}
                />
            )}
        </div>
    );
};

const getSelectedValues = (items) => {
    if (!items) return [];
    if (!Array.isArray(items)) return [items];

    return items
        .map((item) => (item && typeof item === 'object' ? item.value : item))
        .filter((item) => item !== undefined && item !== null && item !== '');
};

const getFirstSelectedValue = (items) => {
    if (!items) return '';
    if (!Array.isArray(items)) return items;
    const first = items[0];
    return first && typeof first === 'object' ? first.value : first;
};

const DispensaryReport = () => {
    const { data: authData } = useSelector((state) => state.app || {});
    const employeeCode = authData?.data?.[0]?.userid;

    const [filters, setFilters] = useState(initialFilters);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!employeeCode) return;

        const fetchDivisions = async () => {
            try {
                const response = await fetchApiGet(apiUrls.SalesDiv + `?strEmpCode=${employeeCode}`);
                const divisionData = response?.data ?? response;
                const divisions = Array.isArray(divisionData)
                    ? divisionData.map(formatDivisionItem)
                    : [];

                setOptions((prev) => ({ ...prev, divisions }));
            } catch (err) {
                console.error(err);
                setError('Failed to load divisions');
            }
        };

        fetchDivisions();
    }, [employeeCode]);

    useEffect(() => {
        if (!Array.isArray(filters.division) || !filters.division.length) {
            setOptions((prev) => ({ ...prev, brands: [], products: [], empCode: employeeCode }));
            return;
        }

        const fetchBrands = async () => {
            try {
                const yearValue = getFirstSelectedValue(filters.financialYear) || '';
                const divisionIds = filters.division.map((item) => item.value).join(',');
                let url = apiUrls.GetBrandCodeData + `?div=${encodeURIComponent(divisionIds)}&fieldname=brandcode&screencode=dispensaryreport`;
                if (yearValue) {
                    url += `&year=${encodeURIComponent(yearValue)}`;
                }

                const response = await fetchApiGet(url);
                const brandData = response?.data ?? response;
                const brands = Array.isArray(brandData)
                    ? brandData.map(formatBrandItem)
                    : [];

                setOptions((prev) => ({ ...prev, brands, products: [] }));
            } catch (err) {
                console.error(err);
                setError('Failed to load brands');
            }
        };

        fetchBrands();
    }, [filters.division, filters.financialYear]);

    useEffect(() => {
        if (!Array.isArray(filters.division) || !filters.division.length || !Array.isArray(filters.brand) || !filters.brand.length) {
            setOptions((prev) => ({ ...prev, products: [] }));
            return;
        }

        const fetchProducts = async () => {
            try {
                const yearValue = getFirstSelectedValue(filters.financialYear) || '';
                const divisionIds = filters.division.map((item) => item.value).join(',');
                const brandCodes = filters.brand.map((item) => item.value).join(',');
                let url = apiUrls.GetBrandCodeData + `?div=${encodeURIComponent(divisionIds)}&brandcode=${encodeURIComponent(brandCodes)}&fieldname=product&screencode=dispensaryreport`;
                if (yearValue) {
                    url += `&year=${encodeURIComponent(yearValue)}`;
                }

                const response = await fetchApiGet(url);
                const productData = response?.data ?? response;
                const products = Array.isArray(productData)
                    ? productData.map(formatProductItem)
                    : [];

                setOptions((prev) => ({ ...prev, products }));
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
            }
        };

        fetchProducts();
    }, [filters.division, filters.brand, filters.financialYear]);

    const handleChange = useCallback((name, value) => {
        setFilters((prev) => {
            const resetValues = {
                type: { division: [], brand: [], product: [] },
                division: { brand: [], product: [] },
                brand: { product: [] },
                financialYear: { brand: [], product: [] },
            };

            return {
                ...prev,
                ...resetValues[name],
                [name]: value,
            };
        });
    }, []);

    const handleRunReport = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const typeValues = getSelectedValues(filters.type);
            const yearValues = getSelectedValues(filters.financialYear);

            const requestPayload = {
                empcode: employeeCode,
                type:
                    typeValues.length === 0 || typeValues.includes('All')
                        ? 'All'
                        : typeValues.join(','),
                div: getSelectedValues(filters.division).join(','),
                brand: getSelectedValues(filters.brand).join(','),
                product: getSelectedValues(filters.product).join(','),
                year: yearValues.join(','),
            };

            const response = await fetchApi(apiUrls.dispensaryReport, requestPayload);
            const reportRows = response?.data ?? response;

            setData(Array.isArray(reportRows) ? reportRows : []);

            if (response?.filters) {
                setOptions((prev) => ({ ...prev, ...normalizeFilters(response.filters) }));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch report data');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const columns = useMemo(() => {
        if (!data.length) {
            return [];
        }

        return Object.keys(data[0]).map((key) => ({ label: formatLabel(key), key }));
    }, [data]);

    return (
        <section className="cust-sale-report">
            <div className="cust-sale-card">
                <div className="cust-sale-card-header">
                    <div>
                        <h1 className="cust-sale-title">Dispensary Report</h1>

                    </div>

                    <button className="cust-sale-button" onClick={handleRunReport} disabled={loading}>
                        {loading ? 'Loading...' : 'Run Report'}
                    </button>
                </div>

                <div className="cust-sale-filter-card">
                    <div className="cust-sale-filter-grid">
                        {FILTER_FIELDS.map(({ label, name, optionsKey }) => (
                            <FilterSelect
                                key={name}
                                name={name}
                                label={label}
                                value={filters[name]}
                                optionsList={options[optionsKey] || []}
                                onChange={(value) => handleChange(name, value)}
                            />
                        ))}
                    </div>
                </div>

                {error && <div className="cust-sale-alert">{error}</div>}

                <div className="cust-sale-table-wrap">
                    {loading ? (
                        <div className="cust-sale-loader">
                            <BouncingLoader />
                        </div>
                    ) : data.length > 0 ? (
                        <ReportDataTable data={data} columnHeaders={columns} />
                    ) : (
                        <div className="cust-sale-empty">No data available. Run report to see results.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DispensaryReport;
