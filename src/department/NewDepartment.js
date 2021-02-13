import React, { useState } from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { create } from "./api-dept";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 800,
		// margin: "auto",
		marginLeft: theme.spacing(20),
		marginRight: theme.spacing(5),
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: "middle",
	},
	title: {
		// marginLeft:theme.spacing(-42),
		marginLeft: theme.spacing(10),
		color: theme.palette.openTitle,
		fontSize: "1.4em",
	},
	textField: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(1),
		width: 500,
	},
	submit: {
		marginLeft: theme.spacing(9),
		marginBottom: theme.spacing(2),
	},
	input: {
		display: "none",
	},
	filename: {
		marginLeft: "10px",
	},
}));

export default function NewDepartment() {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		description: "",
		code: "",
		hod:"",
		redirect: false,
		error: "",
	});
	const jwt = auth.isAuthenticated();
	const handleChange = (name) => (event) => {
		const value = name === "image" ? event.target.files[0] : event.target.value;
		setValues({ ...values, [name]: value });
	};
	const clickSubmit = (e) => {
		e.preventDefault();
		const departmentData = {
			name: values.name || undefined,
			hod: values.hod || undefined,
		};

		console.log("name to submit",values.name);
		console.log("description",values.hod)

		create(
			{
				t: jwt.token,
			},
			departmentData
		).then((data) => {
			if (data.errors) {
				setValues({ ...values, error: data.errors });
			} else {
				console.log(data);
				setValues({ ...values, error: "", redirect: true });
			}
		});
	};

	if (values.redirect) {
		return <Redirect to={"/admin/departments/"} />;
	}
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								{/* <Card.Title className={classes.title}>Business Unit</Card.Title> */}
								<Typography
									type="headline"
									component="h2"
									className={classes.title}
								>
									New Department
								</Typography>
							</Card.Header>
							<Card.Body>
								{values.error && (
									<div className="alert alert-danger" role="alert">
										{values.error}
									</div>
								)}
								<TextField
									id="name"
									label="Unit"
									className={classes.textField}
									value={values.name}
									onChange={handleChange("name")}
									margin="normal"
								/>
								{/* <TextField
									id="multiline-flexible"
									label="Description"
									multiline
									// rows="2"
									value={values.description}
									onChange={handleChange("description")}
									className={classes.textField}
									margin="normal"
								/> */}
								<TextField
									id="multiline-flexible"
									label="Hod"
									// multiline
									value={values.hod}
									onChange={handleChange("hod")}
									className={classes.textField}
									margin="normal"
								/>
								{/* </CardContent> */}
								<CardActions>
									<Button
										style={{ color: "#1DC7EA" }}
										// color="primary"
										variant="contained"
										onClick={clickSubmit}
										className={classes.submit}
									>
										Submit
									</Button>
									<Link to="/admin/departments" className={classes.submit}>
										<Button variant="contained">Cancel</Button>
									</Link>
								</CardActions>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
