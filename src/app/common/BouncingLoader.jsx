import React from 'react';
import '../css/BouncingLoader.css'; // Import the CSS file for styling

const BouncingLoader = () => {
  return (
    <div className="bouncing-loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default BouncingLoader;
