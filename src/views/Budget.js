import React, { useState, useMemo, useEffect } from "react";
import Pagination from "../components/Pagination/Pagination"
import { useLocation, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../components/Search/Search"
import TableHeader from "../components/TableHeader/TableHeader"
import auth from "../auth/auth-helper";
import {
	Card,
	Container,
	Row,
	Col,
} from "react-bootstrap";


export default function Budget() {
	const [budgets, setBudgets] = useState([]);
	const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sorting, setSorting] = useState({ field: "", order: "" });
	const ITEMS_PER_PAGE = 10;
	const jwt = auth.isAuthenticated();

	const headers = [
		// { name: "No#", field: "id" },
		{ name: "Department", field: "departmentId", sortable: true },
		{ name: "Budget Type", field: "budgetTypeId", sortable: true },
		{ name: "Amount", field: "amount", sortable: true },
		{ name: "Start Date", field: "startDate", sortable: true },
		{ name: "End Date", field: "endDate", sortable: true },
		{ name: "Top Up", field: "topup", sortable: false },
	];
	useEffect(() => {
		const getData = () => {
			fetch("http://localhost:3050/api/budget", {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + jwt.token,
				},
			})
				.then((response) => response.json())
				.then((json) => {
					setBudgets(json);
				});
		};
		getData();
	}, []);

	const budgetsData = useMemo(() => {
		let computedBudgets = budgets;

		if (search) {
			computedBudgets = computedBudgets.filter(
				(budget) =>
					// budget.name.toLowerCase().includes(search.toLowerCase()) ||

					budget.dept.name.toLowerCase().includes(search.toLowerCase()) ||
					budget.amount
						.toString()
						.toLowerCase()
						.includes(search.toString().toLowerCase()) ||
					budget.startDate
						.toString()
						.toLowerCase()
						.includes(search.toString().toLowerCase()) ||
					budget.endDate
						.toString()
						.toLowerCase()
						.includes(search.toString().toLowerCase()) ||
					budget.budgetType.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		setTotaltems(computedBudgets.length);

		//sorting budgets
		if (sorting.field) {
			const reversed = sorting.order === "asc" ? 1 : -1;
			computedBudgets = computedBudgets.sort(
				(a, b) =>
					reversed *
					a[sorting.field].toString().localeCompare(b[sorting.field].toString())
			);
		}
		//current Page Slice
		return computedBudgets.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [budgets, currentPage, search, sorting]);
	return (
		<>
			<Container fluid>
				<Row>
					<li className="nav-item">
						<NavLink
							to="/admin/bulkupload/budget"
							className="nav-link"
							activeClassName="active"
						>
							<i className={""} />
							<h3>Bulk Upload</h3>
						</NavLink>
					</li>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Budgets</Card.Title>
							</Card.Header>
							<Card.Body>
								<div className="row w-100">
									<div className="col mb-3 col-12 text-center ">
										<div className="row">
											<div className="col-md-6">
												<Pagination
													total={totalItems}
													itemsPerPage={ITEMS_PER_PAGE}
													currentPage={currentPage}
													onPageChange={(page) => setCurrentPage(page)}
												/>
											</div>
											<div className="col-md-6 d-flex flex-row-reverse">
												<Search
													onSearch={(value) => {
														setSearch(value);
														setCurrentPage(1);
													}}
													placeholder="Search budget"
												/>
											</div>
										</div>
										<table className="table table-striped">
											<TableHeader
												headers={headers}
												onSorting={(field, order) =>
													setSorting({ field, order })
												}
											/>
											<tbody>
												{budgetsData.map((budget, i) => (
													<tr>
														{/* <th scope="row">{comment.id}</th> */}
														{/* <td>{comment.name}</td> */}

														<td>{budget.dept.name}</td>
														<td>{budget.budgetType.name}</td>
														<td>{budget.amount}</td>
														<td>
															{new Date(budget.startDate).toLocaleDateString(
																undefined,
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</td>
														<td>
															{new Date(budget.endDate).toLocaleDateString(
																undefined,
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</td>
														<td>
															<Link
																to={"/admin/bud/additionalBudget/" + budget.id}
																key={i}
															>
																<i
																	className="fa fa-pencil-square-o"
																	aria-hidden="true"
																></i>
															</Link>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
