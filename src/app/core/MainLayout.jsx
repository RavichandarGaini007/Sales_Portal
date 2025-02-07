import React from 'react';
import Navbar from '../core/Navbar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompanyAnnoucement from '../components/CompanyAnnoucement';
import { RequestProvider } from '../common/RequestContext';

function MainLayout() {
  const { data, isAuthorized, isLoading } = useSelector((state) => {
    return state.app;
  });

  return (
    <>
      <RequestProvider>
        <Navbar />
        {data?.data[0]?.modelUrl !== '' && data?.data[0]?.modelUrl !== null && (
          <CompanyAnnoucement show={true} url={data?.data[0]?.modelUrl} />
        )}

        <Outlet />
      </RequestProvider>
    </>
  );
}

export default MainLayout;
