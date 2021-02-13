import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { read } from "./api-user";
import { roleList } from "../role/api-role";
import { readDepartment } from "../department/api-dept";
import { makeStyles } from "@material-ui/core/styles";
import { setUserRole } from "./api-user";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
export default function EditUser({ match }) {
	// const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		roleId: "",
		department: "",
		departmentId: "",
		roleValueSet: "",
		email: "",
		redirect: false,
		error: "",
		id: "",
	});
	const [roleValue, setRoleValue] = useState([]);
	const jwt = auth.isAuthenticated();
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		read(
			{ t: jwt.token },
			{
				userId: match.params.userId,
			},
			signal
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				console.log("USER PROFILE", data);
				setValues({
					...values,
					id: data.id,
					roleId: data.roleId,
					email: data.email,
					departmentId: data.departmentId,
					department: data.dept.name,
				});
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		roleList(signal).then((data) => {
			console.log("User Role to set", data);
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error });
			} else {
				console.log("role data in else", data);
				setValues({ ...values, error: "" });
				setRoleValue(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		const user = {
			roleId: values.roleValueSet || undefined,
			userId: values.id || undefined,
		};
		console.log("user role of the user to set", user);
		setUserRole(
			{
				t: jwt.token,
			},
			user
		).then((data) => {
			if (data.error) {
				setValues({ ...values, success: false, error: data.error });
			} else {
				setValues({ ...values, error: "", success: true, redirect: true });
			}
		});
	};

	if (values.redirect) {
		return <Redirect to={"/admin/register"} />;
	}
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="1"></Col>
					<Col md="9">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Edit Profile</Card.Title>
							</Card.Header>
							<Card.Body>
								{/* <Form onSubmit={clickSubmit}> */}
								
								<form onSubmit={clickSubmit}>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Email</label>
												<Form.Control
													defaultValue={values.email}
													placeholder="Company"
													type="text"
													readOnly
												></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className="pr-1" md="6">
											<Form.Group>
												<label>Department</label>
												<Form.Control
													defaultValue={values.department}
													placeholder="Company"
													type="text"
													readOnly
												></Form.Control>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col className="pr-1" md="6">
											<div className="form-group">
												<label>Role</label>
												<select
													className="form-control"
													defaultValue={values.roleValueSet}
													onChange={handleChange("roleValueSet")}
												>
													<option>---Select Options ---</option>
													{roleValue &&
														roleValue.map((item, i) => {
															return (
																<>
																	<option value={item.id} key={i}>
																		{item.rolename}
																	</option>
																</>
															);
														})}
												</select>
											</div>
										</Col>
									</Row>
									<Button
										className="btn-fill"
										type="submit"
										variant="info"
									>
										Update Profile
									</Button>
									<div className="clearfix"></div>
									</form>
								{/* </Form> */}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

// export default User;
