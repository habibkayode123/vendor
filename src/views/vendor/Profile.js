import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { changePassWord } from "./api-profile";
import { toast } from "react-toastify";

export default function Profile() {
  const [value, setValue] = useState({
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const [err, setErr] = useState(false);
  const handleChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  };

  const submitPassword = () => {
    if (value.confirmPassword === value.newPassword) {
      let payload = {
        newpassword: value.newPassword,
        oldpassword: value.oldPassword,
        confirmpassword: value.confirmPassword,
      };
      changePassWord(payload)
        .then((res) => {
          console.log("passwordChange", res);
          setValue({
            newPassword: "",
            confirmPassword: "",
            oldPassword: "",
          });
          toast.success("Password Change successfully");
        })
        .catch((error) => {
          toast.error("Please try again");
          console.log(error, "err in fetch");
        });
    } else {
      setErr(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="6">
          <h4>Change Password</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitPassword();
            }}
          >
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                value={value.oldPassword}
                onChange={handleChange}
                type="password"
                placeholder=""
                name="oldPassword"
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={value.newPassword}
                onChange={handleChange}
                placeholder=""
                name="newPassword"
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>New Password Again</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="password"
                placeholder=""
                name="confirmPassword"
                value={value.confirmPassword}
              />
              {err && (
                <Form.Text className="text-danger">Mismatch Password</Form.Text>
              )}
            </Form.Group>
            <Button type="submit">Change Password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
