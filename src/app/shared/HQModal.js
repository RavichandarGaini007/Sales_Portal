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

const HQModal = ({divname}) => {
  debugger;
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
        Hq: "001",
        hqname: "RAJKOT PL",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "002",
        hqname: "BHARUCH",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "003",
        hqname: "BHUJ",
        msr: "3",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
    ],
    quarterly: [
      {
        Hq: "001",
        hqname: "RAJKOT PL",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 87,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "002",
        hqname: "BHUJ",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 82,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
    ],
    yearly: [
      {
        Hq: "001",
        hqname: "SURENDRANAGAR",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "002",
        hqname: "JAMNAGAR",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "003",
        hqname: "HIMATNAGAR",
        msr: "3",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "001",
        hqname: "VALSAD",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 102,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "002",
        hqname: "BHUJ",
        msr: "1",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 82,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
      },
      {
        Hq: "003",
        hqname: "BARODA",
        msr: "3",
        GrossSale: 100000,
        SaleableRet: 20000,
        NonSaleableRet: 5000,
        PriceDiffRet: 1000,
        NetSales: 74000,
        PendingInvoice: 3000,
        PendingPacking: 2000,
        PendingDispatches: 5000,
        UnconfOS: 4000,
        UnconfStock: 1000,
        TotalUnconf: 5000,
        NetAmount: 84000,
        Target: 90000,
        Ach: 87,
        RetPerc: 12,
        LastMonthUptoDate: 95000,
        LastYearUptoDate: 85000,
        LastMonthGrowth: 5,
        LastYearGrowth: 10,
        LastMonth: 92000,
        LastYear: 87000,
        OS: 1500,
        Collection: 78000,
        CollectionTarget: 80000,
        CollectionLMTD: 76000,
        CollectionLYTD: 73000,
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
            <i className="mdi mdi-chart-bar menu-icon" /> HQ Wise <span>({divname})</span> 
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
                        <th>HQ</th>
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale (A)</th>
                        <th>Saleable Ret. (B)</th>
                        <th>Non-Saleable Ret. (C)</th>
                        <th>Price Diff Ret. (D)</th>
                        <th>NET SALES (E = A-B-C-D)</th>
                        <th>PENDING FOR INVOICE (F)</th>
                        <th>PENDING FOR PACKING (G)</th>
                        <th>PENDING FOR DISPATCHES H(F+G)</th>
                        <th>UNCONF DUE TO OS (I)</th>
                        <th>UNCONF DUE TO STOCK (J)</th>
                        <th>TOTAL UNCONF (K=I+J)</th>
                        <th>NET AMOUNT (E+H+K)</th>
                        <th>TARGET</th>
                        <th>Ach (%)</th>
                        <th>% RET</th>
                        <th>LAST MONTH UPTO DATE</th>
                        <th>LAST YEAR UPTO DATE</th>
                        <th>LAST MONTH UPTO DATE GROWTH</th>
                        <th>LAST YEAR UPTO DATE GROWTH</th>
                        <th>LAST MONTH</th>
                        <th>LAST YEAR</th>
                        <th>OS</th>
                        <th>Collection</th>
                        <th>Collection Target</th>
                        <th>Collection LMTD</th>
                        <th>Collection LYTD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Hq}</td>
                          <td>{item.hqname}</td>
                          <td>{item.msr}</td>
                          <td>{item.GrossSale}</td>
                          <td>{item.SaleableRet}</td>
                          <td>{item.NonSaleableRet}</td>
                          <td>{item.PriceDiffRet}</td>
                          <td>{item.NetSales}</td>
                          <td>{item.PendingInvoice}</td>
                          <td>{item.PendingPacking}</td>
                          <td>{item.PendingDispatches}</td>
                          <td>{item.UnconfOS}</td>
                          <td>{item.UnconfStock}</td>
                          <td>{item.TotalUnconf}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.NetAmount}</td>
                          <td>{item.Target}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.Ach}%</td>
                          <td>{item.RetPerc}%</td>
                          <td>{item.LastMonthUptoDate}</td>
                          <td>{item.LastYearUptoDate}</td>
                          <td>{item.LastMonthGrowth}%</td>
                          <td>{item.LastYearGrowth}%</td>
                          <td>{item.LastMonth}</td>
                          <td>{item.LastYear}</td>
                          <td>{item.OS}</td>
                          <td>{item.Collection}</td>
                          <td>{item.CollectionTarget}</td>
                          <td>{item.CollectionLMTD}</td>
                          <td>{item.CollectionLYTD}</td>
                         
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
                        <th>HQ</th>
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale (A)</th>
                        <th>Saleable Ret. (B)</th>
                        <th>Non-Saleable Ret. (C)</th>
                        <th>Price Diff Ret. (D)</th>
                        <th>NET SALES (E = A-B-C-D)</th>
                        <th>PENDING FOR INVOICE (F)</th>
                        <th>PENDING FOR PACKING (G)</th>
                        <th>PENDING FOR DISPATCHES H(F+G)</th>
                        <th>UNCONF DUE TO OS (I)</th>
                        <th>UNCONF DUE TO STOCK (J)</th>
                        <th>TOTAL UNCONF (K=I+J)</th>
                        <th>NET AMOUNT (E+H+K)</th>
                        <th>TARGET</th>
                        <th>Ach (%)</th>
                        <th>% RET</th>
                        <th>LAST MONTH UPTO DATE</th>
                        <th>LAST YEAR UPTO DATE</th>
                        <th>LAST MONTH UPTO DATE GROWTH</th>
                        <th>LAST YEAR UPTO DATE GROWTH</th>
                        <th>LAST MONTH</th>
                        <th>LAST YEAR</th>
                        <th>OS</th>
                        <th>Collection</th>
                        <th>Collection Target</th>
                        <th>Collection LMTD</th>
                        <th>Collection LYTD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Hq}</td>
                          <td>{item.hqname}</td>
                          <td>{item.msr}</td>
                          <td>{item.GrossSale}</td>
                          <td>{item.SaleableRet}</td>
                          <td>{item.NonSaleableRet}</td>
                          <td>{item.PriceDiffRet}</td>
                          <td>{item.NetSales}</td>
                          <td>{item.PendingInvoice}</td>
                          <td>{item.PendingPacking}</td>
                          <td>{item.PendingDispatches}</td>
                          <td>{item.UnconfOS}</td>
                          <td>{item.UnconfStock}</td>
                          <td>{item.TotalUnconf}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.NetAmount}</td>
                          <td>{item.Target}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.Ach}%</td>
                          <td>{item.RetPerc}%</td>
                          <td>{item.LastMonthUptoDate}</td>
                          <td>{item.LastYearUptoDate}</td>
                          <td>{item.LastMonthGrowth}%</td>
                          <td>{item.LastYearGrowth}%</td>
                          <td>{item.LastMonth}</td>
                          <td>{item.LastYear}</td>
                          <td>{item.OS}</td>
                          <td>{item.Collection}</td>
                          <td>{item.CollectionTarget}</td>
                          <td>{item.CollectionLMTD}</td>
                          <td>{item.CollectionLYTD}</td>
                         
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
                        <th>HQ</th>
                        <th>HQ Name</th>
                        <th>MSR</th>
                        <th>Gross Sale (A)</th>
                        <th>Saleable Ret. (B)</th>
                        <th>Non-Saleable Ret. (C)</th>
                        <th>Price Diff Ret. (D)</th>
                        <th>NET SALES (E = A-B-C-D)</th>
                        <th>PENDING FOR INVOICE (F)</th>
                        <th>PENDING FOR PACKING (G)</th>
                        <th>PENDING FOR DISPATCHES H(F+G)</th>
                        <th>UNCONF DUE TO OS (I)</th>
                        <th>UNCONF DUE TO STOCK (J)</th>
                        <th>TOTAL UNCONF (K=I+J)</th>
                        <th>NET AMOUNT (E+H+K)</th>
                        <th>TARGET</th>
                        <th>Ach (%)</th>
                        <th>% RET</th>
                        <th>LAST MONTH UPTO DATE</th>
                        <th>LAST YEAR UPTO DATE</th>
                        <th>LAST MONTH UPTO DATE GROWTH</th>
                        <th>LAST YEAR UPTO DATE GROWTH</th>
                        <th>LAST MONTH</th>
                        <th>LAST YEAR</th>
                        <th>OS</th>
                        <th>Collection</th>
                        <th>Collection Target</th>
                        <th>Collection LMTD</th>
                        <th>Collection LYTD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTabData().map((item, index) => (
                        <tr key={index}>
                          <td>{item.Hq}</td>
                          <td>{item.hqname}</td>
                          <td>{item.msr}</td>
                          <td>{item.GrossSale}</td>
                          <td>{item.SaleableRet}</td>
                          <td>{item.NonSaleableRet}</td>
                          <td>{item.PriceDiffRet}</td>
                          <td>{item.NetSales}</td>
                          <td>{item.PendingInvoice}</td>
                          <td>{item.PendingPacking}</td>
                          <td>{item.PendingDispatches}</td>
                          <td>{item.UnconfOS}</td>
                          <td>{item.UnconfStock}</td>
                          <td>{item.TotalUnconf}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.NetAmount}</td>
                          <td>{item.Target}</td>
                          <td style={{ color: item.Ach >= 90 ? "green" : "red" }}>{item.Ach}%</td>
                          <td>{item.RetPerc}%</td>
                          <td>{item.LastMonthUptoDate}</td>
                          <td>{item.LastYearUptoDate}</td>
                          <td>{item.LastMonthGrowth}%</td>
                          <td>{item.LastYearGrowth}%</td>
                          <td>{item.LastMonth}</td>
                          <td>{item.LastYear}</td>
                          <td>{item.OS}</td>
                          <td>{item.Collection}</td>
                          <td>{item.CollectionTarget}</td>
                          <td>{item.CollectionLMTD}</td>
                          <td>{item.CollectionLYTD}</td>
                         
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

export default HQModal;
