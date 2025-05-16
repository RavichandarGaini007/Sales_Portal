import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divPlantPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import { Modal } from 'react-bootstrap';
// import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function PlantWiseReport({ headerName, divCode, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (rowData?.werks !== data.werks) {
      setrowData(data); // Store the clicked row's data
    }
    toggleModal(); // Open the modal
  };
  return (
    <>
      <PopupTableModal
        url={apiUrls.DivPlantReportData}
        request={{ ...request, div: divCode }}
        head={divPlantPopupColumns}
        headerName={headerName}
        state={popState.popPlantWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData.plant}
              isDrillEnable={true}
              plantCode={rowData.werks}
              divCode={divCode}
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

export default PlantWiseReport;
