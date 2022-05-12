import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field } from 'formik';
import { requestTripPost } from '../../services/trip';

function TripModal() {
  const [selected, setSelected] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const tripSubmit = (values, actions) => {
    const { title, total_price, base_currency } = values;
    requestTripPost(
      title,
      selected,
      total_price,
      base_currency,
      startDate,
      endDate,
    );
    Swal.fire('성공 !').then(res => {
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
        <div>
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
            <DatePicker
              selected={startDate}
              onChange={date => {
                setStartDate(date);
              }}
            />
            <DatePicker
              selected={endDate}
              onChange={date => {
                setEndDate(date);
              }}
            />
            <Field name="total_price" value={props.values.total_price} />
            <button type="submit">START</button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default TripModal;
