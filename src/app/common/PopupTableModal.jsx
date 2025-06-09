import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';
import { exportToExcel } from '../lib/fileDownload';
import BouncingLoader from '../common/BouncingLoader';
import '../css/PopupCard.css';

const PopupTableModal = ({
  url,
  request,
  head,
  headerName,
  state, //// further use for download file name
  onRowClick,
  onCloseClick,
}) => {
  const [activeTab, setActiveTab] = useState(2);
  const [renderComp, setRenderComp] = useState(null);

  const flags = ['Achieve', 'Not Achieve', 'All'];

  const [tabData, setTabData] = useState({
    0: { data: null, loading: false, error: null },
    1: { data: null, loading: false, error: null },
    2: { data: null, loading: false, error: null },
  });

  useEffect(() => {
    (async () => {
      setTabData((prvData) => ({
        ...prvData,
        [activeTab]: { ...prvData[activeTab], loading: true },
      }));

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

  const handleRowClick = (data) => {
    if (onRowClick && typeof onRowClick === 'function') {
      const comp = onRowClick(data);
      setRenderComp(comp);
    }
  };

  const renderTable = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    const isClickableColumn = (accessorKey) =>
      ['name', 'bezei', 'plant', 'name1'].includes(accessorKey);

    const getColorStyle = (isAchv, value) => {
      if (isAchv) {
        return value >= 100 ? '#00d284' : 'red';
      }
      return undefined;
    };

    const renderCellContent = (column, value, item, isAchv, isTotal) => {
      return (
        <div
          style={{
            textAlign: 'left',
            cursor: isClickableColumn(column.accessorKey)
              ? 'pointer'
              : 'default',
            textDecoration: isClickableColumn(column.accessorKey)
              ? 'underline'
              : 'default',
          }}
          onClick={
            isTotal || !isClickableColumn(column.accessorKey)
              ? null
              : () => handleRowClick(item)
          }
        >
          {value}
          {isAchv && value >= 100 ? (
            <i className="mdi mdi-arrow-up"></i>
          ) : isAchv && value ? (
            <i className="mdi mdi-arrow-down"></i>
          ) : undefined}
        </div>
      );
    };

    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            {head.map((column) => (
              <th key={column.accessorKey}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.id}-${index}`}>
              {head.map((column) => {
                const value = item[column.accessorKey];
                const isAchv = column.accessorKey === 'achv';
                const colorStyle = getColorStyle(isAchv, value);
                const isTotal =
                  item[column.accessorKey] === 'Grand Total' ?? false;

                return (
                  <td
                    key={`${item.id}-${column.accessorKey}`}
                    style={{ color: colorStyle }}
                  >
                    {renderCellContent(column, value, item, isAchv, isTotal)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const downloadExcel = () => {
    exportToExcel(tabData[activeTab].data, head, state + '.xlsx');
  };

  return (
    <>
      <Card className="card-stats">
        <CardHeader className="card-header-flex">
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-bar menu-icon" /> {headerName}
          </div>
          <div className="card-icons"></div>
          <div>
            <span
              className="mdi mdi-download"
              style={{ cursor: 'pointer', padding: '5px', fontSize: 'x-large' }}
              onClick={downloadExcel}
            />
            <span
              className="mdi mdi-close"
              style={{ cursor: 'pointer', padding: '5px', fontSize: 'x-large' }}
              onClick={onCloseClick}
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
              <CardBody className="popCardBody">
                {tabData[activeTab].loading ? (
                  <BouncingLoader />
                ) : (
                  <Row>
                    <Col>{renderTable(tabData[index].data)}</Col>
                  </Row>
                )}
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
