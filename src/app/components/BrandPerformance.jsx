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
import BrandWiseReport from './BrandWiseReport';
import ProductWiseReport from './ProductWiseReport';
import { useRequest } from '../common/RequestContext';
import { brandPerformanceHead } from '../lib/tableHead';
import { downloadCSV } from '../lib/fileDownload';
import BouncingLoader from '../common/BouncingLoader';

// const brandReq = {
//   tbl_name: 'FTP_MAT_VAL_11_2024',
//   empcode: '041406',
//   div: '23',
// };

const BrandPerformance = () => {
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

  useEffect(() => {
    // Fetch data from API
    (async () => {
      if (request) {
        setTabData((prvData) => ({
          ...prvData,
          [activeTab]: { ...prvData[activeTab], loading: true },
        }));

        const opData = await fetchApi(apiUrls.BrandPerfmnceData, {
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
      }
    })();
  }, [request]);

  const activeTabData = tabData[activeTab].data;

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
      brandPerformanceHead,
      'brandPerformance.csv'
    ); ////working excel download
  };

  const renderTableBody = () => {
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
        {brandPerformanceHead.map((column) => {
          const value = item[column.accessorKey];
          const isAchv = column.accessorKey === 'achv';

          return (
            <td key={`${item.id}-${column.accessorKey}`}>
              {column.accessorKey === 'brand' ? (
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
    // <Col lg="7" md="6" sm="6">
    <>
      <Card className="card-stats com-card-height">
        <CardHeader className="card-header-flex">
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> Brand Performance
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
                            {brandPerformanceHead.map((column) => {
                              const colClass =
                                column.accessorKey === 'brand' ? 'txtLeft' : '';

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

      {/* {rowModel && <HierarchyWiseReport headerName='Brand Row Click' />} */}

      <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
        <Modal.Body>
          <ProductWiseReport
            headerName={rowData?.brand}
            brandCode={rowData?.mvgr1}
            onClose={toggleRowModel}
          />
        </Modal.Body>
      </Modal>

      <Modal show={modalOpen} onHide={toggleModal} fullscreen>
        <Modal.Body>
          <BrandWiseReport headerName="Brand Wise" onClose={toggleModal} />
        </Modal.Body>
      </Modal>
    </>
    // </Col>
  );
};

export default BrandPerformance;
