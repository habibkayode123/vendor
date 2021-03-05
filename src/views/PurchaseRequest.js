import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col, Table } from "react-bootstrap";
import axios from '../axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {getBudgetByDepartment} from "../budget/api-budget";
import auth from '../auth/auth-helper';


const mapDispatchToProps = dispatch => {
	return {
	  handleUpdate: (payload) => dispatch({ type: 'UPDATE', payload: payload })
	}
  };

function PurchaseRequest({handleUpdate}) {
	const init = {
		narration: '',
		amount: '',
		expenseTypeId: ''
	};
	const [inputList, setInputList] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [expenseTypes, setExpenseTypes] = useState([]);
	const [input, setInput] = useState(init);

	useEffect(() => {
		// fetchVendors();
		fetchBudgets();
	}, []);

	const fetchBudgets = () => {
        getBudgetByDepartment({
            departmentId: auth.isAuthenticated().user.departmentId
        }).then(res => { console.log("newLog",res);
            const data = res.data.map(datum => {
				return {
					name: datum.expenseType.name,
					id: datum.expenseTypeId
				}
			});
            setExpenseTypes(data);
        })
	}
	
	const fetchVendors = () => {
        axios.get('/v1/vendor').then(res => {
            setVendors(res.data.data);
        })
    }

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleOnEdit = (index) => {
		const list = [...inputList];
		const item = list[index];
		setInput(item);
		list.splice(index, 1);
		setInputList(list);
	}

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, input]);
		setInput(init);
	};
	// handle click event of the Make Purchase button
	const handlePurchase = () => {
		const data = inputList.map((list)=> {
			return {
				amount: list.amount,
				narration: list.narration,
				expenseTypeId: list.expenseTypeId,
				requestedBy: auth.isAuthenticated().user.email.split('@')[0],
				departmentId: auth.isAuthenticated().user.departmentId
			}
		});

		const newData = data.filter(item => item.amount != 0);
		axios.post('/v1/log', newData).then((res) => {
			toast.success(res.data.message);
			setInput(init)
			setInputList([]);
		}).catch(err => {
			toast.error(err.response.data.message);
		});
	};

	const handleInputChange = ({target}) => {
		// const list = [...inputList];
		// if (name === "vendorId") {
		// 	const vendor = vendors.find((vendor) => vendor.id == value);
		// 	list[index]["products"] = vendor.products
		// }
		// if (name === "name") {
		// 	const price = list[index]["products"].find(product => product.name === value).price;
		// 	list[index]["amount"] = price;
		// 	list[index]["quantity"] = 1;
		// } else if (name === "quantity") {
		// 	const price = list[index]["products"]
		// 		.find(product => product.name === list[index]["name"]).price;
			
		// 	list[index]["amount"] = price * value;
		// }

		// list[index][name] = value;
		setInput({...input, [target.name]: target.value});
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Purchase Request</Card.Title>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col md={{span: 4}}>
								<Form onSubmit={handlePurchase}>
									<Form.Group controlId="narration">
										<Form.Label>Narration</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											name="narration"
											value={input.narration}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId="amount">
										<Form.Label>Amount</Form.Label>
										<Form.Control
											type="number"
											placeholder="Enter Amount"
											name="amount"
											value={input.amount}
											onChange={handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId="expenseType">
										<Form.Label>Expense Type</Form.Label>
										<Form.Control as="select"
											name="expenseTypeId"
											value={input.expenseTypeId}
											onChange={handleInputChange}
										>
											<option>Choose</option>
											{expenseTypes.map((e, key) => {
												return (
													<option value={e.id} key={key}>
														{e.name}
													</option>
												);
											})}
										</Form.Control>
									</Form.Group>
									{/* {inputList.map((x, i) => {
										return (
											<Row key={i}>
												<Col  md="3">
													<Form.Group>
														<select
															className="form-control"
															name="vendorId"
															value={x.vendorId}
															onChange={handleInputChange(i)}
														>
															<option>Choose Vendor</option>
															{expenseTypes.map((e, key) => {
																return (
																	<option value={e.id} key={key}>
																		{e.name}
																	</option>
																);
															})}
														</select>
													</Form.Group>
												</Col>
												<Col  md="2">
													<Form.Group>
														<select
															className="form-control"
															name="name"
															value={x.name}
															onChange={handleInputChange(i)}
														>
															<option>Choose Item</option>
															{x.products.map((e, key) => {
																return (
																	<option value={e.name} key={key}>
																		{e.name}
																	</option>
																);
															})}
														</select>
													</Form.Group>
												</Col>
												<Col  md="1">
													<Form.Group>
														<label>Quantity</label>
														<Form.Control
															placeholder="Qty"
															type="number"
															name="quantity"
															value={x.quantity}
															onChange={handleInputChange(i)}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col  md="2">
													<Form.Group>
														<label>Amount</label>
														<Form.Control
															placeholder="Amount"
															type="number"
															value={x.amount}
															readOnly
														></Form.Control>
													</Form.Group>
												</Col>
												<Col  md="3">
														{inputList.length !== 1 && (
															<Button
																className="btn-fill"
																variant="info"
																onClick={() => handleRemoveClick(i)}
															>
																Remove
															</Button>
														)}
													
														{inputList.length - 1 === i && (
															<Button
																className="btn-fill ml-2"
																variant="info"
																onClick={handleAddClick}
															>
																Add More
															</Button>
														)}
												</Col>
											</Row>
										);
									})} */}
									<Button className="btn-fill" onClick={handleAddClick} variant="info">
										Add
									</Button>
								</Form>
								</Col>
								{inputList.length > 0 &&
								<Col md="8">
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>Narration</th>
													<th>Amount</th>
													<th>Expense Type</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{inputList.map((list, index) => (
													<tr key={index}>
														<td>{list.narration}</td>
														<td>{list.amount}</td>
														<td>{expenseTypes.find(e => e.id == list.expenseTypeId).name}</td>
														<td>
															<Button
																className="mr-1"
																variant="danger"
																onClick={() => handleRemoveClick(index)}
															>
																Remove
															</Button>
													
															<Button
																variant="info"
																onClick={() => handleOnEdit(index)}
															>
																Edit
															</Button>
														</td>
													</tr>
												))}
											</tbody>
										</Table>

										<Button onClick={handlePurchase}>Make Request</Button>
									</Col>
								}
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
export default connect(null, mapDispatchToProps)(PurchaseRequest);
