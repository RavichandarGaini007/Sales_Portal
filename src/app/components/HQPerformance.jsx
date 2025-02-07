import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
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
} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import CustomerWiseReport from './CustomerWiseReport';
import { exportToExcel, FileDownload } from '../lib/fileDownload';
import { useRequest } from '../common/RequestContext';

const HQPerformance = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { request } = useRequest();

  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const [rowModel, setRowModel] = useState(false);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });
  const activeTabData = tabData[activeTab].data;

  useEffect(() => {
    //if (tabData[activeTab]?.data || tabData[activeTab]?.loading) return; // If data is available or loading, do nothing

    if (request) {
      (async () => {
        const opData = await fetchApi(apiUrls.SalesDivHQ, {
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
        });

        if (opData && opData.data) {
          const achieve = opData?.data.filter((item) => item.achv >= 100);
          const notAchieve = opData?.data.filter((item) => item.achv < 100);

          setTabData({
            0: { data: achieve, loading: false, error: null },
            1: { data: notAchieve, loading: false, error: null },
            2: { data: opData?.data, loading: false, error: null },
          });
        }
      })();
    }
  }, [request]);

  // const fetchData = useCallback(async (tabIndex) => {
  //   setTabData((prevState) => ({
  //     ...prevState,
  //     [tabIndex]: { ...prevState[tabIndex], loading: true },
  //   }));

  //   try {
  //     const opData = await fetchApi(apiUrls.SalesDivHQ, req);
  //     const allData = opData.data;
  //     const achvGreaterThan100 = allData.filter((item) => item.ach >= 100);
  //     const achvLessThan100 = allData.filter((item) => item.ach < 100);

  //     setTabData((prevState) => ({
  //       ...prevState,
  //       0: { data: achvGreaterThan100, loading: false, error: null },
  //       1: { data: achvLessThan100, loading: false, error: null },
  //       2: { data: allData, loading: false, error: null },
  //     }));
  //   } catch (error) {
  //     setTabData((prevState) => ({
  //       ...prevState,
  //       [tabIndex]: { ...prevState[tabIndex], loading: false, error },
  //     }));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (tabData[activeTab]?.data || tabData[activeTab]?.loading) {
  //     return; // If data is available or loading, do nothing
  //   }

  //   if (!tabData[activeTab].data && !tabData[activeTab].loading) {
  //     fetchData(activeTab);
  //   }
  // }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen((prev) => !prev);

  const toggleRowModel = () => setRowModel((prev) => !prev);

  const handleRowClick = (data) => {
    setrowData(data);
    setRowModel(true);
  };

  const downloadExcel = () => {
    //exportToExcel(tabData[activeTab].data); working excel download
    FileDownload(tabData[activeTab].data);
  };

  return (
    // <Col lg="7" md="6" sm="6">
    <>
      <Card className="card-stats">
        <CardHeader className="card-header-flex">
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> HQ Performance
          </div>
          <div
            className="icon-container"
            onClick={toggleModal}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleModal(); // Triggers the modal toggle on Enter or Space
              }
            }}
          >
            <i className="mdi mdi-view-list" />
          </div>
          <Button variant="secondary" onClick={downloadExcel}>
            Download
          </Button>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => toggleTab(0)}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => toggleTab(1)}
            >
              Not Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => toggleTab(2)}
            >
              All
            </NavLink>
          </NavItem>
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
                          <th>HQ</th>
                          <th className="txtLeft">HQ Name</th>
                          <th>MSR</th>
                          <th>ScoreCard</th>
                          <th>Gross Sale</th>
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
                              <td>{item.vkbur}</td>
                              <td className="txtLeft">{item.bezei}</td>
                              <td>{item.msr}</td>
                              <td>{item.for_ord}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt1}</td>
                              <td>{item.target1}</td>
                              <td
                                style={{
                                  color: item.achv >= 100 ? '#00d284' : 'red',
                                }}
                              >
                                {item.achv}%
                                {item.achv >= 100 ? (
                                  <i className="mdi mdi-arrow-up"></i>
                                ) : (
                                  <i className="mdi mdi-arrow-down"></i>
                                )}
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

      <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
        <Modal.Body>
          <CustomerWiseReport
            headerName={rowData?.bezei}
            HqCode={rowData?.vkbur}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleRowModel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalOpen} onHide={toggleModal} fullscreen>
        <Modal.Body>
          <HqWiseReport headerName="Hq Wise" isDrillEnable={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    //</Col >
  );
};

export default HQPerformance;
