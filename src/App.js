import Navbar from './app/core/Navbar';
import './App.css';
import Dashboard from './app/core/Dashboard';
import { Route, Routes } from 'react-router-dom';
//import SalesTable from './app/components/SalesTable';
import SalesPortalData from './app/components/SalesPortalData';
import SalesPortalTable from './app/components/SalesPortalTable';
function App() {
  return (
    <div className="container-scroller">
      <Navbar></Navbar>
      <div className="container-fluid page-body-wrapper">
        {/* <Dashboard></Dashboard> */}
        <Routes>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/salesdata" element={<SalesPortalData />}></Route>{' '}
          <Route path="/SalesPortal" element={<SalesPortalTable />}></Route>
          <Route></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
