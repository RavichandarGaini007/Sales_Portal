import React from "react";
import { Card, CardHeader, CardBody, Col } from "react-bootstrap";  // Import Bootstrap components
import { Bar } from "react-chartjs-2";  // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";  // Import Chart.js components

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UnconfirmedOrderChart = (props) => {
  // Data for the chart
  const data = {
    labels: ["Unconfirmed Orders"],  // Label for the bar chart
    datasets: [
      {
        label: "Unconfirmed Due to OS",  // Label for first bar
        data: [props.tableData[0].unconf_ostd_ord], //props.data.unconf_ostd_ord  // Example value for "Unconfirmed Due to OS"
        backgroundColor: "#5e6eed",  // Bar color for "OS"
        borderColor: "rgba(255, 99, 132, 1)",  // Border color for "OS"
        borderWidth: 1,
      },
      {
        label: "Unconfirmed Due to Stock",  // Label for second bar
        data: [props.tableData[0].unconf_stock], //props.data.unconf_stock  // Example value for "Unconfirmed Due to Stock"
        backgroundColor: "#ff0d59",  // Bar color for "Stock"
        borderColor: "rgba(54, 162, 235, 1)",  // Border color for "Stock"
        borderWidth: 1,
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
        text: "Unconfirmed Orders = 50",  // Total unconfirmed orders
      },
    },
    scales: {
      x: {
        barThickness: 10,  // Set the bar thickness to make the bars thinner
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
    <Col lg="5" md="12" sm="12">
      <Card className="card-stats" style={{ height: "318px", width: "100%" }}>
        <CardHeader>
          <div className="stats card-title mb-0">
            <i className="mdi mdi-chart-line menu-icon" /> Unconfirmed Order Chart
          </div>
        </CardHeader>
        <CardBody>
          {/* Here we define width and height for the chart  mdi mdi-clipboard-text menu-icon*/}
          <Bar data={data} options={options} width={300} height={190} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default UnconfirmedOrderChart;
