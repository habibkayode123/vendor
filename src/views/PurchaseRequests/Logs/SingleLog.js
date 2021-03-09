import React, { useEffect, useState } from "react";
import axios from "../../../axios";
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
import { numberWithCommas } from "../../../helpers";
import auth from "auth/auth-helper";
import { toast } from "react-toastify";

function SingleLog(props) {
  console.log("props...", props);
  const init = {
    vendorId: "",
    name: "",
    quantity: "",
    amount: "",
  };
  const [log, setLog] = useState({ amount: 0 });
  const [departmentId, setDepartmentId] = useState("");
  const [vendors, setVendors] = useState([]);
  const [values, setValues] = useState(init);
  const [items, setItems] = useState([]);
  const [expenseTypeId, setExpenseTypeId] = useState("");

  const handleOnChange = ({ target }) => {
    console.log("Targets", target);
    setValues({ ...values, [target.name]: target.value });
  };

  const fetchLog = () => {
    const uuid = props.match.params.uuid;
    console.log(props, "all Props");
    axios.get(`/v1/log/${uuid}`).then((res) => {
      console.log("singleLog", res.data.data);
      console.log("singleLogDeptId", res.data.data.data.departmentId);
      // setExpenseTypeId(res.data.data.data.expenseTypeId);
      setExpenseTypeId(props.location.state.expenseTypeId);
      setLog(res.data.data.data);
      setDepartmentId(props.location.state.departmentId);
    });
  };

  const fetchVendors = () => {
    axios.get("/v1/vendor").then((res) => {
      console.log(res.data, "vendor");
      setVendors(res.data.data);
    });
  };

  const handleSubmit = () => {
    console.log("datalogs", items);
    auth;
    const data = items.map((item) => {
      const newItems = [
        {
          quantity: item.quantity,
          name: item.name,
          amount: item.amount,
        },
      ];

      return {
        vendorId: item.vendorId,
        items: newItems,
      };
    });
    console.log(items, "items");
    const payload = {
      total: items.reduce((a, c) => a + parseFloat(c.amount), 0).toString(),
      logId: log.id,
      departmentId: departmentId,
      expenseTypeId: expenseTypeId,
      orders: data,
      requestedBy: auth.isAuthenticated().user.email.split("@")[0],
      userId: auth.isAuthenticated().user.id,
    };

    // console.log("propsBudget",props)
    props.setBudgets(payload.total, expenseTypeId);
    console.log("Payloads...", payload);
    axios
      .post("/v1/request", payload)
      .then((res) => {
        console.log("res/v1/request", res);
        toast.success(res.data.message);
        setItems([]);
        setValues(init);
      })
      .catch((err) => {
        console.log("Payload From singleLog", payload, err.response);
      });
  };

  const handleAddItem = () => {
    let newValues = { ...values, amount: log.amount };
    setItems([...items, newValues]);
    setValues(init);
  };

  useEffect(() => {
    fetchLog();
    fetchVendors();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title className="d-flex justify-content-between">
                <h4>Purchase Request Log</h4>
                {/* <div className="">
                                    {!request.reviewDate && isActionAllowed('review') && (<Button size="sm" onClick={() => handleShow('Review')} >Review</Button>)}
                                    {
                                        isActionAllowed('approve') &&
                                        request.reviewStatus == 1 
                                        && !request.approvalStatus
                                        && (
                                            <>
                                            <Button variant="success" size="sm" className="mr-2" onClick={() => handleShow('Approve')}>Approve</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleShow('Decline')}>Decline</Button>
                                            </>
                                        )
                                    }
                                    {
                                        isActionAllowed('quote') && request.approvalStatus == 1 && (

                                            <Button variant="info" size="sm" onClick={handleShowQuotModal}>Request For Quotation</Button>
                                        )
                                    }
                                    
                                    {
                                        isActionAllowed('invoice') && request.approvalStatus == 1 && (
                                            
                                            <Button variant="success" size="sm">Print Invoice</Button>
                                        )
                                    }
                                </div> */}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="3">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Narration:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{log.narration}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="3">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Amount:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{numberWithCommas(log.amount)}</Card.Text>
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
                        {new Date(log.createdAt).toLocaleDateString()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <h5>Raise Request</h5>
                </Col>
                <Col md="4">
                  <Form>
                    <Form.Group controlId="vendorId">
                      <Form.Label>Vendor</Form.Label>
                      <Form.Control
                        as="select"
                        name="vendorId"
                        value={values.vendorId}
                        onChange={handleOnChange}
                      >
                        <option>Choose</option>
                        {vendors.map((e, key) => {
                          return (
                            <option value={e.id} key={key}>
                              {e.title}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                    {/* <Form.Group controlId="narration">
                                            <Form.Label>Vendor</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="narration"
                                                value={input.narration}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group> */}
                    <Form.Group controlId="item">
                      <Form.Label>Item</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        value={values.name}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Qty"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="amount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        value={log.amount}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                    <Button onClick={handleAddItem}>Add</Button>
                  </Form>
                </Col>
                {items.length > 0 && (
                  <Col md="8">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Item Name</th>
                          <th>Qty</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {vendors.find((v) => v.id == item.vendorId).title}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{numberWithCommas(item.amount)}</td>
                            {/* <td>
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
                                                    </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button onClick={handleSubmit}>Raise Request</Button>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleLog;
