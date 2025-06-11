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
      categoryPercentage: 0.1, // full width for the group
      barPercentage: 0.1, // much thinner bars, more space between bars (decreased from 0.3)
      // Add groupPadding if using grouped bars (not needed for single group)
    },
  },
  maintainAspectRatio: false,
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
    labels: ['Unconfirmed Due to OS', 'Unconfirmed Due to Stock'], // Each label is a separate bar
    datasets: [
      {
        label: 'Unconfirmed Orders',
        data: [salableGrndTotl.unconf_ostd_ord, salableGrndTotl.unconf_stock],
        backgroundColor: ['#5e6eed', '#ff0d59'],
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  return (
    <Card className="card-stats com-card-height">
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-line menu-icon" /> Unconfirmed Order Chart
        </div>
      </CardHeader>
      <CardBody>
        {/* Here we define width and height for the chart  mdi mdi-clipboard-text menu-icon*/}
        <Bar data={data} options={chartOptions} width={300} height={190} />
      </CardBody>
    </Card>
  );
};

export default UnconfirmedOrderChart;
