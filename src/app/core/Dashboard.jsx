import React from 'react';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
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
import SalesDivBar from '../components/SalesDivBar';
import SalesAchvTabs from '../components/SalesAchvTabs';
import '../css/commonCss.css';
import Navbar from '../core/Navbar';
import RegionPerformance from '../components/RegionPerformance';

//@TODO : move this request code out of component
const scoreCardReq = {
  tbl_name: 'FTP_MAT_VAL_11_2024',
  empcode: '041406',
  div: '23',
  month: '11',
  year: '2024',
};

const salableNonSaleReq = {
  tbl_name: 'FTP_11_2024',
  empcode: '041406',
  div: '23,01,07,49,28',
  month: '11',
  year: '2024',
  flag: 'monthly',
};

const Dashboard = () => {
  let scoracrdPercentage = '0';
  let salesDivData = [];
  let salableGrndTotl;

  const navigate = useNavigate(); // Hook to navigate programmatically

  const { data: scData } = useFetch(
    'http://192.168.120.64/React_Login_api/api/Sales/SalesScData',
    scoreCardReq
  );
  const { data: salableData } = useFetch(
    'http://192.168.120.64/React_Login_api/api/Sales/salesAchvdata',
    salableNonSaleReq
  );

  const navComps = (flag) => {
    if (flag === 'dashboard') {
      navigate('/dashboard');
    } else if (flag === 'TableFormat') {
      navigate('/SalesPortal');
    }
  };

  if (salableData && salableData.data) {
    salesDivData = salableData.data.filter(
      (items) => items.division != 'Grand Total'
    );

    salableGrndTotl = salableData.data.filter(
      (items) => items.division === 'Grand Total'
    );
  }

  if (scData && scData.data) {
    const percAbove100 = scData.data.filter((item) => item.ach > 100).length;
    const totRows = scData.data.length;
    scoracrdPercentage = (percAbove100 / totRows) * 100;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper pb-0">
            <div className="page-header flex-wrap">
              <div className="header-left">
                <button
                  className="btn btn-primary mb-2 mb-md-0 mr-2"
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
                <SalesAchvTabs request={salableNonSaleReq} />
              </Col>
              <Col lg="5" md="5" sm="5">
                <SalesDivBar tableData={salesDivData} />
              </Col>
            </Row>
            <Row className="mt-performace">
              <Col lg="6" md="6" sm="6">
                <ScoreCard
                  percentage={scoracrdPercentage}
                  tableData={scData?.data}
                />
              </Col>
              <Col lg="6" md="6" sm="6">
                <SaleablePieChart tableData={salableGrndTotl} />
              </Col>
            </Row>
            <Row className="mt-performace">
              <Col lg="6" md="6" sm="6">
                <HQPerformance />
              </Col>
              <Col lg="6" md="6" sm="6">
                <RegionPerformance />
              </Col>
            </Row>
            <Row className="mt-performace">
              <BrandPerformance />
              <UnconfirmedOrderChart tableData={salableGrndTotl} />
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
