import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Map';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ background: 'rgba(0,0,170,0.24)' }}
    >
      <Modal.Body>
        <Map gps={props.gps} />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
