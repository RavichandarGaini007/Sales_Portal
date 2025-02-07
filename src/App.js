import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './app/core/Dashboard';
import { Route, Routes } from 'react-router-dom';
//import SalesPortalData from './app/notUsedComponents/SalesPortalData';
import SalesPortalTable from './app/components/SalesPortalTable';
import LoginPage from './app/core/LoginPage';
import MainLayout from './app/core/MainLayout';

function App() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Routes>
          <Route path="" element={<LoginPage />}></Route>
          {/* <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/salesdata" element={<SalesPortalData />}></Route>{' '}
          <Route path="/SalesPortal" element={<SalesPortalTable />}></Route> */}

          <Route path="/mainLayout" element={<MainLayout />}>
            <Route path="/mainLayout/dashboard" element={<Dashboard />} />
            <Route path="/mainLayout/SalesPortal" element={<SalesPortalTable />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
