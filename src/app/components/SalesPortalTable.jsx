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
//import HQModal from '../notUsedComponents/HQModal';
// import BrandModal from './BrandModal';
// import HierarchicalPerformanceModal from './HierarchicalPerformanceModal';
import '../css/SalesPortalTable.css';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import PopupTableModal from '../common/PopupTableModal';
import { apiUrls, popState } from '../lib/fetchApi';
import { Salescolumns, divHqPopupColumns, divBrandPopupColumns, divHierarchyPopupColumns } from '../lib/tableHead';

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
  const [apiUrl, setApiUrl] = useState(''); // State for API URL
  const [apiRequest, setApiRequest] = useState({}); // State for API Request
  const [tblHeader, setTblHeader] = useState([]); // State for Table Header
  const [popUpState, setpopUpState] = useState([]); // State for Table Header



  // const [visibleColumns, setVisibleColumns] = useState(
  //   columns.reduce((acc, column) => {
  //     acc[column.accessorKey] = true; // All columns visible by default
  //     return acc;
  //   }, {})
  // );

  // const toggleColumnVisibility = (columnKey) => {
  //   setVisibleColumns((prevState) => ({
  //     ...prevState,
  //     [columnKey]: !prevState[columnKey],
  //   }));
  // };

  // const handleDropdownChange = (e) => {
  //   setDropdownSelection(e.target.value); // Update dropdown selection
  // };
  // const handleColumnSelectChange = (selectedList) => {
  //   const updatedVisibleColumns = { ...visibleColumns };

  //   columns.forEach((col) => {
  //     updatedVisibleColumns[col.accessorKey] = selectedList.includes(
  //       col.accessorKey
  //     );
  //   });

  //   setVisibleColumns(updatedVisibleColumns);
  // };

  useEffect(() => {
    // Fetch data from API
    // (async () => {
    //   const opData = await fetchApiGet(apiUrls.SalesTopPerformance);

    //   setData(opData.data);
    // })();
    axios
      .get(apiUrls.salesdata) // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data); // Set the fetched data
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const funApiReqGen = () => {
    let requestData = {
      tbl_name: dropdownSelection == 'brandwise' || dropdownSelection == 'hwise' ? 'FTP_MAT_VAL_11_2024' : 'FTP_11_2024',
      empcode: '041406',
      div: '23',
      month: '11',
      year: '2024',
      flag: 'monthly',
    };

    switch (dropdownSelection) {
      case 'hqwise':
        setApiUrl(apiUrls.DivHqReportData);
        setTblHeader(divHqPopupColumns);
        setpopUpState(popState.popHqWise);
        break;
      case 'brandwise':
        setApiUrl(apiUrls.DivBrandReportData);
        setTblHeader(divBrandPopupColumns);
        setpopUpState(popState.popBrandWise);
        break;
      case 'hwise':
        setApiUrl(apiUrls.SalesHierarchyDesg);
        setTblHeader(divHierarchyPopupColumns);
        setpopUpState(popState.popHierarchyWise);
        break;
      default:
        break;
    }

    setApiRequest(requestData);
  };

  // Handle when a division name is clicked
  const handleDivNameClick = (row) => {
    setSelectedDivName(row.name); // Store the clicked Div Name
    funApiReqGen(); // generate api request
    toggleModal(); // Open modal
    //console.log(apiUrl);
  };

  //const [tblColsTgl, setTblColumns] = useState([]);

  // const handleTableColToggle = (selectedColumns) => {
  //   //console.log(selectedColumns)
  //   setTblColumns(selectedColumns);
  // };

  // Toggle the model visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            {/* Row for dropdowns on the same line */}
            <Row className="mb-2">
              <Col md="6" sm="12">
                {/* Select dropdown for table type */}
                <FormGroup>
                  <label htmlFor="dropdownSelect">Select :-</label>
                  <select
                    id="dropdownSelect"
                    className="form-select"
                    value={dropdownSelection}
                    onChange={(e) => setDropdownSelection(e.target.value)}
                  >
                    <option value="hqwise">HQ Wise</option>
                    <option value="brandwise">Brand Wise</option>
                    <option value="hwise">Hierarchical Wise</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <MultiSelectDropdown
                    options={Salescolumns.map((col) => ({
                      name: col.header,
                      id: col.accessorKey,
                    }))}
                    displayValue="name"
                  // onSelect={handleTableColToggle}
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
                        {Salescolumns.map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))}
                        {/* {columns.filter(c => tblColsTgl.some(s => s.id === c.accessorKey)).map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))}  */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
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
                      ))}
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
          {/* <HQModal divname={selectedDivName} /> */}
          <PopupTableModal
            url={apiUrl}
            request={apiRequest}
            head={tblHeader}
            headerName={selectedDivName}
            state={popUpState}
          />
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
