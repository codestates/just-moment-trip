import React, { useEffect } from 'react';
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

const Background = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${props => props.images});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  font-size: 30px;
  color: white;
  width: 400px;
  margin: 10px;
  border-radius: 20px;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
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

const StartBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 18px;
  color: #ff6670;
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const TripListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
`;

const Dates = styled.div`
  font-size: 15px;
`;

const Currency = styled.div`
  font-size: 15px;
`;

function TripList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTrip())
      .unwrap()
      .catch(err => console.log(err));
  }, []);

  const handleRequest = (id, total, title, exchange_rate, target_currency) => {
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

  const tripList = newTripList.map((el, idx) => {
    const random = Math.floor(Math.random() * props.images.length) + 1;
    return (
      <Background key={idx} images={props.images[random]}>
        <Title>{el.title}</Title>
        <div>{el.target_currency}</div>
        <div>{el.total_price.toLocaleString('ko-KR')}</div>
        <Currency>{`${el.exchange_rate}${el.base_currency} → 1${el.target_currency}`}</Currency>
        <div>{getName(el.country)}</div>
        <Dates>
          {moment(el.start_date).format('YYYY-MM-DD')}~
          {moment(el.end_date).format('YYYY-MM-DD')}
        </Dates>
        <DeleteBtn type="button" onClick={() => deleteRequest(el.id)}>
          삭제
        </DeleteBtn>
        <StartBtn
          type="button"
          onClick={() =>
            handleRequest(
              el.id,
              el.total_price,
              el.title,
              el.exchange_rate,
              el.target_currency,
            )
          }
        >
          확인하기
        </StartBtn>
      </Background>
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
