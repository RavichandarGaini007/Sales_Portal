import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHqPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import CustomerWiseReport from './CustomerWiseReport';
import { Modal } from 'react-bootstrap';
// import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function HqWiseReport({
  headerName,
  isDrillEnable,
  plantCode,
  hqCode,
  divCode,
  regionCode,
  misCode,
  onClose,

}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    if (plantCode) params.plant = plantCode;
    if (divCode) params.div = divCode;
    if (hqCode) params.hq = hqCode;
    if (regionCode) params.region = regionCode;
    if (misCode) params.mis = misCode;

    params.ename = headerName;

    return params;
  }, [request, plantCode, divCode, hqCode, regionCode, misCode]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (
      isDrillEnable === true &&
      (rowData?.vkbur !== data.vkbur || rowData?.division1 !== data.division1)
    ) {
      setrowData(data); // Store the clicked row's data
    }
    if (isDrillEnable === true) toggleModal(); // Open the modal
  };

  return (
    <>
      <PopupTableModal
        url={apiUrls.DivHqReportData}
        request={buildRequestParams()}
        head={divHqPopupColumns}
        headerName={headerName}
        state={popState.popHqWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <CustomerWiseReport
              headerName={rowData.bezei}
              HqCode={rowData?.vkbur}
              divCode={rowData?.division1}
              onClose={toggleModal}
              misCode={misCode}
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

export default HqWiseReport;
