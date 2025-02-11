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
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
} from 'reactstrap';
import { apiUrls, fetchApi } from '../lib/fetchApi';
//import { useFetch } from '../hooks/useFetch';
import { Modal } from 'react-bootstrap';
import HqWiseReport from './HqWiseReport';
import { useRequest } from '../common/RequestContext';

// const hierarReq = {
//   tbl_name: 'FTP_MAT_VAL_11_2024',
//   empcode: '041406',
//   div: '23',
//   month: '11',
//   year: '2024',
// };

const HierarchicalPerformanceTabs = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { request } = useRequest();
  //const { data: herarData } = useFetch(apiUrls.SalesHierarchyDesg, hierarReq);

  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  //const [selectedData, setSelectedData] = useState(null);
  const [desgVal, setDesgVal] = useState('ME');
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
        //const opData = null;
        const opData = await fetchApi(apiUrls.SalesHierarchyDesg, {
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

  // const funFillData = () => {
  //   if (herarData) {
  //     const achieve = herarData?.data.filter((item) => item.achv >= 100);
  //     const notAchieve = herarData?.data.filter((item) => item.achv < 100);

  //     setTabData({
  //       0: { data: achieve, loading: false, error: null },
  //       1: { data: notAchieve, loading: false, error: null },
  //       2: { data: herarData?.data, loading: false, error: null },
  //     });
  //   }
  // };

  // useEffect(() => {
  //   funFillData();
  // }, [herarData]);

  const activeTabData = desgVal
    ? tabData[activeTab]?.data?.filter((item) => item.desg === desgVal)
    : tabData[activeTab]?.data || [];

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleRowModel = () => setRowModel((prev) => !prev);

  const handleRowClick = (data) => {
    setrowData(data);
    setRowModel(true);
  };
  // const handleRowClick = (data) => {
  //   setSelectedData(data);
  //   toggleModal(); // Open the modal when a row is clicked
  // };

  const onDropdownClick = (event) => {
    setDesgVal(event.target.value);
  };

  return (
    <Col lg="12" md="6" sm="6">
      <Card className="card-stats">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <div className="stats card-title mb-0">
              <i className="mdi mdi-chart-bar menu-icon" /> Hierarchical
              Performance
            </div>

            <select
              id="roleSelect"
              style={{ maxWidth: '200px' }}
              className="form-control"
              value={desgVal}
              onChange={onDropdownClick}
            >
              <option value="DSM">DSM</option>
              <option value="RM">RM</option>
              <option value="ME">ME</option>
            </select>
            <div
              onClick={toggleModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleModal(); // Triggers the modal toggle on Enter or Space
                }
              }}
            >
              <i className="mdi mdi-view-list" />
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
                          <th className="txtLeft">Name</th>
                          <th>Scorecard</th>
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
                              <td className="txtLeft">{item.name}</td>
                              <td>{item.scorecard}</td>
                              <td>{item.net_amount}</td>
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

        <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData?.name}
              misCode={rowData?.fsCode}
              isDrillEnable={false}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleRowModel}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/*         
        <Modal isOpen={modalOpen} toggle={toggleModal} fullscreen>
          <ModalHeader toggle={toggleModal}>Performance Details</ModalHeader>
          <ModalBody>
            {selectedData ? (
              <div>
                <p>
                  <strong>Name:</strong> {selectedData.name}
                </p>
                <p>
                  <strong>Scorecard:</strong> {selectedData.scorecard}
                </p>
                <p>
                  <strong>Net Amount:</strong> {selectedData.net_amount}
                </p>
                <p>
                  <strong>Target:</strong> {selectedData.target}
                </p>
                <p>
                  <strong>Achievement:</strong> {selectedData.achv}%
                </p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
          </ModalFooter>
        </Modal> */}
      </Card>
    </Col>
  );
};

export default HierarchicalPerformanceTabs;
