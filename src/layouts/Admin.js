/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef, Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Home2 from "./Home2";
import routes from "routes.js";
import TopUpBudget from "../budget/topUpBudget";
import NewDepartment from "../department/NewDepartment";
import Department from "../department/Department";
import EditDepartment from "../department/EditDepartment";
import Departments from "../department/Departments";
import sidebarImage from "assets/img/sidebar-3.jpg";
import auth from '../auth/auth-helper';
import PurchaseRequests from "views/PurchaseRequests/PurchaseRequests";
import SinglePurchaseRequest from "views/PurchaseRequests/SinglePurchaseRequest/SinglePurchaseRequest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuotationRequest from "views/PurchaseRequests/SinglePurchaseRequest/QuotationRequests";

function Admin() {
	const [image, setImage] = useState(sidebarImage);
	const [color, setColor] = useState("black");
	const [hasImage, setHasImage] = useState(true);
	const location = useLocation();
	const mainPanel = React.useRef(null);
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<Route
						path={prop.layout + prop.path}
						render={(props) => <prop.component {...props} />}
						key={key}
						exact
					/>
				);
			} else {
				return null;
			}
		});
	};
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainPanel.current.scrollTop = 0;
		if (
			window.innerWidth < 993 &&
			document.documentElement.className.indexOf("nav-open") !== -1
		) {
			document.documentElement.classList.toggle("nav-open");
			var element = document.getElementById("bodyClick");
			element.parentNode.removeChild(element);
		}
	}, [location]);
	return (
		<>
			<div className="wrapper">
				<ToastContainer />
				<Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
				<div className="main-panel" ref={mainPanel}>
					{auth.isAuthenticated()&&(<AdminNavbar />)}
					<div className="content">
						<Switch>
							{
								<>
									{getRoutes(routes)}{" "}
									<Route exact path="/admin/home" component={Home2} />
									<Route
										exact
										path="/admin/bud/additionalBudget/:budgetId"
										component={TopUpBudget}
									/>
									<Route
										// exact
										path="/admin/createdepartment"
										component={NewDepartment}
									/>
									{/* <Route
										exact
										path="/admin/departments"
										component={Departments}
									/> */}
									{/* <PrivateRoute
										path="/budget/additionalBudget/:budgetId"
										component={AdditionalBudget}
									/> */}
									<Route
										// exact
										path="/admin/department/:departmentId"
										component={Department}
									/>
									<Route
										exact
										path="/admin/editdepartment/:departmentId"
										component={EditDepartment}
									/>
									<Route
										exact
										path="/admin/departments"
										component={Departments}
									/>
									<Route
										exact
										path="/admin/purchase/requests"
										component={PurchaseRequests}
									/>
									<Route
										exact
										path="/admin/purchase/requests/:uuid"
										component={SinglePurchaseRequest}
									/>
									<Route
										exact
										path="/admin/purchase/requests/:uuid/quotation"
										component={QuotationRequest}
									/>
								</>
								// {<Route exact path="/home" component={Home2} />}
							}
						</Switch>
					</div>
					<Footer />
				</div>
			</div>
			{/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
		</>
	);
}

export default Admin;
