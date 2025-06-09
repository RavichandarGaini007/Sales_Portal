import { Card, CardHeader, CardBody, Row } from 'reactstrap';
import '@mdi/font/css/materialdesignicons.min.css';

const SaleablePieChart = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const salableGrndTotl = tableData.find(
    (item) => item.division === 'Grand Total'
  );
  if (!salableGrndTotl) return null;

  const saleablePercentage =
    Math.round((salableGrndTotl.saleable / salableGrndTotl.net_amt) * 100) || 0;
  const nonSaleablePercentage =
    Math.round((salableGrndTotl.nonsaleable / salableGrndTotl.net_amt) * 100) ||
    0;
  const totalSales = Math.round(
    100 - saleablePercentage - nonSaleablePercentage
  );

  const cardIconStyle = {
    fontSize: '50px',
    color: '#fff',
    marginBottom: '10px',
    opacity: 0.5,
    right: '10px',
    position: 'absolute',
  };

  return (
    <Card className="card-stats" style={{ height: '220px' }}>
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-pie menu-icon" />
          Saleable vs Non-Saleable
        </div>
      </CardHeader>
      <CardBody>
        <Row className="g-2 flex-wrap flex-md-nowrap justify-content-between align-items-stretch">
          <div className="col-12 col-sm-4 mb-3 mb-sm-0">
            <div className="card-body position-relative h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(63 195 60)', borderRadius: '10px', minHeight: 100 }}>
              <h5 className="text-white">Total Sale</h5>
              <p className="m-b-0 text-white">{salableGrndTotl.net_amt} ({totalSales}% )</p>
              <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 4, marginBottom: 0 }}></i>
            </div>
          </div>
          <div className="col-12 col-sm-4 mb-3 mb-sm-0">
            <div className="card-body position-relative h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(58 183 148)', borderRadius: '10px', minHeight: 100 }}>
              <h5 className="text-white">Salable</h5>
              <p className="m-b-0 text-white">{salableGrndTotl.saleable} ({saleablePercentage}% )</p>
              <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 4, marginBottom: 0 }}></i>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="card-body position-relative h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(237 52 52)', borderRadius: '10px', minHeight: 100 }}>
              <h5 className="text-white">Non-Salable</h5>
              <p className="m-b-0 text-white">{salableGrndTotl.nonsaleable} ({nonSaleablePercentage}% )</p>
              <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 4, marginBottom: 0 }}></i>
            </div>
          </div>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SaleablePieChart;
