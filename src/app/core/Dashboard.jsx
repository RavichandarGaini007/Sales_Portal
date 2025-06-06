import React, { useEffect, useState, Suspense } from 'react';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import HQPerformance from '../components/HQPerformance';
import SaleablePieChart from '../components/SaleablePieChart';
import BrandPerformance from '../components/BrandPerformance';
import UnconfirmedOrderChart from '../components/UnconfirmedOrderChart';
import HierarchicalPerformanceTabs from '../components/HierarchicalPerformanceTabs';
import OrderTracking from '../components/OrderTracking';
import TopPerformance from '../components/TopPerformance';
import NewsAndInformation from '../components/NewsAndInformation';
import AwardsDetailsCard from '../components/AwardsDetailsCard';
import SalesAchvTabs from '../components/SalesAchvTabs';
import '../css/commonCss.css';
import RegionPerformance from '../components/RegionPerformance';
import { apiUrls, fetchApi } from '../lib/fetchApi';
import { useRequest } from '../common/RequestContext';
import SalesDivs from '../components/SalesDivs';

const Dashboard = () => {
  const [scData, setscData] = useState([]);
  const [salableData, setsalableData] = useState([]);
  const { request } = useRequest();

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Fetch data from API
    (async () => {
      if (request) {
        const opData = await fetchApi(apiUrls.SalesScData, {
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
        });
        const opSalableData = await fetchApi(apiUrls.salesAchvdata, request);

        if (opData && opData.data) {
          setscData(opData.data);
        }
        if (opSalableData && opSalableData.data) {
          setsalableData(opSalableData.data);
        }
      }
    })();
  }, [request]);

  const navComps = (flag) => {
    if (flag === 'dashboard') {
      navigate('/mainLayout/dashboard');
    } else if (flag === 'TableFormat') {
      navigate('/mainLayout/SalesPortal');
    }
  };

  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            <div className="page-header flex-wrap">
              <div className="header-left">
                <button
                  className="btn btn-primary mb-2 mb-md-0 mr-2" style={{ "background": "#00d284", "border": "none" }}
                  onClick={() => navComps('dashboard')}
                >
                  {' '}
                  New Portal{' '}
                </button>
                <button
                  className="btn btn-outline-primary mb-2 mb-md-0 mr-2"
                  onClick={() => navComps('TableFormat')}
                >
                  {' '}
                  Table Formate{' '}
                </button>
                <button className="btn btn-outline-primary mb-2 mb-md-0 mr-2">
                  <a
                    href="https://sales.alkemcrm.com/sd_new/default.aspx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    Old Portal{' '}
                  </a>
                </button>
              </div>
            </div>
            <Row className="mt-performace">
              <Col lg="7" md="7" sm="7">
                <SalesAchvTabs />
              </Col>
              <Col lg="5" md="5" sm="5">
                <SalesDivs tableData={salableData} />
                {/* <DivBars /> */}
              </Col>
            </Row>
            <Row className="mt-performace">
              <Col lg="6" md="6" sm="6">
                <ScoreCard tableData={scData} />
              </Col>
              <Col lg="6" md="6" sm="6">
                <SaleablePieChart tableData={salableData} />
              </Col>
            </Row>
            <Row className="mt-performace">
              <Col lg="6" md="6" sm="6">
                <Suspense fallback={<h1>🌀 Loading...</h1>}>
                  <HQPerformance />
                </Suspense>
              </Col>
              <Col lg="6" md="6" sm="6">
                <RegionPerformance />
              </Col>
            </Row>
            <Row className="mt-performace">
              <Col lg="7" md="6" sm="6">
                <BrandPerformance />
              </Col>
              <Col lg="5" md="6" sm="6">
                <UnconfirmedOrderChart tableData={salableData} />
              </Col>
            </Row>
            <Row className="mt-performace">
              <HierarchicalPerformanceTabs />
            </Row>
            <Row className="mt-performace">
              <OrderTracking />
              <TopPerformance />
            </Row>
            <Row className="mt-performace">
              <NewsAndInformation />
              <AwardsDetailsCard />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
