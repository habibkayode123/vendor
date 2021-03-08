import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

export default function VendorSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div
          className="logo d-flex align-items-center justify-content-start"
          style={{ background: "#f8f9fa" }}
        >
          <a className="simple-text" href="#">
            <img
              src={require("assets/img/logo-4.png").default}
              style={{ width: "210px", height: "50px" }}
              alt="..."
            />
          </a>
        </div>
        <Nav>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                to="/vendor/vendorQuotation"
                className="nav-link"
                activeClassName="active"
                exact
              >
                <i className={""} />
                <p>Quotations</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/vendor/uploadVendorQuotation"
                className="nav-link"
                activeClassName="active"
                exact
              >
                <i className={""} />
                <p>Upload Quotations</p>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/vendor/profile"
                className="nav-link"
                activeClassName="active"
                exact
              >
                <i className={""} />
                <p>Profile</p>
              </NavLink>
            </li> */}
          </ul>
        </Nav>
      </div>
    </div>
  );
}
