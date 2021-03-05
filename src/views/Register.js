import React, { useState, useEffect, useMemo } from "react";

import { roleList } from "../role/api-role";
import auth from "../auth/auth-helper";
import { create, userList } from "../user/api-user.js";
import { list } from "../department/api-dept.js";
import {
	Button,
	Container,
	Row,
	Col,
	Card,
	Table,
	Modal,
	Form,
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination/Pagination";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: "auto",
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: "middle",
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
}));
export default function Register(props) {
	const [show, setShow] = useState(false);
	const [deptValue, setDeptValue] = useState([]);
	const [userValue, setUserValue] = useState([]);
	const [roleValue, setRoleValue] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState({
		email: "",
		departmentId: "",
		roleId: "",
	});
	const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;

	const handleClose = () => {
		setShow(false);
		setValues({
			email: "",
			departmentId: "",
			roleId: "",
		});
	};
	const handleShow = () => setShow(true);

	const removeUser = (user) => {
		const updatedUsers = [...userValue];
		const index = updatedUsers.indexOf(user);
		updatedUsers.splice(index, 1);
		setUserValue(updatedUsers);
	};
	const handleRequestClose = () => {
		setOpen(false);
	};
	const jwt = auth.isAuthenticated();

	const fetchDepartments = (signal) => {
		list(signal).then((data) => {
			if (data && data.error) {
				console.log("Error", data.error);
			} else {
				setDeptValue(data.data);
			}
		});
	};

	const fetchRoles = (signal) => {
		roleList(
			{
				t: jwt.token,
			},
			signal
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setRoleValue(data.data);
			}
		});
	};

	const fetchUsers = (signal) => {
		userList(
			{
				t: jwt.token,
			},
			signal
		).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error });
			} else {
				setUserValue(data.data);
			}
		});
	};

	const usersData = useMemo(() => {
		setTotaltems(userValue.length);
		return userValue.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [userValue, currentPage]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		fetchUsers(signal);
		fetchDepartments(signal);
		fetchRoles(signal);

		return function cleanup() {
			abortController.abort();
		};
	}, [redirect]);

	const handleOnChange = ({ target }) => {
		setValues({ ...values, [target.name]: target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		create(
			{
				t: jwt.token,
			},
			values
		).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setRedirect(!redirect);

				toast.success(data.message);
				handleClose();
			}
		});
	};
	return (
		<Container fluid>
			<Row>
				<Col md="12">
					<Card>
						<Card.Header className="d-flex justify-content-between">
							<Card.Title as="h4">Users</Card.Title>
							<div className="buttons">
								<Button size="sm" variant="info" onClick={handleShow}>
									Add
								</Button>
							</div>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col md="12">
									<div className="row">
										<div className="col-md-6">
											<Pagination
												total={totalItems}
												itemsPerPage={ITEMS_PER_PAGE}
												currentPage={currentPage}
												onPageChange={(page) => setCurrentPage(page)}
											/>
										</div>
										<div className="col-md-6 d-flex flex-row-reverse">
											{/* <Search
													onSearch={(value) => {
														setSearch(value);
														setCurrentPage(1);
													}}
													placeholder="Search department"
												/> */}
										</div>
									</div>
									<Table responsive>
										<thead>
											<tr>
												<th>#</th>
												<th>Email</th>
												{/* <th>Department</th> */}
												<th>Created At</th>
											</tr>
										</thead>
										<tbody>
											{usersData.map((user, i) => (
												<tr key={user.id}>
													<td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
													<td>{user.email}</td>
													{/* <td>{user.department}</td> */}
													<td>
														{new Date(user.createdOn).toLocaleDateString()}
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</Col>
							</Row>
						</Card.Body>
					</Card>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Add User</Modal.Title>
						</Modal.Header>

						<Form onSubmit={handleSubmit}>
							<Modal.Body>
								<Form.Group controlId="email">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="name@example.com"
										value={values.email}
										onChange={handleOnChange}
										name="email"
									/>
								</Form.Group>
								<Form.Group controlId="role">
									<Form.Label>Role</Form.Label>
									<Form.Control
										as="select"
										value={values.roleId}
										onChange={handleOnChange}
										name="roleId"
									>
										<option value="">Select Role</option>
										{roleValue &&
											roleValue.map((item, i) => (
												<option value={item.id} key={i}>
													{item.rolename}
												</option>
											))}
										;
									</Form.Control>
								</Form.Group>
								<Form.Group controlId="role">
									<Form.Label>Department</Form.Label>
									<Form.Control
										as="select"
										value={values.departmentId}
										onChange={handleOnChange}
										name="departmentId"
									>
										<option value="">Select Department</option>
										{deptValue.map((item, i) => (
											<option value={item.id} key={item.id}>
												{item.name}
											</option>
										))}
										;
									</Form.Control>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Modal.Footer>
						</Form>
					</Modal>
				</Col>
			</Row>
		</Container>
	);
}
