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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const OrderTracking = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleRowClick = (data) => {
    setSelectedData(data);
    toggleModal(); // Open the modal when a row is clicked
  };

  // Sample data for each tab
  const data = {
    monthly: [
        { orderid: "000001", ordername: "Pan-D", amount: 75000 },
        { orderid: "000002", ordername: "Pan-D", amount: 45000 },
        { orderid: "000003", ordername: "Pan-IT", amount: 1500 },
        { orderid: "000004", ordername: "Pan-D", amount: 25000 },
        { orderid: "000005", ordername: "Pan-D", amount: 12000 },
        { orderid: "000006", ordername: "Pan-D", amount: 2000 },
    ],
    quarterly: [
        { orderid: "000005", ordername: "Pan-D", amount: 12000 },
        { orderid: "000006", ordername: "Pan-D", amount: 2000 },
    ],
    yearly: [
        { orderid: "000001", ordername: "Pan-D", amount: 75000 },
        { orderid: "000002", ordername: "Pan-D", amount: 45000 },
        { orderid: "000003", ordername: "Pan-IT", amount: 1500 },
        { orderid: "000004", ordername: "Pan-D", amount: 25000 },
        { orderid: "000005", ordername: "Pan-D", amount: 12000 },
        { orderid: "000006", ordername: "Pan-D", amount: 2000 },
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
    <Col lg="5" md="6" sm="6">
      <Card className="card-stats" style={{height:"395px"}}>
        <CardHeader>
          <div className="d-flex justify-content-between">
            <div className="stats card-title mb-0">
              <i className="mdi mdi-truck menu-icon" /> Order Tracking
            </div>
            <select id="roleSelect" style={{ maxWidth: "200px" }} className="form-control">
              <option value="000001">000001</option>
              <option value="000002">000002</option>
              <option value="000003">000003</option>
              <option value="000004">000004</option>
              <option value="000005">000005</option>
            </select>
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
              Pending Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Delivered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              Dispatched
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
                        <th>Order Id</th>
                        <th>Order Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.orderid}</td>
                          <td>{item.ordername}</td>
                          <td>{item.amount}</td>
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
                        <th>Order Id</th>
                        <th>Order Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.orderid}</td>
                          <td>{item.ordername}</td>
                          <td>{item.amount}</td>
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
                        <th>Order Id</th>
                        <th>Order Name</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)}>
                          <td>{item.orderid}</td>
                          <td>{item.ordername}</td>
                          <td>{item.amount}</td>
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

export default OrderTracking;
