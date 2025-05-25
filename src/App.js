import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./app/core/Dashboard'));
const SalesPortalTable = lazy(() => import('./app/components/SalesPortalTable'));
const LoginPage = lazy(() => import('./app/core/LoginPage'));
const MainLayout = lazy(() => import('./app/core/MainLayout'));

function App() {

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/mainLayout" element={<MainLayout />}>
              <Route path="/mainLayout/dashboard" element={<Dashboard />} />
              <Route path="/mainLayout/SalesPortal" element={<SalesPortalTable />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
