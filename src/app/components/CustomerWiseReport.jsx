import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divCustPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import CustInvoiceReport from './CustInvoiceReport';
import { useRequest } from '../common/RequestContext';

function CustomerWiseReport({ headerName, HqCode, divCode }) {
  const [modalOpen, setModalOpen] = useState(true);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  //   const requestData = {
  //     tbl_name: 'FTP_11_2024',
  //     empcode: '041406',
  //     div: '23',
  //     month: '11',
  //     year: '2024',
  //     plant: '1903',
  //   };

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
        //onRowClick={(data) => <CustInvoiceReport headerName={data.mvgr1} />}
        onRowClick={handleRowClick}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <CustInvoiceReport
              headerName={rowData.name1}
              custCode={rowData.kunnr}
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

export default CustomerWiseReport;
