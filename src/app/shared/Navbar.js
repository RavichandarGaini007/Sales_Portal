import React, { useState, useEffect } from "react";
import axios from "axios";
import logomini from "../../assets/images/logo-mini.svg";
import facejpg from "../../assets/images/faces/face1.jpg";
import "@mdi/font/css/materialdesignicons.min.css";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Select,
} from "reactstrap"; // Using reactstrap for layout
import { Link } from "react-router-dom";
import MultiSelectDropdown from "./MultiSelectDropdown";

const Navbar = () => {
  // Get current month and year
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();
  const [divisions, setAllDivs] = useState([]);

  const [division, setDivision] = useState("Suprema");
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  // List of divisions
  //  const divisions = [
  //    "NexGen", "AURA-MAGNA", "Suprema", "Alpha Max", "Bergen Asta",
  //    "MedTech", "Oncology", "Dermacare", "INTENZA", "Gastrokem",
  //    "ALKEM DIABETOLOGY", "Aspiria", "Prizma", "Pentacare",
  //    "ALKEM-METABOLICS", "ALKEM ARISE", "DERMAKEM", "META NEXT",
  //    "Altron", "ALKEM UROCARE", "ALKEM IMPERIA", "Bergen Nova",
  //    "Nexa", "ALKEM EYECARE", "NOVOKEM", "CRITICARE",
  //    "Miscellaneous", "Health Care (Generic)", "Pulmocare",
  //    "Bergen Crista", "Futura Nex", "Ascenda"
  //  ];

  useEffect(() => {
    // Fetch data from API
    axios
      .get(
        "http://192.168.120.64/React_Login_api/api/Sales/SalesDiv?strEmpCode=041406"
      ) // Replace with your API endpoint
      .then((response) => {
        const data = response.data.data;
        setAllDivs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle change for Division dropdown
  const handleDivisionChange = (selectedColumns) => {
    //setDivision(event.target.value);
    console.log(selectedColumns)
  };

  // Handle change for Month dropdown
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Handle change for Year dropdown
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  return (
    <div className="horizontal-menu">
      <nav className="navbar top-navbar col-lg-12 col-12 p-0">
        <div className="container">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a
              className="navbar-brand brand-logo"
              href="/dashboard"
              style={{ width: "50px" }}
            >
              <img
                src="https://sales.alkemcrm.com/sd_new/images/ALKEM.png"
                alt="logo"
              />
            </a>
            <span
              className="font-12 d-block font-weight-light"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#0e4194",
                paddingLeft: "10px",
              }}
            >
              Sales Portal
            </span>
            <a className="navbar-brand brand-logo-mini" href="/dashboard">
              <img
                src="https://sales.alkemcrm.com/sd_new/images/ALKEM.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav mr-lg-2">
              <li className="nav-item nav-search d-none d-lg-block">
                <div className="input-group">
                  {/* Division Dropdown */}
                  <MultiSelectDropdown
                    className="mx-3"
                    options={divisions.map((col) => ({
                      name: col.name,
                      id: col.div,
                    }))}
                    displayValue="name"
                    onSelect={handleDivisionChange}
                  />
                  {/* <select
                    value={division}
                    onChange={handleDivisionChange}
                    className="form-select form-select-sm me-2"
                    aria-label="Select Division"
                  >
                    {divisions.map((div, index) => (
                      <option key={index} value={div.div}>
                        {div.name}
                      </option>
                    ))}
                  </select> */}

                  {/* Month Dropdown */}
                  <select
                    value={month}
                    onChange={handleMonthChange}
                    className="form-select form-select-sm me-2"
                    aria-label="Select Month"
                  >
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>

                  {/* Year Dropdown */}
                  <select
                    value={year}
                    onChange={handleYearChange}
                    className="form-select form-select-sm"
                    aria-label="Select Year"
                  >
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                <a
                  className="nav-link"
                  id="profileDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="nav-profile-img">
                    <img src={facejpg} alt="profile" />
                  </div>
                  <div className="nav-profile-text">
                    <p className="text-black font-weight-semibold m-0">
                      {" "}
                      Olson jass{" "}
                    </p>
                    {/* <span className="font-13 online-color">
                       <i className="mdi mdi-chevron-down"></i>
                    </span> */}
                  </div>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown"
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-cached mr-2 text-success"></i>{" "}
                    Activity Log
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-logout mr-2 text-primary"></i> Signout
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="horizontal-menu-toggle"
            >
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </div>
      </nav>
      <nav className="bottom-navbar">
        <div className="container">
          <ul className="nav page-navigation">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="mdi mdi-compass-outline menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="mdi mdi-monitor-dashboard menu-icon"></i>
                <span className="menu-title">Reports</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="submenu">
                <ul className="submenu-item">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="pages/ui-features/buttons.html"
                    >
                      Div+HQ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="pages/ui-features/dropdowns.html"
                    >
                      Previous Date Sales Reports
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="pages/ui-features/typography.html"
                    >
                      Brand+Region+Material
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/forms/basic_elements.html">
                <i className="mdi mdi-clipboard-text menu-icon"></i>
                <span className="menu-title">Tools</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/icons/mdi.html">
                <i className="mdi mdi-contacts menu-icon"></i>
                <span className="menu-title">Other Portals</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/charts/chartjs.html">
                <i className="mdi mdi-chart-bar menu-icon"></i>
                <span className="menu-title">Secondary</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/tables/basic-table.html">
                <i className="mdi mdi-table-large menu-icon"></i>
                <span className="menu-title">Pend Orders</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/forms/basic_elements.html">
                <i className="mdi mdi-clipboard-text menu-icon"></i>
                <span className="menu-title">Help</span>
              </a>
            </li>
            {/* <li className="nav-item">
              <div className="nav-link d-flex">
                <button className="btn btn-sm bg-danger text-white">Trailing</button>
                <div className="nav-item dropdown">
                  <a
                    className="nav-link count-indicator dropdown-toggle text-white font-weight-semibold"
                    id="notificationDropdown"
                    href="#"
                    data-toggle="dropdown"
                  >
                    English
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                    aria-labelledby="notificationDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      <i className="flag-icon flag-icon-bl mr-3"></i> French
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="flag-icon flag-icon-cn mr-3"></i> Chinese
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="flag-icon flag-icon-de mr-3"></i> German
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="flag-icon flag-icon-ru mr-3"></i> Russian
                    </a>
                  </div>
                </div>
                <a className="text-white" href="index.html">
                  <i className="mdi mdi-home-circle"></i>
                </a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
