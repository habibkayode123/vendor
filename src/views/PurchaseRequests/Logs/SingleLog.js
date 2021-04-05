import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useHistory } from "react-router-dom";
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
import { trackPromise } from "react-promise-tracker";

function SingleLog(props) {
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
  const [products, setProducts] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);

  const handleOnChange = (e, i) => {
    let product = products[i];
    product.vendorId = e.target.value;
    products.splice(i, 1);
    setProducts([...products, product]);
  };

  const history = useHistory();

  const fetchLog = () => {
    const uuid = props.match.params.uuid;
    trackPromise(
      axios.get(`/v1/log/${uuid}`).then((res) => {
        setExpenseTypeId(props.location.state.expenseTypeId);
        setLog(res.data.data.data);
        setDepartmentId(props.location.state.departmentId);
        setProducts(res.data.data.data.products);
        console.log(res.data.data.data.products);
      })
    );
  };

  const fetchVendors = () => {
    axios.get("/v1/vendor").then((res) => {
      console.log(res.data, "vendor");
      setVendors(res.data.data);
    });
  };

  const handleSubmit = (e) => {
    console.log("Here");
    e.preventDefault();
    let vendorsTobeSend = vendorsList.map((i) => {
      let current = vendors.find((ele) => ele.id === i);
      return {
        name: current.name,
        id: current.id,
      };
    });

    const data = products.map((item) => {
      const newItems = [
        {
          quantity: item.quantity,
          name: item.name,
          amount: item.price * parseInt(item.quantity),
        },
      ];

      return {
        vendorId: item.vendorId,
        items: newItems,
      };
    });

    let itemTobeSend = products.map((item) => {
      return {
        quantity: item.quantity,
        name: item.name,
        amount: item.price * parseInt(item.quantity),
      };
    });

    console.log(
      {
        vendors: vendorsTobeSend,
        items: itemTobeSend,
      },
      "ordersss"
    );

    const payload = {
      total: log.amount,
      logId: log.id,
      departmentId: departmentId,
      expenseTypeId: expenseTypeId,
      // orders: data,
      order: {
        vendors: vendorsTobeSend,
        items: itemTobeSend,
      },
      requestedBy: auth.isAuthenticated().user.email.split("@")[0],
      userId: auth.isAuthenticated().user.id,
    };

    //    props.setBudgets(payload.total, expenseTypeId);
    console.log(payload, "my new payload");
    axios
      .post("/v1/request", payload)
      .then((res) => {
        toast.success(res.data.message);
        setItems([]);
        setValues(init);
        history.push("/admin/purchase/request/logs");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleAddItem = () => {
    let newValues = { ...values, amount: log.amount };
    setItems([...items, newValues]);
    setValues(init);

    props.history.push("/admin/purchase/request/logs");
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
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Balance:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{numberWithCommas(log.balance)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Amount:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{numberWithCommas(log.amount)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md="6">
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
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Department:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{log.departmentId}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      {products.length > 0 && (
                        <Col md="12">
                          <>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Quantity</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((list, index) => (
                                  <tr key={index}>
                                    <td>{list.name}</td>
                                    <td>{list.quantity}</td>
                                    <td>{list.quantity * list.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col md="12">
                        <Card className="p-3">
                          <Card.Title className="ml-1" as="h5">
                            Pick Vendor
                          </Card.Title>
                          <Card.Body>
                            <Form.Control
                              as="select"
                              name="vendorId"
                              value={vendorsList}
                              multiple={true}
                              onChange={(e) => {
                                setVendorsList((prev) => {
                                  let find = prev.find(
                                    (i) => i === e.target.value
                                  );
                                  if (find) {
                                    let newState = prev.filter(
                                      (ele) => ele !== e.target.value
                                    );
                                    return newState;
                                  }

                                  return [...prev, e.target.value];
                                });
                                //  handleOnChange(e, index);
                              }}
                              disabled={
                                auth.isAuthenticated().user.role == "Requestor"
                              }
                            >
                              <option>Choose</option>
                              {vendors.map((e, key) => {
                                return (
                                  <option value={e.id} key={key}>
                                    {e.name}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    {auth.isAuthenticated().user.role !== "Requestor" && (
                      <Button disabled={vendorsList.length <= 0} type="submit">
                        Submit
                      </Button>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SingleLog;
