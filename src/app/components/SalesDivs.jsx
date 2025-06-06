import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const SalesDivs = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null;
  }

  const chartOptions = {
    responsive: true,
    layout: {
      padding: {
        top: 0, // Remove extra space above the chart
      },
    },
    plugins: {
      legend: { position: 'top', labels: { padding: 8 } }, // Reduce legend padding
      datalabels: {
        anchor: 'end',
        align: 'right',
        font: { size: 12 },
        color: '#000',
        formatter: function (value, context) {
          return customLabels[context.dataIndex];
        },
      },
      tooltip: { enabled: true },
      title: { display: false }, // Hide chart title if not needed
    },
    scales: {
      x: {
        categoryPercentage: 0.1, // reduce to add more space between groups
        barPercentage: 0.7, // reduce to make bars thinner        
        afterDataLimits: (axis) => { // Extend the max value to allow space for datalabels and extra ticks
          axis.max += axis.max * 0.75; // add 25% more space to the right
        },
        ticks: {
          callback: function (value, index, values) {
            return value;
          },
        },
      },
      y: {
        beginAtZero: true, // Optionally, you can add grid or other y-axis settings here
      },
    },
    indexAxis: 'y', // change to 'y' for horizontal bars
    maintainAspectRatio: false, // Optionally, adjust maintainAspectRatio for better fit
  };

  const salesDivData = tableData.filter((item) => item.division !== 'Grand Total');
  const labels = salesDivData.map((item) => item.div_Name);
  const netAmtData = salesDivData.map((item) => item.net_amt);
  const customLabels = salesDivData.map((item) => `${item.net_amt} / ${item.target} (${item.achv}%)`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Net Amount / Target (Achv)',
        data: netAmtData,
        backgroundColor: '#5e6eed',
        borderWidth: 1,
        barThickness: 15, // reduced bar thickness
      },
    ],
  };

  const barCount = labels.length;
  const chartHeight = barCount > 5 ? barCount * 32 : 270; // 32px per bar for spacing
  // Dynamically set minWidth based on label length and bar count for better horizontal scroll
  // Force minWidth to always be larger than the container to ensure horizontal scrollbar
  const chartMinWidth = Math.max(600, ...customLabels.map(l => l.length * 12) + barCount * 100);

  return (
    <Card className="card-stats" style={{ height: '348px' }}>
      <CardHeader>
        <div className="stats card-title mb-0">
          <i className="mdi mdi-chart-bar menu-icon" /> Sales Division's
        </div>
      </CardHeader>
      <CardBody style={{ height: 'calc(100% - 56px)', paddingBottom: 0 }}>
        <div style={{ height: '100%', maxHeight: '100%', overflowY: barCount > 5 ? 'auto' : 'visible', overflowX: 'auto', width: '100%' }}>
          <div style={{ height: chartHeight, minHeight: 270, minWidth: chartMinWidth, position: 'relative' }}>
            <Bar data={data} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                datalabels: {
                  ...chartOptions.plugins.datalabels,
                  align: 'right', // always outside the bar
                  anchor: 'end',
                  clamp: false,
                  clip: false, // allow label to overflow chart area
                  offset: 2, // more space after bar
                  display: true,
                  formatter: function (value, context) {
                    return customLabels[context.dataIndex];
                  },
                },
              },
            }} height={chartHeight} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesDivs;
