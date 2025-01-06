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

const HQPerformance = () => {
  const [activeTab, setActiveTab] = useState('3');

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });
  // Sample data for each tab
  // const data = {
  //   monthly: [
  //     { name: "RAJKOT PL", msr: "2",grosssale:"77.53", netamount: 5000, achievement: 110, target: 4500 },
  //     { name: "BHUJ", msr: "1",grosssale:"77.53", netamount: 15000, achievement: 120, target: 12500 },
  //     { name: "SURENDRANAGAR", msr: "3",grosssale:"77.53", netamount: 60000, achievement: 115, target: 52000 },
  //     { name: "AHMEDABAD PL - A", msr: "2",grosssale:"77.53", netamount: 55000, achievement: 110, target: 50000 },
  //   ],
  //   quarterly: [
  //     { name: "JAMNAGAR", msr: "1",grosssale:"77.53", netamount: 10000, achievement: 90, target: 11000 },
  //     { name: "HIMATNAGAR", msr: "1",grosssale:"77.53", netamount: 3000, achievement: 75, target: 4000 },
  //   ],
  //   yearly: [
  //       { name: "RAJKOT PL", msr: "2",grosssale:"77.53", netamount: 5000, achievement: 110, target: 4500 },
  //       { name: "BHUJ", msr: "1",grosssale:"77.53", netamount: 15000, achievement: 120, target: 12500 },
  //       { name: "SURENDRANAGAR", msr: "3", grosssale:"77.53",netamount: 60000, achievement: 115, target: 52000 },
  //       { name: "AHMEDABAD PL - A", msr: "2",grosssale:"77.53", netamount: 55000, achievement: 110, target: 50000 },
  //       { name: "JAMNAGAR", msr: "1",grosssale:"77.53", netamount: 10000, achievement: 90, target: 11000 },
  //       { name: "HIMATNAGAR", msr: "1", grosssale:"77.53",netamount: 3000, achievement: 75, target: 4000 },
  //   ],
  // };

  const fetchData = async (tabIndex) => {
    try {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: true },
      }));

      const response = await fetch(
        'http://192.168.120.64/React_Login_api/api/Sales/SalesDivHQ',
        {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({
            tbl_name: 'FTP_11_2024',
            empcode: '041406',
            div: '23',
          }), // Convert the body object to JSON
        }
      );
      const data = await response.json();
      const achvGreaterThan100 = data.data.filter((item) => item.ach >= 100);
      const achvLessThan100 = data.data.filter((item) => item.ach < 100);

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
        return tabData[0]?.data;
      case '2':
        return tabData[1]?.data;
      case '3':
        return tabData[2]?.data;
      default:
        return [];
    }
  };

  return (
    <Col lg="7" md="6" sm="6">
      <Card className="card-stats">
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> HQ Performance
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
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale</th>
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
                          <tr key={index}>
                            <td>{item.bezei}</td>
                            <td>{item.msr}</td>
                            <td>{item.gross_sale}</td>
                            <td>{item.net_amt1}</td>
                            <td>{item.target1}</td>
                            <td
                              style={{
                                color: item.ach >= 100 ? '#00d284' : 'red',
                              }}
                            >
                              {item.ach}%
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
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale</th>
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
                          <tr key={index}>
                            <td>{item.bezei}</td>
                            <td>{item.msr}</td>
                            <td>{item.gross_sale}</td>
                            <td>{item.net_amt1}</td>
                            <td>{item.target1}</td>
                            <td
                              style={{
                                color: item.ach >= 100 ? '#00d284' : 'red',
                              }}
                            >
                              {item.ach}%
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
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData() &&
                      Array.isArray(getTabData().data) &&
                      getTabData().data.length > 0 ? (
                        getTabData().data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.bezei}</td>
                            <td>{item.msr}</td>
                            <td>{item.gross_sale}</td>
                            <td>{item.net_amt1}</td>
                            <td>{item.target1}</td>
                            <td
                              style={{
                                color: item.ach >= 100 ? '#00d284' : 'red',
                              }}
                            >
                              {item.ach}%
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
      </Card>
    </Col>
  );
};

export default HQPerformance;
