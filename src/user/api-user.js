const create = async (credentials,user) => {
	try {
		let response = await fetch("http://localhost:3050/api/users", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + credentials.t,
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const userList = async (signal) => {
	try {
		let response = await fetch("http://localhost:3050/api/users", {
			method: "GET",
			signal: signal,
		});	
		return await response.json();
		
	} catch (err) {
		console.log(err);
		res.json({errors:err.message});
	}
};

const read = async (credentials,params, signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/users/" + params.userId,
			{
				method: "GET",
				signal: signal,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + credentials.t,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const remove = async (params, credentials) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/users/" + params.userId,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + credentials.t,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const setUserRole = async (credentials, params) => {
	try {
		console.log("params role", params.roleId);
		console.log("params user",params.userId)
		console.log(
			"url endpoints",
			"http://localhost:3050/api/users/" + params.userId + "/role"
		);
		let response = await fetch(
			"http://localhost:3050/api/users/" + params.userId + "/role",
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + credentials.t,
				},
				body: JSON.stringify({roleId:params.roleId}),
			}
		);

		return response.json();
	} catch (err) {
		console.log(err);
	}
};


export { create, userList,read,remove ,setUserRole};

