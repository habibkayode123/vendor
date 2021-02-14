import React, { useState, useEffect } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { roleList } from "../role/api-role";
import auth from "../auth/auth-helper";
import { create, userList } from "../user/api-user.js";
import { list } from "../department/api-dept.js";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import { create } from "./api-user.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
	const [deptValue, setDeptValue] = useState([]);
	const [departmentValue, setDepartmentValue] = useState("");
	const [userValue, setUserValue] = useState([]);
	const [roleValue, setRoleValue] = useState([]);
	const classes = useStyles();
	const [redirect, setRedirect] = useState(false);
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState({
		email: "",
		departmentValue: "",
		roleValueSet: "",
		departmentArray: [],
		success: false,
		message: "",
		error: "",
	});
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
	const handleDepartmentChange = (e) => {
		setDepartmentValue(e.target.value);
	};

	const clickButton = () => {
		setOpen(true);
	};

	//USEEFFECT HOOKS FOR DEPARTMENT
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		list(signal).then((data) => {
			console.log("data fro department", data);
			if (data && data.error) {
				console.log("Error", data.error);
				// setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, departmentArray: data });
				setDeptValue(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		userList(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, error: "" });
				setUserValue(data.data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [redirect]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		roleList(signal).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
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
			email: values.email || undefined,
			departmentId: departmentValue || undefined,
			roleId: values.roleValueSet || undefined,
		};
		create(
			{
				t: jwt.token,
			},
			user
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setOpen(false);
				console.log(data);
				setRedirect(!redirect);
				// window.location.reload(false);
				setValues({
					...values,
					message: data.message,
					error: "",
				});
			}
		});
	};
	return (
		<>
			<Container fluid>
				<Card>
					<Row>
						<Row>
							<Col md="2"></Col>
							<Col md="10">
								<div className="select-inner">
									<form>
										<h3>Create Users</h3>
										{values.error && (
											<div className="alert2 alert-danger" role="alert">
												{values.error}
											</div>
										)}
										{/* {values.success && (
											<div className="alert alert-success" role="alert">
												Successful Created
											</div>
										)} */}
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
										{/* <br /> */}
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
										<div className="form-group">
											<label>Department</label>
											<select
												className="form-control"
												defaultValue={departmentValue}
												onChange={handleDepartmentChange}
											>
												<option>---Select Options ---</option>
												{
													// values.departmentArray &&
													deptValue.map((item, i) => {
														return (
															<>
																<option value={item.id} key={item.id}>
																	{item.name}
																</option>
															</>
														);
													})
												}
											</select>
										</div>

										<Button
											// color="secondary"
											style={{ color: "#1DC7EA" }}
											autoFocus="autoFocus"
											variant="contained"
											onClick={clickButton}
											className={classes.submit}
										>
											Submit
										</Button>
										<div className="clearfix"></div>
									</form>
								</div>
							</Col>
							{/* <Col md="1"></Col> */}
						</Row>
					</Row>
					<br />
				</Card>
				<Dialog open={open} onClose={handleRequestClose}>
					<DialogTitle>New User</DialogTitle>
					<DialogContent>
						<DialogContentText>Create New User.</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleRequestClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={clickSubmit}
							color="secondary"
							autoFocus="autoFocus"
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
			<br />
			<Divider />
			<br />

			<Container fluid>
				<Row>
					<Col md="2"></Col>
					<Col md="10">
						<List dense>
							<ListItem button>
								{/* <ListItemText
													primary={i+1}
												/> */}
								<h6 style={{ marginLeft: 1 }}>S/N</h6>
								<h6 style={{ marginLeft: 26 }}>EMAIL</h6>
								<h6 style={{ marginLeft: 396 }}>ROLE</h6>
								<ListItemSecondaryAction>ACTIONS</ListItemSecondaryAction>
							</ListItem>
							{userValue &&
								userValue.map((item, i) => {
									return (
										<>
											<ListItem button>
												{/* <ListItemText
													primary={i+1}
												/> */}
												<h6 style={{ marginRight: 50 }}>{i + 1}</h6>
												<ListItemAvatar>
													<Avatar variant="square" />
												</ListItemAvatar>
												<ListItemText secondary={item.email} />
												<ListItemText primary={item.role.rolename} />
												<ListItemSecondaryAction>
													<Link to={"/admin/users/" + item.id}>
														<IconButton
															aria-label="View"
															style={{ color: "#1DC7EA" }}
														>
															<ViewIcon />
														</IconButton>
													</Link>
													{auth.isAuthenticated().user && (
														// auth.isAuthenticated().user.id ==
														// 	user.user.id && (
														<>
															<Link to={"/admin/edit/user/" + item.id}>
																<IconButton
																	aria-label="Edit"
																	style={{ color: "#1DC7EA" }}
																>
																	<Edit />
																</IconButton>
															</Link>
															<DeleteUser user={item} onRemove={removeUser} />
														</>
													)}
												</ListItemSecondaryAction>
											</ListItem>
											<Divider />
										</>
									);
								})}
						</List>
					</Col>
				</Row>
			</Container>
		</>
	);
}
