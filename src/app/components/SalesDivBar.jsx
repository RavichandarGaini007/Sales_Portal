import React from 'react';
import { Card, CardHeader, CardBody } from 'react-bootstrap'; // Import Bootstrap components
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
      categoryPercentage: 0.6,
      barPercentage: 0.8,
    },
  },
};

const SalesDivBar = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const chartData = React.useMemo(() => {
    const salesDivData = tableData.filter(
      (items) => items.division !== 'Grand Total'
    );

    const labels = salesDivData.map((item) => item.div_Name);
    const salesData = salesDivData.map((item) => item.net_amt);
    const targetData = salesDivData.map((item) => item.target);

    return {
      labels,
      datasets: [
        {
          label: 'Div Sale',
          data: salesData,
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          barThickness: 20,
        },
        {
          label: 'Div Tgt',
          data: targetData,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          barThickness: 20,
        },
      ],
    };
  }, [tableData]);

  return (
    <Card className="card-stats">
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-line menu-icon" /> Div Wise Sale Chart
        </div>
      </CardHeader>
      <CardBody>
        <Bar data={chartData} options={chartOptions} width={300} height={190} />
      </CardBody>
    </Card>
  );
};

export default SalesDivBar;
