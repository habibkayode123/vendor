import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

import { resetPassWord } from "./api-profile";

const ResetPassword = (props) => {
  const [status, setStatus] = useState({
    status: undefined,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    trackPromise(
      resetPassWord(e.target.email.value)
        .then((response) => {
          setStatus(response);
          console.log("password reset");
          if (response.status) {
            toast.info("email set");
          } else {
            toast.warning(response.message);
          }
        })
        .catch((e) => {
          console.log(e);
        })
    );
  };

  return (
    <Container>
      <Row>
        <Col md="12">
          <Card className="">
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">Reset Password</Card.Title>
            </Card.Header>
            <Card.Body
              className="align-items-center"
              style={{ minHeight: "75vh" }}
            >
              <Row className="d-flex justify-content-center ">
                <Col md="6">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="" name="email" />
                      <Form.Text
                        className={`${
                          status.status ? "text-success" : "text-danger"
                        }`}
                      >
                        {status.message}
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
