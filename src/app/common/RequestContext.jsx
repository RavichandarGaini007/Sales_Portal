import React, { createContext, useState, useContext } from 'react';

// Create Context for the request data
const RequestContext = createContext();

// Custom hook to use the RequestContext
export const useRequest = () => {
  return useContext(RequestContext);
};

// Provider component to wrap the app
export const RequestProvider = ({ children }) => {
  const [request, setRequest] = useState(null);

  // const updateRequest = (newRequest, extraParams = {}) => {
  //   setRequest((prevRequest) => ({
  //     ...prevRequest,
  //     ...newRequest, // Update/override existing fields
  //     ...extraParams, // Add extra parameters
  //   }));
  // };
  const updateRequest = (newRequest) => {
    setRequest(newRequest);
  };

  return (
    <RequestContext.Provider value={{ request, updateRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
