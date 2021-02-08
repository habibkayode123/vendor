import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import auth from "../auth/auth-helper";
import { additionalBudgetUpdate, read } from "./api-budget";
import { Redirect } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Container, Row, Col } from "react-bootstrap";

const TopUpBudget = ({ match }) => {
	const [departmentValue, setDepartmentValue] = useState("");
	const [departmentName, setDepartmentName] = useState("");
	const [budgetTypeValue, setBudgetTypeValue] = useState("");
	const [budgetTypeName, setBudgetTypeName] = useState("");
	const [amount, setAmount] = useState(0);
	const [topUpAmount, setTopUpAmount] = useState(0);

	const [startDateValue, setStartDate] = useState(new Date());
	const [endDateValue, setEndDate] = useState(new Date());
	const [values, setValues] = useState({
		department: "",
		amount: "",
		password: "",
		redirectToBudgetList: false,
		error: "",
	});
	// const jwt = auth.isAuthenticated();
	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};
	const handleTopUpAmountChange = (e) => {
		console.log(e.target.value);
		setTopUpAmount(e.target.value);
	};
	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		read(
			{
				budgetId: match.params.budgetId,
			},
			signal
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.errors });
			} else {
				setDepartmentValue(data.departmentId);
				setDepartmentName(data.dept.name);
				setAmount(data.amount);
				setStartDate(data.startDate);
				setBudgetTypeName(data.budgetType.name);
				setBudgetTypeValue(data.budgetType.id);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.budgetId]);

	const onFormSubmit = (e) => {
		e.preventDefault();
		// console.log("budget Type value", budgTypeValue);
		const updateBudget = {
			amount:topUpAmount || undefined,
		};
		console.log("Amount Value", amount);
		console.log("StartDateValue", startDateValue);
		additionalBudgetUpdate(
			{
				budgetId: match.params.budgetId,
			},
			updateBudget
		).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error });
			} else {
				console.log("datasss", data);
				setValues({ ...values, error: "", redirectToProfile: true });
			}
		});
	};

	if (values.redirectToProfile) {
		// return <Redirect to={"admin/budget/" + values.budgetId} />;
		return <Redirect to="/admin/budget" />;
	}
	return (
		<>
			<Container fluid>
				<Row>
					<Col md="2"></Col>
					<Col md="8">
						<Card>
							<Card.Header>
								<Card.Title as="h3">TopUp Budgets</Card.Title>
							</Card.Header>
							<Card.Body>
								<>
									<Form onSubmit={onFormSubmit}>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>Department (disabled)</label>
													<Form.Control
														defaultValue="None"
														disabled
														placeholder="Company"
														type="text"
														id={departmentValue}
														name={departmentValue}
														value={departmentName}
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>Start Date (disabled)</label>
													<Form.Control
														defaultValue="None"
														type="text"
														name="startDate"
														onChange={handleStartDateChange}
														placeholder="Start Date"
														value={new Date(startDateValue).toLocaleDateString(
															undefined,
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															}
														)}
														readOnly
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>End Date (disabled)</label>
													<Form.Control
														defaultValue="Mike"
														type="text"
														name="startDate"
														onChange={handleStartDateChange}
														placeholder="End Date"
														value={new Date(endDateValue).toLocaleDateString(
															undefined,
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															}
														)}
														readOnly
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>Amount</label>
													<Form.Control
														defaultValue="0"
														className="form-control"
														type="number"
														value={amount}
														// onChange={handleAmountChange}
														readonly
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>TopUp Amount</label>
													<Form.Control
														defaultValue="0"
														className="form-control"
														type="number"
														value={topUpAmount}
														onChange={handleTopUpAmountChange}
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col className="pr-1" md="5">
												<Form.Group>
													<label>BudgetType (disabled)</label>
													<Form.Control
														defaultValue="None"
														disabled
														placeholder="Company"
														type="text"
														onChange={handleChange}
														id={budgetTypeValue}
														name={budgetTypeValue}
														value={budgetTypeName}
														readOnly
													></Form.Control>
												</Form.Group>
											</Col>
										</Row>

										<button className="btn btn-primary">TopUp Budget</button>
									</Form>
								</>
							</Card.Body>
						</Card>
					</Col>
					<Col md="2"></Col>
				</Row>
			</Container>
		</>
	);
};

export default TopUpBudget;
