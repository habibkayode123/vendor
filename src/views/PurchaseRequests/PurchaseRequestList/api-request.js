const listRequests = async (payload,signal) => {
	try {
		let response = await fetch(
			"http://localhost:3050/api/v1/request/getRequestApprover",
			{
				method: "POST",
				signal: signal,
				body: JSON.stringify(payload),
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

export { listRequests};