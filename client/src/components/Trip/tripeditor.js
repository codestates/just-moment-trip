import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { getName } from 'country-list';
import Swal from 'sweetalert2';
import { requestTripPatch } from '../../services/trip';
import jammanbo from '../../Assets/jammanbo.gif';
import meu from '../../Assets/meu.gif';

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

function TripEditor({
  images,
  index,
  id,
  total_price,
  title,
  country,
  base_currency,
  exchange_rate,
  target_currency,
  start_date,
  end_date,
  handleRequest,
  deleteRequest,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(total_price);
  const totalPriceInput = useRef();

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleEdit = () => {
    if (totalPrice.length < 1) {
      totalPriceInput.current.focus();
      return;
    }

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
      url(${jammanbo})
      right
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${meu})
          right bottom
          no-repeat
        `,
        }).then(() => {
          requestTripPatch(id, totalPrice);
          toggleIsEdit();
          sessionStorage.removeItem('trip_id');
          sessionStorage.removeItem('total_price');
          sessionStorage.removeItem('title');
          sessionStorage.removeItem('exchange_rate');
          sessionStorage.removeItem('target_currency');
          sessionStorage.removeItem('start_date');
          sessionStorage.removeItem('end_date');
          window.location.reload();
        });
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          text: `수정을 취소했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${meu})
          left top
          no-repeat
        `,
        });
        toggleIsEdit();
      }
    });
  };
  return (
    <TripBox>
      <Background
        images={images[index]}
        type="button"
        onClick={
          isEdit
            ? () => {}
            : () =>
                handleRequest(
                  id,
                  total_price,
                  title,
                  exchange_rate,
                  target_currency,
                  start_date,
                  end_date,
                )
        }
      >
        <Title>{title}</Title>
        <div>{target_currency}</div>
        {isEdit ? (
          <div>
            <input
              value={totalPrice}
              ref={totalPriceInput}
              onChange={e => {
                setTotalPrice(e.target.value);
              }}
            ></input>
          </div>
        ) : (
          <div>{total_price.toLocaleString('ko-KR')}</div>
        )}
        <Currency>{`${exchange_rate}${base_currency} → 1${target_currency}`}</Currency>
        <div>{getName(country)}</div>
        <Dates>
          {moment(start_date).format('YYYY-MM-DD')}~
          {moment(end_date).format('YYYY-MM-DD')}
        </Dates>
      </Background>
      {isEdit ? (
        <>
          {' '}
          <div style={{ paddingTop: '190px', width: '80px' }}>
            <Btn type="button" onClick={toggleIsEdit}>
              수정취소
            </Btn>
            <Btn type="button" onClick={handleEdit}>
              수정완료
            </Btn>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div style={{ paddingTop: '190px' }}>
            <Btn type="button" onClick={() => deleteRequest(id)}>
              삭제
            </Btn>
            <Btn
              type="button"
              onClick={() => {
                toggleIsEdit();
              }}
            >
              수정
            </Btn>
          </div>
        </>
      )}
    </TripBox>
  );
}

export default React.memo(TripEditor);
