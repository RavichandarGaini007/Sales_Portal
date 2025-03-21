import React, { useState, useEffect } from 'react';
//import { useFetch } from '../hooks/useFetch';
import { fetchApi } from '../lib/fetchApi';
import {
  Button,
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
  Spinner,
} from 'reactstrap';
import { exportToExcel } from '../lib/fileDownload';

const PopupTableModal = ({
  url,
  request,
  head,
  headerName,
  state,
  onRowClick,
  modalState,
}) => {
  const [activeTab, setActiveTab] = useState(2);
  const [renderComp, setRenderComp] = useState(null);
  //const [modalOpen, setModalOpen] = useState(true);

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
        const achvGreaterThan100 = opData.data.filter(
          (item) => item.achv >= 100
        );
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

  // const toggleModal = () => {
  //   //setModalOpen((prev) => !prev);
  //   setModalOpen(false);
  //   //modalState = 'false';
  // }

  const handleRowClick = (data) => {
    if (onRowClick && typeof onRowClick === 'function') {
      const comp = onRowClick(data);
      setRenderComp(comp);
    }
  };

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
                <tr
                  // key={index}
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    handleRowClick(item);
                  }}
                >
                  {head.map((column) => {
                    const value = item[column.accessorKey];
                    const isAchv = column.accessorKey === 'achv';
                    return (
                      <td
                        // key={column.accessorKey}
                        key={`${item.id}-${column.accessorKey}`}
                        style={{
                          color:
                            isAchv && value >= 100
                              ? '#00d284'
                              : isAchv
                                ? 'red'
                                : undefined,
                        }}
                      >
                        {value}
                        {isAchv && value >= 100 ? (
                          <i className="mdi mdi-arrow-up"></i>
                        ) : isAchv && value ? (
                          <i className="mdi mdi-arrow-down"></i>
                        ) : undefined}
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

  const downloadExcel = () => {
    exportToExcel(tabData[activeTab].data);
  };

  return (
    <>
      <Card className="card-stats">
        <CardHeader className="card-header-flex">
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> {headerName}
          </div>
          <div className="card-icons">
            <span
              className="mdi mdi-download"
              style={{ cursor: 'pointer', padding: '5px' }}
              onClick={downloadExcel}
            />
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

      {renderComp}
    </>
  );
};

export default PopupTableModal;
