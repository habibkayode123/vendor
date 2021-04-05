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
	Table,
	Modal,
	Form,
	Button
} from "react-bootstrap";
import CsvImport from '../components/CsvImport';
import axios from '../axios';
import { toast } from 'react-toastify';
import {numberWithCommas} from '../helpers';
import { list } from '../department/api-dept';
import { connect } from 'react-redux';
import { create, getBudgetTypeList, additionalBudgetUpdate } from "./api-budget";
import { getBudgetByDepartment } from './api-budget';
import {herouke} from '../url';
import {trackPromise} from 'react-promise-tracker';

const mapDispatchToProps = dispatch => {
	return {
	  handleUpdate: (payload) => dispatch({ type: 'UPDATE', payload: payload })
	}
};

function Budget(props) {
	const init = {
		name: '',
		amount: '',
		departmentId: '',
		budgetTypeId: '',
		startDate: '',
		endDate: '',
		expenseTypeId: '',
		budgetAvailability: ''
	};
	const [show, setShow] = useState(false);
	const [showTopUp, setShowTopUp] = useState(false);
	const [budgets, setBudgets] = useState([]);
	const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [sorting, setSorting] = useState({ field: "", order: "" });
	const [selectedFile, setSelectedFile] = useState(null);
	const [needsReload, setNeedsReload] = useState(true);
	const [values, setValues] = useState(init);
	const [departments, setDepartments] = useState([]);
	const [budgetTypes, setBudgetTypes] = useState([]);
	const [expenseTypes, setExpenseTypes] = useState([]);
	const ITEMS_PER_PAGE = 10;
	const jwt = auth.isAuthenticated();

	const headers = [
		{ name: "#", field: "id" },
		{ name: "Department", field: "departmentId", sortable: true },
		// { name: "Budget Type", field: "budgetTypeId", sortable: true },
		{ name: "Amount", field: "amount", sortable: true },
		{ name: "Start Date", field: "startDate", sortable: true },
		{ name: "End Date", field: "endDate", sortable: true },
		{ name: "", field: "", sortable: false },
	];

	const handleOnChange = ({target}) => {
        setValues({...values, [target.name]: target.value});
	};
	
	const handleTopUpShow = (uuid) => {
		const budget = budgets.find(budget => budget.id == uuid);
		setValues({
			id: budget.id,
			...values
		})
		setShowTopUp(true);
	}
	const handleTopUpClose = () => {
		setShowTopUp(false);
		handleClose();
	}
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		setValues(init);
	}

	const updateBudgetP = (signal) => {
		getBudgetByDepartment(
			{
				departmentId: auth.isAuthenticated().user.departmentId
			},
			signal
		).then((data) => {
			
				props.handleUpdate(data.data[0]);
			
		})
	}

	const handleTopUp = (e) => {
		e.preventDefault();
		const updateBudget = {
			amount: values.amount,
		};
		trackPromise(
		additionalBudgetUpdate(
			{
				budgetId: values.id,
			},
			updateBudget
		).then((data) => {
			if (data.error) {
				// console.log(data.error);
				// setValues({ ...values, error: data.error });
			} else {console.log(data);
				toast.success('Topup successful!');
				setNeedsReload(!needsReload);
				handleTopUpClose()
				updateBudgetP()
			}
		})
		)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		
		trackPromise(
		create(values).then((data) => {
			if (data.errors) {
				// console.log(data.errors);
				// setValues({ ...values, error: data.error });
			} else {
				// console.log("datasss", data);
				// setValues({ ...values, error: "", redirect: true });
				handleClose();
				toast.success('Budget Added Successfully');
				setNeedsReload(!needsReload);
				updateBudgetP();
			}
		})
		)
	}

	

	const fetchDepartments = (signal) => {
		list().then((data) => {
			console.log("fetchedDataDepartment",data)
			if (data && data.error) {
				console.log("Error", data.error);
			} else {
				setDepartments(data.data.data);
			}
		});
	};

	const fetchExpenseTypes = () => {
		axios.get('/expensecategory').then(res => {
			setExpenseTypes(res.data.expeseCat)
		})
	}

	const fetchBudgetTypes = () => {
		getBudgetTypeList().then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setBudgetTypes(data.data);
			}
		});
	}

	useEffect(() => {
		const getData = () => {
			trackPromise(
			fetch(herouke + "/api/budget", {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + jwt.token,
				},
			})
				.then((response) => response.json())
				.then((json) => {
					console.log("BudgetsJson",json)
					setBudgets(json.data);
				})
			)
		};
		getData();
		fetchDepartments();
		fetchBudgetTypes();
		fetchExpenseTypes();
	}, [needsReload]);

	const onFileUpload = (close) => {
		let data = new FormData();
		data.append('files', selectedFile);
		trackPromise(
		axios.post('/budgetUpload', data).then(res => {
			toast.success(res.data.message);
			setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		}).catch(err => {
			toast.error(err.response.data.errors ? err.response.data.errors : 'An error occurred');
			setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		})
		)
	};

	const isActionAllowed = action => {
		return true
	}

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
						.includes(search.toString().toLowerCase()) 
					// budget.budgetType.name.toLowerCase().includes(search.toLowerCase())
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
					<Col md="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<Card.Title as="h4">Budgets</Card.Title>
								<div className="buttons">
									<Button size="sm" className="mr-2" variant="info" onClick={handleShow}>
										Add
									</Button>
									{isActionAllowed('add-budget') && <CsvImport setFile={setSelectedFile} onUpload={onFileUpload} />}
									
								</div>
							</Card.Header>
							<Card.Body>
								<div className="row w-100">
									<div className="col mb-3 col-12">
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
										<table className="table">
											<TableHeader
												headers={headers}
												onSorting={(field, order) =>
													setSorting({ field, order })
												}
											/>
											<tbody>
												{budgetsData.map((budget, i) => (
													<tr key={i}>
														{/* <th scope="row">{comment.id}</th> */}
														<td>{((currentPage - 1) * ITEMS_PER_PAGE) + i + 1}</td>

														<td>{budget.dept.name}</td>
														{/* <td>{budget.budgetType.name}</td> */}
														<td>{numberWithCommas(budget.amount)}</td>
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
															<Button size="sm" variant="success" onClick={() => handleTopUpShow(budget.id)}>Topup</Button>
															{/* {isActionAllowed('top-up') && <Link
																to={"/admin/bud/additionalBudget/" + budget.id}
																key={i}
															>
																<i
																	className="fa fa-pencil-square-o"
																	aria-hidden="true"
																></i>
															</Link>} */}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</Card.Body>
						</Card>
						<Modal show={show} onHide={handleClose} size="lg">
							<Modal.Header closeButton>
								<Modal.Title>Add Budget</Modal.Title>
							</Modal.Header>

							<Form onSubmit={handleSubmit}>
							<Modal.Body>
							<Row>
							<Col md="6">
								<Form.Group>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										name="name"
										onChange={handleOnChange}
										placeholder="Name"
										value={values.name}
									/>
								</Form.Group>
								<Form.Group controlId="role">
									<Form.Label>Department</Form.Label>
									<Form.Control as="select"
										value={values.departmentId}
										onChange={handleOnChange}
										name="departmentId"
									>
										<option value="">Select Department</option>
										{
											departments.map((item, i) => (
												<option value={item.id} key={item.id}>
													{item.name}
												</option>
												))
										};
									</Form.Control>
								</Form.Group>
								<Form.Group controlId="expenseType">
									<Form.Label>Expense Type</Form.Label>
									<Form.Control as="select"
										value={values.expenseTypeId}
										onChange={handleOnChange}
										name="expenseTypeId"
									>
										<option value="">Select</option>
										{
											expenseTypes.map((item, i) => (
												<option value={item.id} key={item.id}>
													{item.name}
												</option>
												))
										};
									</Form.Control>
								</Form.Group>
								<Form.Group controlId="availability">
									<Form.Label>Availability</Form.Label>
									<Form.Control as="select"
										value={values.budgetAvailability}
										onChange={handleOnChange}
										name="budgetAvailability"
									>
										<option value="">Select</option>
										<option value="Monthly">Monthly</option>
										<option value="Quarterly">Quarterly</option>
										<option value="Annual">Annual</option>
									</Form.Control>
								</Form.Group>
								</Col>
								<Col md="6">
								<Form.Group controlId="startDate">
									<Form.Label>Start Date</Form.Label>
									<Form.Control
										type="date"
										name="startDate"
										onChange={handleOnChange}
										placeholder="Start Date"
										value={values.startDate}
									/>
								</Form.Group>
								<Form.Group controlId="endDate">
									<Form.Label>End Date</Form.Label>
									<Form.Control
										type="date"
										name="endDate"
										onChange={handleOnChange}
										placeholder="End Date"
										value={values.endDate}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Amount</Form.Label>
									<Form.Control
										min="1"
										step="1"
										type="number"
										name="amount"
										onChange={handleOnChange}
										placeholder="Amount"
										value={values.amount}
									/>
								</Form.Group>
								<Form.Group>
								<Form.Label>Budget Type</Form.Label>
									<Form.Control as="select"
										value={values.budgetTypeId}
										onChange={handleOnChange}
										name="budgetTypeId"
									>
										<option value="">Select Type</option>
										{
											budgetTypes.map((item, i) => (
												<option value={item.id} key={item.id}>
													{item.name}
												</option>
												))
										};
									</Form.Control>
								</Form.Group>	
							</Col>
							</Row>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Modal.Footer>

						</Form>
						</Modal>
						<Modal show={showTopUp} onHide={handleTopUpClose}>
							<Modal.Header closeButton>
								<Modal.Title>Top Up</Modal.Title>
							</Modal.Header>

							<Form onSubmit={handleTopUp}>
							<Modal.Body>
								<Form.Group>
									<Form.Label>Amount</Form.Label>
									<Form.Control
										min="10"
										step="1"
										type="number"
										name="amount"
										required
										onChange={handleOnChange}
										placeholder="Amount"
										value={values.amount}
									/>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Modal.Footer>

						</Form>
						</Modal>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default connect(null, mapDispatchToProps)(Budget);
