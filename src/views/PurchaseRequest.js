import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import axios from "../axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getBudgetByDepartment } from "../budget/api-budget";
import auth from "../auth/auth-helper";
import { trackPromise } from 'react-promise-tracker';


const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (payload) => dispatch({ type: "UPDATE", payload: payload }),
  };
};

function PurchaseRequest({ handleUpdate }) {
  const init = {
    narration: "",
    expenseTypeId: "",
    products: [],
  };
  const initProduct = {
    name: '',
    quantity: '',
    amount: '',
    price: '',
    id: ''
  };
  const [inputList, setInputList] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [input, setInput] = useState(init);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(initProduct)

  useEffect(() => {
    fetchBudgets();
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    trackPromise(
      axios.get('/v1/vendor/product').then(res => {
        setProducts(res.data.data.data)
      })
    );
  }

  const fetchBudgets = () => {
    trackPromise (
      getBudgetByDepartment({
        departmentId: auth.isAuthenticated().user.departmentId,
      }).then((res) => {
        let data;
        console.log("newLog", res.data);
        if (res.data.data.length > 0) {
          data = res.data.data.map((datum) => {
            return {
              name: datum.expenseType.name,
              id: datum.expenseTypeId,
            };
          });
        } else {
          data = [];
        }
        console.log(data, "final datat");

        setExpenseTypes(data);
      })
    );
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    let products = input.products;
    products.splice(index, 1);
    setInput({...input, products});
  };

  const handleOnEdit = (index) => {
    let products = input.products;
    const product = products[index];
    setProduct(product);
    products.splice(index, 1);
    setInput({...input, products});
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    let products = input.products;
    products.push(product);
    setInput({...input, products});
    setProduct(initProduct);
  };
  // handle click event of the Make Purchase button
  const handlePurchase = (e) => {
    e.preventDefault();
    const total = input.products.reduce((a, c) => a + parseFloat(c.amount), 0).toString()
    const data = {
      ...input,
      requestedBy: auth.isAuthenticated().user.email.split("@")[0],
      departmentId: auth.isAuthenticated().user.departmentId,
      userId: auth.isAuthenticated().user.id,
      amount: total
    }
    console.log(data);
    trackPromise(
      axios
        .post("/v1/log", [data])
        .then((res) => {
          toast.success(res.data.message);
          setInput(init);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
    );
  };

  const handleInputChange = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleProductChange = ({ target }) => {
    if (target.name == 'name') {
      const product = products.find(p => p.id == target.value);
      setProduct({
        name: product.name,
        price: product.price,
        quantity: 1,
        id: product.id,
        amount: product.price
      })
    } 
    if (target.name == 'quantity') {
      setProduct({...product,
        quantity: target.value,
        amount: product.price * target.value
      })
    } 
    // setProduct({ ...product, [target.name]: target.value });
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
                  <Col md={{ span: 12 }}>
                    {expenseTypes.length === 0 && (
                      <p className="text-danger">
                        Budget not available yet.Purchase request cannot be
                        raised at the moment
                      </p>
                    )}{" "}
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

                      <Form.Group controlId="expenseType">
                        <Form.Label>Expense Type</Form.Label>
                        <Form.Control
                          as="select"
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

                      <Row>
												<Col md="3">
													<Form.Group>
														<select
															className="form-control"
															name="name"
															value={product.id}
															onChange={handleProductChange}
														>
															<option>Choose Item</option>
															{products.map((e, key) => {
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
														{/* <label>Quantity</label> */}
														<Form.Control
															placeholder="Qty"
															type="number"
															name="quantity"
															value={product.quantity}
															onChange={handleProductChange}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col md="3">
													<Form.Group>
														{/* <label>Amount</label> */}
														<Form.Control
															placeholder="Amount"
															type="number"
															value={product.amount}
															readOnly
														></Form.Control>
													</Form.Group>
												</Col>
												<Col  md="4">
														{/* {inputList.length - 1 === i && ( */}
															<Button
																className="btn-fill ml-2"
																variant="info"
																onClick={handleAddClick}
															>
																Add
															</Button>
														{/* )} */}
												</Col>
											</Row>

                      {input.products.length > 0 && (
                        <Row>
                      <Col md="12">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {input.products.map((list, index) => (
                              <tr key={index}>
                                <td>{list.name}</td>
                                <td>{list.quantity}</td>
                                <td>{list.amount}</td>
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
                      </Col>
                    </Row>
                  )}
              
                      
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
                      <Button
                        disabled={expenseTypes.length === 0}
                        className="btn-fill"
                        type='submit'
                        variant="info"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  
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
