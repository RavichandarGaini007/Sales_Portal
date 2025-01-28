import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Badge,
  Button,
  FormGroup,
  Progress,
  Row,
  Col,
  Card,
} from 'reactstrap';
import { Modal } from 'react-bootstrap'; // Import Bootstrap components
import '../css/SalesPortalTable.css';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { apiUrls } from '../lib/fetchApi';
import { Salescolumns } from '../lib/tableHead';
import HqWiseReport from './HqWiseReport';
import BrandWiseReport from './BrandWiseReport';
import HierarchyWiseReport from './HierarchyWiseReport';
import PlantWiseReport from './PlantWiseReport';
import CustomerWiseReport from './CustomerWiseReport';
import Navbar from '../core/Navbar';

const getLabelColor = (value) => {
  if (value >= 100) return 'success'; // Green
  if (value >= 70) return 'warning'; // Yellow
  return 'danger'; // Red
};
const SalesPortalTable = () => {
  const [data, setData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState('hqwise'); // Default selection
  const [selectedDivName, setSelectedDivName] = useState(null); // State for selected "Div Name"
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [tblColsTgl, setTblColumns] = useState([]);


  useEffect(() => {
    // Fetch data from API
    // (async () => {
    //   const opData = await fetchApiGet(apiUrls.SalesTopPerformance);

    //   setData(opData.data);
    // })();

    // setTblColumns( //// use to display all columns
    //   Salescolumns.reduce((acc, column) => {
    //     acc[column.accessorKey]; // All columns visible by default
    //     return acc;
    //   }, {}));

    axios
      .get(apiUrls.salesdata) // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data); // Set the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle when a division name is clicked
  const handleDivNameClick = (row) => {
    setSelectedDivName(row.name); // Store the clicked Div Name
    toggleModal(); // Open modal
  };

  const modelComp = () => {
    const components = {
      hqwise: <HqWiseReport headerName={selectedDivName} />,
      brandwise: <BrandWiseReport headerName={selectedDivName} />,
      hwise: <HierarchyWiseReport headerName={selectedDivName} />,
      plantwise: <PlantWiseReport headerName={selectedDivName} />,
      custwise: <CustomerWiseReport headerName={selectedDivName} />,
    };

    if (components[dropdownSelection]) {
      return components[dropdownSelection];
    }
  };

  const handleTableColToggle = (selectedColumns) => {
    setTblColumns(selectedColumns);
  };

  // Toggle the model visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            {/* Row for dropdowns on the same line */}
            <Row className="mb-2">
              <Col md="4" sm="12">
                {/* Select dropdown for table type */}
                <FormGroup>
                  <label htmlFor="dropdownSelect">Select :-</label>
                  <select
                    id="dropdownSelect"
                    className="form-select"
                    value={dropdownSelection}
                    onChange={(e) => setDropdownSelection(e.target.value)}
                  >
                    <option value="plantwise">Plant Wise</option>
                    <option value="hqwise">HQ Wise</option>
                    <option value="brandwise">Brand Wise</option>
                    <option value="hwise">Hierarchical Wise</option>
                    <option value="custwise">Customer Wise</option>
                    <option value="regionwise">Region Wise</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <label htmlFor="dropdownSelect">Columns :-</label>
                  <MultiSelectDropdown
                    options={Salescolumns.map((col) => ({
                      name: col.header,
                      id: col.accessorKey,
                    }))}
                    displayValue="name"
                    onSelect={handleTableColToggle}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="">
              {/* <h3 className="text-center mb-3">Performance Overview</h3> */}
              <Col lg="12" md="6" sm="6">
                <Card className="card-stats">
                  <Table
                    bordered
                    hover
                    responsive
                    className="text-center sticky-table">
                    <thead className="thead-dark">
                      <tr>
                        {/* {Salescolumns.map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))} */}
                        {Salescolumns.filter(c => tblColsTgl.some(s => s.id === c.accessorKey)).map((col) => (
                          <th key={col.accessorKey} style={{ textAlign: 'left' }}>
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={row.id}>
                          {Salescolumns.filter(c => tblColsTgl.some(s => s.id === c.accessorKey)).map((col) => (
                            <td key={`${row.id}-${col.accessorKey}`}>
                              {col.accessorKey === 'name' ? (
                                <div
                                  style={{ textAlign: 'left', cursor: 'pointer' }}
                                  onClick={() => handleDivNameClick(row)}
                                >
                                  {row[col.accessorKey]}
                                </div>
                              ) : col.accessorKey === 'net_amt' ? (
                                <Badge color={getLabelColor(row[col.accessorKey])}>
                                  {row[col.accessorKey].toLocaleString()}
                                </Badge>
                              ) : col.accessorKey === 'achv' ? (
                                <div style={{ position: 'relative' }}>
                                  <Progress
                                    value={row[col.accessorKey]}
                                    color={getLabelColor(row[col.accessorKey])}
                                    style={{ height: '100%' }}
                                  />
                                  <span
                                    style={{
                                      position: 'absolute',
                                      top: '0',
                                      left: '50%',
                                      transform: 'translate(-50%, 0)',
                                      color: 'black',
                                      fontWeight: 'bold',
                                      paddingTop: '3px',
                                    }}
                                  >
                                    {row[col.accessorKey]}%
                                  </span>
                                </div>
                              ) : (
                                row[col.accessorKey]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* {data.map((row) => (
                        <tr key={row.id}>
                          <td>{row.division}</td>
                          <td
                            style={{ textAlign: 'left', cursor: 'pointer' }}
                            onClick={() => handleDivNameClick(row)}
                          >
                            {row.name}
                          </td>
                          <td>{row.sale}</td>
                          <td>{row.saleable}</td>
                          <td>{row.nonsaleable}</td>
                          <td>{row.diff}</td>
                          <td>{row.netsales}</td>
                          <td>{row.pend_pick}</td>
                          <td>{row.pend_ord}</td>
                          <td>{row.pend_disp}</td>
                          <td>{row.unconf_ostd_ord}</td>
                          <td>{row.unconf_stock}</td>
                          <td>{row.unconf_total}</td>
                          <td>{row.for_ord}</td>
                          <td style={{ fontSize: '12px' }}>
                            <Badge color={getLabelColor(row.net_amt)}>
                              {row.net_amt.toLocaleString()}
                            </Badge>
                          </td>
                          <td>{row.target}</td>
                          <td style={{ position: 'relative' }}>
                            <Progress
                              value={row.achv}
                              color={getLabelColor(row.achv)}
                              style={{ height: '100%' }}
                            />
                            <span
                              style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                transform: 'translate(-50%, 0)',
                                color: 'black',
                                fontWeight: 'bold',
                                paddingTop: '3px',
                              }}
                            >
                              {row.achv}%
                            </span>
                          </td>
                          <td>{row.varv}</td>
                          <td>{row.percRet}</td>
                          <td>{row.lmtd}</td>
                          <td>{row.lymtd}</td>
                          <td>{row.lmgrowth}</td>
                          <td>{row.growth}</td>
                          <td>{row.lmtd1}</td>
                          <td>{row.lymtd1}</td>
                          <td>{row.growth_cy}</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Modal for displaying the selected data */}
      <Modal
        show={showModal}
        onHide={toggleModal}
        fullscreen={true} // Enables full-window modal
      >
        <Modal.Body>
          {modelComp()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SalesPortalTable;
