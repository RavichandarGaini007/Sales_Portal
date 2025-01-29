import React from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const SaleablePieChart = ({ tableData }) => {
  const saleablePercentage =
    Math.round((tableData?.[0]?.saleable / tableData?.[0]?.net_amt) * 100 ?? 0);
  const nonSaleablePercentage =
    Math.round((tableData?.[0]?.nonsaleable / tableData?.[0]?.net_amt) * 100 ?? 0);
  const totalSales = Math.round(100 - saleablePercentage - nonSaleablePercentage);

  // const saleableAmount = (saleablePercentage / 100) * totalSales;
  // const nonSaleableAmount = (nonSaleablePercentage / 100) * totalSales;

  const pieData = {
    labels: ['Sale', 'Saleable', 'Non-Saleable'],
    datasets: [
      {
        data: [totalSales, saleablePercentage, nonSaleablePercentage],
        backgroundColor: ['#5e6eed', '#00d284', '#ff0d59'],
        hoverBackgroundColor: ['#5e6eed', '#00d284', '#ff0d59'],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        display: false,
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    // <Col lg="5" md="12" sm="12">
    <Card className="card-stats" style={{ height: '318px' }}>
      {/* <CardHeader className="bg-primary text-white"> */}
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-pie menu-icon" />
          Saleable vs Non-Saleable
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6" sm="12">
            <div style={{ width: '100%' }}>
              <Doughnut data={pieData} options={pieOptions} />
            </div>
          </Col>
          <Col md="6" sm="12" className="text-center">
            {/* <h5 className="mb-3">Breakdown</h5> */}
            <ul className="list-unstyled" style={{ textAlign: 'left' }}>
              <li>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#5e6eed',
                    marginRight: '5px',
                  }}
                ></span>
                Total Sales: {totalSales}%
                {/* ({nonSaleableAmount.toFixed(2)} units) */}
              </li>
              <li>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#00d284',
                    marginRight: '5px',
                  }}
                ></span>
                Saleable: {saleablePercentage}%
                {/* ({saleableAmount.toFixed(2)} units) */}
              </li>
              <li>
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#ff0d59',
                    marginRight: '5px',
                  }}
                ></span>
                Non-Saleable: {nonSaleablePercentage}%
                {/* ({nonSaleableAmount.toFixed(2)} units) */}
              </li>
            </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
    // </Col>
  );
};

export default SaleablePieChart;
