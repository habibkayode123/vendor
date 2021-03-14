import { herouke } from "../../url";
import auth from "../../auth/auth-helper";

export const getSingleVendorDetails = async () => {
  let vendorId = auth.isAuthenticatedVendor().user.vendorId;
  let url = `${herouke}/api/vportal/${vendorId}`;
  try {
    let response = await fetch(url);
    console.log(response, "details");
    return response.json();
  } catch (error) {
    throw error;
  }
};
