import React, { useState } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHqPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import CustomerWiseReport from './CustomerWiseReport';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function HqWiseReport({
  headerName,
  isDrillEnable,
  plantCode,
  hqCode,
  divCode,
  regionCode,
  misCode,
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

    return params;
  }, [request, plantCode, divCode, hqCode, regionCode, misCode]);

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
      <PopupTableModal
        url={apiUrls.DivHqReportData}
        request={buildRequestParams()}
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

export default HqWiseReport;
