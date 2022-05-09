import React from 'react';
import { useField } from 'formik';

function TextField({ label, ...props }) {
  const [Field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={Field.name}>{label}</label>
      <input
        {...Field}
        {...props}
        autoComplete="off"
        placeholder={`Enter ${label}`}
      />
      {meta.error && meta.touched && <div>{meta.error}</div>}
      {/* <ErrorMessage component="div" name={Field.name} /> */}
    </div>
  );
}

export default TextField;
