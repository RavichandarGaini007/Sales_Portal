import { Card, CardHeader, CardBody } from 'reactstrap';
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
    <Card className="card-stats" style={{ minHeight: '220px', maxHeight: '400px' }}>
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-pie menu-icon" />
          Saleable vs Non-Saleable
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex-wrap d-flex gap-3 justify-content-between align-items-stretch w-100">
          <div className="card-body position-relative flex-fill d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(63 195 60)', borderRadius: '10px', maxHeight: 80 }}>
            <h5 className="text-white" style={{ marginBottom: 0 }}>Total Sale</h5>
            <p className="m-b-0 text-white">{salableGrndTotl.net_amt} ({totalSales}% )</p>
            <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 0, marginBottom: 0 }}></i>
          </div>
          <div className="card-body position-relative flex-fill d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(58 183 148)', borderRadius: '10px', maxHeight: 80 }}>
            <h5 className="text-white" style={{ marginBottom: 0 }}>Salable</h5>
            <p className="m-b-0 text-white">{salableGrndTotl.saleable} ({saleablePercentage}% )</p>
            <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 0, marginBottom: 0 }}></i>
          </div>
          <div className="card-body position-relative flex-fill d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgb(237 52 52)', borderRadius: '10px', maxHeight: 80 }}>
            <h5 className="text-white" style={{ marginBottom: 0 }}>Non-Salable</h5>
            <p className="m-b-0 text-white">{salableGrndTotl.nonsaleable} ({nonSaleablePercentage}% )</p>
            <i className="mdi mdi-currency-inr material-icons-two-tone d-block f-46 card-icon text-white" style={{ ...cardIconStyle, position: 'absolute', right: 10, top: 0, marginBottom: 0 }}></i>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SaleablePieChart;
