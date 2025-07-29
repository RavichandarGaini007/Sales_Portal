import React, { useState, useCallback } from 'react';
import PopupTableModal from '../common/PopupTableModal';
import { divHierarchyPopupColumns } from '../lib/tableHead';
import { apiUrls, popState } from '../lib/fetchApi';
import { Modal } from 'react-bootstrap';
import HqWiseReport from './HqWiseReport';
import BrandWiseReport from './BrandWiseReport';
import { useRequest } from '../common/RequestContext';

function HierarchyWiseReport({ headerName, divCode, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowData, setrowData] = useState(null);
  const { request } = useRequest();
  const [modalType, setModalType] = useState('hq');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (data, vwType) => {
    if (rowData?.fsCode !== data.fsCode) {
      setrowData(data); // Store the clicked row's data
    }
    setModalType(vwType);
    toggleModal(); // Open the modal
  };

  const buildRequestParams = useCallback(() => {
    const params = { ...request };

    params.tbl_name = request.tbl_name.replace('FTP_', 'FTP_MAT_VAL_');
    if (divCode) params.div = divCode;
    params.ename = headerName;

    return params;
  }, [request, divCode]);

  return (
    <>
      <PopupTableModal
        url={apiUrls.SalesHierarchyDesg}
        request={buildRequestParams()}
        head={divHierarchyPopupColumns}
        headerName={headerName}
        state={popState.popHierarchyWise}
        onRowClick={handleRowClick}
        onCloseClick={onClose}
      />
      {rowData && (
        <Modal show={modalOpen} onHide={toggleModal} fullscreen>
          <Modal.Body>
            {modalType === 'hq' ? (
              <HqWiseReport
                divCode={divCode}
                misCode={rowData.fsCode}
                headerName={rowData.name}
                isDrillEnable={false}
                onClose={toggleModal}
              />
            ) : (
              <BrandWiseReport
                divCode={divCode}
                misCode={rowData.fsCode}
                headerName={rowData.name}
                isDrillEnable={false}
                onClose={toggleModal}
              />
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default HierarchyWiseReport;
