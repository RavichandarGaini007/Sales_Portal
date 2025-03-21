import React from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

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
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
          // label: function (tooltipItem) {
          //   const label = tooltipItem.label || '';
          //   const value = tooltipItem.raw || 0;
          //   return `${label}: ${value}%`;
          // },
        },
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      datalabels: {
        color: '#fff', // Set the color of the data labels (white in this case)
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: function (value) {
          return value + '%'; // Append percentage to the label
        },
      },
    },
    maintainAspectRatio: false,
  };

  const colorStyle = (color) => ({
    display: 'inline-block',
    width: '15px',
    height: '15px',
    backgroundColor: color,
    marginRight: '5px',
  });

  return (
    // <Col lg="5" md="12" sm="12">
    <Card className="card-stats" style={{ height: '220px' }}>
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
            <ul className="list-unstyled" style={{ textAlign: 'left' }}>
              <li>
                <span style={colorStyle('#5e6eed')}></span>
                Total Sales: {totalSales}%
              </li>
              <li>
                <span style={colorStyle('#00d284')}></span>
                Saleable: {saleablePercentage}%
              </li>
              <li>
                <span style={colorStyle('#ff0d59')}></span>
                Non-Saleable: {nonSaleablePercentage}%
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
