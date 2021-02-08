import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "./HomeIcon";
import { list } from "./api-dept.js";
import { Link } from "react-router-dom";

import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Dropdown,
	DropdownButton,
	Row,
	Col,
} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(3),
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.protectedTitle,
		textAlign: "center",
		fontSize: "1.2em",
	},
	avatar: {
		width: 100,
		height: 100,
	},
	subheading: {
		color: theme.palette.text.secondary,
	},
	departmentTitle: {
		fontSize: "1.2em",
		marginBottom: "5px",
	},
	details: {
		padding: "24px",
	},
}));
export default function Departments() {
	const classes = useStyles();
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		list(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data);
				setDepartments(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		// <div>
		<>
		
			<Container fluid>
				<Row>
					<Col md="12">
						{/* <Card>
							<Card.Header>
								<Card.Title as="h4">Purchase Request</Card.Title>
							</Card.Header>
							<Card.Body>
								<Paper className={classes.root} elevation={4}> */}
									<Typography type="title" className={classes.title}>
										Depatments
									</Typography>
									<List dense>
										{departments.map((department, i) => {
											return (
												<Link to={"/admin/department/" + department.id} key={i}>
													<Divider />
													<ListItem button>
														<ListItemAvatar>
															<HomeIcon
																fontSize="large"
																className={classes.avatar}
																src={
																	"http//localhost:3050/api/departments/logo/" +
																	department.id +
																	"?" +
																	new Date().getTime()
																}
															/>
														</ListItemAvatar>
														<div className={classes.details}>
															<Typography
																type="headline"
																component="h2"
																color="primary"
																className={classes.depatmentTitle}
															>
																{department.name}
															</Typography>
															<Typography
																type="subheading"
																component="h4"
																className={classes.subheading}
															>
																{department.description}
															</Typography>
														</div>
													</ListItem>
													<Divider />
												</Link>
											);
										})}
									</List>
								{/* </Paper>
							</Card.Body>
						</Card> */}
					</Col>
				</Row>
			</Container>
		</>
	);
}
