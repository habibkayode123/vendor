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
import CreateBudget from "../budget/createBudget";
import BudgetBulkUpload from "../budget/budgetBulkUpload";
import NewDepartment from "../department/NewDepartment";
import Department from "../department/Department";
import EditDepartment from "../department/EditDepartment";
import Departments from "../department/Departments";
import sidebarImage from "assets/img/sidebar-3.jpg";
import PurchaseRequests from "views/PurchaseRequests/PurchaseRequests";
import SinglePurchaseRequest from "views/PurchaseRequests/SinglePurchaseRequest/SinglePurchaseRequest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuotationRequest from "views/PurchaseRequests/SinglePurchaseRequest/QuotationRequests";
import PrivateRoute from "../components/PrivateRoute";
import PurchaseRequest from "views/PurchaseRequest.js";
// import Budget from "views/Budget";
import Budget from "../budget/Budget";
import User from "../user/EditUser";
import ViewUser from "../user/ViewUser";
import auth from "../auth/auth-helper";
import Vendors from "views/Vendors/Vendors";
import AddProduct from "views/Products/AddProduct";
import setAuthToken from "../setAuthToken";
import BudgetBalance from "components/Sidebar/BudgetBalance";
import PurchaseRequestLogs from "views/PurchaseRequests/Logs/PurchaseRequestLogs";
import SingleLog from "views/PurchaseRequests/Logs/SingleLog";
import ApproveRequest from "views/PurchaseRequests/PurchaseRequestList/ApproveRequest";
import ListQuotation from "../views/vendor/ListQuotation";

import { getBudgetByDepartment } from "../budget/api-budget";

if (sessionStorage.getItem("jwt"))
  setAuthToken(JSON.parse(sessionStorage.getItem("jwt")).token);

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const [budgets, setBudgets] = useState([]);
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

  let userDepartment = {
    departmentId: auth.isAuthenticated().user.departmentId,
  };
  const fetchBudgets = () => {
    getBudgetByDepartment(userDepartment).then((res) => {
      // console.log("budgets", res.data);
      setBudgets(res.data);
    });
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <>
      <div className="wrapper">
        <ToastContainer />
        {auth.isAuthenticated() && (
          // (<Sidebar color={color} image={hasImage ? image : ""} routes={routes} />)}
          <Sidebar
            color={color}
            image={hasImage ? image : ""}
            routes={routes}
          />
        )}
        <div className="main-panel" ref={mainPanel}>
          {auth.isAuthenticated() && <AdminNavbar />}
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
                    exact
                    path="/admin/createbudget"
                    component={CreateBudget}
                  />
                  <Route
                    exact
                    path="/admin/bulkupload/budget"
                    component={BudgetBulkUpload}
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
                  <PrivateRoute
                    exact
                    path="/admin/departments"
                    component={Departments}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/purchase"
                    component={PurchaseRequest}
                  />
                  <Route
                    exact
                    path="/admin/purchase/request/logs"
                    component={PurchaseRequestLogs}
                  />
                  <Route
                    exact
                    path="/admin/purchase/request/logs/:uuid"
                    render={(props) => (
                      <SingleLog
                        setBudgets={(totalAmount, expId) =>
                          setBudgets((prev) => {
                            let newState = prev.map((i) => {
                              let newObj = i;
                              if (i.expenseTypeId == expId) {
                                newObj.amount = i.amount - totalAmount;
                              }
                              return newObj;
                            });
                            return newState;
                          })
                        }
                        {...props}
                      />
                    )}
                    // component={SingleLog}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/purchase/requests"
                    component={PurchaseRequests}
                  />
                  <PrivateRoute exact path="/admin/budget" component={Budget} />
                  <PrivateRoute
                    exact
                    path="/admin/quotations-list"
                    component={ListQuotation}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/purchase/requests/:uuid"
                    component={SinglePurchaseRequest}
                  />
                  <Route
                    exact
                    path="/admin/purchase/requests/:uuid/quotation"
                    component={QuotationRequest}
                  />
                  <Route
                    exact={true}
                    path="/admin/edit/user/:userId"
                    component={User}
                  />
                  <Route
                    exact={true}
                    path="/admin/users/:userId"
                    component={ViewUser}
                  />
                  <Route exact path="/admin/vendors" component={Vendors} />
                  <Route
                    exact
                    path="/admin/products/create"
                    component={AddProduct}
                  />
                  <Route
                    exact
                    path="/admin/requests/approve"
                    component={ApproveRequest}
                  />
                </>
                // {<Route exact path="/home" component={Home2} />}
              }
            </Switch>
          </div>

          {auth.isAuthenticated() &&
            auth.isAuthenticated().user.role != "Admin" && (
              <BudgetBalance budgets={budgets} />
            )}
        </div>
      </div>
    </>
  );
}

export default Admin;
