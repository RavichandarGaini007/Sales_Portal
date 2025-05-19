import React, { useState, useEffect } from 'react';
import axios from 'axios';
import facejpg from '../../assets/images/faces/face1.jpg';
//import '@mdi/font/css/materialdesignicons.min.css';
import { Link } from 'react-router-dom';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { useSelector } from 'react-redux';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import { Button } from 'reactstrap';
import { apiUrls } from '../lib/fetchApi';
import { useRequest } from '../common/RequestContext';

// import '../../assets/vendors/js/vendor.bundle.base.js';
// import '../../assets/vendors/flot/jquery.flot.js';
// import '../../assets/vendors/flot/jquery.flot.resize.js';
// import '../../assets/vendors/flot/jquery.flot.categories.js';
// import '../../assets/vendors/flot/jquery.flot.fillbetween.js';
// import '../../assets/vendors/flot/jquery.flot.stack.js';

const Navbar = () => {
  const { updateRequest } = useRequest();
  const { data, isAuthorized, isLoading } = useSelector((state) => {
    return state.app;
  });
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [divisions, setAllDivs] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [menuItems, setMenuItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const storedReqValue = localStorage.getItem('commonRequest');

    if (storedReqValue?.div) {
      divisions.forEach((col) => {
        storedReqValue.div.forEach((item) => {
          if (item.div === col.div) {
            setSelected(col);
          }
        });
      });
    } else if (divisions?.length) {
      setSelected(
        divisions.map((col) => ({
          label: col.name,
          value: col.div,
        }))
      );
    }
  }, [divisions]);

  useEffect(() => {
    // Fetch data from API
    getUserMenus();

    axios
      .get(apiUrls.SalesDiv + '?strEmpCode=' + data?.data[0]?.userid) // Replace with your API endpoint
      .then((response) => {
        const resdata = response.data.data;

        if (
          data?.data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          data?.data[0]?.enetsale === 'ALL'
        ) {
          setAllDivs([...resdata, { div: 'ALL', name: 'ALL' }]);
        } else {
          setAllDivs(resdata);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    genRequest();
  }, []);

  // useEffect(() => {
  //   var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
  //   navItemClicked.on('click', function (event) {
  //     if (window.matchMedia('(max-width: 991px)').matches) {
  //       if (!$(this).hasClass('show-submenu')) {
  //         navItemClicked.removeClass('show-submenu');
  //       }
  //       $(this).toggleClass('show-submenu');
  //     }
  //   });
  // }, [menuItems]);

  // Handle change for Division dropdown
  const handleDivisionChange = (selectedColumns) => {
    setSelected(selectedColumns);
  };

  // Handle change for Month dropdown
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Handle change for Year dropdown
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const getUserMenus = async (e) => {
    let empCode = '41406';
    let role = 'Admin';
    const response = await axios.post(
      apiUrls.DashboardMenus + `?empCode=${empCode}&role=${role}`
    );
    const data = await response.data.data;
    setMenuItems(data);
  };

  const handleSearch = () => {
    genRequest();
  };

  const genRequest = () => {
    const today = new Date();
    let mnth = month;
    let yr = year;

    if (today.getDate() < 5) {
      mnth -= 1;
      if (mnth === 0) {
        mnth = 12;
        yr -= 1;
      }

      setMonth(mnth);
      setYear(yr);
    }

    const comReq = {
      tbl_name: 'FTP_' + mnth + '_' + yr,
      empcode: data?.data[0]?.userid,
      div:
        selected.length === divisions.length &&
        data?.data[0]?.enetsale === 'ALL'
          ? data?.data[0]?.enetsale
          : Array(selected.map((items) => items.value)).join(','),
      month: mnth.toString(),
      year: yr.toString(),
      flag: 'monthly',
    };
    //console.log(comReq);
    updateRequest(comReq);
    localStorage.setItem('commonRequest', JSON.stringify(comReq));
  };

  return (
    <>
      <div className="horizontal-menu">
        <nav className="navbar top-navbar col-lg-12 col-12 p-0">
          <div className="container">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a
                className="navbar-brand brand-logo"
                href="/mainLayout/dashboard"
                style={{ width: '50px' }}
              >
                <img
                  //src="https://sales.alkemcrm.com/sd_new/images/ALKEM.png"
                  src={process.env.PUBLIC_URL + '/logo.png'}
                  alt="logo"
                />
              </a>
              <span
                className="font-12 d-block font-weight-light"
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#0e4194',
                  paddingLeft: '10px',
                }}
              >
                Sales Portal
              </span>
              <a
                className="navbar-brand brand-logo-mini"
                href="/mainLayout/dashboard"
              >
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
                    {/* <MultiSelectDropdown
                    className="mx-3"
                    options={divisions.map((col) => ({
                      name: col.name,
                      id: col.div,
                    }))}
                    displayValue="name"
                    onSelect={handleDivisionChange}
                  /> */}
                    <Multiselect_dropdown
                      className="mx-3"
                      options={divisions.map((col) => ({
                        label: col.name,
                        value: col.div,
                      }))}
                      selectedList={selected}
                      setSelected={setSelected}
                    ></Multiselect_dropdown>

                    {/* Month Dropdown */}
                    <select
                      value={month}
                      onChange={handleMonthChange}
                      className="form-select form-select-sm me-2"
                      aria-label="Select Month"
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
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
                    <Button
                      className="me-2 btn btn-primary"
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
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
                      <img
                        src={data?.data[0]?.userprofile}
                        alt="profile card"
                      />
                    </div>
                    <div className="nav-profile-text">
                      <p className="text-black font-weight-semibold m-0">
                        {' '}
                        {data?.data[0]?.name}{' '}
                      </p>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu navbar-dropdown"
                    aria-labelledby="profileDropdown"
                  >
                    <a className="dropdown-item" href="/">
                      <i className="mdi mdi-cached mr-2 text-success"></i>{' '}
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">
                      <i className="mdi mdi-logout mr-2 text-primary"></i>{' '}
                      Signout
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
              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={item.url}>
                    <i className={`${item.menu_icon} menu-icon`}></i>
                    <span className="menu-title">{item.name}</span>
                    {menuItems[index].submenu &&
                      menuItems[index].submenu.length > 0 && (
                        <i className="menu-arrow"></i>
                      )}
                  </Link>
                  {/* Render Submenu if available */}
                  {menuItems[index].submenu &&
                    menuItems[index].submenu.length > 0 && (
                      <div className="submenu">
                        <ul className="submenu-item">
                          {menuItems[index].submenu.map((submenu, subIndex) => (
                            <li className="nav-item" key={subIndex}>
                              <Link className="nav-link" to={submenu.url}>
                                <span>{submenu.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </li>
              ))}
              {/* <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="mdi mdi-compass-outline menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
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
            </li> */}
            </ul>
          </div>
        </nav>
      </div>
      <ul className="navbar-nav mr-lg-2 bottom-filter">
        <li className="nav-item nav-search d-none d-lg-block">
          <div className="input-group">
            <Multiselect_dropdown
              className="mx-3"
              options={divisions.map((col) => ({
                label: col.name,
                value: col.div,
              }))}
              selectedList={selected}
              setSelected={setSelected}
            ></Multiselect_dropdown>

            <select
              value={month}
              onChange={handleMonthChange}
              className="form-select form-select-sm me-2"
              aria-label="Select Month"
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
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
            <Button className="me-2 btn btn-primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
