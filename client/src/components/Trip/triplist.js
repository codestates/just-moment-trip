import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getTrip } from '../../modules/Reducers/tripReducer';
import { postTripId } from '../../modules/Reducers/tripid';
import { requestTripDelete, requestTripPatch } from '../../services/trip';
import noData from '../../Assets/No_data.png';
import TripEditor from './tripeditor';
import amongus from '../../Assets/amongus.gif';
import parrot13 from '../../Assets/parrot13.gif';

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

function TripList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

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
    sessionStorage.setItem('start_date', JSON.stringify(start_date));
    sessionStorage.setItem('end_date', JSON.stringify(end_date));
    navigate('/account');
  };

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .catch(err => console.log(err));
  }, []);

  const patchRequest = total_price => {
    Swal.fire({
      title: `기록을 수정할까요?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url(${amongus})
      left top
      no-repeat
    `,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${parrot13})
          bottom
          no-repeat
        `,
        }).then(result => {
          if (result.isConfirmed) {
            requestTripPatch(total_price);
          }
        });
      }
    });
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
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire('삭제완료!', '기록이 삭제 되었습니다.', 'success').then(
          result => {
            if (result.isConfirmed) {
              requestTripDelete(id);
            }
          },
        );
      }
    });
  };

  const triptext = useSelector(state => state.trip);
  const newTripList = triptext.flat();

  let some = newTripList.map(el => (el.id ? el.id : null));

  console.log(some.length);

  useEffect(() => {
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'WsSyzWat1M0u7oNlzCR5GS4xDlDsyh7YGG7gFeb7yGY',
          count: 20,
        },
      })
      .then(res => {
        console.log('리렌더링멈춰!');
        setImages([...images, ...res.data.map(el => el.urls.small)]);
      })
      .catch(err => {
        console.log(err);
        console.log('리렌더링멈춰');
      });
  }, [some.length]);

  const tripList = newTripList.map(el => {
    return (
      <TripEditor
        key={el.id}
        {...el}
        images={images}
        handleRequest={handleRequest}
        deleteRequest={deleteRequest}
        patchRequest={patchRequest}
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
