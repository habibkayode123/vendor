import auth from "auth/auth-helper";
import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "../../axios";
import { useHistory, Redirect } from "react-router-dom";

function VendorLogin() {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loggedIn: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("/vportal/login", user)
      .then((res) => {
        let data = {
          token: res.data.token,
          user: res.data.user,
        };
        console.log(data);
        auth.authenticateVendor(data);
        //history.push("/vendor");
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  if (loggedIn) return <Redirect to="/vendor" />;

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <div className="select-inner d-flex flex-column align-items-center mt-5">
            <img
              src={require("assets/img/logo.png").default}
              style={{ width: "210px", height: "50px" }}
              alt="..."
            />
            <form onSubmit={clickSubmit} className="w-100 mt-5">
              <br />{" "}
              {values.error && (
                <div className="alert2 text-danger mb-2" role="alert">
                  Invalid Email/Password
                </div>
              )}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  // onChange={(e) => (this.email = e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  // onChange={(e) => (this.password = e.target.value)}
                />
              </div>
              <br />
              {/* <button className="btn btn-primary btn-block">Login</button> */}
              <Button className="btn-fill" type="submit" variant="info">
                Login
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VendorLogin;
