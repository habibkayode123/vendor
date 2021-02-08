const listPurchaseByDepartment = async (params, credentials, signal) => {
	try {
		let response = await fetch("/api/purhcase/vendor/" + params.departmentId, {
			method: "GET",
			signal: signal,
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + credentials.t,
			},
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const getVendors = async (signal) => {
	try {
		let response = await fetch("http://localhost:3050/api/getVendors", {
			method: "GET",
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};


const create = async (request) => {
	try {
		let response = await fetch("http://abce622a08ba.ngrok.io/api/v1/request", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export { create, listPurchaseByDepartment, getVendors };
