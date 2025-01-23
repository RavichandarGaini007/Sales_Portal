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

const hierarReq = {
  tbl_name: 'FTP_MAT_VAL_11_2024',
  empcode: '041406',
  div: '23',
  month: '11',
  year: '2024',
};

const HierarchicalPerformanceTabs = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { data: herarData } = useFetch(apiUrls.SalesHierarchyDesg, hierarReq);

  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [desgVal, setDesgVal] = useState('ME');

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

  const funFillData = () => {
    if (herarData) {
      const achieve = herarData?.data.filter((item) => item.achv >= 100);
      const notAchieve = herarData?.data.filter((item) => item.achv < 100);

      setTabData({
        0: { data: achieve, loading: false, error: null },
        1: { data: notAchieve, loading: false, error: null },
        2: { data: herarData?.data, loading: false, error: null },
      });
    }
  };

  useEffect(() => {
    funFillData();
  }, [herarData]);

  const activeTabData = desgVal
    ? tabData[activeTab]?.data?.filter((item) => item.desg === desgVal)
    : tabData[activeTab]?.data || [];

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleRowClick = (data) => {
    setSelectedData(data);
    toggleModal(); // Open the modal when a row is clicked
  };

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
                          <th>Name</th>
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
                              <td>{item.name}</td>
                              <td>{item.scorecard}</td>
                              <td>{item.net_amount}</td>
                              <td>{item.target}</td>
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

        {/* Modal for showing detailed row data */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
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
        </Modal>
      </Card>
    </Col>
  );
};

export default HierarchicalPerformanceTabs;
