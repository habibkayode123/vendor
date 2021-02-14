import React,{useState,useEffect} from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export default function ViewUser({ match }) {
	const [values, setValues] = useState({
		name: "",
		roleId: "",
		departmentId: "",
		email: "",
		redirect: false,
		error: "",
		id: "",
        rolename:"",
        department:""
	});
	const jwt = auth.isAuthenticated();
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
				console.log("USER DETAILS", data);
				setValues({
					...values,
					id: data.id,
					roleId: data.roleId,
					email: data.email,
					departmentId: data.departmentId,
                    rolename:data.role.rolename,
                    department:data.dept.name
				});
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="2"></Col>
					<Col md="8">
						<Card className="card-user">
							<div className="card-image">
								<img
									alt="..."
									src={
										require("assets/img/photo-1431578500526-4d9613015464.jpeg")
											.default
									}
								></img>
							</div>
							<Card.Body>
								<div className="author">
									<a href="#pablo" onClick={(e) => e.preventDefault()}>
										<img
											alt="..."
											className="avatar border-gray"
											// src={require("assets/img/faces/face-3.jpg").default}
										></img>
										<h5 className="title">Mike Andrew</h5>
									</a>

									{/* <p className="description">michael24</p> */}
								</div>
								<br />
								<br />
								<Row>
									<Col className="pr-1 " md="5">
										<Form.Group>
											<p>Email</p>
											<Form.Control
												defaultValue={values.email}
												placeholder="Company"
												type="text"
												readOnly
											></Form.Control>
										</Form.Group>
									</Col>

									<Col className="pr-1" md="4">
										<Form.Group>
											<p>Department</p>
											<Form.Control
												defaultValue={values.department}
												placeholder="Company"
												type="text"
												readOnly
											></Form.Control>
										</Form.Group>
									</Col>

									<Col className="pr-1" md="4">
										<Form.Group>
											<p>Role</p>
											<Form.Control
												defaultValue={values.rolename}
												placeholder="Role"
												type="text"
												readOnly
											></Form.Control>
										</Form.Group>
									</Col>
								</Row>
							</Card.Body>
							<hr></hr>
							<div className="button-container mr-auto ml-auto">
								<Button
									className="btn-simple btn-icon"
									href="#pablo"
									onClick={(e) => e.preventDefault()}
									variant="link"
								>
									<i className="fab fa-facebook-square"></i>
								</Button>
								<Button
									className="btn-simple btn-icon"
									href="#pablo"
									onClick={(e) => e.preventDefault()}
									variant="link"
								>
									<i className="fab fa-twitter"></i>
								</Button>
								<Button
									className="btn-simple btn-icon"
									href="#pablo"
									onClick={(e) => e.preventDefault()}
									variant="link"
								>
									<i className="fab fa-google-plus-square"></i>
								</Button>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}