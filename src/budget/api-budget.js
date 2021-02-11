const create = async (budget) => {
	try {
		let response = await fetch("http://localhost:3050/api/budget", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(budget),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const list = async (signal) => {
	try {
		let response = await fetch("http://localhost:3050/api/budget", {
			method: "GET",
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const getBudgetTypeList = async (signal) => {
	try {
		let response = await fetch("http://localhost:3050/api/budgettype", {
			method: "GET",
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const getBudgetById = async (params, credentials, signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/budget/additionalBudget/" + params.id,
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
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const additionalBudgetUpdate = async (params, budget) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/budget/additionalbudget/" + params.budgetId,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(budget),
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const budgetUsageByDepartment = async (params, signal) => {
	// try {
	// 	let departmentId = params.departmentId
	// 		? params.departmentId
	// 		: "cd29f9a5-73e6-4aa8-b8fe-7a0cad9b2142";
	// 	let response = await fetch(
	// 		"http://localhost:3050/api/budgetusage/by/" + departmentId,
	// 		{
	// 			method: "GET",
	// 			signal: signal,
	// 		}
	// 	);
	// 	return await response.json();
	// } catch (err) {
	// 	console.log(err);
	// }
};


const update = async (params, credentials, user) => {
	try {
		let response = await fetch(
			"http://localhost:3050//api/budget/update" + params.budgetId,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + credentials.t,
				},
				body: JSON.stringify(user),
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const read = async (params, signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/budget/" + params.budgetId,
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

const getBudgetByDepartment = async (params, signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/budgets/by/" + params.departmentId,
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

export {
	create,
	list,
	getBudgetTypeList,
	getBudgetById,
	update,
	read,
	additionalBudgetUpdate,
	getBudgetByDepartment,
	budgetUsageByDepartment
};
