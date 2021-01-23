import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
			<Route path="/auth" render={(props) => <AuthLayout {...props} />} />
			<Redirect from="/" to="/admin/index" />
		</Switch>
	</BrowserRouter>,

	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
