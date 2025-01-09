import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
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

const PopupTableModal = (props) => {
  const {
    data,
    // loading = false,
    // error = null,
  } = useFetch(props.url, props.request);
  const flags = ['Achieve', 'Not Achieve', 'All'];

  const [activeTab, setActiveTab] = useState('3');
  //const [data, setData] = useState([]);

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

  useEffect(() => {
    const achvGreaterThan100 = data.filter((item) => item.achv >= 100);
    const achvLessThan100 = data.filter((item) => item.achv < 100);

    setTabData(() => ({
      [0]: { data, loading: false, error: null },
    }));

    setTabData(() => ({
      [1]: { data: achvGreaterThan100, loading: false, error: null },
    }));

    setTabData(() => ({
      [2]: { data: achvLessThan100, loading: false, error: null },
    }));
  }, [data]);

  const getTabData = () => {
    if (tabData) {
      switch (activeTab) {
        case '1':
          return tabData[0]?.data || [];
        case '2':
          return tabData[1]?.data || [];
        case '3':
          return tabData[2]?.data || [];
        default:
          return [];
      }
    }
  };

  return (
    <Col lg="7" md="6" sm="6">
      <Card className="card-stats" style={{ height: '395px' }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> props.header
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
              ALL
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
                      {getTabData() &&
                      Array.isArray(getTabData().data) &&
                      getTabData().data.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              {Object.keys(getTabData().data[0]).map(
                                (key, index) => (
                                  <th key={index}>
                                    {key.replace('_', ' ').toUpperCase()}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {getTabData().data.map((item, index) => (
                              <tr key={index}>
                                {Object.keys(item).map((key, idx) => (
                                  <td
                                    key={idx}
                                    style={
                                      key === 'achv' && item[key] >= 100
                                        ? { color: '#00d284' }
                                        : { color: 'red' }
                                    }
                                  >
                                    {item[key]}{' '}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                              No data available
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </Col>
                </Row>
              </CardBody>
            </TabPane>
          </TabContent>
        ))}

        {/* 
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    {getTabData() &&
                    Array.isArray(getTabData().data) &&
                    getTabData().data.length > 0 ? (
                      <>
                        <thead className="thead-light">
                          <tr>
                            {Object.keys(getTabData().data[0]).map(
                              (key, index) => (
                                <th key={index}>
                                  {key.replace('_', ' ').toUpperCase()}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {getTabData().data.map((item, index) => (
                            <tr key={index}>
                              {Object.keys(item).map((key, idx) => (
                                <td
                                  key={idx}
                                  style={
                                    key === 'achv' && item[key] >= 100
                                      ? { color: '#00d284' }
                                      : { color: 'red' }
                                  }
                                >
                                  {item[key]}{' '}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center' }}>
                            No data available
                          </td>
                        </tr>
                      </tbody>
                    )}
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
                    {getTabData() &&
                    Array.isArray(getTabData().data) &&
                    getTabData().data.length > 0 ? (
                      <>
                        <thead className="thead-light">
                          <tr>
                            {Object.keys(getTabData().data[0]).map(
                              (key, index) => (
                                <th key={index}>
                                  {key.replace('_', ' ').toUpperCase()}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {getTabData().data.map((item, index) => (
                            <tr key={index}>
                              {Object.keys(item).map((key, idx) => (
                                <td
                                  key={idx}
                                  style={
                                    key === 'achv' && item[key] >= 100
                                      ? { color: '#00d284' }
                                      : { color: 'red' }
                                  }
                                >
                                  {item[key]}{' '}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center' }}>
                            No data available
                          </td>
                        </tr>
                      </tbody>
                    )}
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
                    {getTabData() &&
                    Array.isArray(getTabData().data) &&
                    getTabData().data.length > 0 ? (
                      <>
                        <thead className="thead-light">
                          <tr>
                            {Object.keys(getTabData().data[0]).map(
                              (key, index) => (
                                <th key={index}>
                                  {key.replace('_', ' ').toUpperCase()}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {getTabData().data.map((item, index) => (
                            <tr key={index}>
                              {Object.keys(item).map((key, idx) => (
                                <td
                                  key={idx}
                                  style={
                                    key === 'achv' && item[key] >= 100
                                      ? { color: '#00d284' }
                                      : { color: 'red' }
                                  }
                                >
                                  {item[key]}{' '}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center' }}>
                            No data available
                          </td>
                        </tr>
                      </tbody>
                    )}
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

export default PopupTableModal;
