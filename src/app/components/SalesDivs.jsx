import React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars-2'; // Import slim scroll component

const SalesDivs = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const chartData = React.useMemo(() => {
    const salesDivData = tableData.filter(
      (items) => items.division !== 'Grand Total'
    );

    return salesDivData.map((item) => ({
      label: item.div_Name,
      value: (item.net_amt / item.target) * 100,
      net_amt: item.net_amt,
      target: item.target,
    }));
  }, [tableData]);

  return (
    <Card className="card-stats" style={{ height: '300px' }}>
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-bar menu-icon" /> Sales Division's
        </div>
      </CardHeader>
      <CardBody style={{ maxHeight: '100px' }}>
        <Scrollbars
          style={{ height: 250 }} // Define the height of the scrollable area
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
            {chartData.map((data, index) => (
              <Col xs="6" sm="6" md="4" className="text-center" key={index}>
                <div
                  className="gauge-container"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px',
                  }}
                >
                  <Gauge
                    value={data.value}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="80%"
                    outerRadius="100%"
                    width={140}
                    height={105}
                  />
                  <div>
                    <p>
                      <b>{data.label}</b> <br /> Net : {data.net_amt} / Tgt :{' '}
                      {data.target}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Scrollbars>
      </CardBody>
    </Card>
  );
};

export default SalesDivs;
