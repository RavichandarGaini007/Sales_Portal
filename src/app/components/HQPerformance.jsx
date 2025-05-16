import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import CustomerWiseReport from './CustomerWiseReport';
import { downloadCSV } from '../lib/fileDownload';
import { useRequest } from '../common/RequestContext';
import { hqPerformanceHead } from '../lib/tableHead';
import BouncingLoader from '../common/BouncingLoader';

const HQPerformance = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { request } = useRequest();

  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const [rowModel, setRowModel] = useState(false);

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });
  const activeTabData = tabData[activeTab].data;

  useEffect(() => {
    //if (tabData[activeTab]?.data || tabData[activeTab]?.loading) return; // If data is available or loading, do nothing

    if (request) {
      setTabData((prvData) => ({
        ...prvData,
        [activeTab]: { ...prvData[activeTab], loading: true },
      }));

      (async () => {
        const opData = await fetchApi(apiUrls.SalesDivHQ, {
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
        });

        if (opData && opData.data) {
          const achieve = opData?.data.filter((item) => item.achv >= 100);
          const notAchieve = opData?.data.filter((item) => item.achv < 100);

          setTabData({
            0: { data: achieve, loading: false, error: null },
            1: { data: notAchieve, loading: false, error: null },
            2: { data: opData?.data, loading: false, error: null },
          });
        }
      })();
    }
  }, [request]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen((prev) => !prev);

  const toggleRowModel = () => setRowModel((prev) => !prev);

  const handleRowClick = (data) => {
    setrowData(data);
    setRowModel(true);
  };

  const downloadExcel = () => {
    downloadCSV(
      tabData[activeTab].data,
      hqPerformanceHead,
      'HqPerformance.csv'
    ); ////working excel download
  };

  const renderTableBody = () => {
    // if (tabData[activeTab].loading) {
    //   return <Spinner />;
    // }

    // {
    //   tabData[activeTab].loading && (
    //     <Spinner isLoading={true} color="primary" />
    //   );
    // }

    // if (tabData[activeTab].loading) {
    //   return (
    //     <tr>
    //       <td colSpan="8" style={{ textAlign: 'center' }}>
    //         <Spinner color="primary" />;
    //       </td>
    //     </tr>
    //   );
    // }

    if (!activeTabData || activeTabData.length === 0) {
      return (
        <tr>
          <td colSpan="5" style={{ textAlign: 'center' }}>
            No data available
          </td>
        </tr>
      );
    }

    return activeTabData.map((item, index) => (
      <tr key={index}>
        {hqPerformanceHead.map((column) => {
          const value = item[column.accessorKey];
          const isAchv = column.accessorKey === 'achv';

          return (
            <td key={`${item.id}-${column.accessorKey}`}>
              {column.accessorKey === 'bezei' ? (
                <div
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => handleRowClick(item)}
                >
                  {value}
                </div>
              ) : column.accessorKey === 'achv' ? (
                isAchv && value !== undefined ? (
                  <span
                    style={{
                      color: item.achv >= 100 ? '#00d284' : 'red',
                    }}
                  >
                    {value}%{' '}
                    {value >= 100 ? (
                      <i className="mdi mdi-arrow-up"></i>
                    ) : (
                      <i className="mdi mdi-arrow-down"></i>
                    )}
                  </span>
                ) : null
              ) : (
                value
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <Card className="card-stats com-card-height">
        <CardHeader className="card-header-flex">
          <div
            className="stats card-title mb-0"
            style={{ alignContent: 'center' }}
          >
            <i className="mdi mdi-chart-bar menu-icon " /> HQ Performance
          </div>
          <div className="card-icons ">
            <span
              className="mdi mdi-view-list icons-style"
              onClick={toggleModal}
            />
            <span
              className="mdi mdi-file-excel icons-style"
              onClick={downloadExcel}
            />
          </div>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{
                cursor: 'pointer',
              }}
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => toggleTab(0)}
            >
              Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => toggleTab(1)}
            >
              Not Achieve
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => toggleTab(2)}
            >
              All
            </NavLink>
          </NavItem>
        </Nav>
        {flags.map((tab, id) => (
          <TabContent key={id} activeTab={activeTab}>
            <TabPane tabId={id}>
              <CardBody className="com-card-body-height">
                {tabData[activeTab].loading ? (
                  <BouncingLoader />
                ) : (
                  <Row>
                    <Col>
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            {hqPerformanceHead.map((column) => {
                              const colClass =
                                column.accessorKey === 'bezei' ? 'txtLeft' : '';

                              return (
                                <th
                                  key={column.accessorKey}
                                  className={colClass}
                                >
                                  {column.header}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>{renderTableBody()}</tbody>
                      </table>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </TabPane>
          </TabContent>
        ))}
      </Card>

      <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
        <Modal.Body>
          <CustomerWiseReport
            headerName={rowData?.bezei}
            HqCode={rowData?.vkbur}
            onClose={toggleRowModel}
          />
        </Modal.Body>
      </Modal>

      <Modal show={modalOpen} onHide={toggleModal} fullscreen>
        <Modal.Body>
          <HqWiseReport
            headerName="Hq Wise"
            isDrillEnable={true}
            onClose={toggleModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HQPerformance;
