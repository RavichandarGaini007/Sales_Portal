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
import { apiUrls, fetchApi } from '../lib/fetchApi';
import { Salescolumns } from '../lib/tableHead';
import HqWiseReport from './HqWiseReport';
import BrandWiseReport from './BrandWiseReport';
import HierarchyWiseReport from './HierarchyWiseReport';
import PlantWiseReport from './PlantWiseReport';
import CustomerWiseReport from './CustomerWiseReport';
import Widgets from './Widgets';
import '../css/widget.css';
import { useRequest } from '../common/RequestContext';

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
  const [data, setData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState('plantwise'); // Default selection
  const [selectedDivName, setSelectedDivName] = useState(null); // State for selected "Div Name"
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [tblColsTgl, setTblColumns] = useState([]);
  const { request } = useRequest();

  useEffect(() => {
    //const storedRequest = JSON.parse(localStorage.getItem('commonRequest'));
    // Fetch data from API
    (async () => {
      if (request) {
        const opData = await fetchApi(apiUrls.salesdata, request);
        if (opData && opData.data) {
          setData(opData.data);
        }
      }
    })();
  }, [request]);

  //const toggleRowModel = () => setRowModel((prev) => !prev);

  // Handle when a division name is clicked
  const handleDivNameClick = (row) => {
    setSelectedDivName(row.name); // Store the clicked Div Name
    setShowModal(true);
  };

  const modelComp = () => {
    const components = {
      hqwise: <HqWiseReport headerName={selectedDivName} />,
      brandwise: <BrandWiseReport headerName={selectedDivName} />,
      hwise: <HierarchyWiseReport headerName={selectedDivName} />,
      plantwise: <PlantWiseReport headerName={selectedDivName} />,
      custwise: <CustomerWiseReport headerName={selectedDivName} />,
    };

    return components[dropdownSelection] || null;
  };

  const handleTableColToggle = (selectedColumns) => {
    setTblColumns(selectedColumns);
  };

  // Toggle the model visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            {/* Row for dropdowns on the same line */}
            <Widgets wdata={data}></Widgets>
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
                    className="text-center sticky-table"
                  >
                    <thead className="thead-dark">
                      <tr>
                        {/* {Salescolumns.map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))} */}
                        {Salescolumns.filter((c) =>
                          tblColsTgl.some((s) => s.id === c.accessorKey)
                        ).map((col) => (
                          <th
                            key={col.accessorKey}
                            style={{ textAlign: 'left' }}
                          >
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={row.id}>
                          {Salescolumns.filter((c) =>
                            tblColsTgl.some((s) => s.id === c.accessorKey)
                          ).map((col) => (
                            <td key={`${row.id}-${col.accessorKey}`}>
                              {col.accessorKey === 'name' ? (
                                <div
                                  style={{
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => handleDivNameClick(row)}
                                >
                                  {row[col.accessorKey]}
                                </div>
                              ) : col.accessorKey === 'net_amt' ? (
                                <Badge
                                  color={getLabelColor(row[col.accessorKey])}
                                >
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
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* {rowModel && modelComp()} */}

      {/* Modal for displaying the selected data */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen={true} // Enables full-window modal
      >
        <Modal.Body>{modelComp()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SalesPortalTable;
