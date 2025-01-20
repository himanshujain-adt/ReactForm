import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ValidationInput = ({ label, name, placeholder, type = 'text', ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <Field
        type={type}
        id={name}
        name={name}
        className="form-control form-input rounded-3"
        placeholder={placeholder}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-danger"
      />
    </div>
  );
};

export default ValidationInput;
