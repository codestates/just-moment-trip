import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getName } from 'country-list';
import LogoSrc from '../../Assets/COVID-19_travel_banner-2021.png';
import { getTrip } from '../../modules/Reducers/tripReducer';
import { postTripId } from '../../modules/Reducers/tripid';

const Background = styled.div`
  background-image: url(${LogoSrc});
  font-size: 30px;
  color: white;
`;

function TripList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  const handleRequest = (id, total, title) => {
    dispatch(postTripId(id));
    localStorage.setItem('trip_id', JSON.stringify(id));
    localStorage.setItem('total_price', JSON.stringify(total));
    localStorage.setItem('title', JSON.stringify(title));
    navigate('/account');
  };

  const triptext = useSelector(state => state.trip);

  const newTripList = triptext.flat();

  const tripList = newTripList.map((el, index) => (
    <Background onClick={() => handleRequest(el.id, el.total_price, el.title)}>
      <div>{el.title}</div>
      <div>{el.base_currency}</div>
      <div>{el.total_price.toLocaleString('ko-KR')}</div>
      <div>{getName(el.country)}</div>
      <div>
        {moment(el.start_date).format('YYYY-MM-DD')} ~
        {moment(el.end_date).format('YYYY-MM-DD')}
      </div>
    </Background>
  ));

  // if (tripList.length === 0) {
  //   return <LoadingSpinner />;
  // }
  return <div>{tripList}</div>;
}

export default TripList;
