import React, { useState } from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { RegionReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import ProductWiseReport from './ProductWiseReport';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';

function RegionWiseReport({ headerName }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowData, setrowData] = useState(null);

    const requestData = {
        tbl_name: 'FTP_MAT_VAL_11_2024',
        empcode: '041406',
        div: '01',
        month: '11',
        year: '2024',
        // brand: '231',
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleRowClick = (data) => {
        setrowData(data); // Store the clicked row's data
        toggleModal(); // Open the modal
    };
    return (
        <>
            Region Wise Report
            <PopupTableModal
                url={apiUrls.RegionReportData}
                request={requestData}
                head={RegionReportColumns}
                headerName={headerName}
                state={popState.popRegionWise}
                onRowClick={handleRowClick}
            />

            {rowData && (
                <Modal show={modalOpen} onHide={toggleModal} fullscreen>
                    <Modal.Body>
                        <ProductWiseReport headerName={rowData?.region_desc} RegionCode={rowData?.regio} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default RegionWiseReport
