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
import { apiUrls, fetchApi } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import HqWiseReport from './HqWiseReport';
import { useRequest } from '../common/RequestContext';
import HierarchyWiseReport from '../components/HierarchyWiseReport';
import { hierarchyPerformanceHead } from '../lib/tableHead';
import { downloadCSV } from '../lib/fileDownload';
import BouncingLoader from '../common/BouncingLoader';

// const hierarReq = {
//   tbl_name: 'FTP_MAT_VAL_11_2024',
//   empcode: '041406',
//   div: '23',
//   month: '11',
//   year: '2024',
// };

const HierarchicalPerformanceTabs = () => {
  const flags = ['Achieve', 'Not Achieve', 'All'];
  const { request } = useRequest();

  const [activeTab, setActiveTab] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [desgVal, setDesgVal] = useState('ME');
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

        const opData = await fetchApi(apiUrls.SalesHierarchyDesg, {
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

  const activeTabData = desgVal
    ? tabData[activeTab]?.data?.filter((item) => item.desg === desgVal)
    : tabData[activeTab]?.data || [];

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleRowModel = () => setRowModel((prev) => !prev);

  const handleRowClick = (data) => {
    setrowData(data);
    setRowModel(true);
  };

  const onDropdownClick = (event) => {
    setDesgVal(event.target.value);
  };

  const downloadExcel = () => {
    downloadCSV(
      tabData[activeTab].data,
      hierarchyPerformanceHead,
      'HierarchyPerformance.csv'
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
        {hierarchyPerformanceHead.map((column) => {
          const value = item[column.accessorKey];
          const isAchv = column.accessorKey === 'achv';

          return (
            <td key={`${item.id}-${column.accessorKey}`}>
              {column.accessorKey === 'name' ? (
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
    <Col lg="12" md="6" sm="6">
      <Card className="card-stats com-card-height">
        <CardHeader>
          <div className="d-flex justify-content-between">
            <div
              className="stats card-title mb-0"
              style={{ alignContent: 'center' }}
            >
              <i className="mdi mdi-chart-bar menu-icon" /> Hierarchical
              Performance
            </div>

            <div className="card-icons d-flex align-items-center">
              <span>
                <select
                  id="roleSelect"
                  style={{ maxWidth: '100px' }}
                  className="form-control"
                  value={desgVal}
                  onChange={onDropdownClick}
                >
                  <option value="DSM">DSM</option>
                  <option value="RM">RM</option>
                  <option value="ME">ME</option>
                </select>
              </span>
              <span
                className="mdi mdi-view-list icons-style"
                onClick={toggleModal}
              />
              <span
                className="mdi mdi-file-excel icons-style"
                onClick={downloadExcel}
              />
            </div>
          </div>
        </CardHeader>
        <Nav tabs>
          {flags.map((tab, index) => (
            <NavItem key={index}>
              <NavLink
                style={{ cursor: 'pointer' }}
                className={activeTab === index ? 'active' : ''}
                onClick={() => toggleTab(index)}
              >
                {tab}
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
                            {hierarchyPerformanceHead.map((column) => {
                              const colClass =
                                column.accessorKey === 'name' ? 'txtLeft' : '';

                              return (
                                <th
                                  key={column.accessorKey}
                                  className={colClass}
                                >
                                  {column.header}
                                </th>
                              );
                            })}
                            {/* <th className="txtLeft">Name</th>
                          <th>Scorecard</th>
                          <th>Net Amount</th>
                          <th>Target</th>
                          <th>Ach(%)</th> */}
                          </tr>
                        </thead>
                        <tbody>{renderTableBody()}</tbody>
                        {/* <tbody>
                        {activeTabData &&
                        Array.isArray(activeTabData) &&
                        activeTabData.length > 0 ? (
                          activeTabData.map((item, index) => (
                            <tr key={index}>
                              <td
                                className="txtLeft txtLeftCursor"
                                onClick={() => handleRowClick(item)}
                              >
                                {item.name}
                              </td>
                              <td>{item.scorecard}</td>
                              <td>{item.net_amount}</td>
                              <td>{item.target}</td>
                              <td
                                style={{
                                  color: item.achv >= 100 ? '#00d284' : 'red',
                                }}
                              >
                                {item.achv}%
                                {item.achv >= 100 ? (
                                  <i className="mdi mdi-arrow-up"></i>
                                ) : (
                                  <i className="mdi mdi-arrow-down"></i>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody> */}
                      </table>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </TabPane>
          </TabContent>
        ))}

        <Modal show={rowModel} onHide={toggleRowModel} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData?.name}
              misCode={rowData?.fsCode}
              divCode={rowData?.div}
              isDrillEnable={false}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleRowModel}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HierarchyWiseReport headerName="Hq Wise" isDrillEnable={true} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Col>
  );
};

export default HierarchicalPerformanceTabs;
