import { herouke } from "../../url";
import auth from "../../auth/auth-helper";

const changePassWord = async (payload) => {
  let data = auth.isAuthenticatedVendor();

  try {
    let response = await fetch(`${herouke}/api/vportal/changepassword`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const resetPassWord = async (payload) => {
  let obj = {
    email: payload,
  };
  try {
    let response = await fetch(`${herouke}/api/vportal/requestResetPassword`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const setResetPassword = async (payload) => {
  try {
    let response = await fetch(`${herouke}/api/vportal/resetPassword`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

export { changePassWord, resetPassWord, setResetPassword };
