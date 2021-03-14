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
import { toast } from "react-toastify";
import Pagination from "../components/Pagination/Pagination";
import { trackPromise } from 'react-promise-tracker';

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

	const fetchDepartments = () => {
		list().then((res) => {
			setDeptValue(res.data.data);
		});
	};

	const fetchRoles = () => {
		roleList().then((res) => {
			setRoleValue(res.data.data);
		});
	};

	const fetchUsers = () => {
		trackPromise(
			userList().then((res) => {
				setUserValue(res.data.data);
			})
		);
	};

	const usersData = useMemo(() => {
		setTotaltems(userValue.length);
		return userValue.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [userValue, currentPage]);

	useEffect(() => {
		fetchUsers();
		fetchDepartments();
		fetchRoles();
	}, [redirect]);

	const handleOnChange = ({ target }) => {
		setValues({ ...values, [target.name]: target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		trackPromise(
			create(values).then((res) => {
				setRedirect(!redirect);
				toast.success(res.data.message);
				handleClose();
			}).catch(err => {
				setValues({ ...values, error: err.response.data.error });
			})
		);
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
												<th></th>
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
													<td>
														{/* <Button size="sm" variant="info" className="ml-1" onClick={() => handleEdit(requ.id)}>Edit</Button> */}
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
