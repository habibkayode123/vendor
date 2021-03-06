const list = async (signal = null) => {
	try {
		let response = await fetch("http://localhost:3050/api/vquotation/view", {
			method: "GET",
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export {list};