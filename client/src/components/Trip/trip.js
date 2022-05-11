import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTrip } from '../../modules/Reducers/tripReducer';
import Modal from '../common/Modal';
import TripModal from './tripmodal';
import TripList from './triplist';

function Trip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(async () => {
  //   const result = await dispatch(getTrip());
  //   console.log(result);
  // }, []);

  return (
    <div>
      <h1>Trip List</h1>
      <TripList></TripList>
      <Modal name={<div>START</div>}>
        <TripModal />
      </Modal>
    </div>
  );
}

export default Trip;
