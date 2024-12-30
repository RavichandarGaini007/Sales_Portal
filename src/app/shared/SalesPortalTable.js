import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
  Progress,
  Row,
  Col,
  Card,
} from "reactstrap";
import { Modal } from "react-bootstrap"; // Import Bootstrap components
import Multiselect from "multiselect-react-dropdown"; // Import Multiselect
import HQModal from "./HQModal";
import BrandModal from "./BrandModal";
import HierarchicalPerformanceModal from "./HierarchicalPerformanceModal";
import "./SalesPortalTable.css";
import MultiSelectDropdown from "./MultiSelectDropdown";

const columns = [
  { accessorKey: "division", header: "DIV" },
  { accessorKey: "name", header: "DIV NAME" },
  { accessorKey: "sale", header: "GROSS SALE(A)" },
  { accessorKey: "saleable", header: "SALEABLE RET. (B)" },
  { accessorKey: "nonsaleable", header: "NON-SALEABLE RET. (C)" },
  { accessorKey: "diff", header: "PRICE DIFF RET.(D)" },
  { accessorKey: "netsales", header: "NET SALES (E=A-B-C-D)" },
  { accessorKey: "pend_pick", header: "PENDING FOR INVOICE (F)" },
  { accessorKey: "pend_ord", header: "PENDING FOR PACKING (G)" },
  { accessorKey: "pend_disp", header: "PENDING FOR DISPATCHES H(F+G)" },
  { accessorKey: "unconf_ostd_ord", header: "UNCONF DUE TO OS (I)" },
  { accessorKey: "unconf_stock", header: "UNCONF DUE TO STOCK (J)" },
  { accessorKey: "unconf_total", header: "TOTAL UNCONF (K=I+J)" },
  { accessorKey: "for_ord", header: "SCORE CARD" },
  { accessorKey: "net_amt", header: "NET AMOUNT (E+H+K)" },
  { accessorKey: "target", header: "TARGET" },
  { accessorKey: "achv", header: "ACHIEVEMENT (%)" },
  { accessorKey: "varv", header: "VAR" },
  { accessorKey: "percRet", header: "% RET" },
  { accessorKey: "lmtd", header: "LAST MONTH UPTO DATE" },
  { accessorKey: "lymtd", header: "LAST YEAR UPTO DATE" },
  { accessorKey: "lmgrowth", header: "LAST MONTH UPTO DATE GROWTH" },
  { accessorKey: "growth", header: "LAST YEAR UPTO DATE GROWTH" },
  { accessorKey: "lmtd1", header: "LAST MONTH" },
  { accessorKey: "lymtd1", header: "LAST YEAR" },
  { accessorKey: "growth_cy", header: "LAST YEAR GROWTH" },
];
const getLabelColor = (value) => {
  if (value >= 100) return "success"; // Green
  if (value >= 70) return "warning"; // Yellow
  return "danger"; // Red
};
const SalesPortalTable = () => {
  const [data, setData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState("hqwise"); // Default selection
  const [selectedDivName, setSelectedDivName] = useState(null); // State for selected "Div Name"
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => {
      acc[column.accessorKey] = true; // All columns visible by default
      return acc;
    }, {})
  );

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [columnKey]: !prevState[columnKey],
    }));
  };

  const handleDropdownChange = (e) => {
    setDropdownSelection(e.target.value); // Update dropdown selection
  };
  const handleColumnSelectChange = (selectedList) => {
    const updatedVisibleColumns = { ...visibleColumns };

    columns.forEach((col) => {
      updatedVisibleColumns[col.accessorKey] = selectedList.includes(
        col.accessorKey
      );
    });

    setVisibleColumns(updatedVisibleColumns);
  };
  useEffect(() => {
    // Fetch data from API
    axios
      .get("https://sales.alkemcrm.com/NETCOREAPP/api/Sales/salesdata") // Replace with your API endpoint
      .then((response) => {
        setData(response.data.data); // Set the fetched data
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => setShowModal(!showModal);

  // Handle when a division name is clicked
  const handleDivNameClick = (row) => {
    setSelectedDivName(row.name); // Store the clicked Div Name
    toggleDropdown(); // Open modal
  };

  const [tblColsTgl, setTblColumns] = useState([]);

  const handleTableColToggle = (selectedColumns) => {
    //console.log(selectedColumns)
    setTblColumns(selectedColumns);
  };

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
                  <label>Select :-</label>
                  <select
                    className="form-select"
                    value={dropdownSelection}
                    onChange={handleDropdownChange}
                  >
                    <option value="hqwise">HQ Wise</option>
                    <option value="brandwise">Brand Wise</option>
                    <option value="hwise">Hierarchical Wise</option>
                    <option value="brmwise">Brand + Region + Material</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <MultiSelectDropdown
                    options={columns.map((col) => ({
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
                        {columns.map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))}
                        {/* {columns.filter(c => tblColsTgl.some(s => s.id === c.accessorKey)).map((col) => (
                          <th key={col.accessorKey}>{col.header}</th>
                        ))}  */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={row.id}>
                          <td>{row.division}</td>
                          <td
                            style={{ textAlign: "left", cursor: "pointer" }}
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
                          <td style={{ fontSize: "12px" }}>
                            <Badge color={getLabelColor(row.net_amt)}>
                              {row.net_amt.toLocaleString()}
                            </Badge>
                          </td>
                          <td>{row.target}</td>
                          <td style={{ position: "relative" }}>
                            <div
                              className="position-relative"
                              style={{ height: "18px" }}
                            >
                              <Progress
                                value={row.achv}
                                color={getLabelColor(row.achv)}
                                style={{ height: "100%" }}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  left: "50%",
                                  transform: "translate(-50%, 0)",
                                  color: "black",
                                  fontWeight: "bold",
                                  paddingTop: "3px",
                                }}
                              >
                                {row.achv}%
                              </span>
                            </div>
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
      {/* Modal for HQ Wise Data */}
      <Modal
        isOpen={showModal && dropdownSelection === "hqwise"}
        toggle={toggleDropdown} // This handles modal visibility toggle
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>HQ Wise Data</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {/* <div style={{ overflowX: "auto" }}> */}
          <HQModal divname={selectedDivName} />
          {/* </div> */}
        </Modal.Body>
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
