import React, { useState, useEffect } from "react";
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

const TopPerformance = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState([]);

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

  const fetchData = async (tabIndex, flag) => {
    try {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: true },
      }));

      const response = await fetch(
        "http://192.168.120.64/React_Login_api/api/Sales/SalesTopPerformance",
        {
          method: "POST", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({
            tbl_name: "FTP_11_2024",
            empcode: "041406",
            div: "23",
            flag: flag,
          }), // Convert the body object to JSON
        }
      );
      const data = await response.json();

      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { data, loading: false, error: null },
      }));
    } catch (error) {
      setTabData((prevData) => ({
        ...prevData,
        [tabIndex]: { ...prevData[tabIndex], loading: false, error },
      }));
    }
  };

  useEffect(() => {    
    const flags = ["customer", "barnd", "hq"];
    const currentFlag = flags[activeTab - 1];

    // Avoid calling API if data is already present and not loading
    if (!tabData[activeTab - 1].data && !tabData[activeTab - 1].loading) {
      fetchData(activeTab - 1, currentFlag);
    }
  }, [activeTab]);

  // useEffect(() => {
  //   // Fetch data from API
  //   axios
  //     .post("https://sales.alkemcrm.com/NETCOREAPP/api/Sales/SalesTopPerformance", perfReq
  //     ) // Replace with your API endpoint
  //     .then((response) => {
  //       setData(response.data.data); // Set the fetched data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // Sample data for each tab
  // const data = {
  //   monthly: [
  //     { name: "000001", grosssale: "99.91", netamount: 106.87, achievement: 110, target: 100 },
  //     { name: "000002", grosssale: "1771.35", netamount: 2013.31, achievement: 120, target: 2000 },
  //     { name: "000003", grosssale: "84.61", netamount: 91.47, achievement: 115, target: 50 },
  //     { name: "000004", grosssale: "107.97", netamount: 70.71, achievement: 110, target: 60 },
  //   ],
  //   quarterly: [
  //     { name: "PAN IT", grosssale: "30.80", netamount: 115.70, achievement: 46.12, target: 250.87 },
  //     { name: "EMTY", grosssale: "38.98", netamount: 33.44, achievement: 36.91, target: 90.59 },
  //   ],
  //   yearly: [
  //     { name: "RAJKOT PL", msr: "2",grosssale:"77.53", netamount: 5000, achievement: 110, target: 4500 },
  //     { name: "BHUJ", msr: "1",grosssale:"77.53", netamount: 15000, achievement: 120, target: 12500 },
  //     { name: "SURENDRANAGAR", msr: "3",grosssale:"77.53", netamount: 60000, achievement: 115, target: 52000 },
  //     { name: "AHMEDABAD PL - A", msr: "2",grosssale:"77.53", netamount: 55000, achievement: 110, target: 50000 },
  //   ],
  // };

  // Helper to fetch data based on activeTab
  const getTabData = () => {
    
    switch (activeTab) {
      case "1":
        return tabData[0]?.data;
      case "2":
        return tabData[1]?.data;
      case "3":
        return tabData[2]?.data.data;
      default:
        return [];
    }
  };

  return (
    <Col lg="7" md="6" sm="6">
      <Card className="card-stats" style={{ height: "395px" }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Top Performance
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
              Customer
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Brand
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              HQ
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <CardBody style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Row>
                <Col>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Customer Name</th>
                        <th>Gross Sale</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        // Check if getTabData() is not null and getTabData().data is an array
                        getTabData() &&
                        Array.isArray(getTabData().data) &&
                        getTabData().data.length > 0 ? (
                          getTabData().data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )
                      }
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
                      {getTabData() &&
                        Array.isArray(getTabData().data) &&
                        getTabData().data.length > 0 ? (
                          getTabData().data.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )}
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
                        <th>Hq Name</th>
                        <th>Gross Sale</th>
                        <th>Net Amount</th>
                        <th>Target</th>
                        <th>Ach(%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData() &&
                        Array.isArray(getTabData()) &&
                        getTabData().length > 0 ? (
                          getTabData().map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.gross_sale}</td>
                              <td>{item.net_amt}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color:
                                    item.achv >= 100 ? "#00d284" : "red",
                                }}
                              >
                                {item.achv}%
                              </td>
                            </tr>
                          ))
                        ) : (
                          // If no valid data, show a placeholder message
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )}
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

export default TopPerformance;
