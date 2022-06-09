import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getName } from 'country-list';
import Swal from 'sweetalert2';
import { getTrip } from '../../modules/Reducers/tripReducer';
import { postTripId } from '../../modules/Reducers/tripid';
import { requestTripDelete } from '../../services/trip';
import noData from '../../Assets/No_data.png';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

const TripBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`;

const Background = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${props => props.images});
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: cover;
  text-align: center;
  font-size: 1.6rem;
  color: white;
  width: 93%;
  margin: 10px;
  padding: 15px 0;
  border-radius: 5px;
  :hover {
    transition: all 0.2s linear;
    box-shadow: 0px 5px 10px 5px rgba(130, 141, 171, 0.7);
  }
`;

const Btn = styled.button`
  font-family: ManfuMedium;
  font-size: 1rem;
  color: rgb(210, 206, 221);
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.1);
    border-bottom: 2px solid pink;
    color: rgb(71, 56, 136);
  }
`;

const TripListBox = styled.div`
  display: grid;
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

const Dates = styled.div`
  font-size: 1.3rem;
`;

const Currency = styled.div`
  font-size: 1.3rem;
`;

function TripList(props) {
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
    sessionStorage.setItem('start_date', JSON.stringify(start_date));
    sessionStorage.setItem('end_date', JSON.stringify(end_date));
    navigate('/account');
  };

  const [isEdit, setIsEdit] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');

  const toggleIsEdit = () => setIsEdit(!isEdit);

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .catch(err => console.log(err));
  }, []);

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

  const tripList = newTripList.map(el => {
    const random = Math.floor(Math.random() * props.images.length) + 1;
    return (
      <TripBox key={el.id}>
        <Background
          onClick={() => {
            handleRequest(
              el.id,
              el.total_price,
              el.title,
              el.exchange_rate,
              el.target_currency,
              el.start_date,
              el.end_date,
            );
          }}
          images={props.images[random]}
          type="button"
        >
          <Title>{el.title}</Title>

          <div>{el.target_currency}</div>
          <div>{el.total_price.toLocaleString('ko-KR')}</div>

          <Currency>{`${el.exchange_rate}${el.base_currency} → 1${el.target_currency}`}</Currency>
          <div>{getName(el.country)}</div>
          <Dates>
            {moment(el.start_date).format('YYYY-MM-DD')}~
            {moment(el.end_date).format('YYYY-MM-DD')}
          </Dates>
        </Background>

        <div style={{ paddingTop: '190px' }}>
          <Btn type="button" onClick={() => deleteRequest(el.id)}>
            삭제
          </Btn>
          <Btn
            type="button"
            onClick={() => {
              toggleIsEdit();
              console.log('날짜수정해야하무!');
            }}
          >
            수정
          </Btn>
        </div>
      </TripBox>
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
