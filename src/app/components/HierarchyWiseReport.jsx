import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHierarchyPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
// import { Button } from 'reactstrap';
import HqWiseReport from './HqWiseReport';
import { useRequest } from '../common/RequestContext';

function HierarchyWiseReport({ headerName, divCode, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (rowData?.fsCode !== data.fsCode) {
      setrowData(data); // Store the clicked row's data
    }
    toggleModal(); // Open the modal
  };

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    params.tbl_name = request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_');
    if (divCode) params.div = divCode;

    return params;
  }, [request, divCode]);

  return (
    <>
      <PopupTableModal
        url={apiUrls.SalesHierarchyDesg}
        request={buildRequestParams()}
        head={divHierarchyPopupColumns}
        headerName={headerName}
        state={popState.popHierarchyWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData.bezei}
              isDrillEnable={false}
              onClose={toggleModal}
            />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </>
  );
}

export default HierarchyWiseReport;
