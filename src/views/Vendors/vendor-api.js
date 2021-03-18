import { herouke } from "../../url";
import auth from "../../auth/auth-helper";

export const getSingleVendorDetails = async () => {
  let vendorId = auth.isAuthenticatedVendor().user.vendorId;
  let url = `${herouke}/api/vportal/${vendorId}`;
  try {
    let response = await fetch(url);
    console.log(response, "details");
    if (response.ok && response.status === 200) {
      return response.json();
    } else {
      throw "Error occur";
    }
  } catch (error) {
    throw error;
  }
};

export const getVendorQuotationStatusCount = async (status) => {
  let token = auth.isAuthenticatedVendor().token;
  let url = `${herouke}/api/vquotation/getvendorquotationcountbystatus`;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status }),
    });
    console.log(response, "rep in upload", status);

    if (response.ok && response.status === 200) {
      return response.json();
    } else {
      throw "Error occur";
    }
  } catch (err) {
    console.log("er upload", status);
    console.log(err);
  }
};
