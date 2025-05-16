import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { RegionReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import { Modal } from 'react-bootstrap';
// import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function RegionWiseReport({ headerName, divCode, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (
      rowData?.regio !== data.regio ||
      rowData?.division1 !== data.division1
    ) {
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
        url={apiUrls.RegionReportData}
        request={buildRequestParams()}
        head={RegionReportColumns}
        headerName={headerName}
        state={popState.popRegionWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData?.region_desc}
              regionCode={rowData?.regio}
              divCode={divCode}
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

export default RegionWiseReport;
