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
import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter, Link, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { budgetUsageByDepartment, getBudgetByDepartment } from "../../budget/api-budget";
import auth from "../../auth/auth-helper";
import routes from "routes.js";
import { connect } from 'react-redux';
import {numberWithCommas} from '../../helpers';

// function Header() {
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 100,
		width: 200,
	},
	margin: {
		margin: theme.spacing(2),
	},
	padding: {
		padding: theme.spacing(0, 2),
	},
}));

const mapStateToProps = state => {
	return {
		  budget: state
	};
};

const mapDispatchToProps = dispatch => {
	return {
	  handleUpdate: (payload) => dispatch({ type: 'UPDATE', payload: payload })
	}
  };


const Header = ({budget, handleUpdate}) => {
	const location = useLocation();
	// const [budget, setBudget] = useState({amount: 0});
	const [budgetUsage, setBudgetUsage] = useState({});
	const [error, setError] = useState("");
	const classes = useStyles();
	const setBudget = () => {

	}
	const history = useHistory();
	
		useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		
		auth.isAuthenticated()&&(
		getBudgetByDepartment(
			{
				departmentId: auth.isAuthenticated()
					? auth.isAuthenticated().user.departmentId
					: "cd29f9a5-73e6-4aa8-b8fe-7a0cad9b2142",
			},
			signal
		).then((data) => {
			if (data.data.errors) {
				setError(data.errors);
			} else {
				handleUpdate(data.data[0]);
			}
		}));
		// }

		return function cleanup() {
			abortController.abort();
		};
	}, []);
	// }
	
	
	const mobileSidebarToggle = (e) => {
		e.preventDefault();
		document.documentElement.classList.toggle("nav-open");
		var node = document.createElement("div");
		node.id = "bodyClick";
		node.onclick = function () {
			this.parentElement.removeChild(this);
			document.documentElement.classList.toggle("nav-open");
		};
		document.body.appendChild(node);
	};

	const getBrandText = () => {
		for (let i = 0; i < routes.length; i++) {
			if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
				return routes[i].name;
			}
		}
		return "Brand";
	};
	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
					<Navbar.Brand
						href="#home"
						onClick={(e) => e.preventDefault()}
						className="mr-2"
					>
						{/* {getBrandText()} */}
					</Navbar.Brand>
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
					<span className="navbar-toggler-bar burger-lines"></span>
					<span className="navbar-toggler-bar burger-lines"></span>
					<span className="navbar-toggler-bar burger-lines"></span>
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="nav mr-auto" navbar></Nav>
					<Nav className="ml-auto" navbar>
						<div className="collapse navbar-collapse">
							{!auth.isAuthenticated() && (
								<>
									<ul className="navbar-nav ml-auto">
										<li className="nav-item">
											<Link to="/register" className="nav-link">
												Sign up
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/login" className="nav-link">
												Sign In
											</Link>
										</li>
									</ul>
								</>
							)}
							{auth.isAuthenticated() && (
								<>
									{/* <ul className="navbar-nav ml-auto"> */}
									<ul className="navbar-nav ml-auto">
										{
											auth.isAuthenticated() &&
												auth.isAuthenticated().user.role != "Admin" && auth.isAuthenticated().user.role != "CFO" && (
													<li className="center">
														<Link
															to="/admin/financebudget"
															className="nav-link"
														>
															{auth.isAuthenticated().user.department}
														</Link>
													</li>
												)
											// )
										}
										{
											(auth.isAuthenticated().user.role != "Admin" && auth.isAuthenticated().user.role != "CFO"  ) && (
												<li className="center">
													<Link
														to="#"
														className="nav-link"
													>
														Budget Balance: { budget && numberWithCommas(budget.amount)}
													</Link>
												</li>
											)
											// )
										}
										{
											auth.isAuthenticated() &&
												(auth.isAuthenticated().user.role === "Admin" || auth.isAuthenticated().user.role === "CFO" ) && (
													<li className="center nav-item">
														
														Welcome	{auth.isAuthenticated().user.role}
														
													</li>
												)
											// )
										}
									</ul>
								{/* {auth.isAuthenticated().user.role !=="Admin" &&(

									<Dropdown as={Nav.Item}>
										<Dropdown.Toggle
											aria-expanded={false}
											aria-haspopup={true}
											as={Nav.Link}
											data-toggle="dropdown"
											id="navbarDropdownMenuLink"
											variant="default"
											className="m-0"
										>
											<span className="no-icon">Budget Usage</span>
										</Dropdown.Toggle>
										<Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
											<Dropdown.Item
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												Available Budget {budgetUsage.unUtilizedBudget}
											</Dropdown.Item>
											<Dropdown.Item
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												Used Budget {budgetUsage.utilizedBudget}
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								)
								} */}

									<li className="nav-item">
										<Link
											to={"/admin/login"}
											onClick={() => {
												auth.clearJWT(() => history.push("/"));
											}}
											className="nav-link"
										>
											Sign out
										</Link>
									</li>
								</>
							)}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
