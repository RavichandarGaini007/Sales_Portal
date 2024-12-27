
import React, { useState } from "react";
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
} from "reactstrap";

const BrandPerformance = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Sample data for each tab
  const data = {
    monthly: [
      { name: "PAN SOLIDS", grosssale: "99.91", netamount: 106.87, achievement: 110, target: 100 },
      { name: "PAN - D", grosssale: "1771.35", netamount: 2013.31, achievement: 120, target: 2000 },
      { name: "PAN MPS", grosssale: "84.61", netamount: 91.47, achievement: 115, target: 50 },
      { name: "PAN L", grosssale: "107.97", netamount: 70.71, achievement: 110, target: 60 },
    ],
    quarterly: [
      { name: "PAN IT", grosssale: "30.80", netamount: 115.70, achievement: 46.12, target: 250.87 },
      { name: "EMTY", grosssale: "38.98", netamount: 33.44, achievement: 36.91, target: 90.59 },
    ],
    yearly: [
        { name: "PAN SOLIDS", grosssale: "99.91", netamount: 106.87, achievement: 110, target: 100 },
        { name: "PAN - D", grosssale: "1771.35", netamount: 2013.31, achievement: 120, target: 2000 },
        { name: "PAN MPS", grosssale: "84.61", netamount: 91.47, achievement: 115, target: 50 },
        { name: "PAN L", grosssale: "107.97", netamount: 70.71, achievement: 110, target: 60 },
        { name: "PAN IT", grosssale: "30.80", netamount: 115.70, achievement: 46.12, target: 250.87 },
        { name: "EMTY", grosssale: "38.98", netamount: 33.44, achievement: 36.91, target: 90.59 },
    ],
  };

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    switch (activeTab) {
      case "1":
        return data.monthly;
      case "2":
        return data.quarterly;
      case "3":
        return data.yearly;
      default:
        return [];
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
          <NavItem>
            <NavLink
              style={{
                cursor: "pointer",
              }}
              className={activeTab === "1" ? "active" : ""}
              onClick={() => toggleTab("1")}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Not Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              All
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody>
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
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.achievement >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.achievement}%
                          </td>
                        </tr>
                      ))}
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

export default BrandPerformance;
