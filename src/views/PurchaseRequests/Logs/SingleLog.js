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
import { trackPromise } from 'react-promise-tracker';

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
        setProducts(res.data.data.data.products)
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

  const handleSubmit = (e) => {console.log('Here');
    e.preventDefault();



    const data = products.map((item) => {
      const newItems = [
        {
          quantity: item.quantity,
          name: item.name,
          amount: item.price * parseInt(item.quantity)
        },
      ];

      return {
        vendorId: item.vendorId,
        items: newItems,
      };
    });

    const payload = {
      total: log.amount,
      logId: log.id,
      departmentId: departmentId,
      expenseTypeId: expenseTypeId,
      orders: data,
      requestedBy: auth.isAuthenticated().user.email.split("@")[0],
      userId: auth.isAuthenticated().user.id,
    };

    props.setBudgets(payload.total, expenseTypeId);

    axios
      .post("/v1/request", payload)
      .then((res) => {
        toast.success(res.data.message);
        setItems([]);
        setValues(init);
        history.push('/admin/purchase/request/logs');
      })
      .catch((err) => {
        toast.error(err.response.data.message)
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
                
              </Card.Title>
            </Card.Header>
            <Card.Body>
            
              <Row>
                <Col md="6">
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Narration:</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{log.narration}</Card.Text>
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
                      <Card.Text>
                        {log.departmentId}
                      </Card.Text>
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
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                              <th>Vendor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((list, index) => (
                              <tr key={index}>
                                <td>{list.name}</td>
                                <td>{list.quantity}</td>
                                <td>{list.quantity * list.price}</td>
                                <td>
                                  <Form.Control
                                    as="select"
                                    name="vendorId"
                                    value={list.vendorId}
                                    onChange={(e) => handleOnChange(e, index)}
                                    disabled={auth.isAuthenticated().user.role == 'Requestor'}
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
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    
                  )}
                  </Row>
                  {
                    auth.isAuthenticated().user.role !== 'Requestor' && <Button type="submit">Submit</Button>
                  }
                    
                    
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
