import React from 'react';
import Modal from '../common/Modal';
import TripModal from './tripmodal';
import TripList from './triplist';

function Trip() {
  return (
    <div>
      <h1>Trip List</h1>
      <TripList />
      <Modal name={<div>START</div>}>
        <TripModal />
      </Modal>
    </div>
  );
}

export default Trip;
