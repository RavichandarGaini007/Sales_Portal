import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

const ScoreCard = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const percAbove100 = tableData.filter((item) => item.ach > 100).length;
  const totRows = tableData.length;
  const percentage = (percAbove100 / totRows) * 100;

  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'red';
    if (percentage < 80) return 'orange';
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
          <Col>
            {/* Progress bar */}
            <div className="progress mb-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${percentage || 100}%`,
                  backgroundColor: getProgressColor(percentage),
                  transition: 'width 0.4s',
                }}
              >
                {percAbove100}/{totRows}
              </div>
            </div>

            {/* Table */}
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
                {tableData.map(({ brand_Name, sale, target, ach }, index) => (
                  <tr key={index}>
                    <td className="tblTextLeft" style={{ textAlign: 'left' }}>
                      {brand_Name}
                    </td>
                    <td>{sale}</td>
                    <td>{target}</td>
                    <td style={{ color: ach >= 100 ? '#00d284' : 'red' }}>
                      {ach}%
                      {ach >= 100 ? (
                        <i className="mdi mdi-arrow-up"></i>
                      ) : (
                        <i className="mdi mdi-arrow-down"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
