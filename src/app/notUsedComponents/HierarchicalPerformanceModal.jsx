import React, { useState } from 'react';
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

const HierarchicalPerformanceModal = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  // const handleRowClick = (data) => {
  //   setSelectedData(data);
  //   toggleModal(); // Open the modal when a row is clicked
  // };

  // Sample data for each tab
  const data = {
    monthly: [
      {
        Division: '23_Suprema',
        DSMRMName: 'AGARTALA DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 138.87,
        TARGET: 307.0,
        Ach: 102,
        VAR: -168.13,
        RET: 0.37,
        LAST_MONTH_UPTO_DATE: 134.31,
        LAST_YEAR_UPTO_DATE: 145.28,
        LAST_MONTH_UPTO_DATE_GROWTH: 3.4,
        LAST_YEAR_UPTO_DATE_GROWTH: -4.41,
        LAST_MONTH: 306.6,
        LAST_YEAR: 283.23,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BERHAMPORE DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 528.72,
        TARGET: 796.35,
        Ach: 110,
        VAR: -267.63,
        RET: 0.18,
        LAST_MONTH_UPTO_DATE: 556.03,
        LAST_YEAR_UPTO_DATE: 335.99,
        LAST_MONTH_UPTO_DATE_GROWTH: -4.91,
        LAST_YEAR_UPTO_DATE_GROWTH: 57.36,
        LAST_MONTH: 841.44,
        LAST_YEAR: 657.66,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BHAGALPUR DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 191.82,
        TARGET: 465.33,
        Ach: 102,
        VAR: -273.51,
        RET: 0.47,
        LAST_MONTH_UPTO_DATE: 204.35,
        LAST_YEAR_UPTO_DATE: 203.01,
        LAST_MONTH_UPTO_DATE_GROWTH: -6.13,
        LAST_YEAR_UPTO_DATE_GROWTH: -5.51,
        LAST_MONTH: 457.1,
        LAST_YEAR: 451.62,
      },
    ],
    quarterly: [
      {
        Division: '23_Suprema',
        DSMRMName: 'AGARTALA DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 138.87,
        TARGET: 307.0,
        Ach: 45.23,
        VAR: -168.13,
        RET: 0.37,
        LAST_MONTH_UPTO_DATE: 134.31,
        LAST_YEAR_UPTO_DATE: 145.28,
        LAST_MONTH_UPTO_DATE_GROWTH: 3.4,
        LAST_YEAR_UPTO_DATE_GROWTH: -4.41,
        LAST_MONTH: 306.6,
        LAST_YEAR: 283.23,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BERHAMPORE DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 528.72,
        TARGET: 796.35,
        Ach: 66.39,
        VAR: -267.63,
        RET: 0.18,
        LAST_MONTH_UPTO_DATE: 556.03,
        LAST_YEAR_UPTO_DATE: 335.99,
        LAST_MONTH_UPTO_DATE_GROWTH: -4.91,
        LAST_YEAR_UPTO_DATE_GROWTH: 57.36,
        LAST_MONTH: 841.44,
        LAST_YEAR: 657.66,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BHAGALPUR DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 191.82,
        TARGET: 465.33,
        Ach: 41.22,
        VAR: -273.51,
        RET: 0.47,
        LAST_MONTH_UPTO_DATE: 204.35,
        LAST_YEAR_UPTO_DATE: 203.01,
        LAST_MONTH_UPTO_DATE_GROWTH: -6.13,
        LAST_YEAR_UPTO_DATE_GROWTH: -5.51,
        LAST_MONTH: 457.1,
        LAST_YEAR: 451.62,
      },
    ],
    yearly: [
      {
        Division: '23_Suprema',
        DSMRMName: 'AGARTALA DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 138.87,
        TARGET: 307.0,
        Ach: 102,
        VAR: -168.13,
        RET: 0.37,
        LAST_MONTH_UPTO_DATE: 134.31,
        LAST_YEAR_UPTO_DATE: 145.28,
        LAST_MONTH_UPTO_DATE_GROWTH: 3.4,
        LAST_YEAR_UPTO_DATE_GROWTH: -4.41,
        LAST_MONTH: 306.6,
        LAST_YEAR: 283.23,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BERHAMPORE DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 528.72,
        TARGET: 796.35,
        Ach: 110,
        VAR: -267.63,
        RET: 0.18,
        LAST_MONTH_UPTO_DATE: 556.03,
        LAST_YEAR_UPTO_DATE: 335.99,
        LAST_MONTH_UPTO_DATE_GROWTH: -4.91,
        LAST_YEAR_UPTO_DATE_GROWTH: 57.36,
        LAST_MONTH: 841.44,
        LAST_YEAR: 657.66,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BHAGALPUR DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 191.82,
        TARGET: 465.33,
        Ach: 102,
        VAR: -273.51,
        RET: 0.47,
        LAST_MONTH_UPTO_DATE: 204.35,
        LAST_YEAR_UPTO_DATE: 203.01,
        LAST_MONTH_UPTO_DATE_GROWTH: -6.13,
        LAST_YEAR_UPTO_DATE_GROWTH: -5.51,
        LAST_MONTH: 457.1,
        LAST_YEAR: 451.62,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'AGARTALA DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 138.87,
        TARGET: 307.0,
        Ach: 45.23,
        VAR: -168.13,
        RET: 0.37,
        LAST_MONTH_UPTO_DATE: 134.31,
        LAST_YEAR_UPTO_DATE: 145.28,
        LAST_MONTH_UPTO_DATE_GROWTH: 3.4,
        LAST_YEAR_UPTO_DATE_GROWTH: -4.41,
        LAST_MONTH: 306.6,
        LAST_YEAR: 283.23,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BERHAMPORE DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 528.72,
        TARGET: 796.35,
        Ach: 66.39,
        VAR: -267.63,
        RET: 0.18,
        LAST_MONTH_UPTO_DATE: 556.03,
        LAST_YEAR_UPTO_DATE: 335.99,
        LAST_MONTH_UPTO_DATE_GROWTH: -4.91,
        LAST_YEAR_UPTO_DATE_GROWTH: 57.36,
        LAST_MONTH: 841.44,
        LAST_YEAR: 657.66,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BHAGALPUR DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 191.82,
        TARGET: 465.33,
        Ach: 41.22,
        VAR: -273.51,
        RET: 0.47,
        LAST_MONTH_UPTO_DATE: 204.35,
        LAST_YEAR_UPTO_DATE: 203.01,
        LAST_MONTH_UPTO_DATE_GROWTH: -6.13,
        LAST_YEAR_UPTO_DATE_GROWTH: -5.51,
        LAST_MONTH: 457.1,
        LAST_YEAR: 451.62,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'AGARTALA DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 138.87,
        TARGET: 307.0,
        Ach: 45.23,
        VAR: -168.13,
        RET: 0.37,
        LAST_MONTH_UPTO_DATE: 134.31,
        LAST_YEAR_UPTO_DATE: 145.28,
        LAST_MONTH_UPTO_DATE_GROWTH: 3.4,
        LAST_YEAR_UPTO_DATE_GROWTH: -4.41,
        LAST_MONTH: 306.6,
        LAST_YEAR: 283.23,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BERHAMPORE DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 528.72,
        TARGET: 796.35,
        Ach: 66.39,
        VAR: -267.63,
        RET: 0.18,
        LAST_MONTH_UPTO_DATE: 556.03,
        LAST_YEAR_UPTO_DATE: 335.99,
        LAST_MONTH_UPTO_DATE_GROWTH: -4.91,
        LAST_YEAR_UPTO_DATE_GROWTH: 57.36,
        LAST_MONTH: 841.44,
        LAST_YEAR: 657.66,
      },
      {
        Division: '23_Suprema',
        DSMRMName: 'BHAGALPUR DSM',
        Scorecard: '0 | 4',
        NET_AMOUNT: 191.82,
        TARGET: 465.33,
        Ach: 41.22,
        VAR: -273.51,
        RET: 0.47,
        LAST_MONTH_UPTO_DATE: 204.35,
        LAST_YEAR_UPTO_DATE: 203.01,
        LAST_MONTH_UPTO_DATE_GROWTH: -6.13,
        LAST_YEAR_UPTO_DATE_GROWTH: -5.51,
        LAST_MONTH: 457.1,
        LAST_YEAR: 451.62,
      },
    ],
  };

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    switch (activeTab) {
      case '1':
        return data.yearly;
      case '2':
        return data.monthly;
      case '3':
        return data.quarterly;
      default:
        return [];
    }
  };

  return (
    <Col lg="12" md="12" sm="12">
      <Card className="card-stats">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <div className="stats card-title mb-0">
              <i className="mdi mdi-chart-bar menu-icon" /> Hierarchical
              Performance
            </div>
            <select style={{ maxWidth: '200px' }} className="form-control">
              <option value="DSM">DSM</option>
              <option value="RM">RM</option>
              <option value="ME">ME</option>
            </select>
          </div>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => toggleTab('1')}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => toggleTab('3')}
            >
              Not Achieve
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Division</th>
                        <th>DSM/RM Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>VAR</th>
                        <th>% RET</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Division}</td>
                          <td>{item.DSMRMName}</td>
                          <td>{item.Scorecard}</td>
                          <td>{item.NET_AMOUNT}</td>
                          <td>{item.TARGET}</td>
                          <td
                            style={{
                              color: item.Ach >= 100 ? '#00d284' : 'red',
                            }}
                          >
                            {item.Ach}%
                          </td>
                          <td>{item.VAR}</td>
                          <td>{item.RET}</td>
                          <td>{item.LAST_MONTH}</td>
                          <td>{item.LAST_YEAR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
            <CardBody>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Division</th>
                        <th>DSM/RM Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>VAR</th>
                        <th>% RET</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Division}</td>
                          <td>{item.DSMRMName}</td>
                          <td>{item.Scorecard}</td>
                          <td>{item.NET_AMOUNT}</td>
                          <td>{item.TARGET}</td>
                          <td
                            style={{
                              color: item.Ach >= 100 ? '#00d284' : 'red',
                            }}
                          >
                            {item.Ach}%
                          </td>
                          <td>{item.VAR}</td>
                          <td>{item.RET}</td>
                          <td>{item.LAST_MONTH}</td>
                          <td>{item.LAST_YEAR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="3">
            <CardBody>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Division</th>
                        <th>DSM/RM Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>VAR</th>
                        <th>% RET</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Division}</td>
                          <td>{item.DSMRMName}</td>
                          <td>{item.Scorecard}</td>
                          <td>{item.NET_AMOUNT}</td>
                          <td>{item.TARGET}</td>
                          <td
                            style={{
                              color: item.Ach >= 100 ? '#00d284' : 'red',
                            }}
                          >
                            {item.Ach}%
                          </td>
                          <td>{item.VAR}</td>
                          <td>{item.RET}</td>
                          <td>{item.LAST_MONTH}</td>
                          <td>{item.LAST_YEAR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
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
                  <strong>Net Amount:</strong> {selectedData.netAmount}
                </p>
                <p>
                  <strong>Target:</strong> {selectedData.target}
                </p>
                <p>
                  <strong>Achievement:</strong> {selectedData.achievement}%
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

export default HierarchicalPerformanceModal;
