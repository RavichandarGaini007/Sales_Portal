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

const HierarchicalPerformanceTabs = () => {
  const [activeTab, setActiveTab] = useState('3');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [desgVal, setDesgVal] = useState('ME');

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

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
  // const data = {
  //   monthly: [
  //     { name: "AGARTALA DSM", scorecard: "4/4", netAmount: 1300, target: 1200, achievement: 110, role: "DSM" },
  //     { name: "BERHAMPORE DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
  //     { name: "BHAGALPUR DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "ME" },
  //     { name: "BIRGANJ DSM", scorecard: "4/4", netAmount: 1300, target: 1500, achievement: 110, role: "DSM" },
  //     { name: "CALCUTTA DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
  //     { name: "GAUHATI DSM", scorecard: "4/4", netAmount: 1300, target: 1300, achievement: 110, role: "ME" },
  //   ],
  //   quarterly: [
  //     { name: "ODISHA DSM", scorecard: "1/4", netAmount: 1000, target: 1200, achievement: 88, role: "DSM" },
  //     { name: "PATNA DSM", scorecard: "3/5", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
  //     { name: "RANCHI DSM", scorecard: "3/4", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
  //   ],
  //   yearly: [
  //     { name: "AGARTALA DSM", scorecard: "4/4", netAmount: 1300, target: 1200, achievement: 110, role: "DSM" },
  //     { name: "BERHAMPORE DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
  //     { name: "BHAGALPUR DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "ME" },
  //     { name: "BIRGANJ DSM", scorecard: "4/4", netAmount: 1300, target: 1500, achievement: 110, role: "DSM" },
  //     { name: "CALCUTTA DSM", scorecard: "4/4", netAmount: 1300, target: 1000, achievement: 110, role: "RM" },
  //     { name: "GAUHATI DSM", scorecard: "4/4", netAmount: 1300, target: 1300, achievement: 110, role: "ME" },
  //     { name: "ODISHA DSM", scorecard: "1/4", netAmount: 1000, target: 1200, achievement: 88, role: "DSM" },
  //     { name: "PATNA DSM", scorecard: "3/5", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
  //     { name: "RANCHI DSM", scorecard: "3/4", netAmount: 900, target: 1000, achievement: 99, role: "RM" },
  //   ],
  // };

  const fetchData = async (tabIndex) => {
    try {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: true },
      }));

      const response = await fetch(
        'http://192.168.120.64/React_Login_api/api/Sales/SalesHierarchyDesg',
        {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({
            tbl_name: 'FTP_MAT_VAL_11_2024',
            empcode: '041406',
            div: '23',
            month: '11',
            year: '2024',
          }), // Convert the body object to JSON
        }
      );
      const data = await response.json();
      const achvGreaterThan100 = data.data.filter((item) => item.achv >= 100);
      const achvLessThan100 = data.data.filter((item) => item.achv < 100);

      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { data, loading: false, error: null },
      }));

      setTabData((prevData) => ({
        ...prevData,
        [0]: { data: achvGreaterThan100, loading: false, error: null },
      }));

      setTabData((prevData) => ({
        ...prevData,
        [1]: { data: achvLessThan100, loading: false, error: null },
      }));
    } catch (error) {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: false, error },
      }));
    }
  };

  useEffect(() => {
    // Avoid calling API if data is already present and not loading
    if (!tabData[activeTab - 1].data && !tabData[activeTab - 1].loading) {
      fetchData(activeTab - 1);
    }
  }, []);

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    switch (activeTab) {
      case '1':
        //return tabData[0]?.data;
        return desgVal
          ? tabData[0]?.data?.filter((item) => item.desg === desgVal)
          : tabData[0]?.data || [];
      case '2':
        return desgVal
          ? tabData[1]?.data?.filter((item) => item.desg === desgVal)
          : tabData[1]?.data || [];
      //return tabData[1]?.data;
      case '3':
        //return  || [];
        return tabData[2]?.data
          ? desgVal
            ? tabData[2]?.data.data?.filter((item) => item.desg === desgVal)
            : tabData[2]?.data.data
          : tabData[2]?.data;
      default:
        return [];
    }
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
          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => toggleTab('1')}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              Not Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => toggleTab('3')}
            >
              All
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
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
                      {getTabData() &&
                      Array.isArray(getTabData()) &&
                      getTabData().length > 0 ? (
                        getTabData().map((item, index) => (
                          <tr key={index} onClick={() => handleRowClick(item)}>
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
                        // If no valid data, show a placeholder message
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
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
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
                      {getTabData() &&
                      Array.isArray(getTabData()) &&
                      getTabData().length > 0 ? (
                        getTabData().map((item, index) => (
                          <tr key={index} onClick={() => handleRowClick(item)}>
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
                        // If no valid data, show a placeholder message
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
        <TabContent activeTab={activeTab}>
          <TabPane tabId="3">
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
                      {getTabData() &&
                      Array.isArray(getTabData()) &&
                      getTabData().length > 0 ? (
                        getTabData().map((item, index) => (
                          <tr key={index} onClick={() => handleRowClick(item)}>
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
                        // If no valid data, show a placeholder message
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
