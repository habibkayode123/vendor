import auth from "../../auth/auth-helper";

const approveQuotation = async (id, payload) => {
  console.log("token vendor", auth.isAuthenticated().token);
  try {
    let response = await fetch(
      `http://localhost:3050/api/vquotation/approve/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.isAuthenticated().token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
    return;
  }
};

const rejectQuotation = async (id) => {
  try {
    let response = await fetch(
      `http://localhost:3050/vquotation/approve/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.isAuthenticated().token,
        },
      }
    );
    return await response.json();
  } catch (err) {
    throw err;
    return;
  }
};

export { rejectQuotation, approveQuotation };
