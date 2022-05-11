import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoSrc from '../../Assets/COVID-19_travel_banner-2021.png';
import { getTrip } from '../../modules/Reducers/tripReducer';
import LoadingSpinner from '../Spinner/index';
import { postTripId } from '../../modules/Reducers/tripid';

const Background = styled.div`
  background-image: url(${LogoSrc});
  font-size: 30px;
  color: white;
`;

const { getName } = require('country-list');

function TripList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  const handleRequest = id => {
    dispatch(postTripId(id));
    navigate('/account');
  };

  const triptext = useSelector(state => state.trip);

  const newTripList = triptext.flat();

  const tripList = newTripList.map((el, index) => (
    <Background onClick={() => handleRequest(el.id)}>
      <div>{el.id}</div>
      <div>{el.title}</div>
      <div>{el.total_price}</div>
      <div>{el.base_currency}</div>
      <div>{el.country}</div>
      <div>
        {el.start_date} ~ {el.end_date}
      </div>
    </Background>
  ));

  // if (tripList.length === 0) {
  //   return <LoadingSpinner />;
  // }
  return <div>{tripList}</div>;
}

export default TripList;
