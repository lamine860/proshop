import React from "react";
import { Form } from "react-bootstrap";


const InputField = ({label, value, placeholder, onChange, type, name }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Group>
  );
};

InputField.defaultProps = {
    type: 'text'
}

export default InputField;
