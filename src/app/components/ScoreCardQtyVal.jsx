import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Row, Col, Nav, NavItem } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { end } from '@popperjs/core';

const ScoreCardQtyVal = ({ tableData }) => {
    if (!tableData || tableData.length === 0) {
        return null;
    }

    const percAbove100 = tableData.filter((item) => item.val_Ach > 100).length;
    const totRows = tableData.length;
    const percentage = (percAbove100 / totRows) * 100;

    const getProgressColor = (percentage) => {
        if (percentage < 50) return 'red';
        if (percentage < 80) return 'orange';
        return '#00d284';
    };

    const rowExpansionTemplate = ({ data }) => {
        return (
            <div style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>
                {data.products && data.products.length > 0 && (
                    <Row>
                        <Col md="12">
                            <table className="table table-sm table-bordered" style={{ marginBottom: '0' }}>
                                <thead style={{ backgroundColor: '#e8e8e8', position: 'sticky', top: '0' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left' }}>Product Name</th>
                                        <th className="text-right">Val Sale</th>
                                        <th className="text-right">Val Target</th>
                                        <th className="text-right">Val Ach(%)</th>
                                        <th className="text-right">Val Lys</th>
                                        <th className="text-right">Val Growth(%)</th>
                                        <th className="text-right">Qty Sale</th>
                                        <th className="text-right">Qty Target</th>
                                        <th className="text-right">Qty Ach(%)</th>
                                        <th className="text-right">Qty Lys</th>
                                        <th className="text-right">Qty Growth(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.products.map((product, idx) => (
                                        <tr key={idx}>
                                            <td style={{ textAlign: 'left' }}>{product.product_Name || 'N/A'}</td>
                                            <td className="text-right">{product.val_Sale?.toFixed(2) || '0'}</td>
                                            <td className="text-right">{product.val_Target?.toFixed(2) || '0'}</td>
                                            <td className="text-right">
                                                <span style={{ color: product.val_Ach >= 100 ? '#00d284' : 'red' }}>
                                                    {product.val_Ach || '0'}%
                                                </span>
                                            </td>
                                            <td className="text-right">{product.val_lys?.toFixed(2) || '0'}</td>
                                            <td className="text-right">{product.val_Growth?.toFixed(2) || '0'}%</td>
                                            <td className="text-right">{product.qty_Sale?.toFixed(2) || '0'}</td>
                                            <td className="text-right">{product.qty_Target?.toFixed(2) || '0'}</td>
                                            <td className="text-right">
                                                <span style={{ color: product.qty_Ach >= 100 ? '#00d284' : 'red' }}>
                                                    {product.qty_Ach || '0'}%
                                                </span>
                                            </td>
                                            <td className="text-right">{product.qty_lys?.toFixed(2) || '0'}</td>
                                            <td className="text-right">{product.qty_Growth?.toFixed(2) || '0'}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                )}
            </div>
        )
    };

    const columns = [
        {
            name: 'Brand Name',
            selector: row => row.brand_Name,
            sortable: true,
        },
        {
            name: 'Value Sale',
            selector: row => row.val_Sale,
            sortable: true,
            right: true,
            cell: row => row.val_Sale?.toFixed(2),
        },
        {
            name: 'Value Target',
            selector: row => row.val_Target,
            sortable: true,
            right: true,
            cell: row => row.val_Target?.toFixed(2),
        },
        {
            name: 'Val Ach(%)',
            selector: row => row.val_Ach,
            sortable: true,
            right: true,
            cell: row => (
                <span style={{ color: row.val_Ach >= 100 ? '#00d284' : 'red' }}>
                    {row.val_Ach}%
                    {row.val_Ach >= 100 ? (
                        <i className="mdi mdi-arrow-up" style={{ marginLeft: '5px' }}></i>
                    ) : (
                        <i className="mdi mdi-arrow-down" style={{ marginLeft: '5px' }}></i>
                    )}
                </span>
            ),
        },
        {
            name: 'Value Lys',
            selector: row => row.val_Lys,
            sortable: true,
            right: true,
            cell: row => row.val_Lys?.toFixed(2),
        },
        {
            name: 'Value Growth(%)',
            selector: row => row.val_Growth,
            sortable: true,
            right: true,
            cell: row => row.val_Growth?.toFixed(2),
        },

        {
            name: 'Qty Sale',
            selector: row => row.qty_Sale,
            sortable: true,
            right: true,
            cell: row => row.qty_Sale?.toFixed(2),
        },
        {
            name: 'Qty Target',
            selector: row => row.qty_Target,
            sortable: true,
            right: true,
            cell: row => row.qty_Target?.toFixed(2),
        },
        {
            name: 'Qty Ach(%)',
            selector: row => row.qty_Ach,
            sortable: true,
            right: true,
            cell: row => (
                <span style={{ color: row.qty_Ach >= 100 ? '#00d284' : 'red' }}>
                    {row.qty_Ach}%
                    {row.qty_Ach >= 100 ? (
                        <i className="mdi mdi-arrow-up" style={{ marginLeft: '5px' }}></i>
                    ) : (
                        <i className="mdi mdi-arrow-down" style={{ marginLeft: '5px' }}></i>
                    )}
                </span>
            ),
        },
        {
            name: 'Qty Lys',
            selector: row => row.qty_Lys,
            sortable: true,
            right: true,
            cell: row => row.qty_Lys?.toFixed(2),
        },
        {
            name: 'Qty Growth(%)',
            selector: row => row.qty_Growth,
            sortable: true,
            right: true,
            cell: row => row.qty_Growth?.toFixed(2),
        },
    ];

    return (
        <Card className="card-stats" style={{ height: '400px' }}>
            <CardHeader>
                <div className="stats card-title mb-0">
                    <i className="mdi mdi-chart-bar menu-icon" /> Scorecard
                </div>
            </CardHeader>
            <Nav tabs>
                <NavItem style={{ width: '100%' }} className="justify-content-center">
                    {/* Progress bar */}
                    <div className="progress mb-2 mt-2 mx-2" style={{ height: '30px', position: 'relative' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                                width: `${percentage || 100}%`,
                                backgroundColor: getProgressColor(percentage),
                                transition: 'width 0.4s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span style={{ color: 'white', fontWeight: 'bold', position: 'absolute' }}>
                                {percAbove100}/{totRows} - {percentage.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </NavItem>
            </Nav>
            <CardBody style={{ maxHeight: '400px', padding: '0' }}>
                {/* <Scrollbars style={{ width: '100%', height: '300px' }}> */}
                <div >
                    <DataTable
                        columns={columns}
                        data={tableData}
                        expandableRows
                        expandableRowsComponent={rowExpansionTemplate}
                        // pagination
                        // paginationPerPage={10}
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        // paginationComponentOptions={{
                        //     rowsPerPageText: 'Rows:',
                        //     rangeSeparatorText: 'of',
                        //     noRowsPerPage: false,
                        //     selectAllRowsItem: false,
                        //     selectAllRowsItemText: 'All',
                        // }}
                        customStyles={{
                            headRow: {
                                style: {
                                    backgroundColor: '#f0f0f0',
                                    borderBottom: '1px solid #ddd',
                                    justifyContent: end,
                                    position: 'sticky',
                                    top: 0,
                                },
                            },
                            rows: {
                                style: {
                                    minHeight: '40px',
                                    borderBottom: '1px solid #ddd',
                                },
                            },
                        }}
                    />
                </div>
                {/* </Scrollbars> */}
            </CardBody>
        </Card>
    );
};

export default ScoreCardQtyVal;
