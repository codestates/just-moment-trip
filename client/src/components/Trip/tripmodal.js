import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import ReactFlagsSelect from 'react-flags-select';
import { DateRangeInput } from '@datepicker-react/styled';
import Swal from 'sweetalert2';
import TripTextField from './textfield';
import { Formik, Form, Field } from 'formik';
import { requestTripPost } from '../../services/trip';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: SsurroundFont;
`;

const StartBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 25px;
  color: #ff6670;
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const TripTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const TripDiv = styled.div`
  margin-bottom: 10px;
`;

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'dateChange':
      return action.payload;
    default:
      throw new Error();
  }
}

function TripModal() {
  const [selected, setSelected] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [focusedInput, setFocusedInput] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const tripSubmit = (values, actions) => {
    const {
      title,
      total_price,
      base_currency,
      target_currency,
      exchange_rate,
    } = values;

    if (title.length < 1) {
      return Swal.fire({
        icon: 'error',
        text: '여행이름을 입력해주세요',
        backdrop: `
      rgba(0,0,110,0.5)
    `,
      });
    }

    if (selected.length < 1) {
      return Swal.fire({
        icon: 'error',
        text: '여행지를 선택해주세요',
        backdrop: `
      rgba(0,0,110,0.5)
    `,
      });
    }

    if (total_price.length < 1) {
      return Swal.fire({
        icon: 'error',
        text: '여행경비를 입력해주세요',
        backdrop: `
      rgba(0,0,110,0.5)
    `,
      });
    }

    if (exchange_rate.length < 1) {
      return Swal.fire({
        icon: 'error',
        text: '환율을 입력해주세요',
        backdrop: `
      rgba(0,0,110,0.5)
    `,
      });
    }

    // if (target_currency.length > 3) {
    //   return Swal.fire({
    //     icon: 'error',
    //     text: '화폐단위는 3자리 입니다',
    //     backdrop: `
    //   rgba(0,0,110,0.5)
    // `,
    //   });
    // }

    requestTripPost(
      title,
      selected,
      total_price,
      base_currency,
      target_currency,
      state.startDate,
      state.endDate,
    );
    Swal.fire({
      icon: 'success',
      text: '작성이 완료되었어요 !',
    }).then(res => {
      if (res.isConfirmed) window.location.reload();
    });
  };

  return (
    <Formik
      initialValues={{
        title: '',
        total_price: '',
        base_currency: 'KRW',
        target_currency: '',
        exchange_rate: '',
      }}
      onSubmit={tripSubmit}
    >
      {props => (
        <StyledWrapper>
          <TripTitle>여행정보 입력</TripTitle>
          <Form>
            <TripTextField label="여행이름" name="title" type="text" />
            <TripDiv>
              <ReactFlagsSelect
                selected={selected}
                onSelect={data => {
                  setSelected(data);
                }}
                searchable={true}
              />
              <DateRangeInput
                onDatesChange={data =>
                  dispatch({ type: 'dateChange', payload: data })
                }
                onFocusChange={focusedInput =>
                  dispatch({ type: 'focusChange', payload: focusedInput })
                }
                //!-------------------------
                startDate={state.startDate}
                endDate={state.endDate}
                //!-------------------------
                focusedInput={state.focusedInput}
                displayFormat={'yyyy/MM/dd'}
              />
            </TripDiv>
            <TripTextField label="여행경비" name="total_price" type="number" />
            <TripTextField label="환율" name="exchange_rate" type="number" />
            <TripTextField label="통화" name="target_currency" type="text" />
            <div>
              <StartBtn type="submit">START</StartBtn>
            </div>
            <div>
              <StartBtn
                type="button"
                onClick={() =>
                  window.open(
                    'https://www.kita.net/cmmrcInfo/ehgtGnrlzInfo/rltmEhgt.do',
                    '_blank',
                  )
                }
              >
                환율확인
              </StartBtn>
            </div>
          </Form>
        </StyledWrapper>
      )}
    </Formik>
  );
}

export default TripModal;
