import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { Fi } from 'react-flags-select';

const TripInput = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid gray;
  font-size: 1.05em;
  margin-bottom: 20px;
`;

function TripTextField({ label, ...props }) {
  const [Field, meta] = useField(props);

  return (
    <div>
      {/* <label htmlFor={Field.name}>{label}</label> */}
      <TripInput
        {...Field}
        {...props}
        autoComplete="off"
        placeholder={`${label}`}
      />
      {/* {meta.error && meta.touched && <ErrorInput>{meta.error}</ErrorInput>} */}
      {/* <ErrorMessage component="div" name={Field.name} /> */}
    </div>
  );
}

export default TripTextField;
