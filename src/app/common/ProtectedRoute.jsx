import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../lib/authToken';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
