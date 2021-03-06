import VendorNavbar from "components/Navbars/VendorNavbar";
import VendorSidebar from "components/Sidebar/VendorSidebar";
import Vendors from "../views/Vendors/Vendors";
<<<<<<< HEAD
import FetchVendorQuotation from "views/VendorQuotation/fetchVendorsQuotation";
=======
import UploadQuotation from "../views/VendorQuotation/uploadQuotation";
>>>>>>> 6e2b6e575a47c00edbb79c16584088d971b46471
import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Profile from "views/vendor/Profile";

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
						<Route exact path="/vendor/vendorQuotation" component={FetchVendorQuotation} />
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default VendorLayout;
