import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divBrandPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import ProductWiseReport from './ProductWiseReport';
import { Modal } from 'react-bootstrap';
//import { Button } from 'reactstrap';
import { useRequest } from '../common/RequestContext';

function BrandWiseReport({
  headerName,
  isDrillEnable,
  brandCode,
  hqCode,
  plantCode,
  divCode,
  onClose,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data) => {
    if (isDrillEnable === true && rowData?.brand_code !== data.brand_code) {
      setrowData(data); // Store the clicked row's data
    }
    if (isDrillEnable === true) toggleModal(); // Open the modal
  };

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    params.tbl_name = request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_');
    if (plantCode) params.plant = plantCode;
    if (divCode) params.div = divCode;
    if (hqCode) params.hq = hqCode;
    if (brandCode) params.brand = brandCode;

    return params;
  }, [request, plantCode, divCode, hqCode, brandCode]);

  return (
    <>
      <PopupTableModal
        url={apiUrls.DivBrandReportData}
        request={buildRequestParams()}
        head={divBrandPopupColumns}
        headerName={headerName}
        state={popState.popBrandWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            <ProductWiseReport
              headerName={rowData.brand_name}
              brandCode={rowData.brand_code}
              divCode={rowData.division1}
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

export default BrandWiseReport;
