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
      <Col sm="6" className="">
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
      <Col sm="6">
        <Card
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            textAlign: 'center',
          }}

          id="growthCard"
        >
          {/* ===== HEADER ===== */}
          <div
            className="text-center "
            style={{
              background: "linear-gradient(90deg, #0d47a1, #1e88e5)",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
          >
            NET AMOUNT : ₹ {data?.net_amt ?? "0"}
          </div>

          <CardBody>
            {/* ===== TARGET + ACH ===== */}
            <Row className="text-center">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <div className="fw-semibold ">TARGET</div>
                <div className="fs-5 fw-bold">
                  ₹ {data?.target ?? "0"}
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className="fw-semibold ">ACH (%)</div>
                <div
                  className="fs-5 fw-bold"
                  style={{
                    color:
                      Number(data?.achv) >= 50
                        ? "green"
                        : "#f57c00",
                  }}
                >
                  {data?.achv ?? "0"} %
                </div>
              </Col>
            </Row>

            {/* ===== GROWTH CARDS ===== */}
            <Row >
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <div className="rounded text-center bg-light" style={{ padding: '8px' }}>
                  <div className="fw-semibold">
                    LY Growth
                  </div>
                  <div
                    className="fw-bold fs-6"
                    style={{
                      color:
                        Number(data?.growth_ly) >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {data?.growth_ly ?? "0"} %
                  </div>
                </div>
              </Col>

              <Col xs={12} md={6}>
                <div className="rounded text-center bg-light" style={{ padding: '8px' }}>
                  <div className="fw-semibold">
                    UTD Growth
                  </div>
                  <div
                    className="fw-bold fs-6"
                    style={{
                      color:
                        Number(data?.growth_lm) >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {data?.growth_lm ?? "0"} %
                  </div>
                </div>
              </Col>
            </Row>

            {/* ===== RESPONSIVE TABLE ===== */}
            <div className="table-responsive">
              <table className="table table-sm table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Metric</th>
                    <th>Sale</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'left' }}>Last Month UTD</td>
                    <td>₹ {data?.lmutd ?? "0"}</td>
                    <td
                      className="fw-semibold"
                      style={{
                        color:
                          Number(data?.growth_lm) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {data?.growth_lm ?? "0"} %
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: 'left' }}>Last Year UTD</td>
                    <td>₹ {data?.lyutd ?? "0"}</td>
                    <td
                      className="fw-semibold"
                      style={{
                        color:
                          Number(data?.lyutdgrowth) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {data?.lyutdgrowth ?? "0"} %
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: 'left' }}>Last Month</td>
                    <td>₹ {data?.lmsale ?? "0"}</td>
                    <td
                      className="fw-semibold"
                      style={{
                        color:
                          Number(data?.lmgrowth) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {data?.lmgrowth ?? "0"} %
                    </td>
                  </tr>

                  <tr>
                    <td style={{ textAlign: 'left' }}>Last Year</td>
                    <td>₹ {data?.lysale ?? "0"}</td>
                    <td
                      className="fw-semibold"
                      style={{
                        color:
                          Number(data?.growth_ly) >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {data?.growth_ly ?? "0"} %
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
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
