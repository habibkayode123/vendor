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
        <Col md={{ span: 4, offset: 4 }}>
          <div className="select-inner d-flex flex-column align-items-center mt-5">
            <img
              src={require("assets/img/logo.png").default}
              style={{ width: "210px", height: "50px" }}
              alt="Car45"
            />

            <h5 className="mt-5">Reset your Password</h5>
            <Form onSubmit={handleSubmit} className="w-100 mt-5">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="input your password"
                  name="email"
                />
                <Form.Text
                  className={`${
                    status.status ? "text-success" : "text-danger"
                  }`}
                >
                  {status.message}
                </Form.Text>
              </Form.Group>
              <div style={{ display: "flex" }}>
                <Button className="mt-3 btn-lg" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* <Row>
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
      </Row> */}
    </Container>
  );
};

export default ResetPassword;
