import React from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divBrandPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';

function BrandWiseReport({ headerName }) {
    const requestData = {
        tbl_name: 'FTP_MAT_VAL_11_2024',
        empcode: '041406',
        div: '23',
        month: '11',
        year: '2024',
    };

    return (
        <>
            <PopupTableModal
                url={apiUrls.DivBrandReportData}
                request={requestData}
                head={divBrandPopupColumns}
                headerName={headerName}
                state={popState.popBrandWise}
            />
        </>
    )
}

export default BrandWiseReport
