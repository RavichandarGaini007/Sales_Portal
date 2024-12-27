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

const BrandModal = ({ divname }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Sample data for each tab
  const data = {
    monthly: [
      {
        name: "PAN SOLIDS",
        grosssale: 99.91,
        saleableret: 20.0,
        nonsaleableret: 5.0,
        pricediffret: 1.0,
        netsales: 73.91,
        pendingpicklist: 10.0,
        pendingorder: 15.0,
        unconfordervalue: 3.0,
        netamount: 76.91,
        target: 100.0,
        ach: 110,
        lastmonthuptodate: 95.0,
        lastyearuptodate: 90.0,
        lastmonth: 92.0,
        lastyear: 85.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },
      {
        name: "PAN - D",
        grosssale: 1771.35,
        saleableret: 150.0,
        nonsaleableret: 40.0,
        pricediffret: 10.0,
        netsales: 1571.35,
        pendingpicklist: 50.0,
        pendingorder: 80.0,
        unconfordervalue: 5.0,
        netamount: 1601.35,
        target: 2000.0,
        ach: 120,
        lastmonthuptodate: 1750.0,
        lastyearuptodate: 1500.0,
        lastmonth: 1700.0,
        lastyear: 1450.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 15,
      },
      {
        name: "PAN MPS",
        grosssale: 84.61,
        saleableret: 5.0,
        nonsaleableret: 1.0,
        pricediffret: 0.5,
        netsales: 78.11,
        pendingpicklist: 2.0,
        pendingorder: 3.0,
        unconfordervalue: 0.5,
        netamount: 81.11,
        target: 50.0,
        ach: 115,
        lastmonthuptodate: 80.0,
        lastyearuptodate: 70.0,
        lastmonth: 75.0,
        lastyear: 60.0,
        lastmonthgrowth: 6,
        lastyeargrowth: 12,
      },
      {
        name: "PAN L",
        grosssale: 107.97,
        saleableret: 10.0,
        nonsaleableret: 3.0,
        pricediffret: 0.7,
        netsales: 94.27,
        pendingpicklist: 8.0,
        pendingorder: 12.0,
        unconfordervalue: 2.0,
        netamount: 96.27,
        target: 60.0,
        ach: 110,
        lastmonthuptodate: 90.0,
        lastyearuptodate: 80.0,
        lastmonth: 85.0,
        lastyear: 75.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },
    ],
    quarterly: [
      {
        name: "PAN SOLIDS",
        grosssale: 99.91,
        saleableret: 20.0,
        nonsaleableret: 5.0,
        pricediffret: 1.0,
        netsales: 73.91,
        pendingpicklist: 10.0,
        pendingorder: 15.0,
        unconfordervalue: 3.0,
        netamount: 76.91,
        target: 100.0,
        ach: 99,
        lastmonthuptodate: 95.0,
        lastyearuptodate: 90.0,
        lastmonth: 92.0,
        lastyear: 85.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },
      {
        name: "PAN - D",
        grosssale: 1771.35,
        saleableret: 150.0,
        nonsaleableret: 40.0,
        pricediffret: 10.0,
        netsales: 1571.35,
        pendingpicklist: 50.0,
        pendingorder: 80.0,
        unconfordervalue: 5.0,
        netamount: 1601.35,
        target: 2000.0,
        ach: 89,
        lastmonthuptodate: 1750.0,
        lastyearuptodate: 1500.0,
        lastmonth: 1700.0,
        lastyear: 1450.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 15,
      },
    ],
    yearly: [
      {
        name: "PAN SOLIDS",
        grosssale: 99.91,
        saleableret: 20.0,
        nonsaleableret: 5.0,
        pricediffret: 1.0,
        netsales: 73.91,
        pendingpicklist: 10.0,
        pendingorder: 15.0,
        unconfordervalue: 3.0,
        netamount: 76.91,
        target: 100.0,
        ach: 110,
        lastmonthuptodate: 95.0,
        lastyearuptodate: 90.0,
        lastmonth: 92.0,
        lastyear: 85.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },
      {
        name: "PAN - D",
        grosssale: 1771.35,
        saleableret: 150.0,
        nonsaleableret: 40.0,
        pricediffret: 10.0,
        netsales: 1571.35,
        pendingpicklist: 50.0,
        pendingorder: 80.0,
        unconfordervalue: 5.0,
        netamount: 1601.35,
        target: 2000.0,
        ach: 120,
        lastmonthuptodate: 1750.0,
        lastyearuptodate: 1500.0,
        lastmonth: 1700.0,
        lastyear: 1450.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 15,
      },
      {
        name: "PAN MPS",
        grosssale: 84.61,
        saleableret: 5.0,
        nonsaleableret: 1.0,
        pricediffret: 0.5,
        netsales: 78.11,
        pendingpicklist: 2.0,
        pendingorder: 3.0,
        unconfordervalue: 0.5,
        netamount: 81.11,
        target: 50.0,
        ach: 115,
        lastmonthuptodate: 80.0,
        lastyearuptodate: 70.0,
        lastmonth: 75.0,
        lastyear: 60.0,
        lastmonthgrowth: 6,
        lastyeargrowth: 12,
      },
      {
        name: "PAN L",
        grosssale: 107.97,
        saleableret: 10.0,
        nonsaleableret: 3.0,
        pricediffret: 0.7,
        netsales: 94.27,
        pendingpicklist: 8.0,
        pendingorder: 12.0,
        unconfordervalue: 2.0,
        netamount: 96.27,
        target: 60.0,
        ach: 110,
        lastmonthuptodate: 90.0,
        lastyearuptodate: 80.0,
        lastmonth: 85.0,
        lastyear: 75.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },{
        name: "PAN SOLIDS",
        grosssale: 99.91,
        saleableret: 20.0,
        nonsaleableret: 5.0,
        pricediffret: 1.0,
        netsales: 73.91,
        pendingpicklist: 10.0,
        pendingorder: 15.0,
        unconfordervalue: 3.0,
        netamount: 76.91,
        target: 100.0,
        ach: 99,
        lastmonthuptodate: 95.0,
        lastyearuptodate: 90.0,
        lastmonth: 92.0,
        lastyear: 85.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 10,
      },
      {
        name: "PAN - D",
        grosssale: 1771.35,
        saleableret: 150.0,
        nonsaleableret: 40.0,
        pricediffret: 10.0,
        netsales: 1571.35,
        pendingpicklist: 50.0,
        pendingorder: 80.0,
        unconfordervalue: 5.0,
        netamount: 1601.35,
        target: 2000.0,
        ach: 89,
        lastmonthuptodate: 1750.0,
        lastyearuptodate: 1500.0,
        lastmonth: 1700.0,
        lastyear: 1450.0,
        lastmonthgrowth: 5,
        lastyeargrowth: 15,
      },
    ],
  };

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    switch (activeTab) {
      case "1":
        return data.yearly;
      case "2":
        return data.monthly;
      case "3":
        return data.quarterly;
      default:
        return [];
    }
  };

  return (
    <Col lg="12" md="12" sm="12">
      <Card className="card-stats">
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Brand Wise{" "}
            <span>({divname})</span>
          </div>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "1" ? "active" : ""}
              onClick={() => toggleTab("1")}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{
                cursor: "pointer",
              }}
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              Not Achieve
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody>
              <Row>
                <Col>
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Brand Name</th>
                        <th>Gross Sale</th>
                        <th>Saleable Ret.</th>
                        <th>Non-Saleable Ret.</th>
                        <th>Price Diff Ret.</th>
                        <th>Net Sales</th>
                        <th>Pending Picklist</th>
                        <th>Pending Order</th>
                        <th>Unconf Order Value</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>Last Month Up To Date</th>
                        <th>Last Year Up To Date</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                        <th>Last Month Growth</th>
                        <th>Last Year Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.saleableret}</td>
                          <td>{item.nonsaleableret}</td>
                          <td>{item.pricediffret}</td>
                          <td>{item.netsales}</td>
                          <td>{item.pendingpicklist}</td>
                          <td>{item.pendingorder}</td>
                          <td>{item.unconfordervalue}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.ach >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.ach}%
                          </td>
                          <td>{item.lastmonthuptodate}</td>
                          <td>{item.lastyearuptodate}</td>
                          <td>{item.lastmonth}</td>
                          <td>{item.lastyear}</td>
                          <td>{item.lastmonthgrowth}%</td>
                          <td>{item.lastyeargrowth}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
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
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Brand Name</th>
                        <th>Gross Sale</th>
                        <th>Saleable Ret.</th>
                        <th>Non-Saleable Ret.</th>
                        <th>Price Diff Ret.</th>
                        <th>Net Sales</th>
                        <th>Pending Picklist</th>
                        <th>Pending Order</th>
                        <th>Unconf Order Value</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>Last Month Up To Date</th>
                        <th>Last Year Up To Date</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                        <th>Last Month Growth</th>
                        <th>Last Year Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.saleableret}</td>
                          <td>{item.nonsaleableret}</td>
                          <td>{item.pricediffret}</td>
                          <td>{item.netsales}</td>
                          <td>{item.pendingpicklist}</td>
                          <td>{item.pendingorder}</td>
                          <td>{item.unconfordervalue}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.ach >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.ach}%
                          </td>
                          <td>{item.lastmonthuptodate}</td>
                          <td>{item.lastyearuptodate}</td>
                          <td>{item.lastmonth}</td>
                          <td>{item.lastyear}</td>
                          <td>{item.lastmonthgrowth}%</td>
                          <td>{item.lastyeargrowth}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
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
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Brand Name</th>
                        <th>Gross Sale</th>
                        <th>Saleable Ret.</th>
                        <th>Non-Saleable Ret.</th>
                        <th>Price Diff Ret.</th>
                        <th>Net Sales</th>
                        <th>Pending Picklist</th>
                        <th>Pending Order</th>
                        <th>Unconf Order Value</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                        <th>Last Month Up To Date</th>
                        <th>Last Year Up To Date</th>
                        <th>Last Month</th>
                        <th>Last Year</th>
                        <th>Last Month Growth</th>
                        <th>Last Year Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.grosssale}</td>
                          <td>{item.saleableret}</td>
                          <td>{item.nonsaleableret}</td>
                          <td>{item.pricediffret}</td>
                          <td>{item.netsales}</td>
                          <td>{item.pendingpicklist}</td>
                          <td>{item.pendingorder}</td>
                          <td>{item.unconfordervalue}</td>
                          <td>{item.netamount}</td>
                          <td>{item.target}</td>
                          <td
                            style={{
                              color: item.ach >= 100 ? "#00d284" : "red",
                            }}
                          >
                            {item.ach}%
                          </td>
                          <td>{item.lastmonthuptodate}</td>
                          <td>{item.lastyearuptodate}</td>
                          <td>{item.lastmonth}</td>
                          <td>{item.lastyear}</td>
                          <td>{item.lastmonthgrowth}%</td>
                          <td>{item.lastyeargrowth}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </TabPane>
        </TabContent>
      </Card>
    </Col>
  );
};

export default BrandModal;
