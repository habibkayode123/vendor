import React, { useState, useEffect } from "react";
import { create } from "../user/api-user.js";
import { list } from "../department/api-dept.js";

import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from "react-bootstrap";
export default function Register(props) {
	const [values, setValues] = useState({
		email: "",
		departmentValue: "",
		departmentArray: [],
		error: "",
		success: false,
	});

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		list(signal).then((data) => {
			if (data && data.error) {
				// console.log(data.error);
			} else {
				setValues({ ...values, departmentArray: data });
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: values.email || undefined,
			departmentId: values.departmentValue || undefined,
		};
		create(user).then((data) => {
			if (data.errors) {
				setValues({ ...values, error: data.errors });
			} else {
				setValues({ ...values, error: "", success: true });
			}
		});
	};
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="2"></Col>
					<Col md="6">
						<div className="select-inner">
							<form onSubmit={clickSubmit}>
								<h3>Sign Up</h3>
								<br />{" "}
								{values.error && (
									<div className="alert2 alert-danger" role="alert">
										{values.error}
									</div>
								)}
								{values.success && (
									<div className="alert alert-success" role="alert">
										Successful register
									</div>
								)}
								<div className="form-group">
									<label>Email</label>
									<input
										type="email"
										className="form-control"
										placeholder="email"
										value={values.password}
										onChange={handleChange("email")}
									/>
								</div>
								<br />
								<div className="form-group">
									<label>Department</label>
									<select
										className="form-control"
										defaultValue={values.departmentValue}
										onChange={handleChange("departmentValue")}
									>
										<option>---Select Options ---</option>
										{values.departmentArray &&
											values.departmentArray.map((item, i) => {
												return (
													<>
														<option value={item.id} key={item.id}>
															{item.name}
														</option>
													</>
												);
											})}
									</select>
								</div>
								<br />
								<Button
									className="btn-fill"
									type="submit"
									variant="info"
								>
									SignUp
								</Button>
								{/* <button className="btn btn-primary btn-block">Sign Up</button> */}
							</form>
						</div>
					</Col>
					<Col md="2"></Col>
				</Row>
			</Container>
		</>
	);
}
