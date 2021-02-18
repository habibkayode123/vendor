import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "../auth/auth-helper";
import { remove } from "./api-dept.js";

export default function DeleteDepartment(props) {
	const [open, setOpen] = useState(false);
	const [redirectTo, setRedirect] = useState(false);

	const jwt = auth.isAuthenticated();
	const clickButton = () => {
		setOpen(true);
	};
	const deleteDepartment = () => {
		remove(
			{
				id: props.department.id,
			},
			{ t: jwt.token }
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOpen(false);
				setRedirect(true);
				// props.onRemove(props.department);
			}
		});
	};
	const handleRequestClose = () => {
		setOpen(false);
	};

	const { from } = {
		from: {
			pathname: "/admin/departments",
		},
	};
	const redirectToReferal = redirectTo;
	if (redirectToReferal) {
		return <Redirect to={from} />;
	}
	// if(redirectTo){
	// 	<Redirect to='/department' />

	// }
	return (
		<>
			<IconButton aria-label="Delete" onClick={clickButton} color="secondary">
				<DeleteIcon />
			</IconButton>

			<Dialog open={open} onClose={handleRequestClose}>
				<DialogTitle>{"Delete " + props.department.name}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Confirm to delete the department {props.department.name}.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={deleteDepartment}
						color="secondary"
						autoFocus="autoFocus"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
DeleteDepartment.propTypes = {
	department: PropTypes.object.isRequired,
	departmentId: PropTypes.string.isRequired,
};

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import auth from "./../auth/auth-helper";
// import { remove } from "./api-user.js";
// import { Redirect } from "react-router-dom";

// export default function DeleteUser(props) {
// 	const [open, setOpen] = useState(false);
// 	const [redirect, setRedirect] = useState(false);

// 	const jwt = auth.isAuthenticated();
// 	const clickButton = () => {
// 		setOpen(true);
// 	};
// 	const deleteAccount = () => {
// 		remove(
// 			{
// 				userId: props.userId,
// 			},
// 			{ t: jwt.token }
// 		).then((data) => {
// 			if (data && data.error) {
// 				console.log(data.error);
// 			} else {
// 				auth.clearJWT(() => console.log("deleted"));
// 				setRedirect(true);
// 			}
// 		});
// 	};
// 	const handleRequestClose = () => {
// 		setOpen(false);
// 	};

// 	if (redirect) {
// 		return <Redirect to="/" />;
// 	}
// 	return (
// 		<span>
// 			<IconButton aria-label="Delete" onClick={clickButton} color="secondary">
// 				<DeleteIcon />
// 			</IconButton>

// 			<Dialog open={open} onClose={handleRequestClose}>
// 				<DialogTitle>{"Delete Account"}</DialogTitle>
// 				<DialogContent>
// 					<DialogContentText>Confirm to delete your account.</DialogContentText>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={handleRequestClose} color="primary">
// 						Cancel
// 					</Button>
// 					<Button
// 						onClick={deleteAccount}
// 						color="secondary"
// 						autoFocus="autoFocus"
// 					>
// 						Confirm
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</span>
// 	);
// }
// DeleteUser.propTypes = {
// 	userId: PropTypes.string.isRequired,
// };
