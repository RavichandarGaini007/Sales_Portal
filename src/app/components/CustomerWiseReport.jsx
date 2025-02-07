import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divCustPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import CustInvoiceReport from './CustInvoiceReport';
import { useRequest } from '../common/RequestContext';

function CustomerWiseReport({ headerName, HqCode }) {
  const [modalOpen, setModalOpen] = useState(true);
  const [customerData, setCustomerData] = useState(null);
  const { request } = useRequest();

  const requestData = {
    tbl_name: 'FTP_11_2024',
    empcode: '041406',
    div: '23',
    month: '11',
    year: '2024',
    plant: '1903',
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    setCustomerData(data); // Store the clicked row's data
    toggleModal(); // Open the modal
  };

  return (
    <>
      Customer Wise report
      <PopupTableModal
        url={apiUrls.DivCustReportData}
        request={requestData}
        head={divCustPopupColumns}
        headerName={headerName}
        state={popState.popCustWise}
        //onRowClick={(data) => <CustInvoiceReport headerName={data.mvgr1} />}
        onRowClick={handleRowClick}
      />
      {customerData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <CustInvoiceReport headerName={customerData.bezei} />
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

export default CustomerWiseReport;
