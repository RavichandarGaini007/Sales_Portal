import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './app/common/ErrorBoundary';
import { useAuthInitialization } from './app/hooks/useAuthInit';
import ProtectedRoute from './app/common/ProtectedRoute';

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
const GlanceReport=lazy(()=> import('./app/reports/GlanceReport') )

// ✅ Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div>
      <div style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>Loading...</div>
      <div style={{ width: '30px', height: '30px', border: '4px solid #f3f3f3', borderTop: '4px solid #00d284', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
    </div>
  </div>
);

function App() {
  const authReady = useAuthInitialization();

  if (!authReady) {
    return <LoadingFallback />;
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/mainLayout" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/mainLayout/dashboard" element={<Dashboard />} />
                 <Route path="/mainLayout/Report/flat_file_download" element={<FlatFileDownload />} />
                  <Route path="/mainLayout/Report/Networkwiseproductwise" element={<NetworkWiseProductWise />} />
                  <Route path="/mainLayout/Report/HierarchyWise" element={<HierarchyWise />} />
                  <Route path="/mainLayout/Report/CustSaleTrendReport" element={<CustSaleTrendReport />} />
                  <Route path="/mainLayout/Report/CustProdSalesTrend" element={<CustProdSalesTrend />} />
                  <Route path="/mainLayout/Report/CorporatePerformance" element={<CorporatePerformance />} />
                  <Route path="/mainLayout/Report/DispensaryReport" element={<DispensaryReport />} />
                  <Route path="/mainLayout/Report/GlanceReport/Sales" element={<GlanceReport repoType="Sales" />} />
                  <Route path="/mainLayout/Report/GlanceReport/Target" element={<GlanceReport repoType="Target" />} />
                <Route path="/mainLayout/SalesPortal" element={<SalesPortalTable />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
