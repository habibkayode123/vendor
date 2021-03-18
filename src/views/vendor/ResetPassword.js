import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { setResetPassword } from "./api-profile";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

export default function ResetPassword(props) {
  const { token } = useParams("token");
  const [value, setValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState(false);
  const handleChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  };

  const submitPassword = () => {
    if (value.confirmPassword === value.newPassword) {
      let payload = {
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
        resetLink: token,
      };
      trackPromise(
        setResetPassword(payload)
          .then((res) => {
            console.log("passwordChange", res);
            setValue({
              newPassword: "",
              confirmPassword: "",
            });
            toast.success("Password Change successfully");
            props.history.push("/vendor/login");
          })
          .catch((error) => {
            toast.error("Please try again");
            console.log(error, "err in fetch");
          })
      );
    } else {
      setErr(true);
    }
  };

  return (
    <Container fluid>
      <Row
        style={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col md="6">
          <h4>Reset Password</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitPassword();
            }}
          >
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
