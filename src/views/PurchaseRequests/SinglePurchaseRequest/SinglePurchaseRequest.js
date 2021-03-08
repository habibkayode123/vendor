import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";
import ItemsTable from "./ItemsTable";
import {
	Card,
	Container,
	Row,
	Col,
	Table,
	Button,
	Modal,
	Form,
	Accordion,
} from "react-bootstrap";
import QuotationModal from "./QuotationRequests";
import auth from "../../../auth/auth-helper";
import { numberWithCommas } from "../../../helpers";

function SinglePurchaseRequest({ match, actions }) {
	const [request, setRequest] = useState({});
	const [showModal, setShowModal] = useState({
		status: false,
		type: null,
	});
	const [showQuotModal, setShowQuotModal] = useState(false);
	const [reviewData, setReviewData] = useState({
		status: 1,
		comment: "",
	});
	const [shouldReload, setShouldReload] = useState(false);

	const handleOnChange = ({ target }) => {
		setReviewData({ ...reviewData, [target.name]: target.value });
	};

	const isActionAllowed = (action) => {
		return actions.includes(action);
	};

	const handleSubmitReview = () => {
		let data = {
			id: match.params.uuid,
		};

		let url;

		const userName = auth.isAuthenticated().user.email.split("@")[0];
		switch (showModal.type) {
			case "Review":
				url = "/v1/request/approveRequest";
				data = {
					...data,
					reviewedBy: userName,
					reviewComment: reviewData.comment,
					reviewStatus: reviewData.status,
				};
				break;
			default:
				url = "/v1/request/approveRequest";
				data = {
					...data,
					approvedBy: userName,
					approvalComment: reviewData.comment,
					approvalStatus: reviewData.status,
				};
		}

		axios.patch(url, data).then((res) => {
			toast.success(res.data.message);
			handleClose();
			setShouldReload(!shouldReload);
		});
	};

	const handleSubmitQuotation = () => {
		const dat = {
			requestedBy: auth.isAuthenticated().user.email.split("@")[0],
			requestId: match.params.uuid,
			caseId: request.caseId,
			amount: request.totalItemsAmount.toString(),
		};

		axios.post("/v1/request/requestForQuotation", dat).then((res) => {
			toast.success(res.data.message);
			setShowQuotModal(false);
			setShouldReload(!shouldReload);
		});
	};

	const fetchRequest = () => {
		const uuid = match.params.uuid;
		axios
			.get(`/v1/request/${uuid}`)

			.then((res) => {
				console.log("Requests", res);
				let data = res.data.data.data;
				if (data.reviewStatus == 1) {
					data.reviewStatusReadable = "Approved";
				}
				if (data.approvalStatus == 1) data.approvalStatusReadable = "Approved";

				if (data.reviewStatus == 2) {
					data.reviewStatusReadable = "Declined";
				}
				if (data.approvalStatus == 2) data.approvalStatusReadable = "Declined";
				console.log("dara from request single", data);
				let items = [];
				data.orders.forEach((order) => {
					let orde = order.items.map((item) => {
						return {
							...item,
							vendorId: order.vendorId,
						};
					});
					items = items.concat(orde);
				});
				data.items = items;
				// data.totalItemsAmount = data.items.reduce((a, item) => a + parseFloat(item.amount), 0);
				console.log("dara from request single after every every", data);
				setRequest(data);
			});
	};

	const handleShow = (type) => {
		setShowModal({
			status: true,
			type,
		});
		if (type == "Decline") setReviewData({ ...reviewData, status: 2 });
		else setReviewData({ ...reviewData, status: 1 });
	};

	const handleShowQuotModal = () => {
		setShowQuotModal(true);
	};

	const handleCloseQuotModal = () => {
		setShowQuotModal(false);
	};

	const handleClose = () => {
		setShowModal({
			status: false,
			type: null,
		});
		setReviewData({
			status: 1,
			comment: "",
		});
	};

	useEffect(() => {
		fetchRequest();
	}, [shouldReload]);

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title className="d-flex justify-content-between">
									<h4>Purchase Request: {request.caseId}</h4>
									<div className="">
										{!request.reviewDate && isActionAllowed("review") && (
											<Button size="sm" onClick={() => handleShow("Review")}>
												Review
											</Button>
										)}
										{isActionAllowed("approve") &&
											request.reviewStatus == 1 &&
											!request.approvalStatus && (
												<>
													<Button
														variant="success"
														size="sm"
														className="mr-2"
														onClick={() => handleShow("Approve")}
													>
														Approve
													</Button>
													<Button
														variant="danger"
														size="sm"
														onClick={() => handleShow("Decline")}
													>
														Decline
													</Button>
												</>
											)}
										{isActionAllowed("quote") && request.approvalStatus == 1 && (
											<Button
												variant="info"
												size="sm"
												onClick={handleShowQuotModal}
											>
												Request For Quotation
											</Button>
										)}

										{isActionAllowed("invoice") && request.approvalStatus == 1 && (
											<Button variant="success" size="sm">
												Print Invoice
											</Button>
										)}
									</div>
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col md="3">
										<Card>
											<Card.Header>
												<Card.Title as="h6">Case Id:</Card.Title>
											</Card.Header>
											<Card.Body>
												<Card.Text>{request.caseId}</Card.Text>
											</Card.Body>
										</Card>
									</Col>
									<Col md="3">
										<Card>
											<Card.Header>
												<Card.Title as="h6">Date:</Card.Title>
											</Card.Header>
											<Card.Body>
												<Card.Text>
													{new Date(request.createdAt).toLocaleDateString()}
												</Card.Text>
											</Card.Body>
										</Card>
									</Col>
								</Row>

								<Row>
									<Col md="6">
										<Accordion defaultActiveKey="0">
											<Card>
												<Accordion.Toggle
													as={Card.Header}
													eventKey="0"
													className="d-flex justify-content-between"
												>
													<h5>
														{request.reviewDate
															? `Review Status: ${request.reviewStatusReadable}`
															: "Awaiting Review"}
													</h5>
													{isActionAllowed("review") && !request.reviewDate && (
														<Button
															size="sm"
															onClick={() => handleShow("Review")}
														>
															Review Now
														</Button>
													)}
												</Accordion.Toggle>
												{request.reviewDate && (
													<Accordion.Collapse eventKey="0">
														<Card.Body>
															<ul>
																<li>Reviewed By: {request.reviewedBy}</li>
																<li>
																	Date:{" "}
																	{new Date(
																		request.reviewDate
																	).toLocaleDateString()}
																</li>
																<li>Comment: {request.reviewComment}</li>
															</ul>
														</Card.Body>
													</Accordion.Collapse>
												)}
											</Card>
										</Accordion>
									</Col>

									{request.reviewStatus == 1 && (
										<Col md="6">
											<Accordion defaultActiveKey="0">
												<Card>
													<Accordion.Toggle
														as={Card.Header}
														eventKey="0"
														className="d-flex justify-content-between"
													>
														<h5>
															{request.approvalStatus
																? `Approval Status: ${request.approvalStatusReadable}`
																: "Awaiting Approval"}
														</h5>
														{isActionAllowed("approve") &&
															!request.approvalStatus && (
																<div>
																	<Button
																		size="sm"
																		variant="success"
																		className="mr-2"
																		onClick={() => handleShow("Approve")}
																	>
																		Approve Now
																	</Button>
																	<Button
																		size="sm"
																		variant="danger"
																		onClick={() => handleShow("Decline")}
																	>
																		Decline Now
																	</Button>
																</div>
															)}
													</Accordion.Toggle>
													{request.approvalStatus && (
														<Accordion.Collapse eventKey="0">
															<Card.Body>
																<ul>
																	<li>Approved By: {request.approvedBy}</li>
																	<li>
																		Date:{" "}
																		{new Date(
																			request.approvalDate
																		).toLocaleDateString()}
																	</li>
																	<li>Comment: {request.approvalComment}</li>
																</ul>
															</Card.Body>
														</Accordion.Collapse>
													)}
												</Card>
											</Accordion>
										</Col>
									)}
								</Row>
								<Row>
									<Col md="5">
										<h5>Items</h5>
										<ItemsTable items={request.items} />
									</Col>

									{
										<Col md="7">
											<h5>Quotations</h5>

											<Table responsive>
												<thead>
													<tr>
														<th>#</th>
														<th>Amount</th>
														<th>Requested By</th>
														<th>Created At</th>
														{/* <th></th> */}
													</tr>
												</thead>
												<tbody>
													{request.quotations &&
														request.quotations.map((quot, i) => (
															<tr key={quot.id}>
																<td>{i + 1}</td>
																<td>{numberWithCommas(quot.amount)}</td>
																<td>{quot.requestedBy}</td>
																<td>
																	{new Date(
																		quot.createdAt
																	).toLocaleDateString()}
																</td>
																{/* <td>
                                                                <Button size='sm'>Review</Button>
                                                            </td> */}
															</tr>
														))}
												</tbody>
											</Table>
										</Col>
									}
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<Modal show={showModal.status} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{showModal.type} Request</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="reviewStatus">
							<Form.Label hidden={showModal.type !== "Review"}>
								Status
							</Form.Label>
							<Form.Control
								name="status"
								value={reviewData.status}
								as="select"
								onChange={handleOnChange}
								hidden={showModal.type !== "Review"}
							>
								<option value="1">Approve</option>
								<option value="2">Decline</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="reviewComment">
							<Form.Label>Comment</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="comment"
								value={reviewData.comment}
								onChange={handleOnChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmitReview}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
			<QuotationModal
				show={showQuotModal}
				onHide={handleCloseQuotModal}
				submit={handleSubmitQuotation}
				request={request}
			/>
		</>
	);
}

export default SinglePurchaseRequest;
