import { useState, useEffect } from 'react';
import axios from 'axios';
//import '@mdi/font/css/materialdesignicons.min.css';
import { Link } from 'react-router-dom';
import '../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../assets/vendors/flag-icon-css/css/flag-icon.min.css';
import '../../assets/vendors/css/vendor.bundle.base.css';
import { useSelector } from 'react-redux';
import Multiselect_dropdown from '../common/Multiselect_dropdown';
import { Button } from 'reactstrap';
import { apiUrls } from '../lib/fetchApi';
import { useRequest } from '../common/RequestContext';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  const { updateRequest } = useRequest();
  const { data, isAuthorized, isLoading } = useSelector((state) => state.app);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [divisions, setAllDivs] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [menuItems, setMenuItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    // Check for 'div' parameter in URL
    const params = new URLSearchParams(window.location.search);
    const divParam = params.get('div');
    if (divParam && divisions?.length) {
      // Support comma-separated divs
      const divList = divParam.split(',');
      const selectedDivs = divisions
        .filter((col) => divList.includes(col.div))
        .map((col) => ({ label: col.name, value: col.div }));
      setSelected(selectedDivs);
    } else {
      const storedReqValue = localStorage.getItem('commonRequest');
      let storedDivs = [];
      if (storedReqValue) {
        try {
          const parsed = JSON.parse(storedReqValue);
          storedDivs = parsed.div;
        } catch { }
      }
      if (storedDivs && Array.isArray(storedDivs) && storedDivs.length) {
        const selectedDivs = divisions
          .filter((col) => storedDivs.includes(col.div))
          .map((col) => ({ label: col.name, value: col.div }));
        setSelected(selectedDivs);
      } else if (divisions?.length) {
        setSelected(
          divisions.map((col) => ({
            label: col.name,
            value: col.div,
          }))
        );
      }
    }
  }, [divisions]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/settings.js`; // Loads from public/
    script.async = true;
    document.body.appendChild(script);
    // Optional cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Fetch data from API
    getUserMenus();
    axios
      .get(apiUrls.SalesDiv + '?strEmpCode=' + data?.data[0]?.userid)
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

  useEffect(() => {
    // Ensure jQuery is available
    if (window.$) {
      // Horizontal menu navigation in mobile menu on click (from settings.js logic)
      const navItemClicked = window.$('.horizontal-menu .page-navigation >.nav-item');
      navItemClicked.off('click._customReactMenu'); // Remove previous handler if any
      navItemClicked.on('click._customReactMenu', function (event) {
        if (window.matchMedia('(max-width: 991px)').matches) {
          if (!window.$(this).hasClass('show-submenu')) {
            navItemClicked.removeClass('show-submenu');
          }
          window.$(this).toggleClass('show-submenu');
        }
      });
    }
  }, [menuItems]);

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
    let empCode = '41406'; //// data?.data[0]?.userid
    let role = 'Admin'; ///// data?.data[0]?.role
    const response = await axios.post(
      apiUrls.DashboardMenus + `?empCode=${empCode}&role=${role}`
    );
    const data = await response.data.data;
    setMenuItems(data);
  };

  const handleSearch = () => {
    genRequest();
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  const genRequest = () => {
    // Check for 'div' parameter in URL
    const params = new URLSearchParams(window.location.search);
    const divParam = params.get('div');
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
    let divValue;
    if (divParam) {
      divValue = divParam;
    } else {
      divValue =
        selected.length === divisions.length &&
          data?.data[0]?.enetsale === 'ALL'
          ? data?.data[0]?.enetsale
          : Array(selected.map((items) => items.value)).join(',');
    }
    const comReq = {
      tbl_name: 'FTP_' + mnth + '_' + yr,
      empcode: data?.data[0]?.userid,
      div: divValue,
      month: mnth.toString(),
      year: yr.toString(),
      flag: 'monthly',
    };
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
                  alt="logo1"
                />
              </a>
              <span
                className="font-12 d-block font-weight-light d-none d-lg-block"
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
                  //src="https://sales.alkemcrm.com/sd_new/images/ALKEM.png"
                  src={process.env.PUBLIC_URL + '/logo.png'}
                  alt="logo"
                />
              </a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <ul className="navbar-nav mr-lg-2 justify-content-md-start" style={{ width: '100%' }}>
                <li className="nav-item nav-search d-none d-lg-block d-md-block">
                  <div className="input-group">
                    <Multiselect_dropdown
                      className="mx-3"
                      style={{ width: '200px !important' }}
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
                      <img src={data.data[0].userprofile} alt="profile card" />
                    </div>
                    <div className="nav-profile-text">
                      <p className="text-black font-weight-semibold m-0">
                        {data?.data[0]?.name}
                      </p>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu navbar-dropdown"
                    aria-labelledby="profileDropdown"
                  >
                    <a className="dropdown-item" href="/">
                      <i className="mdi mdi-cached mr-2 text-success"></i>
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/sales_portal_new';
                    }}>
                      <i className="mdi mdi-logout mr-2 text-primary"></i>
                      Signout
                    </a>
                  </div>
                </li>
              </ul>
              {/* Mobile & Tab search icon */}
              <button
                className="d-md-none d-lg-none btn btn-link p-0 ms-2"
                style={{ background: 'none', border: 'none' }}
                onClick={() => setShowMobileFilter(true)}
                aria-label="Show search filters"
              >
                <MdSearch size={28} color="#333" />
              </button>
              <button
                className="navbar-toggler navbar-toggler-right d-block d-lg-none align-self-center"
                type="button"
                aria-label="Toggle navigation"
                onClick={() => {
                  const menu = document.querySelector('.bottom-navbar');
                  if (menu) menu.classList.toggle('show');
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav >
        <nav className="bottom-navbar">
          <div className="container">
            <ul className="nav page-navigation">
              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  {item.url.startsWith("http") ? (
                    <a className="nav-link" href={item.url.replace("stremailencrypt", data.emailKeyEncrypted).replace("struserencrypt", data.userKeyEncrypted).replace("stringemailencryption", data.emailEncryptionString)} target="_blank" rel="noopener noreferrer">
                      <span>{item.name}</span>
                    </a>
                  ) : (
                    <Link className="nav-link" to={item.url}>
                      <i className={`${item.menu_icon} menu-icon`}></i>
                      <span className="menu-title">{item.name}</span>
                      {menuItems[index].submenu &&
                        menuItems[index].submenu.length > 0 && (
                          <i className="menu-arrow"></i>
                        )}
                    </Link>
                  )}
                  {/* Render Submenu if available */}
                  {menuItems[index].submenu && menuItems[index].submenu.length > 0 && (
                    <div className="submenu">
                      <div className="submenu-columns">
                        {chunkArray(menuItems[index].submenu, 10).map((chunk, colIndex) => (
                          <div className="submenu-group" key={colIndex}>
                            {item.name == "Other Portals" && (
                              <h5 className="submenu-title">Group {colIndex + 1}</h5>)}
                            <ul className="submenu-item">
                              {chunk.map((submenu, subIndex) => (
                                <li className="nav-item" key={subIndex}>
                                  {submenu.url.startsWith("http") ? (
                                    <a
                                      className="nav-link"
                                      href={submenu.url
                                        .replace("stremailencrypt", data.emailKeyEncrypted)
                                        .replace("struserencrypt", data.userKeyEncrypted)
                                        .replace("stringemailencryption", data.emailEncryptionString)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {submenu.name}
                                    </a>
                                  ) : (
                                    <Link className="nav-link" to={submenu.url}>
                                      {submenu.name}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile filter drawer */}
        {
          showMobileFilter && (
            <div className="mobile-filter-drawer" style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: 320, // Restore previous width (e.g., 320px)
              background: '#fff',
              zIndex: 2000,
              boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s',
              transform: showMobileFilter ? 'translateX(0)' : 'translateX(100%)',
              display: 'flex',
              flexDirection: 'column',
              padding: 0
            }}>
              <div className="d-flex justify-content-end p-2">
                <button
                  className="btn btn-link"
                  style={{ fontSize: 28, color: '#333' }}
                  onClick={() => setShowMobileFilter(false)}
                  aria-label="Close search filters"
                >
                  &times;
                </button>
              </div>
              <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-center px-3">
                <ul className="navbar-nav bottom-filter w-100">
                  <li className="nav-item nav-search w-100">
                    <div className="input-group flex-column w-100 align-items-stretch" style={{ gap: 8 }}>
                      <Multiselect_dropdown
                        className="mb-2 w-100"
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
                        className="form-select form-select-sm mb-2 w-100"
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
                      <select
                        value={year}
                        onChange={handleYearChange}
                        className="form-select form-select-sm mb-2 w-100"
                        aria-label="Select Year"
                      >
                        <option value="">Select Year</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                      <Button
                        className="btn btn-primary w-100"
                        onClick={() => {
                          handleSearch();
                          setShowMobileFilter(false);
                        }}
                      >
                        Search
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      </div >
    </>
  );
};

export default Navbar;