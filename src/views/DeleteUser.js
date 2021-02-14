import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import { remove } from "./api-auser.js";
import {remove} from "../user/api-user.js";
;import auth from "../auth/auth-helper";

export default function DeleteUser(props) {
	const [open, setOpen] = useState(false);

	const jwt = auth.isAuthenticated();
	const clickButton = () => {
		setOpen(true);
	};
	const deleteUser = () => {
		remove(
			{
				userId: props.user.id,
			},
			{ t: jwt.token }
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOpen(false);
				props.onRemove(props.user);
			}
		});
	};
	const handleRequestClose = () => {
		setOpen(false);
	};
	return (
		<span>
			<IconButton aria-label="Delete" onClick={clickButton} color="secondary">
				<DeleteIcon />
			</IconButton>

			<Dialog open={open} onClose={handleRequestClose}>
				<DialogTitle>{"Remove " + props.user.email}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Confirm to delete this user {props.user.email}.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={deleteUser}
						color="secondary"
						autoFocus="autoFocus"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}