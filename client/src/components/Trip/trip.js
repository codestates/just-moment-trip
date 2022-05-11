import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTrip } from '../../modules/Reducers/tripReducer';
import Modal from '../common/Modal';
import TripModal from './tripmodal';

function Trip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .then(res => console.log(res));
  }, []);

  return (
    <div>
      <h1>Trip List</h1>

      <Modal>
        <TripModal />
      </Modal>
    </div>
  );
}

export default Trip;
