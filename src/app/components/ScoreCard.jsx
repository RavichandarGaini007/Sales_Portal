import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Row } from 'reactstrap';

const ScoreCard = ({ percentage, tableData }) => {
  let achvProd = 0;
  let totProd = 0;

  if (tableData) {
    achvProd = tableData.filter((item) => item.ach > 100).length;
    totProd = tableData.length;
  }

  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'red';
    else if (percentage < 80) return 'orange';
    return '#00d284';
  };

  return (
    <Card className="card-stats">
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-bar menu-icon" /> Scorecard
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          {/* <div className="card p-3"> */}
          <div className="progress mb-4">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${percentage}%`,
                backgroundColor: getProgressColor(percentage),
                transition: 'width 0.4s',
              }}
            >
              {achvProd}/{totProd}
            </div>
          </div>
          <table className="table">
            <thead className="custom-gray-header">
              <tr>
                <th>Brand Name</th>
                <th>Sale</th>
                <th>Target</th>
                <th>Ach(%)</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item, index) => (
                <tr key={index}>
                  <td className="tblTextLeft" style={{ textAlign: 'left' }}>
                    {item.brand_Name}
                  </td>
                  <td>{item.sale}</td>
                  <td>{item.target}</td>
                  <td
                    style={{
                      color: item.ach >= 100 ? '#00d284' : 'red',
                    }}
                  >
                    {item.ach}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
        </Row>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
