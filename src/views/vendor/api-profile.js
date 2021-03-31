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

const updateAccount = async (payload) => {
  let data = auth.isAuthenticatedVendor();
  try {
    let response = await fetch(
      `${herouke}/api/vportal/editvendoraccountsdetails`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return response.json();
    else throw response.text;
  } catch (err) {
    throw err.message;
    console.log(err);
  }
};

const uploadCredential = async (payload) => {
  console.log(payload, "upload");
  let data = auth.isAuthenticatedVendor();

  try {
    let response = await fetch(`${herouke}/api/vendordocument/upload`, {
      method: "POST",
      headers: {
        //  Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: payload,
    });
    if (response.ok) return response.json();
    else throw response;
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const getAccountType = async () => {
  try {
    let response = await fetch(`${herouke}/api/accounttypes`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) return response.json();
    else throw response.text;
  } catch (err) {
    throw err.message;
    console.log(err);
  }
};

const getBankName = async () => {
  try {
    let response = await fetch(`${herouke}/api/banks`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) return response.json();
    else throw response.text;
  } catch (err) {
    throw err.message;
    console.log(err);
  }
};
export {
  changePassWord,
  resetPassWord,
  setResetPassword,
  uploadCredential,
  updateAccount,
  getAccountType,
  getBankName,
};
