import React from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divHierarchyPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';

function HierarchyWiseReport({ headerName }) {
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
                url={apiUrls.SalesHierarchyDesg}
                request={requestData}
                head={divHierarchyPopupColumns}
                headerName={headerName}
                state={popState.popHierarchyWise}
            />
        </>
    )
}

export default HierarchyWiseReport
