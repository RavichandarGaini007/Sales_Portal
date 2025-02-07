import React, { useState } from 'react'
import PopupTableModal from '../common/PopupTableModal'
import { divHierarchyPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import HqWiseReport from './HqWiseReport';

function HierarchyWiseReport({ headerName }) {
    const [modalOpen, setModalOpen] = useState(true);

    const requestData = {
        tbl_name: 'FTP_MAT_VAL_11_2024',
        empcode: '041406',
        div: '23',
        month: '11',
        year: '2024',
    };

    const toggleModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Modal show={modalOpen} fullscreen>
                <Modal.Body>

                    Hierarchy wise Drill

                    <PopupTableModal
                        url={apiUrls.SalesHierarchyDesg}
                        request={requestData}
                        head={divHierarchyPopupColumns}
                        headerName={headerName}
                        state={popState.popHierarchyWise}
                        onRowClick={(data) => <HqWiseReport headerName={data.bezei} />}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default HierarchyWiseReport
