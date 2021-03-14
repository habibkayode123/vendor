import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation, withRouter, Link, useHistory } from "react-router-dom";
import auth from "../../auth/auth-helper";

export default function VendorNavbar() {
  let history = useHistory();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar></Nav>
          <Nav className="ml-auto" navbar>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="center nav-item">
                  {auth.isAuthenticatedVendor().user.email}
                </li>
              </ul>

              <li className="nav-item">
                <Link
                  onClick={() => {
                    auth.clearVendorJWT(() => history.push("/vendor/login"));
                  }}
                  className="nav-link"
                >
                  Sign out
                </Link>
              </li>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
