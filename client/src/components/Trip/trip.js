import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { requestTripList } from '../../services/trip';

function Trip() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    requestTripList();
  }, []);

  return (
    <div>
      <h1>Trip List</h1>
    </div>
  );
}

export default Trip;
