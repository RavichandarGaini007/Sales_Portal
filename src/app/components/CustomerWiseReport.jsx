import React from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divCustPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';

function CustomerWiseReport({ headerName }) {
    const requestData = {
        tbl_name: 'FTP_11_2024',
        empcode: '041406',
        div: '23',
        month: '11',
        year: '2024',
    };

    return (
        <>
            <PopupTableModal
                url={apiUrls.DivCustReportData}
                request={requestData}
                head={divCustPopupColumns}
                headerName={headerName}
                state={popState.popCustWise}
            />
        </>
    )
}

export default CustomerWiseReport
