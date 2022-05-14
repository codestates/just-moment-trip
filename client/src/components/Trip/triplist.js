import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getName } from 'country-list';
import Swal from 'sweetalert2';
import LogoSrc from '../../Assets/COVID-19_travel_banner-2021.png';
import { getTrip } from '../../modules/Reducers/tripReducer';
import { postTripId } from '../../modules/Reducers/tripid';
import { requestTripDelete } from '../../services/trip';

const Background = styled.div`
  background-image: url(${LogoSrc});
  text-align: center;
  font-size: 30px;
  color: white;
`;

const DeleteBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 18px;
  color: rgb(210, 206, 221);
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
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

  const deleteRequest = id => {
    Swal.fire({
      title: '정말 삭제 하시겠습니까?',
      backdrop: ` rgba(0,0,110,0.5)`,
      text: '기록을 삭제하면 복구할 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          backdrop: ` rgba(0,0,110,0.5)`,
          text: '완료! 기록이 삭제 되었습니다! 성공',
        }).then(result => {
          if (result.isConfirmed) {
            requestTripDelete(id);
          }
        });
      }
    });
  };

  const triptext = useSelector(state => state.trip);

  const newTripList = triptext.flat();

  const tripList = newTripList.map(el => (
    <div>
      <Background
        onClick={() => handleRequest(el.id, el.total_price, el.title)}
      >
        <div>{el.title}</div>
        <div>{el.base_currency}</div>
        <div>{el.total_price.toLocaleString('ko-KR')}</div>
        <div>{getName(el.country)}</div>
        <div>
          {moment(el.start_date).format('YYYY-MM-DD')} ~
          {moment(el.end_date).format('YYYY-MM-DD')}
        </div>
      </Background>
      <DeleteBtn type="button" onClick={() => deleteRequest(el.id)}>
        삭제
      </DeleteBtn>
    </div>
  ));

  if (tripList.length === 0) {
    return <div>아직 기록이 없어요</div>;
  }
  return <div>{tripList}</div>;
}

export default TripList;
