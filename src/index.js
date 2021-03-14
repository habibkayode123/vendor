import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
// @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@700&display=swap');
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./assets/css/style.css"
import { createStore } from "redux";
import { Provider } from "react-redux";
import AdminLayout from "layouts/Admin.js";
import axios from "./axios";
import { getBudgetByDepartment } from "budget/api-budget";
import auth from "./auth/auth-helper";
import Login from "views/Logins";
import "./index.css";
import VendorLogin from "views/auth/VendorLogin";
import FetchVendorQuotation from "views/VendorQuotation/fetchVendorsQuotation";
import VendorLayout from "layouts/VendorLayout";
import PrivateRouteVendor from "./auth/PrivateRouteVendor";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
// import setAuthToken from 'setAuthToken';

// if (sessionStorage.getItem("jwt"))
//   JSON.parse(setAuthToken(sessionStorage.getItem("jwt"))).token

const getBudget = () => {
  if (auth.isAuthenticated()) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getBudgetByDepartment(
      {
        departmentId: auth.isAuthenticated().user.departmentId,
      },
      signal
    ).then((data) => {
      console.log(data);

      return data.data[0];
    });
  } else {
    return { amount: 100 };
  }
};

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          position: "absolute",
          height: "100vh",
          top: 0,
          background: "rgba(0,0,0, .5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1301,
        }}
      >
        <Loader type="Circles" color="#23b9ad" height="100" width="100" />
      </div>
    )
  );
};

const budgetReducer = function (state = { amount: 0 }, action) {
  switch (action.type) {
    case "UPDATE":
      return action.payload;
    default:
      return state;
  }
};

let store = createStore(budgetReducer);

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/vendor/login" exact component={VendorLogin} />
          {/* <PrivateRouteVendor path="/vendor/vendorQuotation" component={FetchVendorQuotation} /> */}

          <PrivateRouteVendor path="/vendor" component={VendorLayout} />
          <Route path="/admin/login" exact component={Login} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect exact="true" from="/" to="/admin/login" />
          <Redirect exact from="/admin" to="/admin/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
    <LoadingIndicator />
  </>,
  document.getElementById("root")
);
