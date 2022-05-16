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
    const { title, total_price, base_currency } = values;
    requestTripPost(
      title,
      selected,
      total_price,
      base_currency,
      state.startDate,
      state.endDate,
    );
    Swal.fire({
      icon: 'success',
      text: '성공 !',
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
      }}
      onSubmit={tripSubmit}
    >
      {props => (
        <StyledWrapper>
          <TripTitle>여행정보 입력</TripTitle>
          <Form>
            <TripTextField label="여행이름" name="title" type="text" />
            <TripDiv>
              <TripDiv>
                <ReactFlagsSelect
                  className="ReactFlagsSelect"
                  selected={selected}
                  onSelect={data => {
                    setSelected(data);
                  }}
                  fullWidth={false}
                />
                <DateRangeInput
                  onDatesChange={data =>
                    dispatch({ type: 'dateChange', payload: data })
                  }
                  onFocusChange={focusedInput =>
                    dispatch({ type: 'focusChange', payload: focusedInput })
                  }
                  startDate={state.startDate}
                  endDate={state.endDate}
                  focusedInput={state.focusedInput}
                  displayFormat={'yyyy/MM/dd'}
                />
              </TripDiv>
            </TripDiv>
            {/* <DatePicker
              selected={endDate}
              onChange={date => {
                setEndDate(date);
              }}
            /> */}
            <TripTextField label="여행경비" name="total_price" type="text" />
            <div>
              <StartBtn type="submit">START</StartBtn>
            </div>
          </Form>
        </StyledWrapper>
      )}
    </Formik>
  );
}

export default TripModal;
