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
} from 'reactstrap';

const TopPerformance = () => {
  const flags = ['Customer', 'Barnd', 'Hq'];

  const [activeTab, setActiveTab] = useState(0);
  //const [data, setData] = useState([]);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });
  const activeTabData = tabData[activeTab].data;

  useEffect(() => {
    const currentFlag = flags[activeTab];

    // Avoid calling API if data is already present and not loading
    if (!tabData[activeTab].data && !tabData[activeTab].loading) {
      fetchData(activeTab, currentFlag);
    }
  }, [activeTab]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const fetchData = async (tabIndex, flag) => {
    try {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: true },
      }));

      const response = await fetch(
        'http://192.168.120.64/React_Login_api/api/Sales/SalesTopPerformance',
        {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({
            tbl_name: 'FTP_11_2024',
            empcode: '041406',
            div: '23',
            flag: flag,
          }), // Convert the body object to JSON
        }
      );
      const data = await response.json();

      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { data: data.data, loading: false, error: null },
      }));
    } catch (error) {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: false, error },
      }));
    }
  };

  return (
    <Col lg="7" md="6" sm="6">
      <Card className="card-stats" style={{ height: '395px' }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Top Performance
          </div>
        </CardHeader>
        <Nav tabs>
          {/* {flags.map((tab, id) => (
          <NavItem>
          <NavLink
            style={{
              cursor: "pointer",
            }}
            className={activeTab === 0 ? "active" : ""}
            onClick={() => toggleTab(0)}
          >
            {tab}
          </NavLink>
        </NavItem>
        ))} */}

          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => toggleTab(0)}
            >
              Customer
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => toggleTab(1)}
            >
              Brand
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => toggleTab(2)}
            >
              HQ
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
                          <th>{tab} Name</th>
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
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
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

        {/* <TabContent activeTab={activeTab}>
          <TabPane tabId={0}>
            <CardBody style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Customer Name</th>
                        <th>Gross Sale</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // Check if activeTabData is not null and activeTabData is an array
                        activeTabData &&
                        Array.isArray(activeTabData) &&
                        activeTabData.length > 0 ? (
                          activeTabData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </Col>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <CardBody>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Brand Name</th>
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
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
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
          <TabPane tabId={2}>
            <CardBody>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Hq Name</th>
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
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
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
        </TabContent> */}
      </Card>
    </Col>
  );
};

export default TopPerformance;
