import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { ProductReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function ProductWiseReport({ headerName, brandCode, divCode, onClose }) {
  const { request } = useRequest();

  //   const requestData = {
  //     tbl_name: 'FTP_MAT_VAL_11_2024',
  //     empcode: '041406',
  //     div: '23',
  //     month: '11',
  //     year: '2024',
  //     type: 'val',
  //   };

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    params.tbl_name = request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_');
    if (brandCode) params.brand = brandCode;
    if (divCode) params.div = divCode;
    params.type = 'val';

    return params;
  }, [request, brandCode, divCode]);

  return (
    <>
      <PopupTableModal
        url={apiUrls.ProductReportData}
        request={buildRequestParams()}
        head={ProductReportColumns}
        headerName={headerName}
        state={popState.popProductWise}
        onCloseClick={onClose}
      />
    </>
  );
}

export default ProductWiseReport;
