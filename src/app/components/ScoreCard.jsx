import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, Row, Col, Nav, NavItem } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars-2'; // Import slim scroll component

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
    <Card className="card-stats" style={{ height: '300px' }}>
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-bar menu-icon" /> Scorecard
        </div>
      </CardHeader>
      <Nav tabs>
        <NavItem style={{ width: '100%' }} className="justify-content-center">
          {/* Progress bar */}
          <div className="progress mb-2 mt-2 mx-2">
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
        </NavItem>
      </Nav>
      <CardBody style={{ maxHeight: '400px' }}>
        <Scrollbars
          style={{ height: '100%' }} // Define the height of the scrollable area
          autoHide // Automatically hide the scrollbar when not scrolling
          autoHideTimeout={1000} // Delay before hiding scrollbar
          autoHideDuration={200} // Duration of hiding animation
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: '#6c63ff',
                borderRadius: '4px',
              }}
            />
          )}
        >
          <Row>
            <Col>
              {/* Table */}
              {/* <table className="table"> */}
              <table className="table table-bordered">
                {/* <thead className="custom-gray-header"> */}
                <thead className="thead-light">
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
        </Scrollbars>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
