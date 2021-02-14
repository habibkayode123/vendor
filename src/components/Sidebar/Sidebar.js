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
import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import auth from "../../auth/auth-helper";
import logo from "assets/img/reactlogo.png";
import { checkAccess } from '../../utils/permissionsHelper'

function Sidebar({ color, image, routes }) {
	const location = useLocation();
	const activeRoute = (routeName) => {
		return location.pathname.indexOf(routeName) > -1 ? "active" : "";
	};
	return (
		<div className="sidebar" data-image={image} data-color={color}>
		
			<div className="sidebar-wrapper">
				<div className="logo d-flex align-items-center justify-content-start">
				
					<a className="simple-text" href="#">
						{/* Cars45 */}
						<img src={require("assets/img/cars45Logo.png").default} alt="..." />
					</a>
				</div>
				<Nav>
					{auth.isAuthenticated() && (
						<ul className="navbar-nav ml-auto">
							{checkAccess('raise-request') && <li className="nav-item">
								<NavLink
									to="/admin/purchase"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>Raise Purchase Request</p>
								</NavLink>
							</li>}
							{checkAccess('view-requests') && <li className="nav-item">
								<NavLink
									to="/admin/purchase/requests"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>Purchase Requests</p>
								</NavLink>
							</li>}
							{checkAccess('add-budget') && <li className="nav-item">
								<NavLink
									to="/admin/createbudget"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>Create Budget</p>
								</NavLink>
							</li>}
							{checkAccess('view-budgets') && <li className="nav-item">
								<NavLink
									to="/admin/budget"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>Budget</p>
								</NavLink>
							</li>}
							{checkAccess('add-department') && <li className="nav-item">
								<NavLink
									to="/admin/createdepartment"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>New Departmnet</p>
								</NavLink>
							</li>}
							{checkAccess('view-departments') && <li className="nav-item">
								<NavLink
									to="/admin/departments"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>Departments</p>
								</NavLink>
							</li>}
							
							{checkAccess('manage-users') && <li className="nav-item">
								<NavLink
									to="/admin/register"
									className="nav-link"
									activeClassName="active"
								>
									<i className={""} />
									<p>User management</p>
								</NavLink>
							</li>}
						</ul>
					)}
				</Nav>
			</div>
		</div>
	);
}

export default Sidebar;
