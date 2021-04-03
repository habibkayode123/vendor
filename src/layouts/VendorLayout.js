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
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "views/vendor/Profile";
import ListQuotation from "views/vendor/ListQuotation";
import ApprovedQuotation from "../views/VendorQuotation/ApprovedQuotation";
import PrivateRouteVendor2 from "../auth/PrivateRouteVendor2";
import UploadCredential from "views/vendor/UploadCredential";
import auth from "../auth/auth-helper";
import QuotationDetails from "views/VendorQuotation/QuotationDetails";

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
              path="/vendor/uploadCredential"
              render={(props) => {
                let cre = auth.isAuthenticatedVendor().user.uploadStatus;
                if (!cre) return <UploadCredential {...props} />;
                else return <Redirect to="/vendor" />;
              }}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/vendorQuotation"
              component={FetchVendorQuotation}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/approvedQuotation"
              component={ApprovedQuotation}
            />

            <PrivateRouteVendor2
              exact
              path="/vendor/analysis"
              component={Analysis}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/rejectedQuotation"
              component={RejectedQuotation}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/pendingQuotation"
              component={PendingQuotation}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/uploadVendorQuotation"
              component={UploadQuotation}
            />

            <PrivateRouteVendor2
              exact
              path="/vendor/listQuotation"
              component={ListQuotation}
            />
            <PrivateRouteVendor2
              exact
              path="/vendor/quotationDetails/:id"
              component={QuotationDetails}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default VendorLayout;
