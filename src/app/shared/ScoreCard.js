import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScoreCard = ({ percentage, tableData }) => {
  // Calculate the color for the progress bar based on the percentage
  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'red';
    else if (percentage < 80) return 'orange';
    return '#00d284';
  };

  return (
    <div className="card p-3">
      {/* Progress Bar Section */}
      <div className="progress mb-4" >
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentage}%`,
            backgroundColor: getProgressColor(percentage),
            transition: 'width 0.4s',
          }}
        >
          3/4
        </div>
      </div>

      {/* Table Section */}
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
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.brand_Name}</td>
              <td>{item.sale}</td>
              <td>{item.target}</td>
              <td style={{
                              color: item.ach >= 100 ? "#00d284" : "red",
                            }}>{item.ach}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
