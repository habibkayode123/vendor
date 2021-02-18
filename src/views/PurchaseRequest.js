// PurchaseRequest.js;

import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { create, getVendors } from "../purchaseRequest/api-purchase";
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
	const [inputList, setInputList] = useState([
		{ vendorId: "", name: "", quantity: 0, amount: 0, products: [] },
	]);
	const [vendors, setVendors] = useState([]);

	useEffect(() => {
		fetchVendors();
		// const abortController = new AbortController();
		// const signal = abortController.signal;
		// getVendors(signal).then((data) => {
		// 	if (data) {
		// 		console.log("Cashmere", data.vendors);
		// 		setVendors(data.vendors);
		// 	}
		// });
		// return function cleanup() {
		// 	abortController.abort();
		// };
	}, []);

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

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([
			...inputList,
			{ vendorId: "", name: "", quantity: 0, amount: 0, products: [] },
		]);
	};
	// handle click event of the Make Purchase button
	const handlePurchase = (e) => {
		e.preventDefault();
		const data = inputList.map((list)=> {
			return {"amount":list.amount,"quantity":parseInt(list.quantity),"name":list.name,"vendorId":list.vendorId}
		});
		const newData = data.filter(item => item.amount != 0);
		axios.post('/v1/request', newData).then((res) => {
			toast.success(res.data.message);
			setInputList([{ products: [], vendorId: "", name: "", quantity: 0, amount: 0 }]);
			const abortController = new AbortController();
		const signal = abortController.signal;
			getBudgetByDepartment(
				{
					departmentId: auth.isAuthenticated()
						? auth.isAuthenticated().user.departmentId
						: "cd29f9a5-73e6-4aa8-b8fe-7a0cad9b2142",
				},
				signal
			).then((data) => {
				
					handleUpdate(data.data[0]);
				
			})
		}).catch(err => {
			toast.error(err.response.data.message);
		});
	};

	const handleInputChange = (index) => (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const list = [...inputList];
		if (name === "vendorId") {
			const vendor = vendors.find((vendor) => vendor.id == value);
			list[index]["products"] = vendor.products
		}
		if (name === "name") {
			const price = list[index]["products"].find(product => product.name === value).price;
			list[index]["amount"] = price;
			list[index]["quantity"] = 1;
		} else if (name === "quantity") {
			const price = list[index]["products"]
				.find(product => product.name === list[index]["name"]).price;
			
			list[index]["amount"] = price * value;
		}

		list[index][name] = value;
		setInputList(list);
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
								<Form onSubmit={handlePurchase}>
									{inputList.map((x, i) => {
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
															{vendors.map((e, key) => {
																return (
																	<option value={e.id} key={key}>
																		{e.Title}
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
														{/* <label>Quantity</label> */}
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
														{/* <label>Amount</label> */}
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
															// 												<>
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
									})}
									<Button className="btn-fill" type="submit" variant="info">
										Make Purchase
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
export default connect(null, mapDispatchToProps)(PurchaseRequest);
