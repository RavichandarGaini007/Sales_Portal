import React from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divPlantPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';

function PlantWiseReport({ headerName }) {
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
                url={apiUrls.DivPlantReportData}
                request={requestData}
                head={divPlantPopupColumns}
                headerName={headerName}
                state={popState.popPlantWise}
            />
        </>
    )
}

export default PlantWiseReport
