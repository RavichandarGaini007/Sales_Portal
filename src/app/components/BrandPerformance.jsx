import React, { useState, useEffect } from 'react';
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
//import { useFetch } from '../hooks/useFetch';
import BrandWiseReport from './BrandWiseReport';
import ProductWiseReport from './ProductWiseReport';
import { useRequest } from '../common/RequestContext';
// const brandReq = {
//   tbl_name: 'FTP_MAT_VAL_11_2024',
//   empcode: '041406',
//   div: '23',
// };

const BrandPerformance = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { request } = useRequest();
  //const { data: brandData } = useFetch(apiUrls.BrandPerfmnceData, brandReq);
  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const [rowModel, setRowModel] = useState(false);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

  useEffect(() => {
    // Fetch data from API
    (async () => {
      if (request) {
        const opData = await fetchApi(apiUrls.BrandPerfmnceData, {
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
      }
    })();
  }, [request]);

  const activeTabData = tabData[activeTab].data;

  // const funFillData = () => {
  //   if (brandData) {
  //     const achvGreaterThan100 = brandData?.data.filter(
  //       (item) => item.achv >= 100
  //     );
  //     const achvLessThan100 = brandData?.data.filter((item) => item.achv < 100);

  //     setTabData({
  //       0: { data: achvGreaterThan100, loading: false, error: null },
  //       1: { data: achvLessThan100, loading: false, error: null },
  //       2: { data: brandData?.data, loading: false, error: null },
  //     });
  //   }
  // };

  // useEffect(() => {
  //   funFillData();
  // }, [brandData]);

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

  return (
    // <Col lg="7" md="6" sm="6">
    <>
      <Card className="card-stats">
        {/* <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Brand Performance
          </div>
        </CardHeader> */}
        <CardHeader className="card-header-flex">
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Brand Performance
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
        </CardHeader>
        <Nav tabs>
          {flags.map((flag, index) => (
            <NavItem key={index}>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={activeTab === index ? 'active' : ''}
                onClick={() => toggleTab(index)}
              >
                {flag}
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
                          <th>Brand Code</th>
                          <th className="txtLeft">Brand Name</th>
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
                              <td>{item.mvgr1}</td>
                              <td className="txtLeft">{item.brand}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
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

      {/* {rowModel && <HierarchyWiseReport headerName='Brand Row Click' />} */}

      <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
        <Modal.Body>
          <ProductWiseReport
            headerName={rowData?.brand}
            brandCode={rowData?.mvgr1}
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
          <BrandWiseReport headerName="Brand Wise" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    // </Col>
  );
};

export default BrandPerformance;
