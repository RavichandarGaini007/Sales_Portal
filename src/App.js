import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./app/core/Dashboard'));
const SalesPortalTable = lazy(() => import('./app/components/SalesPortalTable'));
const LoginPage = lazy(() => import('./app/core/LoginPage'));
const MainLayout = lazy(() => import('./app/core/MainLayout'));
const FlatFileDownload =lazy(()=> import('./app/reports/flatfiledownload'));
const NetworkWiseProductWise=lazy(()=> import('./app/reports/NetworkWiseProductWise') )
const HierarchyWise=lazy(()=> import('./app/reports/HierarchyWise') )
const CustSaleTrendReport=lazy(()=> import('./app/reports/CustSaleTrendReport') )
const CustProdSalesTrend=lazy(()=> import('./app/reports/CustProdSalesTrend') )
const CorporatePerformance=lazy(()=> import('./app/reports/CorporatePerformance') )
const DispensaryReport=lazy(()=> import('./app/reports/DispensaryReport') )

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
               <Route path="/mainLayout/Report/flat_file_download" element={<FlatFileDownload />} />
                <Route path="/mainLayout/Report/Networkwiseproductwise" element={<NetworkWiseProductWise />} />
                <Route path="/mainLayout/Report/HierarchyWise" element={<HierarchyWise />} />
                <Route path="/mainLayout/Report/CustSaleTrendReport" element={<CustSaleTrendReport />} />
                <Route path="/mainLayout/Report/CustProdSalesTrend" element={<CustProdSalesTrend />} />
                <Route path="/mainLayout/Report/CorporatePerformance" element={<CorporatePerformance />} />
                <Route path="/mainLayout/Report/DispensaryReport" element={<DispensaryReport />} />
              <Route path="/mainLayout/SalesPortal" element={<SalesPortalTable />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
