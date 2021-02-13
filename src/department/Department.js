import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import DeleteDepartment from "./DeleteDepartment";
import { readDepartment } from "./api-dept.js";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 800,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
	}),
	card: {
		textAlign: "center",
		paddingBottom: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
		fontSize: "1.2em",
	},
	subheading: {
		marginTop: theme.spacing(1),
		color: theme.palette.openTitle,
	},
	bigAvatar: {
		width: 100,
		height: 100,
		margin: "auto",
	},
	departmentTitle: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
			1
		)}px ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
		width: "100%",
		fontSize: "1.2em",
	},
}));

export default function Department({ match }) {
	const classes = useStyles();
	const [department, setDepartment] = useState({});
	const [error, setError] = useState("");

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		readDepartment(
			{
				id: match.params.departmentId,
			},
			signal
		).then((data) => {
			if (data.errors) {
				setError(data.errors);
			} else {
				console.log(data);
				setDepartment(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.departmentId]);

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h6" className={classes.title}>
				Department
			</Typography>
			<br />{" "}
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={department.name}
						secondary={department.description}
					/>{" "}
					<ListItemSecondaryAction>
						<Link to={"/admin/editdepartment/" + department.id}>
							<IconButton aria-label="Edit" color="primary">
								<Edit style={{ color: "#1DC7EA" }} />
							</IconButton>
						</Link>
						<DeleteDepartment
							department={department}
							departmentId={department.id}
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={
							"Created On: " + new Date(department.createdOn).toDateString()
						}
					/>
				</ListItem>
			</List>
			<Paper className={classes.auctions} elevation={4}>
				{/* <Typography type="title" color="primary"> */}

				{/* <ListItem>
					<ListItemText
						color="primary"
						primary={"Department Code: " + department.code}
					/>
				</ListItem> */}

				{/* </Typography> */}
			</Paper>
		</Paper>
	);
}
