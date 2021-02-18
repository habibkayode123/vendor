/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AdminLayout from "layouts/Admin.js";
import axios from './axios';
import { getBudgetByDepartment } from "budget/api-budget";
import auth from "./auth/auth-helper";
import Login from "views/Logins";

const getBudget = () => {
	if (auth.isAuthenticated()) {
		const abortController = new AbortController();
		const signal = abortController.signal;
		getBudgetByDepartment(
			{
				departmentId: auth.isAuthenticated().user.departmentId
			},
			signal
		).then((data) => {console.log(data);

			return data.data[0]
			
		});
	} else {
		return {amount: 100}
	}
}

const budgetReducer = function (state = {amount: 0}, action) {
	switch (action.type) {
		case "UPDATE":
			return action.payload
		default:
			return state
	}
}

let store = createStore(budgetReducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/admin/login" exact component={Login} />
				<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
				<Redirect exact="true" from="/" to="/admin/login" />
				<Redirect exact from="/admin" to="/admin/login" />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
