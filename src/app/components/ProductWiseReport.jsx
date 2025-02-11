import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { ProductReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function ProductWiseReport({ headerName, brandCode, divCode }) {
  const { request } = useRequest();

  //   const requestData = {
  //     tbl_name: 'FTP_MAT_VAL_11_2024',
  //     empcode: '041406',
  //     div: '23',
  //     month: '11',
  //     year: '2024',
  //     type: 'val',
  //   };

  return (
    <>
      <PopupTableModal
        url={apiUrls.ProductReportData}
        request={{
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
          brand: brandCode || null,
          div: divCode || null, // Check if divCode exists; if not, use div
          type: 'val',
        }}
        head={ProductReportColumns}
        headerName={headerName}
        state={popState.popProductWise}
      />
    </>
  );
}

export default ProductWiseReport;
