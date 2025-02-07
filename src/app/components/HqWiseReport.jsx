import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHqPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import CustomerWiseReport from './CustomerWiseReport';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function HqWiseReport({ headerName, isDrillEnable }) {
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
    if (isDrillEnable === true) {
      setrowData(data); // Store the clicked row's data
      toggleModal(); // Open the modal
    }
  };

  return (
    <>
      Hq Wise report Comp
      <PopupTableModal
        url={apiUrls.DivHqReportData}
        request={request}
        head={divHqPopupColumns}
        headerName={headerName}
        state={popState.popHqWise}
        // onRowClick={(data) => <CustomerWiseReport headerName={data.bezei} />}
        onRowClick={handleRowClick}
        modalState={true}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <CustomerWiseReport
              headerName={rowData.bezei}
              HqCode={rowData?.vkbur}
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

export default HqWiseReport;
