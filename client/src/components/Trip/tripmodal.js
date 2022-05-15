import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import ReactFlagsSelect from 'react-flags-select';
import { DateRangeInput } from '@datepicker-react/styled';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { Formik, Form, Field } from 'formik';
import { requestTripPost } from '../../services/trip';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  font-family: SsurroundFont;
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
      backdrop: ` rgba(0,0,110,0.5)`,
      text: '성공 !',
    }).then(res => {
      if (res.isConfirmed) window.location.reload();
    });
  };
  return (
    <Formik
      initialValues={{
        title: '',
        total_price: 0,
        base_currency: 'KRW',
      }}
      onSubmit={tripSubmit}
    >
      {props => (
        <StyledWrapper>
          <h1>Make Trip</h1>

          <Form>
            <Field name="title" value={props.values.title} />
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
              startDate={state.startDate} // Date or null
              endDate={state.endDate} // Date or null
              focusedInput={state.focusedInput} // START_DATE, END_DATE or null
            />
            {/* <DatePicker
              selected={endDate}
              onChange={date => {
                setEndDate(date);
              }}
            /> */}
            <Field name="total_price" value={props.values.total_price} />
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
