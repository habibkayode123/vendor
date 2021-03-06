import React from "react";
import { Form } from "react-bootstrap";

const ErrorMessage = (props) => {
  return props.status ? (
    <Form.Text className="text-danger">{props.message}</Form.Text>
  ) : null;
};

export default ErrorMessage;
