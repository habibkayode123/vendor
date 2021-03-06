import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRouteVendor = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticatedVendor() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/vendor/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRouteVendor;
