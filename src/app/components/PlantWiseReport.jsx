import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divPlantPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function PlantWiseReport({ headerName, divCode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  // const requestData = {
  //   tbl_name: 'FTP_11_2024',
  //   empcode: '041406',
  //   div: '23',
  //   month: '11',
  //   year: '2024',
  // };

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
      {/* <Modal show={modalOpen} fullscreen>
        <Modal.Body> */}
      <PopupTableModal
        url={apiUrls.DivPlantReportData}
        request={{ ...request, div: divCode }}
        head={divPlantPopupColumns}
        headerName={headerName}
        state={popState.popPlantWise}
        onRowClick={handleRowClick}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData.plant}
              isDrillEnable={true}
              plantCode={rowData.werks}
              divCode={divCode}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default PlantWiseReport;
