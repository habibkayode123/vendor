import React, { useState,useEffect } from "react";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { signin } from "../auth/api-auth.js";
import { budgetUsageByDepartment } from "../budget/api-budget";
import { toast } from 'react-toastify';
// import auth from "../auth/auth-helper";

import {
	Button,
	Container,
	Row,
	Col,
} from "react-bootstrap";
// export default class Login extends Component {
export default function Login(props) {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		redirectToReferrer: false,
		loggedIn: false,
	});
		const [budgetUsage, setBudgetUsage] = useState({});

// useEffect(() => {
// 	console.log("Ajewole", auth.isAuthenticated().user);
// 	const abortController = new AbortController();
// 	const signal = abortController.signal;
// 	let departmentId;
// 	// departmentId =auth.isAuthenticated()?auth.isAuthenticated().user.departmentId:"";
// 	budgetUsageByDepartment(
// 		{
// 			departmentId: auth.isAuthenticated()
// 				? auth.isAuthenticated().user.departmentId
// 				: "cd29f9a5-73e6-4aa8-b8fe-7a0cad9b2142",
// 		},
// 		signal
// 	).then((data) => {
// 		if (data.data.errors) {
// 			setError(data.errors);
// 		} else {
// 			console.log("budgetUsage", data.data);
// 			console.log("budgetUsage DJ Louder", data.data.unUtilizedBudget);
// 			setBudgetUsage(data.data);
// 		}
// 	});
// 	// }

// 	return function cleanup() {
// 		abortController.abort();
// 	};
// }, [auth.isAuthenticated()]);


	const clickSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};
		try {
			signin(user).then((data) => {
				if (data.errors) {
					setValues({ ...values, error: data.errors });
				} else {
					toast.info(`Welcome ${data.user.email}!`);
					auth.authenticate(data, () => {
						setValues({
							...values,
							error: "",
							loggedIn: true,
							redirectToReferrer: true,
						});
					});
				}
			});
		} catch (err) {
			setValues({ ...values, error: err.message });
		}
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	const { from } = props.location.state || {
		from: {
			pathname: "/admin/financebudget",
		},
	};
	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="2"></Col>
					<Col md="6">
						<div className="select-inner">
							<form onSubmit={clickSubmit}>
								<h3>Sign In</h3>
								<br />{" "}
								{values.error && (
									<div className="alert2 alert-danger" role="alert">
										{values.error}
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
					<Col md="2"></Col>
				</Row>
			</Container>
		</>
	);
}
// }
