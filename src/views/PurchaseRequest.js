// PurchaseRequest.js;

import React, { useState, useEffect } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { create, getVendors } from "../purchaseRequest/api-purchase";

function PurchaseRequest() {
	const [damn, setDamns] = useState({
		error: "",
	});
	const [values, setValues] = useState([]);
	const [inputList, setInputList] = useState([
		{ items: [], vendorId: "", name: "", quantity: 0, amount: 0 },
	]);

	const [vendor, setVendor] = useState(null);
	const [selectedVendor, setSelectedVendor] = useState("");
	const [vendors, setVendors] = useState([
		{
            vendorName: 'Jumia',
            vendorId: 2
        },
        {
            vendorName: 'Jiji',
            vendorId: 1
        }
	]);
	const [price, setPrice] = useState(null);
	const [name, setName] = useState(null);
	const [items, setItems] = useState([]);
	const [nameList, setNameList] = useState([]);
	const [dataToSend,setDataToSend]= useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		getVendors(signal).then((data) => {
			if (data) {
				console.log("Cashmere", data.vendors);
				setVendors(data.vendors);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

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
			{ items: [], vendorId: "", name: "", quantity: 0, amount: 0 },
		]);
	};
	// handle click event of the Make Purchase button
	const handlePurchase = (e) => {
		e.preventDefault();
		console.log("Submitting these data to the backend", inputList);
		console.log(inputList);
		const index = inputList.map((list)=>{
			return {"amount":list.amount,"quantity":parseInt(list.quantity),"name":list.name,"vendorId":list.vendorId}
		});
		setDataToSend(index)
		console.log("to send",index); 


		create(index).then((data) => {
			if (data.message) {
				console.log("data from datatbase",data);
				setDamns({ ...values, error: data.message });
			} else {
				console.log("data from rfq",data);
				setDams({ ...values, error: "" });
			}
		});
	};

	const handleInputChange = (name, index) => (e) => {
		// const value = name === "vendor" ? e : e.target.value;
		const value = e.target.value;
		console.log("name", name);
		console.log("value", value);
		if (name === "vendorId") {
			console.log("vendors to log", vendors);
			const shit = vendors.find((vendor) => vendor.vendorId == value);
			console.log("mad oo", shit.items);
			// list[index][name] =shit.items;
			const list = [...inputList];
			list[index]["items"] = shit.items;
			console.log("Gawu", list);
			console.log("Arrararara", list[index]["items"]);
		}
		if (name === "name") {
			const list = [...inputList];
			const pprice = list[index]["items"].find((item) => item.name === value)
				.price;
			console.log("selected item price to log", pprice);

			list[index]["amount"] = pprice;
			console.log(list[index]);
		} else if (name === "quantity") {
			const list = [...inputList];
			list[index]["amount"] = list[index]["amount"] * value;
		}

		const list = [...inputList];
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
											<Row>
												<Col className="px-1" md="3">
													<Form.Group>
														<select
															className="form-control"
															name="vendorId"
															// value={selectedVendor}
															onChange={handleInputChange("vendorId", i)}
														>
															<option>--Choose Vendors--</option>
															{vendors.map((e, key) => {
																return (
																	<option value={e.vendorId} key={key}>
																		{e.vendorName}
																	</option>
																);
															})}
														</select>
													</Form.Group>
												</Col>
												<Col className="px-1" md="3">
													<Form.Group>
														<select
															className="form-control"
															name="name"
															onChange={handleInputChange("name", i)}
														>
															<option>--ChooseItems--</option>
															{/* {items.map((e, key) => {
																return (
																	<option value={e.name} key={key}>
																		{e.name}
																	</option>
																);
															})} */}

															{x.items.map((e, key) => {
																return (
																	<option value={e.name} key={key}>
																		{e.name}
																	</option>
																);
															})}
														</select>
													</Form.Group>
												</Col>
												<Col className="pl-1" md="1">
													<Form.Group>
														{/* <label>Quantity</label> */}
														<Form.Control
															placeholder="Quantity"
															type="number"
															onChange={handleInputChange("quantity", i)}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col className="pl-1" md="1">
													<Form.Group>
														{/* <label>Amount</label> */}
														<Form.Control
															placeholder="Amount"
															type="number"
															// onChange={handleInputChange("amount", i)}
															value={x.amount}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col className="pl-1" md="2">
													<Form.Group>
														{inputList.length !== 1 && (
															// 												<>
															<Button
																className="btn-fill pull-right"
																type="submit"
																variant="info"
																onClick={handleRemoveClick}
															>
																Remove
															</Button>
														)}
													</Form.Group>
												</Col>
												<Col className="pl-2" md="1">
													<Form.Group>
														{inputList.length - 1 === i && (
															<Button
																className="btn-fill pull-right"
																type="submit"
																variant="info"
																onClick={handleAddClick}
															>
																AddItem
															</Button>
														)}
													</Form.Group>
												</Col>
											</Row>
										);
									})}
									<Button className="btn-fill" type="submit" variant="info">
										Make Purchase
									</Button>
									<div className="clearfix"></div>
									{/* <div style={{ marginTop: 30 }}>
										{JSON.stringify(inputList)}
									</div> */}
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}
export default PurchaseRequest;
