import auth from "../../auth/auth-helper";
import { herouke } from "../../url";

const list = async (signal = null) => {
  try {
    let response = await fetch(`${herouke}/api/vquotation/view`, {
      method: "GET",
      signal: signal,
    });
    console.log("poo");
    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const getQuotationByVendor = async (signal = null) => {
  let id = auth.isAuthenticatedVendor().user.vendorId;
  console.log(id, "id");
  try {
    let response = await fetch(`${herouke}/api/vquotation/vendor/${id}`, {
      method: "GET",
      signal: signal,
    });
    console.log("poo");
    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const getQuotationByVendorByStatus = async (status) => {
  let token = auth.isAuthenticatedVendor().token;
  let payload = {
    status,
  };

  try {
    let response = await fetch(
      `${herouke}/api/vquotation/view/vendor/quotationstatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(payload),
      }
    );

    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const getQuotationByCaseId = async (caseId) => {
  let id = auth.isAuthenticatedVendor().user.vendorId;
  //   let payload = {
  //     caseId: caseId,
  //     vendorId: id,
  //   };

  let payload = {
    caseId,
    vendorId: "4172799689",
  };
  console.log(payload);
  try {
    let response = await fetch(`${herouke}/api/v1/request/getorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(response, "rep");

    return response.json();
  } catch (err) {
    console.log("er");
    console.log(err);
  }
};

const uploadQuotation = async (payload) => {
  let token = auth.isAuthenticatedVendor().token;
  console.log(payload);
  try {
    let response = await fetch(`${herouke}/api/v1/request/getorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });
    console.log(response, "rep in upload");

    return response.json();
  } catch (err) {
    console.log("er upload");
    console.log(err);
  }
};

export {
  list,
  getQuotationByVendor,
  getQuotationByCaseId,
  getQuotationByVendorByStatus,
  uploadQuotation,
};
