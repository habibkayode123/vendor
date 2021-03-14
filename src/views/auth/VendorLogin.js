import auth from "auth/auth-helper";
import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "../../axios";
import { signin } from "./api-vendorAuth.js";
import { toast } from "react-toastify";
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

    // axios
    //   .post("/vportal/login", user)
    //   .then((res) => {
    //     console.log("inside vendorlogin")
    //     // console.log("Errors",res)
    //     // if (!res.data.status) {
    // 		// 	setValues({ ...values, error: res.data.error });
    // 		// } else{
    //     auth.authenticateVendor(res.data);
    //     console.log("i am here", res.data);
    //     //history.push("/vendor");

    //     // }
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

    try {
      signin(user).then((data) => {
        console.log("Data...", data);
        if (data.status) {
          toast.info(`Welcome ${data.user.email.split("@")[0]}!`);
          auth.authenticateVendor(data);
          setLoggedIn(true);
        } else {
          setValues({ ...values, error: data.message });
        }
      });
    } catch (err) {
      setValues({ ...values, error: err.message });
    }
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
