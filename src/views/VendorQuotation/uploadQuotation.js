import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getQuotationByCaseId, uploadQuotation } from "./api-vendorQuotation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "../../axios";
import auth from "../../auth/auth-helper";
import { numberWithCommas } from "../../helpers";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { trackPromise } from "react-promise-tracker";

import "react-day-picker/lib/style.css";
import { propTypes } from "react-bootstrap/esm/Image";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UploadQuotation = (props) => {
  const [file, setFile] = useState();
  const [caseId, setCaseId] = useState("");
  const [show, setShow] = useState(true);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [caseError, setCaseError] = useState(false);
  const [date, setDate] = useState();
  const [quotationExpired, setQuotationExpired] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
    totalAmount: 0,
  });
  const [formError, setformError] = useState({
    comment: true,
    totalAmount: true,
    file: true,
  });

  const submitCaseId = () => {
    if (caseId.length > 3) {
      trackPromise(
        getQuotationByCaseId(caseId)
          .then((data) => {
            if (new Date() > new Date(data.data.expiryDate)) {
              console.log("it was true");
              setQuotationExpired(true);
            } else {
              console.log("it was false");
              setQuotationExpired(false);
            }
            setOrders(data.data);
            console.log(data.data);
            setShow(false);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            toast.error("Invalid CaseId");
          })
      );
    } else {
      setCaseError(true);
    }
  };
  const handleCaseId = (e) => {
    setCaseId(e.target.value);
    console.log(caseId, e.target.value);
  };

  const handleDateChange = (e) => {
    console.log(new Date(e).toISOString(), "date change");
    let date = new Date(e).toISOString();
    setDate(date);
  };

  const handleOnChange = ({ target }) => {
    console.log("Targets", target);
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onFileChange = (event) => {
    event.preventDefault();
    const holder = event.target.files[0];
    setFile(holder);
  };

  const checkformError = () => {
    setformError({
      comment: false,
      totalAmount: false,
      caseId: false,
      file: false,
    });
    if (formData.totalAmount < 1)
      setformError((prev) => ({ ...prev, totalAmount: true }));
    if (formData.comment.length < 1)
      setformError((prev) => ({ ...prev, comment: true }));
    if (!file) setformError((prev) => ({ ...prev, file: true }));
    console.log(formError);
    if (formError.totalAmount || formError.comment || formError.file) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    let payload = new FormData();
    if (checkformError()) {
      console.log("mm");
      return;
    } else {
      let ordersNew = [
        {
          id: "861c4caf-384b-4151-ad07-2d6f37df46e7",
          items: [
            {
              amount: "500",
              name: "table",
              quantity: 2,
            },
            {
              amount: "20",
              name: "biro",
              quantity: 2,
              vendorId: "dcc3cfbe-8157-4fb7-b6ba-dad59ff7a664",
            },
            {
              amount: "1000",
              name: "car",
              quantity: 2,
            },
            {
              amount: "80",
              name: "laptop",
              quantity: 2,
            },
          ],
          status: false,
          vendorId: "dcc3cfbe-8157-4fb7-b6ba-dad59ff7a664",
        },
        {
          id: "9006aae8-b1ed-459e-8f31-8f2a5d0d2ed6",
          items: [
            {
              amount: "500",
              name: "table",
              quantity: 3,
            },
            {
              amount: "20",
              name: "pen",
              quantity: 3,
            },
            {
              amount: "1000",
              name: "car",
              quantity: 3,
            },
            {
              amount: "80",
              name: "laptop",
              quantity: 3,
            },
          ],
          status: false,
          vendorId: "dcc3cfbe-8157-4fb7-b6ba-dad59ff7a664",
        },
      ];

      console.log(orders, "orders");
      payload.append("comment", formData.comment);
      payload.append("totalAmount", formData.totalAmount);
      payload.append("quotationFile", file);
      payload.append("caseId", caseId);
      payload.append("deliveryDate", date);
      payload.append("orders", orders);
      trackPromise(
        uploadQuotation(payload)
          .then((res) => {
            console.log(res, "upload ");
            toast.success("Quotation upload successfully");
            setFormData({
              comment: "",
              totalAmount: 0,
            });
            setFile();
            console.log(res, "resp upload");
            //    props.history.push("/vendor");
          })
          .catch((err) => {
            console.log("Payload From singleLog", payload, err.response);
            toast.error("An error occur");
          })
      );
    }
  };
  if (quotationExpired)
    return (
      <div>
        <Container fluid>
          <Modal show={true}>
            <Modal.Header>
              <Modal.Title>Error Message</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Alert variant="danger">
                The submission of Quotation for this CASE ID:{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {caseId}
                </span>{" "}
                has expried
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  props.history.push("/vendor");
                }}
              >
                Back{" "}
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );

  return (
    <div>
      <Container fluid>
        {orders && (
          <>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title className="d-flex justify-content-between">
                      {orders && (
                        <>
                          <h4>Orders</h4>
                          <span>
                            Quotation Expiry Date
                            <span className="text-warning ml-3">
                              {`${String(
                                new Date(orders.expiryDate).getDate()
                              ).padStart(2, "0")} 
                        ${monthNames[new Date(orders.expiryDate).getMonth()]} 
                        ${new Date(orders.expiryDate).getFullYear()}`}
                            </span>
                          </span>
                        </>
                      )}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Subtitle className="mb-3">
                          {orders.requestId}
                        </Card.Subtitle>
                      </Col>
                    </Row>

                    {orders &&
                      orders.items &&
                      orders.items.length > 0 &&
                      orders.items.map((k) => (
                        <Row>
                          <Col>
                            <Card>
                              <Card.Header>
                                <Card.Title as="h4">{k.name}</Card.Title>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <span className="mr-3">Quantity</span>
                                  <span className="font-weight-bold badge badge-primary text-light p-2">
                                    {k.quantity}
                                  </span>
                                </Card.Text>

                                <Card.Text>
                                  <span className="mr-3">Narration</span>
                                  <span className="">{k.narration}</span>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header>
                    <Card.Title className="d-flex justify-content-between">
                      <h4>Upload Quotation</h4>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={onSubmit}>
                      <Form.Group controlId="caseId">
                        <Form.Label>Case ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="caseId"
                          value={caseId}
                          contentEditable={false}
                        />
                      </Form.Group>
                      <Form.Group controlId="caseId">
                        <Form.Label>Delivery Date</Form.Label>
                        <DayPickerInput
                          style={{ display: "block", padding: "12" }}
                          value={date}
                          onDayChange={handleDateChange}
                          placeholder="DD/MM/YYYY"
                          format="DD/MM/YYYY"
                        />
                      </Form.Group>

                      <Form.Group controlId="totalAmount">
                        <Form.Label>Total Amount</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Please enter total amount"
                          name="totalAmount"
                          value={formData.totalAmount}
                          onChange={handleOnChange}
                        />

                        <ErrorMessage
                          status={formError.totalAmount}
                          message={"Total amount must be greater than 1"}
                        />
                      </Form.Group>
                      <Form.Group controlId="file">
                        <Form.File
                          id="uploadFile"
                          label="Upload File"
                          onChange={onFileChange}
                        />

                        <ErrorMessage
                          status={formError.file}
                          message={"You must input a valid file"}
                        />
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="comment"
                          value={formData.comment}
                          onChange={handleOnChange}
                        />

                        <ErrorMessage
                          status={formError.comment}
                          message={"You must input a comment"}
                        />
                      </Form.Group>

                      <Button variant="primary" onClick={onSubmit}>
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Case Id</Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>
              <Form.Group controlId="caseId">
                <Form.Label>Case ID</Form.Label>
                <Form.Control
                  type="text"
                  name="caseId"
                  value={caseId}
                  onChange={handleCaseId}
                />
              </Form.Group>
              {caseError && (
                <Form.Text className="text-danger">
                  {caseId.length === 0
                    ? "Case Id is required"
                    : "Invalid case id"}
                </Form.Text>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => submitCaseId()}>
                Submit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  props.history.push("/vendor");
                }}
              >
                cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default UploadQuotation;
