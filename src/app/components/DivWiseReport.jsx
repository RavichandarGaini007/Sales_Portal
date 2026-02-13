import { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { Salescolumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import PlantWiseReport from './PlantWiseReport';
import { Modal } from 'react-bootstrap';
import { useRequest } from '../common/RequestContext';

function DivWiseReport({
    headerName,
    isDrillEnable,
    groupDivCode,
    onClose,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowData, setrowData] = useState(null);
    const { request } = useRequest();

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleRowClick = (data) => {
        if (isDrillEnable === true && rowData?.division !== data.division) {
            setrowData(data); // Store the clicked row's data
        }
        if (isDrillEnable === true) toggleModal(); // Open the modal
    };

    const buildRequestParams = useCallback(() => {
        const params = { ...request };

        params.tbl_name = request.tbl_name;
        if (groupDivCode) params.div = groupDivCode;

        params.ename = headerName;

        return params;
    }, [request, groupDivCode]);

    return (
        <>
            <PopupTableModal
                url={apiUrls.groupDivData}
                request={buildRequestParams()}
                head={Salescolumns}
                headerName={headerName}
                state={popState.popDivWise}
                onRowClick={handleRowClick}
                onCloseClick={onClose}
            />
            {rowData && (
                <Modal show={modalOpen} onHide={toggleModal} fullscreen>
                    <Modal.Body>
                        <PlantWiseReport
                            headerName={rowData.name}
                            divCode={rowData.division}
                            onClose={toggleModal}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default DivWiseReport;
