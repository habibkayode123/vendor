import VendorNavbar from "components/Navbars/VendorNavbar";
import VendorSidebar from "components/Sidebar/VendorSidebar";
import Vendors from "../views/Vendors/Vendors";
import VendorsDetail from "../views/Vendors/VendorsDetail";
import FetchVendorQuotation from "views/VendorQuotation/fetchVendorsQuotation";
import AprrovedQuotation from "../views/VendorQuotation/ApprovedQuotation";
import PendingQuotation from "../views/VendorQuotation/PendingQuotation";
import RejectedQuotation from "../views/VendorQuotation/RejectedQuotation";
import Analysis from "../views/Vendors/Analysis";

import UploadQuotation from "../views/VendorQuotation/uploadQuotation";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Profile from "views/vendor/Profile";
import ListQuotation from "views/vendor/ListQuotation";
import ApprovedQuotation from "../views/VendorQuotation/ApprovedQuotation";

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
            <Route exact path="/vendor" component={VendorsDetail} />
            <Route
              exact
              path="/vendor/vendorQuotation"
              component={FetchVendorQuotation}
            />
            <Route
              exact
              path="/vendor/approvedQuotation"
              component={ApprovedQuotation}
            />

            <Route exact path="/vendor/analysis" component={Analysis} />
            <Route
              exact
              path="/vendor/rejectedQuotation"
              component={RejectedQuotation}
            />
            <Route
              exact
              path="/vendor/pendingQuotation"
              component={PendingQuotation}
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
