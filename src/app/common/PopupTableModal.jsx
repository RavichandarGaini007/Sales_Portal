import React, { useState, useEffect } from 'react';
//import { useFetch } from '../hooks/useFetch';
import { fetchApi } from '../lib/fetchApi';
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
} from 'reactstrap';
import { apiUrls, popState } from '../lib/fetchApi';
import { Salescolumns, divHqPopupColumns, divBrandPopupColumns, divHierarchyPopupColumns } from '../lib/tableHead';


const PopupTableModal = ({ url, request, head, headerName, state }) => {
  //const { data } = useFetch(url, request);
  const [activeTab, setActiveTab] = useState(2);
  const flags = ['Achieve', 'Not Achieve', 'All'];

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

  useEffect(() => {
    (async () => {
      const opData = await fetchApi(url, request);
      if (opData && opData.data) {
        const achvGreaterThan100 = opData.data.filter((item) => item.achv >= 100);
        const achvLessThan100 = opData.data.filter((item) => item.achv < 100);

        setTabData({
          [0]: { data: achvGreaterThan100, loading: false, error: null }, // Achieve
          [1]: { data: achvLessThan100, loading: false, error: null }, // Not Achieve
          [2]: { data: opData.data, loading: false, error: null }, // All data
        });
      }
    })();
  }, [url, request, head]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const renderTblPopup = () => {
    if (state === popState.popHqWise) {
      return (
        <PopupTableModal
          url={apiUrls.salesdata}
          request={request}
          head={Salescolumns}
          headerName={'Hq Popup'}
          state={popState.Salescolumns}
        />
      );
    }
  }

  const renderTable = (data) => {
    return (
      <table className="table table-bordered">
        {data && Array.isArray(data) && data.length > 0 ? (
          <>
            <thead className="thead-light">
              <tr>
                {head.map((column) => (
                  <th key={column.accessorKey}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {head.map((column) => {
                    const value = item[column.accessorKey];
                    const isAchv = column.accessorKey === 'achv';
                    const isNameColumn = column.header.toLowerCase().includes('name'); // Check if 'name' is in the column header

                    const handleClick = (e) => {
                      if (isNameColumn) {
                        //return renderTblPopup;
                        <PopupTableModal
                          url={apiUrls.salesdata}
                          request={request}
                          head={Salescolumns}
                          headerName={'Hq Popup'}
                          state={popState.Salescolumns}
                        />

                      }
                    };

                    return (
                      <td
                        key={column.accessorKey}
                        style={{
                          color: isAchv && value >= 100 ? '#00d284' : isAchv ? 'red' : undefined,
                        }}
                        onClick={handleClick}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    );
  };

  return (
    <Col lg="12" md="12" sm="12">
      <Card className="card-stats" >
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> {headerName}
          </div>
        </CardHeader>

        <Nav tabs>
          {flags.map((flag, index) => (
            <NavItem key={index}>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={activeTab === index ? 'active' : ''}
                onClick={() => toggleTab(index)}
              >
                {flag}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent activeTab={activeTab}>
          {flags.map((_, index) => (
            <TabPane tabId={index} key={index}>
              <CardBody style={{ overflowY: 'auto' }}>
                <Row>
                  <Col>{renderTable(tabData[index].data)}</Col>
                </Row>
              </CardBody>
            </TabPane>
          ))}
        </TabContent>
      </Card>
    </Col>
  );
};

export default PopupTableModal;
