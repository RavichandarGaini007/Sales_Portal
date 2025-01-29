import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { apiUrls } from '../lib/fetchApi';
import { useFetch } from '../hooks/useFetch';
//import '../css/commonCss.css';

const regionReq = {
    tbl_name: 'FTP_MAT_VAL_11_2024',
    empcode: '041406',
    div: '01',
    month: '11',
    year: '2024',
    brand: '231',
};
function RegionPerformance() {
    const flags = ['Achieve', 'Not Achieve', 'All'];
    const { data: regionData } = useFetch(apiUrls.RegionReportData, regionReq);

    const [activeTab, setActiveTab] = useState(2);
    const [modalOpen, setModalOpen] = useState(false);

    const [tabData, setTabData] = useState({
        0: { data: null, loading: false, error: null },
        1: { data: null, loading: false, error: null },
        2: { data: null, loading: false, error: null },
    });

    const funFillData = () => {
        if (regionData) {
            const achieve = regionData?.data.filter((item) => item.achv >= 100);
            const notAchieve = regionData?.data.filter((item) => item.achv < 100);

            setTabData({
                0: { data: achieve, loading: false, error: null },
                1: { data: notAchieve, loading: false, error: null },
                2: { data: regionData?.data, loading: false, error: null },
            });
        }
    };

    useEffect(() => {
        funFillData();
    }, [regionData]);

    const activeTabData = tabData[activeTab]?.data;

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleRowClick = (data) => {
        toggleModal(); // Open the modal when a row is clicked
    };

    return (
        <Col lg="12" md="6" sm="6">
            <Card className="card-stats">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <div className="stats card-title mb-0">
                            <i className="mdi mdi-chart-bar menu-icon" /> Region
                            Performance
                        </div>
                    </div>
                </CardHeader>
                <Nav tabs>
                    {flags.map((tab, index) => (
                        <NavItem key={index}>
                            <NavLink
                                style={{ cursor: 'pointer' }}
                                className={activeTab === index ? 'active' : ''}
                                onClick={() => toggleTab(index)}
                            >
                                {tab}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>

                {flags.map((tab, id) => (
                    <TabContent key={id} activeTab={activeTab}>
                        <TabPane tabId={id}>
                            <CardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <Row>
                                    <Col>
                                        <table className="table table-bordered">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Region</th>
                                                    <th className="txtLeft">Region Name</th>
                                                    <th>Net Sale</th>
                                                    <th>Net Amount</th>
                                                    <th>Target</th>
                                                    <th>Ach(%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeTabData &&
                                                    Array.isArray(activeTabData) &&
                                                    activeTabData.length > 0 ? (
                                                    activeTabData.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            onClick={() => handleRowClick(item)}
                                                        >
                                                            <td>{item.regio}</td>
                                                            <td className="txtLeft"
                                                                style={{ cursor: 'pointer' }}
                                                            >{item.region_desc}</td>
                                                            <td>{item.netsales1}</td>
                                                            <td>{item.net_amt1}</td>
                                                            <td>{item.target1}</td>
                                                            <td
                                                                style={{
                                                                    color: item.achv >= 100 ? '#00d284' : 'red',
                                                                }}
                                                            >
                                                                {item.achv}%
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                                            No data available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </TabPane>
                    </TabContent>
                ))}
            </Card>
        </Col >
    );
}

export default RegionPerformance
