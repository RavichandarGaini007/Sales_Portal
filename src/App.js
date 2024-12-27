import Navbar from './app/shared/Navbar';
import './App.css';
import Dashboard from './app/shared/Dashboard';
import { Route, Routes } from 'react-router-dom';
import SalesTable from './app/shared/SalesTable';
import SalesPortalData from './app/shared/SalesPortalData';
import SalesPortalTable from './app/shared/SalesPortalTable';
function App() {
  return (
    <div className="container-scroller">
      <Navbar></Navbar>
        <div className="container-fluid page-body-wrapper">
        {/* <Dashboard></Dashboard> */}
        <Routes>
          <Route path='' element={<Dashboard/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/salesdata' element={<SalesPortalData/>}></Route> {/*SalesPortalData*/}
          <Route path='/SalesPortal' element={<SalesPortalTable/>}></Route> 
          <Route></Route>
        </Routes>
        </div>
      </div>
  );
}

export default App;
