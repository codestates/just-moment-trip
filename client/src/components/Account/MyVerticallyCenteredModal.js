import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Map';
import MultipleMap from './MultipleMap';

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
        {typeof props.gps === 'object' ? (
          <MultipleMap gps={props.gps} item_name={props.item_name} />
        ) : (
          <Map gps={props.gps} item_name={props.item_name} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
