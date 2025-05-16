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
import { useRequest } from '../common/RequestContext';
import BouncingLoader from '../common/BouncingLoader';

// const perfReq = {
//   tbl_name: 'FTP_11_2024',
//   empcode: '041406',
//   div: '23',
//   flag: 'customer',
// };

const TopPerformance = () => {
  const flags = ['Customer', 'Barnd', 'Hq'];
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null, request: null },
    1: { data: null, loading: false, error: null, request: null },
    2: { data: null, loading: false, error: null, request: null },
  });
  const { request } = useRequest();

  const activeTabData = tabData[activeTab].data;

  useEffect(() => {
    const currentFlag = flags[activeTab];

    if (
      request &&
      (!tabData[activeTab]?.data || tabData[activeTab].request !== request)
    ) {
      if (!tabData[activeTab].loading) {
        (async () => {
          setTabData((prevData) => ({
            ...prevData,
            [activeTab]: { ...prevData[activeTab], loading: true, request },
          }));
          const opData = await fetchApi(apiUrls.SalesTopPerformance, {
            ...request,
            flag: currentFlag,
          });

          if (opData && opData.data) {
            setTabData((prevData) => ({
              ...prevData,
              [activeTab]: {
                data: opData.data,
                loading: false,
                error: null,
                request,
              },
            }));
          }
        })();
      }
    }
  }, [activeTab, request]);

  // useEffect(() => {
  //   const currentFlag = flags[activeTab];

  //   if (!tabData[activeTab].loading && request) {
  //     (async () => {
  //       setTabData((prevData) => ({
  //         ...prevData,
  //         [activeTab]: { ...prevData[activeTab], loading: true },
  //       }));
  //       const opData = await fetchApi(apiUrls.SalesTopPerformance, {
  //         ...request,
  //         flag: currentFlag,
  //       });

  //       if (opData && opData.data) {
  //         setTabData((prevData) => ({
  //           ...prevData,
  //           [activeTab]: { data: opData.data, loading: false, error: null },
  //         }));
  //       }
  //     })();
  //   }
  // }, [activeTab, request]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Col lg="7" md="6" sm="6">
      <Card className="card-stats com-card-height">
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Top 5 Performance
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
              <CardBody className="com-card-body-height">
                {tabData[activeTab].loading ? (
                  <BouncingLoader />
                ) : (
                  <Row>
                    <Col>
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th className="txtLeft">{tab} Name</th>
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
                                <td className="txtLeft">{item.name}</td>
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
                )}
              </CardBody>
            </TabPane>
          </TabContent>
        ))}
      </Card>
    </Col>
  );
};

export default TopPerformance;
