import React from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divHqPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';

function HqWiseReport({ headerName }) {
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
                url={apiUrls.DivHqReportData}
                request={requestData}
                head={divHqPopupColumns}
                headerName={headerName}
                state={popState.popHqWise}
            />
        </>
    )
}

export default HqWiseReport
