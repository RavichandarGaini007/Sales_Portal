import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { RegionReportColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import HqWiseReport from './HqWiseReport';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function RegionWiseReport({ headerName, divCode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  // const requestData = {
  //   tbl_name: 'FTP_MAT_VAL_11_2024',
  //   empcode: '041406',
  //   div: '01',
  //   month: '11',
  //   year: '2024',
  //   // brand: '231',
  // };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    setrowData(data); // Store the clicked row's data
    toggleModal(); // Open the modal
  };
  return (
    <>
      <PopupTableModal
        url={apiUrls.RegionReportData}
        request={{
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
          div: divCode || null, // Check if divCode exists; if not, use div
        }}
        head={RegionReportColumns}
        headerName={headerName}
        state={popState.popRegionWise}
        onRowClick={handleRowClick}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport
              headerName={rowData?.region_desc}
              regionCode={rowData?.regio}
              divCode={divCode}
              isDrillEnable={false}
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

export default RegionWiseReport;
