import React, { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useFetch } from '../hooks/useFetch';
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
import { apiUrls } from '../lib/fetchApi';

function SalesAchvTabs(props) {
  const {
    data: monthlyData,
    // monthlyloading = false,
    // monthlyerror = null,
  } = useFetch(apiUrls.salesAchvdata, { ...props.request, flag: 'monthly' });

  // const monthlyData = [];
  // const yearlyData = [];
  //const qtrlyData = [];
  const {
    data: qtrlyData,
    // qtrlyloading = false,
    // qtrlyerror = null,
  } = useFetch(apiUrls.salesAchvdata, { ...props.request, flag: 'quaterly' });

  const {
    data: yearlyData,
    // yearlyloading = false,
    // yearlyerror = null,
  } = useFetch(apiUrls.salesAchvdata, { ...props.request, flag: 'yearly' });

  //const salesPercentage = '0';
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      //setSalesPercentage(80);
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
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => toggleTab('1')}
            >
              Monthly
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              Quarterly
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => toggleTab('3')}
            >
              Yearly
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody>
              <Row>
                <div className="speedometer-wrapper">
                  <ReactSpeedometer
                    value={monthlyData?.achv}
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${monthlyData?.achv}%`}
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
                          <CardText>{monthlyData?.net_amt}</CardText>
                        </Col>
                        <Col>
                          <CardText tag="h6" className="fw-bold">
                            TARGET:
                          </CardText>
                          <CardText>{monthlyData?.target}</CardText>
                        </Col>
                        <Col>
                          <CardText tag="h6" className="fw-bold">
                            ACH (%):
                          </CardText>
                          <CardText>{monthlyData?.achv}</CardText>
                        </Col>
                      </Row>
                      <div style={{ color: 'rgb(13 59 135)' }}>
                        <p>
                          <strong>Last Year Growth:</strong>
                          {monthlyData?.growth_ly}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {monthlyData?.growth_lm}
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
                    value={qtrlyData?.achv} // Example value for Achievement
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${qtrlyData?.achv}%`}
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
                          {qtrlyData?.growth_ly}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {qtrlyData?.growth_lm}
                        </p>
                      </div>
                    </Card>
                  </Col>
                </div>
              </Row>
            </CardBody>
          </TabPane>
          <TabPane tabId="3">
            <CardBody>
              <Row>
                <div className="speedometer-wrapper">
                  <ReactSpeedometer
                    value={yearlyData?.achv} // Example value for Target
                    minValue={0}
                    maxValue={100}
                    needleColor="blue"
                    startColor="blue"
                    endColor="yellow"
                    textColor="#000000"
                    currentValueText={`${yearlyData?.achv}%`}
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
                          {yearlyData?.growth_ly}
                        </p>
                        <p>
                          <strong>Upto Date Growth:</strong>
                          {yearlyData?.growth_lm}
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
