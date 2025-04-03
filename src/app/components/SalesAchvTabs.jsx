import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
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
} from 'reactstrap';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import { useRequest } from '../common/RequestContext';
import BouncingLoader from '../common/BouncingLoader';

const SpeedometerCard = ({ data }) => {
  return (
    <Row style={{ paddingLeft: '15px' }} className="align-items-center">
      <Col sm="8" className="">
        <ReactSpeedometer
          value={Math.min(data?.achv ?? 0, 100)}
          minValue={0}
          maxValue={100}
          needleColor="blue"
          startColor="blue"
          endColor="yellow"
          textColor="#000000"
          currentValueText={`${data?.achv ?? '0'}%`}
          forceRender={true}
          needleTransitionDuration={4000}
          needleTransition="easeQuadInOut"
          height={200}
          width={310}
          ringWidth={40}
        />
      </Col>
      <Col sm="4">
        <Card
          className="shadow"
          style={{
            width: '200px',
            padding: '10px',
            textAlign: 'center',
          }}
          id="growthCard"
        >
          <Row className="text-center">
            <Col md="12">
              <p>
                <b>NET AMOUNT :</b> {data?.net_amt ?? '0'}
              </p>
              {/* <CardText className="fw-bold">NET AMOUNT :</CardText>
              <CardText>{data?.net_amt ?? '0'}</CardText> */}
            </Col>
            <Col>
              <p>
                <b>TARGET :</b> {data?.target ?? '0'}
              </p>
              {/* <CardText className="fw-bold">TARGET:</CardText>
              <CardText>{data?.target ?? '0'}</CardText> */}
            </Col>
            <Col>
              <p>
                <b>ACH (%) :</b> {data?.achv ?? '0'}
              </p>
              {/* <CardText className="fw-bold">ACH (%):</CardText>
              <CardText>{data?.achv ?? '0'}</CardText> */}
            </Col>
          </Row>
          <div style={{ color: 'rgb(13 59 135)' }}>
            <p>
              <strong>Last Year Growth:</strong>
              {data?.growth_ly ?? '0'}
            </p>
            <p>
              <strong>Upto Date Growth:</strong>
              {data?.growth_lm ?? '0'}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

function SalesAchvTabs() {
  const flags = ['monthly', 'quaterly', 'yearly'];
  const { request } = useRequest();

  const [activeTab, setActiveTab] = useState('0');
  const [tabData, setTabData] = useState({
    monthly: { data: null, loading: false, error: null, request: null },
    quaterly: { data: null, loading: false, error: null, request: null },
    yearly: { data: null, loading: false, error: null, request: null },
  });

  useEffect(() => {
    const currentFlag = flags[activeTab];

    //// below code is not working if i change the request and state has data already
    //if (tabData[currentFlag].data || tabData[currentFlag]?.loading) return; // If data is available or loading, do nothing

    (async () => {
      try {
        if (
          request &&
          (!tabData[activeTab]?.data || tabData[activeTab].request !== request)
        ) {
          setTabData((prevData) => ({
            ...prevData,
            [currentFlag]: {
              ...prevData[currentFlag],
              loading: true,
              request,
            },
          }));

          if (request) {
            const opData = await fetchApi(apiUrls.salesAchvdata, {
              ...request,
              flag: currentFlag,
            });

            if (opData.data) {
              setTabData((prevData) => ({
                ...prevData,
                [currentFlag]: {
                  data: opData.data.filter(
                    (items) => items.division === 'Grand Total'
                  ),
                  loading: false,
                  error: null,
                  request,
                },
              }));
            }
          }
        }
      } catch (error) {
        // Handle error
        setTabData((prevData) => ({
          ...prevData,
          [currentFlag]: {
            ...prevData[currentFlag],
            loading: false,
            error: error.message || 'An error occurred',
            request,
          },
        }));
      }
    })();
  }, [request, activeTab]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    // <Col lg="7" md="6" sm="6">
    <Card className="card-stats">
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-line menu-icon" /> Sales, Achievement,
          Target
        </div>
      </CardHeader>
      <Nav tabs>
        {flags.map((flag, index) => (
          <NavItem key={index}>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === String(index) ? 'active' : ''}
              onClick={() => toggleTab(String(index))}
            >
              {flag.charAt(0).toUpperCase() + flag.slice(1)}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {flags.map((flag, index) => (
          <TabPane tabId={String(index)} key={index}>
            <CardBody>
              {tabData[flag].loading ? (
                <BouncingLoader />
              ) : (
                <Row>
                  <div className="speedometer-wrapper">
                    <SpeedometerCard data={tabData[flag].data?.[0]} />
                  </div>
                </Row>
              )}
            </CardBody>
          </TabPane>
        ))}
      </TabContent>
    </Card>
    // </Col>
  );
}

export default SalesAchvTabs;
