import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divCustPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import CustInvoiceReport from './CustInvoiceReport';
import { useRequest } from '../common/RequestContext';

function CustomerWiseReport({ headerName, HqCode, divCode, onClose }) {
  const [modalOpen, setModalOpen] = useState(true);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (rowData?.kunnr !== data.kunnr) {
      setrowData(data); // Store the clicked row's data
    }
    toggleModal(); // Open the modal
  };

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    if (divCode) params.div = divCode;
    if (HqCode) params.hq = HqCode;

    return params;
  }, [request, divCode, HqCode]);

  return (
    <>
      <PopupTableModal
        url={apiUrls.DivCustReportData}
        request={buildRequestParams()}
        head={divCustPopupColumns}
        headerName={headerName}
        state={popState.popCustWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <CustInvoiceReport
              headerName={rowData.name1}
              custCode={rowData.kunnr}
              onClose={toggleModal}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default CustomerWiseReport;
