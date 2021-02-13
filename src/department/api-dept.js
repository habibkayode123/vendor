const create = async (credentials, department) => {
	try {
		let response = await fetch("http://localhost:3050/api/department", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + credentials.t,
			},
			body: JSON.stringify(department),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const list = async (signal) => {
	try {
		let response = await fetch("http://localhost:3050/api/department", {
			method: "GET",
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const readDepartment = async (params, signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/department/" + params.id,
			{
				method: "GET",
				signal: signal,
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
			"http://localhost:3050/api/department/" + params.id,
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


const update = async (params, credentials, department) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/department/" + params.id,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + credentials.t,
				},
				body: JSON.stringify(department),
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};
export { create, list,readDepartment,remove,update };

// const create = async (credentials, department) => {
// 	try {
// 		let response = await fetch("http://localhost:3050/api/department", {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 				Authorization: "Bearer " + credentials.t,
// 			},
// 			body: JSON.stringify(department),
// 		});
// 		return await response.json();
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const list = async (signal) => {
// 	try {
// 		let response = await fetch("http://localhost:3050/api/department", {
// 			method: "GET",
// 			signal: signal,
// 		});
// 		return response.json();
// 	} catch (err) {
// 		console.log(err);
// 	}
// };



// const update = async (params, credentials, department) => {
// 	try {
// 		let response = await fetch(
// 			"http://localhost:3050/api/department/" + params.id,
// 			{
// 				method: "PUT",
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 					Authorization: "Bearer " + credentials.t,
// 				},
// 				body: JSON.stringify(department),
// 			}
// 		);
// 		return response.json();
// 	} catch (err) {
// 		console.log(err);
// 	}
// };



// export { list, read, create, update, remove };
