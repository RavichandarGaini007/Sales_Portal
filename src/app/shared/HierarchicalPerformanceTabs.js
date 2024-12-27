import React, { useState } from "react";
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
} from "reactstrap";

const HierarchicalPerformanceTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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

  // Sample data for each tab
  const data = {
    monthly: [
      { name: "AGARTALA DSM", scorecard: "4/4", netAmount: 1300, target: 1200, achievement: 110, role: "DSM" },
      { name: "BERHAMPORE DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
      { name: "BHAGALPUR DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "ME" },
      { name: "BIRGANJ DSM", scorecard: "4/4", netAmount: 1300, target: 1500, achievement: 110, role: "DSM" },
      { name: "CALCUTTA DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
      { name: "GAUHATI DSM", scorecard: "4/4", netAmount: 1300, target: 1300, achievement: 110, role: "ME" },
    ],
    quarterly: [
      { name: "ODISHA DSM", scorecard: "1/4", netAmount: 1000, target: 1200, achievement: 88, role: "DSM" },
      { name: "PATNA DSM", scorecard: "3/5", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
      { name: "RANCHI DSM", scorecard: "3/4", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
    ],
    yearly: [
      { name: "AGARTALA DSM", scorecard: "4/4", netAmount: 1300, target: 1200, achievement: 110, role: "DSM" },
      { name: "BERHAMPORE DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
      { name: "BHAGALPUR DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "ME" },
      { name: "BIRGANJ DSM", scorecard: "4/4", netAmount: 1300, target: 1500, achievement: 110, role: "DSM" },
      { name: "CALCUTTA DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
      { name: "GAUHATI DSM", scorecard: "4/4", netAmount: 1300, target: 1300, achievement: 110, role: "ME" },
      { name: "ODISHA DSM", scorecard: "1/4", netAmount: 1000, target: 1200, achievement: 88, role: "DSM" },
      { name: "PATNA DSM", scorecard: "3/5", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
      { name: "RANCHI DSM", scorecard: "3/4", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
    ],
  };

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    switch (activeTab) {
      case "1":
        return data.monthly;
      case "2":
        return data.quarterly;
      case "3":
        return data.yearly;
      default:
        return [];
    }
  };

  return (
    <Col lg="12" md="6" sm="6">
      <Card className="card-stats">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <div className="stats card-title mb-0">
              <i className="mdi mdi-chart-bar menu-icon" /> Hierarchical Performance
            </div>
            <select id="roleSelect" style={{ maxWidth: "200px" }} className="form-control">
              <option value="DSM">DSM</option>
              <option value="RM">RM</option>
              <option value="ME">ME</option>
            </select>
          </div>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{
                cursor: "pointer",
              }}
              className={activeTab === "1" ? "active" : ""}
              onClick={() => toggleTab("1")}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Not Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              All
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
                        <th>Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.name}</td>
                          <td>{item.scorecard}</td>
                          <td>{item.netAmount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
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
                        <th>Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.name}</td>
                          <td>{item.scorecard}</td>
                          <td>{item.netAmount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
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
                        <th>Name</th>
                        <th>Scorecard</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.name}</td>
                          <td>{item.scorecard}</td>
                          <td>{item.netAmount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
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
                <p><strong>Name:</strong> {selectedData.name}</p>
                <p><strong>Scorecard:</strong> {selectedData.scorecard}</p>
                <p><strong>Net Amount:</strong> {selectedData.netAmount}</p>
                <p><strong>Target:</strong> {selectedData.target}</p>
                <p><strong>Achievement:</strong> {selectedData.achievement}%</p>
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
