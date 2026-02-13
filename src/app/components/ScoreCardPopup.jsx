import React, { useState, useCallback, useEffect } from 'react';
import { useRequest } from '../common/RequestContext';
import ScoreCardQtyVal from './ScoreCardQtyVal';
import { apiUrls, fetchApi } from '../lib/fetchApi';

function ScoreCardPopup({
    divCode,
    hqCode,
    misCode
}) {
    const { request } = useRequest();
    const [scData, setscData] = useState([]);

    const buildRequestParams = useCallback(() => {
        const params = { ...request };

        if (divCode) params.div = divCode;
        if (hqCode) params.hq = hqCode;
        if (misCode) params.mis = misCode;
        params.tbl_name = request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_')

        return params;
    }, [request, hqCode, misCode]);

    useEffect(() => {
        (async () => {
            if (request) {
                const opData = await fetchApi(apiUrls.SalesScData, buildRequestParams());

                if (opData && opData.data) {
                    setscData(opData.data);
                }
            }
        })();
    }, [request]);

    return (
        <>
            <ScoreCardQtyVal
                headerName="Score Card Wise"
                tableData={scData}
            />
        </>
    )
}

export default ScoreCardPopup;