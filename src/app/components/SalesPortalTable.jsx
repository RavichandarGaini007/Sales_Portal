import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Table,
  Badge,
  Button,
  Progress,
  Row,
  Col,
  Card,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  Popover,
} from 'reactstrap';
import { Modal } from 'react-bootstrap'; // Import Bootstrap components
import '../css/SalesPortalTable.css';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import { Salescolumns } from '../lib/tableHead';
import HqWiseReport from './HqWiseReport';
import BrandWiseReport from './BrandWiseReport';
import HierarchyWiseReport from './HierarchyWiseReport';
import PlantWiseReport from './PlantWiseReport';
import CustomerWiseReport from './CustomerWiseReport';
import RegionWiseReport from './RegionWiseReport';
import Widgets from './Widgets';
import '../css/widget.css';
import { useRequest } from '../common/RequestContext';
import BouncingLoader from '../common/BouncingLoader';

// const salesReq = {
//   tbl_name: 'FTP_11_2024',
//   empcode: '041406',
//   div: 'ALL',
//   month: '11',
//   year: '2024',
// };

const getLabelColor = (value) => {
  if (value >= 100) return 'success'; // Green
  if (value >= 70) return 'warning'; // Yellow
  return 'danger'; // Red
};
const SalesPortalTable = () => {
  const { updateRequest } = useRequest();
  const [data, setData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState('plantwise'); // Default selection
  const [rowData, setrowData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [tblColsTgl, setTblColumns] = useState([]);
  const { request } = useRequest();
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [showPopover, setShowPopover] = useState(false);
  // const popoverTargetRef = useRef(null);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    //const storedRequest = JSON.parse(localStorage.getItem('commonRequest'));
    // Fetch data from API
    (async () => {
      if (request) {
        setIsLoading(true);
        const opData = await fetchApi(apiUrls.salesdata, request);
        if (opData && opData.data) {
          setData(opData.data);
          setIsLoading(false);
        }
      }
    })();
    setPopoverOpen(true);
    setTimeout(() => {
      setPopoverOpen(false);
    }, 2000);
  }, [request]);

  // Open dashboard in new tab only once when needed
  useEffect(() => {
    if (
      dropdownSelection === 'dashboard' &&
      showModal &&
      rowData &&
      rowData.division
    ) {
      window.open(
        `/sales_portal_new/mainLayout/dashboard?div=${rowData.division}`,
        '_blank'
      );
      setShowModal(false); // close the modal after opening new tab
    }
  }, [dropdownSelection, showModal, rowData]);

  // useEffect(() => {
  //   if (popoverTargetRef.current) {
  //     setShowPopover(true);
  //     const timer = setTimeout(() => {
  //       setShowPopover(false); // Hide popover after 3 seconds
  //     }, 3000);

  //     // Clean up the timer
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  //const toggleRowModel = () => setRowModel((prev) => !prev);

  // Handle when a division name is clicked
  const handleDivNameClick = (row) => {
    setrowData(row); // Store the clicked row's data
    setShowModal(true);
  };

  const modelComp = () => {
    if (rowData) {
      const components = {
        hqwise: (
          <HqWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            isDrillEnable={true}
            onClose={handleHideModel}
          />
        ),
        brandwise: (
          <BrandWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            isDrillEnable={true}
            onClose={handleHideModel}
          />
        ),
        hwise: (
          <HierarchyWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            onClose={handleHideModel}
          />
        ),
        plantwise: (
          <PlantWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            onClose={handleHideModel}
          />
        ),
        custwise: (
          <CustomerWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            onClose={handleHideModel}
          />
        ),
        regionwise: (
          <RegionWiseReport
            headerName={rowData.name}
            divCode={rowData.division}
            onClose={handleHideModel}
          />
        ),
      };

      if (dropdownSelection === 'dashboard') {
        return null;
      }

      return components[dropdownSelection] || null;
    }
  };

  const handleTableColToggle = (selectedColumns) => {
    setTblColumns(selectedColumns);
  };

  const handleHideModel = () => {
    setShowModal(false);
  };

  const handleMenuClick = (menuVal) => setDropdownSelection(menuVal);
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const renderTableBody = () => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={tblColsTgl.length} style={{ textAlign: 'center' }}>
            No data available
          </td>
        </tr>
      );
    }

    return data.map((row) => (
      <tr key={row.id}>
        {Salescolumns.filter((c) =>
          tblColsTgl.some((s) => s.id === c.accessorKey)
        ).map((col) => {
          const colClass =
            col.accessorKey === 'division' || col.accessorKey === 'name'
              ? 'sticky-column'
              : '';

          return (
            <td key={`${row.id}-${col.accessorKey}`} className={colClass}>
              {col.accessorKey === 'name' ? (
                <div
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontStyle: 'bold',
                  }}
                  onClick={() => handleDivNameClick(row)}
                >
                  {row[col.accessorKey]}
                </div>
              ) : col.accessorKey === 'net_amt' ? (
                <Badge
                  color={getLabelColor(row[col.accessorKey])}
                  style={{
                    fontSize: '12px',
                    fontWeight: 'auto',
                  }}
                >
                  {row[col.accessorKey].toLocaleString()}
                </Badge>
              ) : col.accessorKey === 'achv' ? (
                <div style={{ position: 'relative' }}>
                  <Progress
                    value={row[col.accessorKey]}
                    color={getLabelColor(row[col.accessorKey])}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '50%',
                      transform: 'translate(-50%, 0)',
                      color: row[col.accessorKey] < 50 ? 'black' : 'white',
                      fontWeight: 'bold',
                      paddingTop: '2px',
                    }}
                  >
                    {row[col.accessorKey]}%
                    {row[col.accessorKey] >= 100 ? (
                      <i className="mdi mdi-arrow-up"></i>
                    ) : (
                      <i className="mdi mdi-arrow-down"></i>
                    )}
                  </span>
                </div>
              ) : (
                row[col.accessorKey]
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            {/* Row for dropdowns on the same line */}
            <Widgets wdata={data} />
            <Row>
              <Navbar expand="md">
                <NavbarBrand href="#">Filters</NavbarBrand>
                <NavbarToggler onClick={toggle}>
                  <span
                    className="d-md-none mdi mdi-menu"
                    style={{ fontSize: '2rem', color: '#333' }}
                  ></span>
                </NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="me-auto" navbar>
                    <NavItem className="w-100">
                      <div className="responsive-button-group">
                        <ButtonGroup className="flex-wrap d-flex">
                          <Button
                            onClick={() => handleMenuClick('plantwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'plantwise'}
                          >
                            Plant Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('hqwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'hqwise'}
                          >
                            HQ Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('brandwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'brandwise'}
                          >
                            Brand Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('hwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'hwise'}
                          >
                            Hierarchy Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('custwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'custwise'}
                          >
                            Customer Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('regionwise')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'regionwise'}
                          >
                            Region Wise
                          </Button>

                          <Button
                            onClick={() => handleMenuClick('dashboard')}
                            color="primary"
                            outline
                            active={dropdownSelection === 'dashboard'}
                          >
                            Dashboard View
                          </Button>
                          <Button
                            id="PopoverLegacy"
                            type="button"
                            onClick={togglePopover}
                          >
                            Columns
                            <span className="mdi mdi-chevron-down"></span>
                          </Button>
                          <Popover
                            placement="bottom"
                            target="PopoverLegacy"
                            isOpen={popoverOpen}
                            toggle={() => setPopoverOpen(!popoverOpen)}
                          >
                            <PopoverHeader>Select Header</PopoverHeader>
                            <PopoverBody>
                              <MultiSelectDropdown
                                options={Salescolumns.map((col) => ({
                                  name: col.header,
                                  id: col.accessorKey,
                                }))}
                                displayValue="name"
                                onSelect={handleTableColToggle}
                              />
                            </PopoverBody>
                          </Popover>
                          {/* <UncontrolledPopover
                          placement="bottom"
                          target="PopoverLegacy"
                          // trigger="legacy"
                          trigger={showPopover ? 'focus' : 'legacy'}
                        >
                          <PopoverHeader>Select Headers</PopoverHeader>
                          <PopoverBody>
                            <MultiSelectDropdown
                              options={Salescolumns.map((col) => ({
                                name: col.header,
                                id: col.accessorKey,
                              }))}
                              displayValue="name"
                              onSelect={handleTableColToggle}
                            />
                          </PopoverBody>
                        </UncontrolledPopover> */}
                        </ButtonGroup>
                      </div>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Row>
            <Row className="">
              {/* <h3 className="text-center mb-3">Performance Overview</h3> */}
              <Col lg="12" md="12" sm="12">
                <Card className="card-stats" style={{ height: '500px' }}>
                  {isLoading ? (
                    <BouncingLoader />
                  ) : (
                    <Table
                      bordered
                      hover
                      responsive
                      className="text-center sticky-table"
                    >
                      <thead className="thead-dark">
                        <tr>
                          {/* {Salescolumns.map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))} */}
                          {Salescolumns.filter((c) =>
                            tblColsTgl.some((s) => s.id === c.accessorKey)
                          ).map((col) => {
                            const colClass =
                              col.accessorKey === 'division' ||
                                col.accessorKey === 'name'
                                ? 'sticky-column-twocol'
                                : '';

                            return (
                              <th
                                key={col.accessorKey}
                                style={{ textAlign: 'left' }}
                                className={colClass}
                              >
                                {col.header}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>{renderTableBody()}</tbody>
                    </Table>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Modal for displaying the selected data */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen={true} // Enables full-window modal
      >
        <Modal.Body>{modelComp()}</Modal.Body>
      </Modal>
    </>
  );
};

export default SalesPortalTable;
