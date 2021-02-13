import React, { useState, useEffect } from "react";
import { list } from "../department/api-dept.js";
import { create, getBudgetTypeList } from "./api-budget";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Budget(props) {
	const [deptValue, setDeptValue] = useState([]);
	const [departmentValue, setDepartmentValue] = useState("");
	const [startDateValue, setStartDate] = useState("");
	const [endDateValue, setEndDate] = useState("");
	const [amount, setAmount] = useState(0);
	const [budgetTypeValue, setBudgetType] = useState([]);
	const [budgTypeValue, setBudgetTypeValue] = useState("");
	const [values, setValues] = useState({
		redirect: false,
		error: "",
	});

	const handleDepartmentChange = (e) => {
		setDepartmentValue(e.target.value);
	};

	const handleBudgetTypeChange = (e) => {
		setBudgetTypeValue(e.target.value);
	};
	const handleDobChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};
	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		list(signal).then((data) => {
			console.log("data", data);
			if (data && data.error) {
				console.log(data.error);
			} else {
				setDeptValue(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [values]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		getBudgetTypeList(signal).then((data) => {
			console.log("data23", data);
			if (data && data.error) {
				console.log(data.error);
			} else {
				setBudgetType(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);
	const onFormSubmit = (e) => {
		e.preventDefault();
		console.log("startDate value", startDateValue);
		console.log("startDate value", endDateValue);
		const budget = {
			amount: amount || undefined,
			departmentId: departmentValue || undefined,
			budgetTypeId: budgTypeValue || undefined,
			startDate: startDateValue || undefined,
			endDate: endDateValue || undefined,
		};

		console.log("budget to submit to backend", budget)

		create(budget).then((data) => {
			if (data.errors) {
				console.log(data.errors);
				setValues({ ...values, error: data.error });
			} else {
				console.log("datasss", data);
				setValues({ ...values, error: "", redirect: true });
			}
		});
	};

	if (values.redirect) {
		return <Redirect to={"/admin/budget"} />;
	}

	return (
		<>
			<Container fluid>
				<Row>
					{/* <Col md="0"></Col> */}
					<Col md="11">
						<Card>
							<Col md="1"></Col>
							<Col md="10">
								<Card.Header>
									<Card.Title as="h4">Create Budget</Card.Title>
								</Card.Header>
								<Card.Body>
									{values.error && (
										<div className="alert alert-danger" role="alert">
											{values.error}
										</div>
									)}
									{values.success && (
										<div className="alert alert-success" role="alert">
											Budget Added Successfully
										</div>
									)}
									<div className="select-inner">
										<form onSubmit={onFormSubmit}>
											
											<br />
											<Col className="px-1" md="5">
												<Form.Group>
													<label>Department</label>
													<select
														className="form-control"
														defaultValue={departmentValue}
														onChange={handleDepartmentChange}
													>
														<option>---Select Options ---</option>
														{deptValue.map((item, i) => {
															return (
																<>
																	<option value={item.id} key={item.id}>
																		{item.name}
																	</option>
																</>
															);
														})}
													</select>
												</Form.Group>
											</Col>
											
											<Row>
												<Col className="pr-1" md="5">
													<Form.Group>
														{/* <label>BudgetType (disabled)</label> */}
														<Form.Label>Start Date</Form.Label>
														<Form.Control
															type="date"
															name="startDate"
															onChange={handleDobChange}
															placeholder="Start Date"
															value={startDateValue}
														/>
													</Form.Group>
												</Col>
											</Row>
											
											<Row>
												<Col className="pr-1" md="5">
													<Form.Group>
														{/* <label>BudgetType (disabled)</label> */}
														<Form.Label>End Date</Form.Label>
														<Form.Control
															type="date"
															name="end_date"
															onChange={handleEndDateChange}
															placeholder="End Date"
															value={endDateValue}
														/>
													</Form.Group>
												</Col>
											</Row>
										
											<Row>
												<Col className="pr-1" md="5">
													<Form.Group>
														{/* <label>BudgetType (disabled)</label> */}
														<Form.Label>Amount</Form.Label>
														<Form.Control
															min="1"
															step="1"
															type="number"
															name="amount"
															onChange={handleAmountChange}
															placeholder="Amount"
															value={amount}
														/>
													</Form.Group>
												</Col>
											</Row>
										
											<Col className="px-1" md="5">
												<Form.Group>
													<label>BudgetType</label>
													<select
														className="form-control"
														defaultValue={budgTypeValue}
														onChange={handleBudgetTypeChange}
													>
														<option>---Select Options ---</option>
														{budgetTypeValue.map((item, i) => {
															return (
																<>
																	x
																	<option value={item.id} key={i}>
																		{item.name}
																	</option>
																</>
															);
														})}
													</select>
												</Form.Group>
											</Col>
											<br />
											<button className="btn btn-primary">Add Budget</button>
										</form>
									</div>
								</Card.Body>
							</Col>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
