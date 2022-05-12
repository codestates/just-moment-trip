import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Ubuntu', sans-serif;
`;

const ErrorInput = styled.div`
  position: relative;
  text-align: center;
  color: red;
  font-family: 'Ubuntu', sans-serif;
`;

function TextField({ label, ...props }) {
  const [Field, meta] = useField(props);
  return (
    <div>
      {/* <label htmlFor={Field.name}>{label}</label> */}
      <StyledInput
        {...Field}
        {...props}
        autoComplete="off"
        placeholder={`Enter ${label}`}
      />
      {meta.error && meta.touched && <ErrorInput>{meta.error}</ErrorInput>}
      {/* <ErrorMessage component="div" name={Field.name} /> */}
    </div>
  );
}

export default TextField;
