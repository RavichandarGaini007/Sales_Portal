import React from "react";
import { Card, CardHeader, CardBody, Col } from "react-bootstrap";  // Import Bootstrap components
import { Bar } from "react-chartjs-2";  // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";  // Import Chart.js components

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDivBar = (props) => {
    const tableData = props.tableData;
    const arrLbl = tableData?.map(item => item.div);
    const arrData = tableData?.map(item => item.net_amt);
    const arrTgt = tableData?.map(item => item.target);
  // Data for the chart
  const dataB = {
    labels: [arrLbl],  // Label for the bar chart
    datasets: [
      {
        label: "Div Sale",  // Label for first bar
        data: [arrData], // value in array format
        backgroundColor: "#5e6eed",  // Bar color 
        borderColor: "rgba(255, 99, 132, 1)",  // Border color of bar
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: "Div Tgt",  // Label for Second bar
        data: [arrTgt], // value in array format
        backgroundColor: "#5e6eed",  // Bar color 
        borderColor: "rgba(54, 162, 235, 1)",  // Border color of bar
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  // Options for the chart
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",  // Display legend on top
      },
      tooltip: {
        enabled: true,  // Enable tooltips for better interactivity
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        categoryPercentage: 0.5,  // Adjust width within category
        barPercentage: 0.7,  // Adjust the overall width of the bar in the chart area
        ticks: {
          display: true,  // Show x-axis ticks
        },
      },
      y: {
        beginAtZero: true,  // Start y-axis from zero
      },
    },
  };

  return (
    <Col lg="12" md="12" sm="12">
      <Card className="card-stats" style={{ height: "318px", width: "100%" }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-line menu-icon" /> Div Wise Sale Chart
          </div>
        </CardHeader>
        <CardBody>
          {/* Here we define width and height for the chart  mdi mdi-clipboard-text menu-icon*/}
          <Bar data={dataB} options={options} width={300} height={190} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesDivBar;
