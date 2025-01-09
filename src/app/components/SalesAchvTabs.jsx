import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
//import { useFetch } from '../hooks/useFetch';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
} from 'reactstrap';
import { apiUrls, fetchApi } from '../lib/fetchApi';

function SalesAchvTabs(props) {
  const flags = ['monthly', 'quaterly', 'yearly'];
  const [activeTab, setActiveTab] = useState('0');

  const [tabData, setTabData] = useState({
    monthly: { data: null, loading: false, error: null },
    quaterly: { data: null, loading: false, error: null },
    yearly: { data: null, loading: false, error: null },
  });

  useEffect(() => {
    const currentFlag = flags[activeTab];

    if (tabData[currentFlag]?.data || tabData[currentFlag]?.loading) {
      return; // If data is available or loading, do nothing
    }

    (async () => {
      try {
        setTabData((prevData) => ({
          ...prevData,
          [currentFlag]: {
            ...prevData[currentFlag],
            loading: true,
          },
        }));

        const opData = await fetchApi(apiUrls.salesAchvdata, {
          ...props.request,
          flag: currentFlag,
        });
        if (!tabData[currentFlag].data && !tabData[currentFlag].loading) {
          setTabData((prevData) => ({
            ...prevData,
            [currentFlag]: {
              data: opData.data.filter(
                (items) => items.division === 'Grand Total'
              ),
              loading: false,
              error: null,
            },
          }));
        }
      } catch (error) {
        // Handle error
        setTabData((prevData) => ({
          ...prevData,
          [currentFlag]: {
            ...prevData[currentFlag],
            loading: false,
            error: error.message || 'An error occurred',
          },
        }));
      }
    })();
  }, [activeTab]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Card className="card-stats">
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-line menu-icon" /> Sales, Achievement,
            Target
          </div>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === '0' ? 'active' : ''}
              onClick={() => toggleTab('0')}
            >
              Monthly
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => toggleTab('1')}
            >
              Quarterly
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              Yearly
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="0">
            <CardBody>
              <Row>
                <div className="speedometer-wrapper">
                  <ReactSpeedometer
                    value={tabData['monthly'].data?.[0]?.achv ?? 0}
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${tabData['monthly'].data?.[0]?.achv ?? '0'}%`}
                    forceRender={true}
                    needleTransitionDuration={4000}
                    needleTransition="easeQuadInOut"
                    height={200}
                    width={310}
                    ringWidth={40}
                  />
                  <Col className="" style={{ paddingLeft: '20px' }}>
                    <Card
                      className="shadow"
                      style={{
                        width: '200px',
                        padding: '10px',
                        textAlign: 'center',
                      }}
                      id="growthCard" // Set ID for the tooltip to reference
                    >
                      <Row className="text-center">
                        <Col>
                          <CardText tag="h6" className="fw-bold">
                            NET AMOUNT (E+H+K):
                          </CardText>
                          <CardText>
                            {tabData['monthly'].data?.[0]?.net_amt ?? '0'}
                          </CardText>
                        </Col>
                        <Col>
                          <CardText tag="h6" className="fw-bold">
                            TARGET:
                          </CardText>
                          <CardText>
                            {tabData['monthly'].data?.[0]?.target ?? '0'}
                          </CardText>
                        </Col>
                        <Col>
                          <CardText tag="h6" className="fw-bold">
                            ACH (%):
                          </CardText>
                          <CardText>
                            {tabData['monthly'].data?.[0]?.achv ?? '0'}
                          </CardText>
                        </Col>
                      </Row>
                      <div style={{ color: 'rgb(13 59 135)' }}>
                        <p>
                          <strong>Last Year Growth:</strong>
                          {tabData['monthly'].data?.[0]?.growth_ly ?? '0'}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {tabData['monthly'].data?.[0]?.growth_lm ?? '0'}
                        </p>
                      </div>
                    </Card>
                  </Col>
                </div>
              </Row>
            </CardBody>
          </TabPane>
          <TabPane tabId="1">
            <CardBody>
              <Row>
                <div className="speedometer-wrapper">
                  <ReactSpeedometer
                    value={tabData['quaterly'].data?.[0]?.achv ?? 0} // Example value for Achievement
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${tabData['quaterly'].data?.[0]?.achv ?? '0'}%`}
                    forceRender={true}
                    needleTransitionDuration={4000}
                    needleTransition="easeQuadInOut"
                    height={200}
                    width={310}
                    ringWidth={40}
                  />
                  <Col className="" style={{ paddingLeft: '20px' }}>
                    <Card
                      className="shadow"
                      style={{
                        width: '200px',
                        padding: '10px',
                        textAlign: 'center',
                      }}
                      id="growthCard" // Set ID for the tooltip to reference
                    >
                      <div style={{ color: 'rgb(13 59 135)' }}>
                        <p>
                          <strong>Last Year Growth:</strong>
                          {tabData['quaterly'].data?.[0]?.growth_ly ?? '0'}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {tabData['quaterly'].data?.[0]?.growth_lm ?? '0'}
                        </p>
                      </div>
                    </Card>
                  </Col>
                </div>
              </Row>
            </CardBody>
          </TabPane>
          <TabPane tabId="2">
            <CardBody>
              <Row>
                <div className="speedometer-wrapper">
                  <ReactSpeedometer
                    value={tabData['yearly'].data?.[0]?.achv ?? 0} // Example value for Target
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${tabData['yearly'].data?.[0]?.achv ?? '0'}%`}
                    forceRender={true}
                    needleTransitionDuration={4000}
                    needleTransition="easeQuadInOut"
                    height={200}
                    width={310}
                    ringWidth={40}
                  />
                  <Col className="" style={{ paddingLeft: '20px' }}>
                    <Card
                      className="shadow"
                      style={{
                        width: '200px',
                        padding: '10px',
                        textAlign: 'center',
                      }}
                      id="growthCard" // Set ID for the tooltip to reference
                    >
                      <div style={{ color: 'rgb(13 59 135)' }}>
                        <p>
                          <strong>Last Year Growth:</strong>
                          {tabData['yearly'].data?.[0]?.growth_ly ?? 0}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {tabData['yearly'].data?.[0]?.growth_lm ?? 0}
                        </p>
                      </div>
                    </Card>
                  </Col>
                </div>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
      </Card>
    </div>
  );
}

export default SalesAchvTabs;
