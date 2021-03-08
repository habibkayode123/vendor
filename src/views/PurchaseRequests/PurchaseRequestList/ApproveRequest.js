import React, { useState } from "react";
import auth from "../../../auth/auth-helper";
import { list } from "./api-request.js";

function ApproveRequest(props) {
	const [open, setOpen] = useState(false);
	const jwt = auth.isAuthenticated();
	console.log("JwtFromApproveRequest", jwt);
	// console.log("JwtFromApproveRequest", jwt);
      const fetchRequest = () => {
				listRequests(
					{
						requestorDeptId: "CSS",
						loggedUserId: "503b56a0-718a-46e0-a407-e51edd03ec2b",
						amount: 70000,
					}
					// { t: jwt.token }
				).then((data) => {
					console.log("...Data from approve request", data);
					// if (data.error) {
					// 	console.log(data.error);
					// } else {
					// 	setOpen(false);
					// 	props.onRemove(props.auction);
					// }
				});
			};

	return (
		<span>
			<h1>ApproveRequest</h1>
		</span>
	);
}

export default ApproveRequest;
