import VendorNavbar from "components/Navbars/VendorNavbar";
import VendorSidebar from "components/Sidebar/VendorSidebar";
import Vendors from "../views/Vendors/Vendors";
import FetchVendorQuotation from "views/VendorQuotation/fetchVendorsQuotation";
import UploadQuotation from "../views/VendorQuotation/uploadQuotation";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Profile from "views/vendor/Profile";
import ListQuotation from "views/vendor/ListQuotation";

function VendorLayout() {
  return (
    <div className="wrapper">
      <ToastContainer />
      <VendorSidebar />
      <div className="main-panel">
        <VendorNavbar />
        <div className="content">
          <Switch>
            <Route exact path="/vendor/profile" component={Profile} />
            <Route exact path="/" component={Vendors} />
            <Route
              exact
              path="/vendor/vendorQuotation"
              component={FetchVendorQuotation}
            />
            <Route
              exact
              path="/vendor/uploadVendorQuotation"
              component={UploadQuotation}
            />

            <Route
              exact
              path="/vendor/listQuotation"
              component={ListQuotation}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default VendorLayout;
