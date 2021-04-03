import { herouke } from "../../../url";

const listRequests = async (payload) => {
	try {
		let response = await fetch(
			`${herouke}/api/v1/request/getRequestApprover`,
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