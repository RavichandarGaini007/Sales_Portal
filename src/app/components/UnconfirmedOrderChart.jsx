import React from 'react';
import { Card, CardHeader, CardBody, Col } from 'react-bootstrap'; // Import Bootstrap components
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // Import Chart.js components
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    datalabels: {
      anchor: 'end',
      align: 'top',
      font: { size: 14 },
      color: '#000',
    },
    tooltip: { enabled: true },
    title: { display: true },
  },
  scales: {
    x: {
      categoryPercentage: 1.0, // full width for the group
      barPercentage: 0.3, // much thinner bars, more space between bars
      // Add groupPadding if using grouped bars (not needed for single group)
    },
  },
};

const UnconfirmedOrderChart = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const salableGrndTotl = tableData.find(
    (item) => item.division === 'Grand Total'
  );
  if (!salableGrndTotl) return null;

  // Data for the chart
  const data = {
    labels: ['Unconfirmed Orders'], // Label for the bar chart
    datasets: [
      {
        label: 'Unconfirmed Due to OS', // Label for first bar
        data: [salableGrndTotl.unconf_ostd_ord], //  // Example value for "Unconfirmed Due to OS"
        backgroundColor: '#5e6eed', // Bar color for "OS"

        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Unconfirmed Due to Stock', // Label for second bar
        data: [salableGrndTotl.unconf_stock], // //props.data.unconf_stock  // Example value for "Unconfirmed Due to Stock"
        backgroundColor: '#ff0d59', // Bar color for "Stock"

        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  return (
    // <Col lg="5" md="12" sm="12">
    <Card className="card-stats">
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-line menu-icon" /> Unconfirmed Order Chart
        </div>
      </CardHeader>
      <CardBody style={{ maxHeight: '300px' }}>
        {/* Here we define width and height for the chart  mdi mdi-clipboard-text menu-icon*/}
        <Bar data={data} options={chartOptions} width={300} height={190} />
      </CardBody>
    </Card>
    // </Col>
  );
};

export default UnconfirmedOrderChart;
