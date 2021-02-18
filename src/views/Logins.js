import React, { useState,useEffect } from "react";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { signin } from "../auth/api-auth.js";
import { budgetUsageByDepartment } from "../budget/api-budget";
import { toast } from 'react-toastify';
import setAuthToken from '../setAuthToken'
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

	const clickSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};
		try {
			signin(user).then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					toast.info(`Welcome ${data.user.email.split('@')[0]}!`);
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
	let to ="/admin/purchase/requests";
	if(auth.isAuthenticated() && auth.isAuthenticated().user.role==="Admin"){
		to="/admin/users";
	}
	if (auth.isAuthenticated() && auth.isAuthenticated().user.department === "Finance") {
		to = "/admin/purchase/requests";
	}
	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={to} />;
	}
	return (
		<>
			<Container>
				<Row>
					<Col md={{span:4, offset:4}}>
						<div className="select-inner d-flex flex-column align-items-center mt-5">
							<img src={require("assets/img/logo.png").default} style={{width:'210px', height:'50px'}} alt="..." />
							<form onSubmit={clickSubmit} className="w-100 mt-5">
								{/* <h3>Sign In</h3> */}
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
		</>
	);
}
// }
