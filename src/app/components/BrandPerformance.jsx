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
import { apiUrls } from '../lib/fetchApi';
import { useFetch } from '../hooks/useFetch';

const brandReq = {
  tbl_name: 'FTP_MAT_VAL_11_2024',
  empcode: '041406',
  div: '23',
};
const BrandPerformance = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { data: brandData } = useFetch(apiUrls.BrandPerfmnceData, brandReq);
  const [activeTab, setActiveTab] = useState(2);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

  const funFillData = () => {
    if (brandData) {
      const achvGreaterThan100 = brandData?.data.filter(
        (item) => item.achv >= 100
      );
      const achvLessThan100 = brandData?.data.filter((item) => item.achv < 100);

      setTabData({
        0: { data: achvGreaterThan100, loading: false, error: null },
        1: { data: achvLessThan100, loading: false, error: null },
        2: { data: brandData?.data, loading: false, error: null },
      });
    }
  };

  const activeTabData = tabData[activeTab].data;

  useEffect(() => {
    funFillData();
  }, [brandData]);

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
            <i className="mdi mdi-chart-bar menu-icon" /> Brand Performance
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
                              <td>{item.brand}</td>
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
      </Card>
    </Col>
  );
};

export default BrandPerformance;
