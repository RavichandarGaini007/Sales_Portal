import React from 'react';
import '../css/Loader.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;

// import React from 'react';
// import { Spinner } from 'reactstrap';
// import '../css/Loader.css';

// const LoadingSpinner = ({ isLoading, size = 'lg', color = 'primary' }) => {
//   if (!isLoading) return null; // If loading is false, don't show anything.

//   return (
//     <div className="loading-overlay loading-spinner">
//       <Spinner size={size} color={color} />
//     </div>
//   );
// };

//export default LoadingSpinner;
