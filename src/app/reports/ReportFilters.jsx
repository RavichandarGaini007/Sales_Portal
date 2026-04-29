import React from 'react';
import Multiselect_dropdown from '../common/Multiselect_dropdown';

/**
 * Generic filter panel used by various report pages.  The parent is responsible
 * for providing the option lists and state handlers.  The component only
 * renders the UI and invokes callbacks when selections change or the "Go"
 * button is clicked.
 *
 * Props (all are optional except those marked as required):
 *   view, setView                    - controls the view dropdown
 *   data                             - cross‑report data (used for "All India" option)
 *   generictab                       - whether generic UI elements should be shown
 *   divison, selectedDivison, setSelectedDivison
 *   Desg, selectedDesg, setselectedDesg
 *   Mis, selectedMis, setselectedMis
 *   plant, selectedplant, setselectedplant
 *   Brand, selectedBrand, setselectedBrand
 *   brandMulti          - if true the Brand selector will render as a multiselect dropdown instead of a simple <select>
 *   Product, selectedProduct, setselectedProduct
 *   months, selectedMonth, setSelectedMonth
 *   years, selectedYear, setSelectedYear
 *   monthyears                       - alternative year list for quarterwise view
 *   onGo                             - callback for Go button
 */

const ReportFilters = ({
    reportType,
    setReportType,
    view,
    setView,
    data,
    generictab,
    divison,
    selectedDivison,
    setSelectedDivison,
    Desg,
    selectedDesg,
    setselectedDesg,
    Mis,
    selectedMis,
    setselectedMis,
    plant,
    selectedplant,
    setselectedplant,
    Brand,
    selectedBrand,
    setselectedBrand,
    brandMulti = false,
    Product,
    selectedProduct,
    setselectedProduct,
    months,
    selectedMonth,
    setSelectedMonth,
    years,
    selectedYear,
    setSelectedYear,
    monthyears,
    onGo,
}) => {
    const handleViewChange = (e) => {
        if (setView) setView(e.target.value);
    };

    const styles = {
        formLabel: {
            fontWeight: '500',
            fontSize: '0.9rem',
            color: '#495057',
            whiteSpace: 'nowrap',
        },
        selectInput: {
            borderRadius: '4px',
            borderColor: '#dee2e6',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
        },
        radioGroup: {
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
        },
        radioItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
        },
    };

    return (
        <>
            {view !== 'FlatFile' && (
                <div className="col-12 mb-3">
                    <div style={{ ...styles.radioGroup, paddingLeft: '0.5rem' }}>
                        <label style={{ ...styles.formLabel, margin: 0, marginRight: '0.5rem', alignSelf: 'center' }}>Report Type:</label>
                        <div style={styles.radioItem}>
                            <input className="form-check-input" type="radio" name="reportType" id="networkWiseProductWise" value="networkWiseProductWise" checked={reportType === 'networkWiseProductWise'} style={{ marginLeft: 0, cursor: 'pointer' }} onChange={(e) => setReportType && setReportType(e.target.value)} />
                            <label className="form-check-label" htmlFor="networkWiseProductWise" style={{ margin: 0, cursor: 'pointer' }}>
                                Network Wise Product Wise
                            </label>
                        </div>
                        <div style={styles.radioItem}>
                            <input className="form-check-input" type="radio" name="reportType" id="networkWiseProductWiseYearly" value="networkWiseProductWiseYearly" checked={reportType === 'networkWiseProductWiseYearly'} style={{ marginLeft: 0, cursor: 'pointer' }} onChange={(e) => setReportType && setReportType(e.target.value)} />
                            <label className="form-check-label" htmlFor="networkWiseProductWiseYearly" style={{ margin: 0, cursor: 'pointer' }}>
                                Network Wise Product Wise Yearly Sale
                            </label>
                        </div>
                        <div style={styles.radioItem}>
                            <input className="form-check-input" type="radio" name="reportType" id="networkWiseProductWiseNepalYearly" value="networkWiseProductWiseNepalYearly" checked={reportType === 'networkWiseProductWiseNepalYearly'} style={{ marginLeft: 0, cursor: 'pointer' }} onChange={(e) => setReportType && setReportType(e.target.value)} />
                            <label className="form-check-label" htmlFor="networkWiseProductWiseNepalYearly" style={{ margin: 0, cursor: 'pointer' }}>
                                Network Wise Product Wise Nepal Yearly Sale
                            </label>
                        </div>
                        <div style={styles.radioItem}>
                            <input className="form-check-input" type="radio" name="reportType" id="networkWiseValueWise" value="networkWiseValueWise" checked={reportType === 'networkWiseValueWise'} style={{ marginLeft: 0, cursor: 'pointer' }} onChange={(e) => setReportType && setReportType(e.target.value)} />
                            <label className="form-check-label" htmlFor="networkWiseValueWise" style={{ margin: 0, cursor: 'pointer' }}>
                                Network Wise Value Wise
                            </label>
                        </div>
                    </div>
                </div>
            )}
            {/* View selector */}
            {setView && reportType !== "networkWiseValueWise" && (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <label className="form-label" style={styles.formLabel}>View Type:</label>
                    <select className="form-select" style={styles.selectInput} onChange={handleViewChange} value={view}>
                        {data?.data?.[0]?.enetsale === 'ALL' && (
                            <option value="allindia">All India</option>
                        )}
                        <option value="network">Network Wise</option>
                        {reportType === "networkWiseProductWise" && (
                            <option value="quarterwise">Quarter Wise</option>
                        )}
                    </select>
                </div>
            )}

            {/* Division filter always shown */}
            {divison && setSelectedDivison && (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                    <label className="form-label" style={styles.formLabel}>Division:</label>
                    <div>
                        <Multiselect_dropdown
                            className="mb-0"
                            options={divison}
                            selectedList={selectedDivison}
                            setSelected={setSelectedDivison}
                        />
                    </div>
                </div>
            )}

            {/* Conditional filters when view is not 'allindia' */}
            {view !== 'allindia' && (
                <>
                    {(!generictab || reportType === "networkWiseValueWise") && (
                        <>
                            {/* Designation dropdown */}
                            {Desg && (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                                    <label className="form-label" style={styles.formLabel}>Designation:</label>
                                    <select
                                        className="form-select"
                                        style={styles.selectInput}
                                        value={selectedDesg}
                                        onChange={(e) => setselectedDesg && setselectedDesg(e.target.value)}
                                    >
                                        <option value="">--Select--</option>
                                        {Desg.map((a) => (
                                            <option key={a.Mdesc} value={a.Mdesc}>{a.Mdesc}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {/* Plant dropdown
                            {!generictab && plant && reportType !== "networkWiseValueWise" && (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                                    <label className="form-label" style={styles.formLabel}>Plant:</label>
                                    <select
                                        className="form-select"
                                        style={styles.selectInput}
                                        value={selectedplant}
                                        onChange={(e) => setselectedplant && setselectedplant(e.target.value)}
                                    >
                                        <option value="">--Select--</option>
                                        {plant.map((a) => (
                                            <option key={a.value} value={a.value}>{a.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )} */}

                            {/* MIS dropdown */}
                            {Mis && setselectedMis && (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                                    <label className="form-label" style={styles.formLabel}>MIS Desc:</label>
                                    <div>
                                        <Multiselect_dropdown
                                            className=""
                                            options={Mis}
                                            selectedList={selectedMis}
                                            setSelected={setselectedMis}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* generic (plant/brand/product) filters */}
                    {/* brand/product are shown anytime the parent passes in options; plant only when generictab */}
                    {generictab && plant && reportType !== "networkWiseValueWise" && (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                            <label className="form-label" style={styles.formLabel}>Plant:</label>
                            <select
                                className="form-select"
                                style={styles.selectInput}
                                value={selectedplant}
                                onChange={(e) => setselectedplant && setselectedplant(e.target.value)}
                            >
                                <option value="">--Select--</option>
                                {plant.map((a) => (
                                    <option key={a.value} value={a.value}>{a.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {(generictab && Brand && reportType !== "networkWiseValueWise") || view === 'FlatFile' && (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                            <label className="form-label" style={styles.formLabel}>Brand:</label>
                            {brandMulti ? (
                                <div>
                                    <Multiselect_dropdown
                                        className=""
                                        options={Brand}
                                        selectedList={selectedBrand}
                                        setSelected={setselectedBrand}
                                    />
                                </div>
                            ) : (
                                <select
                                    className="form-select"
                                    style={styles.selectInput}
                                    value={selectedBrand}
                                    onChange={(e) => setselectedBrand && setselectedBrand(e.target.value)}
                                >
                                    <option value="ALL">--ALL--</option>
                                    {Brand.map((a) => (
                                        <option key={a.value} value={a.value}>{a.label}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                    {generictab && Product && reportType !== "networkWiseValueWise" && (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
                            <label className="form-label" style={styles.formLabel}>Product:</label>
                            <select
                                className="form-select"
                                style={styles.selectInput}
                                value={selectedProduct}
                                onChange={(e) => setselectedProduct && setselectedProduct(e.target.value)}
                            >
                                <option value="ALL">--ALL--</option>
                                {Product.map((a) => (
                                    <option key={a.value} value={a.value}>{a.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            )}

            {/* Month input */}
            {months && view !== 'quarterwise' && (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-2">
                    <label className="form-label" style={styles.formLabel}>Month:</label>
                    <select
                        className="form-select"
                        style={styles.selectInput}
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

            {/* Year input */}
            {years && (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-2">
                    <label className="form-label" style={styles.formLabel}>Year:</label>
                    <select
                        className="form-select"
                        style={styles.selectInput}
                        value={selectedYear[0]?.value || ''}
                        onChange={(e) => {
                            const selected = (view !== 'quarterwise' || (view === "networkWiseProductWiseNepalYearly" && view === 'networkwise') ? years : monthyears).find(
                                (y) => y.value === parseInt(e.target.value)
                            );
                            setSelectedYear(selected ? [selected] : []);
                        }}
                    >
                        <option value="">Select Year</option>
                        {(view !== 'quarterwise' || (view === "networkWiseProductWiseNepalYearly" && view === 'networkwise') ? years : monthyears).map((year) => (
                            <option key={year.value} value={year.value}>{year.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Go button */}
            {onGo && (
                <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-2 d-flex align-items-end">
                    <button className="btn btn-success w-100" onClick={onGo} style={{ fontWeight: '500' }}>
                        <i className="mdi mdi-play-circle-outline" style={{ marginRight: '0.5rem' }}></i>Go
                    </button>
                </div>
            )}
        </>
    );
};

export default ReportFilters;
