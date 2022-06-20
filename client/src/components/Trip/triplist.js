import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getTrip } from '../../modules/Reducers/tripReducer';
import { postTripId } from '../../modules/Reducers/tripid';
import { requestTripDelete } from '../../services/trip';
import noData from '../../Assets/No_data.png';
import TripEditor from './tripeditor';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;
const TripListBox = styled.div`
  display: grid;
  text-align: center;
`;

function TripList({ images }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .catch(err => console.log(err));
  }, []);

  const handleRequest = (
    id,
    total,
    title,
    exchange_rate,
    target_currency,
    start_date,
    end_date,
  ) => {
    dispatch(postTripId(id));
    sessionStorage.setItem('trip_id', JSON.stringify(id));
    sessionStorage.setItem('total_price', JSON.stringify(total));
    sessionStorage.setItem('title', JSON.stringify(title));
    sessionStorage.setItem('exchange_rate', JSON.stringify(exchange_rate));
    sessionStorage.setItem('target_currency', JSON.stringify(target_currency));
    navigate('/account');
  };

  const deleteRequest = id => {
    Swal.fire({
      title: '정말 삭제 하시겠습니까?',
      text: '기록을 삭제하면 복구할 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      backdrop: `
      rgba(0,0,110,0.5)
    `,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: `선택하신 기록을 삭제했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
        `,
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
  const tripList = newTripList.map(el => {
    const random = Math.floor(Math.random() * images.length) + 1;

    return (
      <TripEditor
        key={el.id}
        {...el}
        index={random}
        images={images}
        handleRequest={handleRequest}
        deleteRequest={deleteRequest}
      />
    );
  });

  if (tripList.length === 0) {
    return (
      <StyledWrapper>
        <img src={noData} alt="NO DATA" />
        <div>아직 여행기록이 없어요 !</div>
      </StyledWrapper>
    );
  }
  return <TripListBox>{tripList}</TripListBox>;
}

export default TripList;
