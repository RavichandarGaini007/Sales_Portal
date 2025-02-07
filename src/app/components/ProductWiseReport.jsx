import React, { useState } from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { ProductReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';

function ProductWiseReport({ headerName }) {

    const requestData = {
        tbl_name: 'FTP_MAT_VAL_11_2024',
        empcode: '041406',
        div: '23',
        month: '11',
        year: '2024',
        type: 'val'
    };

    return (
        <>
            Product Wise Report Comp

            <PopupTableModal
                url={apiUrls.ProductReportData}
                request={requestData}
                head={ProductReportColumns}
                headerName={headerName}
                state={popState.popProductWise}
            />
        </>
    )
}

export default ProductWiseReport
