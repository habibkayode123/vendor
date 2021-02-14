import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import { readDepartment, update } from "./api-dept.js";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// margin: 50,
	},
	card: {
		maxWidth: 900,
		// margin: "auto",
		marginLeft: theme.spacing(12),
		textAlign: "center",
		marginTop: theme.spacing(3),
		paddingBottom: theme.spacing(1),
	},
	title: {
		marginLeft: theme.spacing(-42),
		color: theme.palette.protectedTitle,
		fontSize: "1.4em",
	},
	subheading: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	error: {
		verticalAlign: "middle",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 500,
	},
	submit: {
		// margin: "auto",
		marginLeft : theme.spacing(24),
		marginBottom: theme.spacing(2),
	},
	bigAvatar: {
		width: 60,
		height: 100,
		margin: "auto",
	},
	input: {
		display: "none",
	},
	filename: {
		marginLeft: "10px",
	},
}));

export default function EditDepartment({ match }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		description: "",
		code: "",
		hod:"",
		redirect: false,
		error: "",
		id: "",
	});
	const jwt = auth.isAuthenticated();
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		

		readDepartment(
			{
				id: match.params.departmentId,
			},
			signal
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					id: data.id,
					name: data.name,
					hod:data.hod
					// description: data.description,
					// code: data.code,
				});
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		const departmentData = {
			name: values.name || undefined,
			// description: values.description || undefined,
			hod: values.hod || undefined,
		};

		console.log("units name",values.name);
		console.log("hod",values.hod);
		console.log("departmentData", departmentData);

		update(
			{
				id: match.params.departmentId,
			},
			{
				t: jwt.token,
			},
			departmentData
		).then((data) => {
			if (data.errors) {
				setValues({ ...values, error: data.errors });
			} else {
				setValues({ ...values, redirect: true });
			}
		});
	};
	const handleChange = (name) => (event) => {
		const value = name === "image" ? event.target.files[0] : event.target.value;
		setValues({ ...values, [name]: value });
	};
	if (values.redirect) {
		return <Redirect to={"/admin/departments/"} />;
	}
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardContent>
					<Typography type="headline" component="h2" className={classes.title}>
						Edit Department
					</Typography>
					<br />{" "}
					{values.error && (
						<div className="alert alert-danger" role="alert">
							{values.error}
						</div>
					)}
					<TextField
						id="name"
						label="Name"
						className={classes.textField}
						value={values.name}
						onChange={handleChange("name")}
						margin="normal"
					/>
					<br />
					{/* <TextField
						id="multiline-flexible"
						label="Description"
						multiline
						rows="1"
						value={values.description}
						onChange={handleChange("description")}
						className={classes.textField}
						margin="normal"
					/> */}
					<br />
					<TextField
						id="multiline-flexible"
						label="HOD"
						multiline
						rows="1"
						value={values.hod}
						onChange={handleChange("hod")}
						className={classes.textField}
						margin="normal"
					/>
					<br />
					<br />
				</CardContent>
				<CardActions>
					<Button
						style={{ color: "#1DC7EA" }}
						// color="primary"
						variant="contained"
						onClick={clickSubmit}
						className={classes.submit}
					>
						Update Department
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
