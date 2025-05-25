import React, { useState, useEffect } from 'react';
import '../css/CompanyAnnoucement.css';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
const CompanyAnnoucement = ({ show, url }) => {
  const [show1, setShow] = useState(show);
  const handleClose = () => setShow(false);
  return (
    <Modal
      show={show1}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          padding: '2px 2px 2px 2px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <span
            className="mdi mdi-close"
            style={{
              cursor: 'pointer',
              fontSize: 'x-large',
              marginRight: '12px',
            }}
            onClick={handleClose}
          />
        </div>
      </Modal.Header>

      <Modal.Body className="text-center">
        <img
          src={`${process.env.PUBLIC_URL}/commimage/${url}`}
          alt="Preview"
          className="img-fluid rounded"
        />
      </Modal.Body>
    </Modal>
  );
};

export default CompanyAnnoucement;
