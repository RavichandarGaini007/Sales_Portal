import React, { useState, useEffect } from "react";
import axios from "axios";
// react plugin used to create charts
import { Doughnut, Line, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
  CardText,
} from "reactstrap";
import ReactSpeedometer from "react-d3-speedometer";
import "bootstrap/dist/css/bootstrap.min.css";
import ScoreCard from "./ScoreCard";
import HQPerformance from "./HQPerformance";
import SaleablePieChart from "./SaleablePieChart";
import BrandPerformance from "./BrandPerformance";
import UnconfirmedOrderChart from "./UnconfirmedOrderChart";
import HierarchicalPerformanceTabs from "./HierarchicalPerformanceTabs";
import OrderTracking from "./OrderTracking";
import TopPerformance from "./TopPerformance";
import NewsAndInformation from "./NewsAndInformation";
import AwardsDetailsCard from "./AwardsDetailsCard";
import { useNavigate } from "react-router-dom";
import SalesDivBar from "./SalesDivBar";

const Dashboard = () => {
  const [scData, setScData] = useState([]);
  const [scoracrdPercentage, setScPerce] = useState("0");
  const [salableData, setSalableData] = useState([]);
  const [salesDivData, setSalesDivData] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [activeTab, setActiveTab] = useState("1");
  const [salesPercentage, setSalesPercentage] = useState(20); // Initial sales value

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setSalesPercentage(80);
    }
  };
  const handleTabClick = (percentage) => {
    setSalesPercentage(percentage);
  };
  const newportal_Click = () => {
    navigate("/dashboard");
  };
  const tableformate_Click = () => {
    navigate("/SalesPortal");
  };
  // const oldportal_Click = () => {
  //   navigate('/dashboard');
  // };

  const scoreCardReq = {
    tbl_name: "FTP_MAT_VAL_11_2024",
    empcode: "041406",
    div: "23",
    month: "11",
    year: "2024",
  };

  const salableNonSaleReq = {
    tbl_name: "FTP_11_2024",
    empcode: "041406",
    div: "23",
    month: "11",
    year: "2024",
    flag: "monthly",
  };

  useEffect(() => {
    // Fetch data from API
    axios
      .post(
        "http://192.168.120.64/React_Login_api/api/Sales/SalesScData",
        scoreCardReq,
        {
          headers: {
            "Content-Type": "application/json", // Required for JSON requests
          },
        }
      ) // Replace with your API endpoint
      .then((response) => {
        const data = response.data.data;
        setScData(data);

        let percAbove100 = data.filter((item) => item.ach > 100).length;
        let totRows = data.length;
        let perc = (percAbove100 / totRows) * 100;
        setScPerce(perc);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from API
    axios
      .post(
        "http://192.168.120.64/React_Login_api/api/Sales/salesAchvdata",
        salableNonSaleReq,
        {
          headers: {
            "Content-Type": "application/json", // Required for JSON requests
          },
        }
      ) // Replace with your API endpoint
      .then((response) => {
        const data = response.data.data;
        setSalableData(data.filter((item) => item.division === "Grand Total"));
        setSalesDivData(data.filter((item) => item.division != "Grand Total"));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper pb-0">
          <div className="page-header flex-wrap">
            <div className="header-left">
              <button
                className="btn btn-primary mb-2 mb-md-0 mr-2"
                onClick={newportal_Click}
              >
                {" "}
                New Portal{" "}
              </button>
              <button
                className="btn btn-outline-primary mb-2 mb-md-0 mr-2"
                onClick={tableformate_Click}
              >
                {" "}
                Table Formate{" "}
              </button>
              <button className="btn btn-outline-primary mb-2 mb-md-0 mr-2">
                <a
                  href="https://sales.alkemcrm.com/sd_new/default.aspx"
                  target="_blank"
                >
                  {" "}
                  Old Portal{" "}
                </a>
              </button>
            </div>
          </div>
          <Row className="">
            <Col lg="7" md="7" sm="7">
              <Card className="card-stats">
                <CardHeader>
                  <div className="stats card-title mb-0">
                    <i className="mdi mdi-chart-line menu-icon" /> Sales,
                    Achievement, Target
                  </div>
                </CardHeader>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      style={{
                        cursor: "pointer",
                      }}
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        handleTabClick(30); // Action 1: Update percentage
                        toggleTab("1");
                      }}
                    >
                      Monthly
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => toggleTab("2")}
                    >
                      Quarterly
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={activeTab === "3" ? "active" : ""}
                      onClick={() => toggleTab("3")}
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
                            value={salesPercentage}
                            minValue={0}
                            maxValue={100}
                            needleColor="blue"
                            startColor="blue"
                            endColor="yellow"
                            textColor="#000000"
                            currentValueText={`${salesPercentage}%`}
                            forceRender={true}
                            needleTransitionDuration={4000}
                            needleTransition="easeQuadInOut"
                            height={200}
                            width={310}
                            ringWidth={40}
                          />
                          <Col className="" style={{ paddingLeft: "20px" }}>
                            <Card
                              className="shadow"
                              style={{
                                width: "200px",
                                padding: "10px",
                                textAlign: "center",
                              }}
                              id="growthCard" // Set ID for the tooltip to reference
                            >
                              <Row className="text-center">
                                <Col>
                                  <CardText tag="h6" className="fw-bold">
                                    NET AMOUNT (E+H+K):
                                  </CardText>
                                  <CardText>"7,004.7"</CardText>
                                </Col>
                                <Col>
                                  <CardText tag="h6" className="fw-bold">
                                    TARGET:
                                  </CardText>
                                  <CardText>"10,319.86"</CardText>
                                </Col>
                                <Col>
                                  <CardText tag="h6" className="fw-bold">
                                    ACH (%):
                                  </CardText>
                                  <CardText> "67.88%"</CardText>
                                </Col>
                              </Row>
                              <div style={{ color: "rgb(13 59 135)" }}>
                                <p>
                                  <strong>Last Year Growth:</strong> 5%
                                </p>
                                <p>
                                  <strong>Upto Date Growth:</strong> 10%
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
                            value={50} // Example value for Achievement
                            minValue={0}
                            maxValue={100}
                            needleColor="blue"
                            startColor="blue"
                            endColor="yellow"
                            textColor="#000000"
                            currentValueText={`50%`}
                            forceRender={true}
                            needleTransitionDuration={4000}
                            needleTransition="easeQuadInOut"
                            height={200}
                            width={310}
                            ringWidth={40}
                          />
                          <Col className="" style={{ paddingLeft: "20px" }}>
                            <Card
                              className="shadow"
                              style={{
                                width: "200px",
                                padding: "10px",
                                textAlign: "center",
                              }}
                              id="growthCard" // Set ID for the tooltip to reference
                            >
                              <div style={{ color: "rgb(13 59 135)" }}>
                                <p>
                                  <strong>Last Year Growth:</strong> 5%
                                </p>
                                <p>
                                  <strong>Upto Date Growth:</strong> 10%
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
                            value={90} // Example value for Target
                            minValue={0}
                            maxValue={100}
                            needleColor="blue"
                            startColor="blue"
                            endColor="yellow"
                            textColor="#000000"
                            currentValueText={`90%`}
                            forceRender={true}
                            needleTransitionDuration={4000}
                            needleTransition="easeQuadInOut"
                            height={200}
                            width={310}
                            ringWidth={40}
                          />
                          <Col className="" style={{ paddingLeft: "20px" }}>
                            <Card
                              className="shadow"
                              style={{
                                width: "200px",
                                padding: "10px",
                                textAlign: "center",
                              }}
                              id="growthCard" // Set ID for the tooltip to reference
                            >
                              <div style={{ color: "rgb(13 59 135)" }}>
                                <p>
                                  <strong>Last Year Growth:</strong> 5%
                                </p>
                                <p>
                                  <strong>Upto Date Growth:</strong> 10%
                                </p>
                              </div>
                            </Card>
                          </Col>
                        </div>
                      </Row>
                    </CardBody>
                  </TabPane>
                </TabContent>
                {/* <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-sync-alt" /> Sales, Achievement, Target
                  </div>
                </CardFooter> */}
              </Card>
            </Col>
            <Col lg="5" md="5" sm="5">
              <SalesDivBar tableData = {salesDivData}></SalesDivBar>
            </Col>
          </Row>
          <Row>
            <Card className="card-stats">
              <CardHeader>
                <div className="stats card-title mb-0">
                  <i className="mdi mdi-chart-bar menu-icon" /> Scorecard
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <ScoreCard
                    percentage={scoracrdPercentage}
                    tableData={scData}
                  />
                </Row>
              </CardBody>
            </Card>
          </Row>
          <Row className="mt-performace">
            <HQPerformance></HQPerformance>
            <SaleablePieChart tableData={salableData}></SaleablePieChart>
          </Row>
          <Row className="mt-performace">
            <BrandPerformance></BrandPerformance>
            <UnconfirmedOrderChart
              tableData={salableData}
            ></UnconfirmedOrderChart>
          </Row>
          <Row className="mt-performace">
            <HierarchicalPerformanceTabs></HierarchicalPerformanceTabs>
          </Row>
          <Row className="mt-performace">
            <OrderTracking></OrderTracking>
            <TopPerformance></TopPerformance>
          </Row>
          <Row className="mt-performace">
            <NewsAndInformation></NewsAndInformation>
            <AwardsDetailsCard></AwardsDetailsCard>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
