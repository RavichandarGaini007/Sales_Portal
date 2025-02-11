import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHierarchyPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import HqWiseReport from './HqWiseReport';
import { useRequest } from '../common/RequestContext';

function HierarchyWiseReport({ headerName, divCode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  // const requestData = {
  //   tbl_name: 'FTP_MAT_VAL_11_2024',
  //   empcode: '041406',
  //   div: '23',
  //   month: '11',
  //   year: '2024',
  // };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (isDrillEnable === true) {
      setrowData(data); // Store the clicked row's data
      toggleModal(); // Open the modal
    }
  };
  return (
    <>
      <PopupTableModal
        url={apiUrls.SalesHierarchyDesg}
        request={{
          ...request,
          tbl_name: request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_'),
          div: divCode || null, // Check if divCode exists; if not, use div
        }}
        head={divHierarchyPopupColumns}
        headerName={headerName}
        state={popState.popHierarchyWise}
        // onRowClick={(data) => (
        //   <HqWiseReport headerName={data.bezei} isDrillEnable={false} />
        // )}
        onRowClick={handleRowClick}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <HqWiseReport headerName={rowData.bezei} isDrillEnable={false} />
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

export default HierarchyWiseReport;
