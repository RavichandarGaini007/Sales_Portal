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
import { apiUrls, fetchApi } from '../lib/fetchApi';
import '../css/commonCss.css';

const req = {
  tbl_name: 'FTP_11_2024',
  empcode: '041406',
  div: '23',
};

const HQPerformance = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const [activeTab, setActiveTab] = useState(2);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });
  const activeTabData = tabData[activeTab].data;

  const fetchData = async (tabIndex) => {
    try {
      const opData = await fetchApi(apiUrls.SalesDivHQ, req);
      const allData = opData.data;
      const achvGreaterThan100 = opData.data.filter((item) => item.ach >= 100);
      const achvLessThan100 = opData.data.filter((item) => item.ach < 100);

      setTabData((prevState) => ({
        ...prevState,
        [tabIndex]: { data: allData, loading: false, error: null },
      }));

      setTabData((prevState) => ({
        ...prevState,
        [0]: { data: achvGreaterThan100, loading: false, error: null },
      }));

      setTabData((prevState) => ({
        ...prevState,
        [1]: { data: achvLessThan100, loading: false, error: null },
      }));
    } catch (error) {
      setTabData((prevState) => ({
        ...prevState,
        [tabIndex]: { ...prevState[tabIndex], loading: false, error },
      }));
    }
  };

  useEffect(() => {
    if (tabData[activeTab]?.data || tabData[activeTab]?.loading) {
      return; // If data is available or loading, do nothing
    }

    if (!tabData[activeTab].data && !tabData[activeTab].loading) {
      fetchData(activeTab);
    }
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
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
                          <th className="textLeft">HQ Name</th>
                          <th>MSR</th>
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
                              <td style={{ textAlign: 'left' }}>
                                {item.bezei}
                              </td>
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
    </Col>
  );
};

export default HQPerformance;
