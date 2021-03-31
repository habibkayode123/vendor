import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRouteVendor2 = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let detial = auth.isAuthenticatedVendor();
      return detial && detial.user.vendorApprovalStatus === "approved" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/vendor",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default PrivateRouteVendor2;
