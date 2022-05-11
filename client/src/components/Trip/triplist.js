import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import LogoSrc from '../../Assets/COVID-19_travel_banner-2021.png';
import { getTrip } from '../../modules/Reducers/tripReducer';

const Background = styled.div`
  background-image: url(${LogoSrc});
  font-size: 30px;
  color: white;
`;

const { getName } = require('country-list');

function TripList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  const triptext = useSelector(state => state.trip);
  console.log(triptext[0].title);

  return (
    <Background>
      <div>{triptext[0].title}</div>
      <div>{triptext[0].total_price}</div>
    </Background>
  );
}

export default TripList;
