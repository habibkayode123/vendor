import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getQuotationByCaseId, uploadQuotation } from "./api-vendorQuotation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "../../axios";
import auth from "../../auth/auth-helper";
import { numberWithCommas } from "../../helpers";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";
import { propTypes } from "react-bootstrap/esm/Image";

const UploadQuotation = (props) => {
  const [file, setFile] = useState();
  const [caseId, setCaseId] = useState();
  const [show, setShow] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caseError, setCaseError] = useState(false);
  const [date, setDate] = useState();

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
    getQuotationByCaseId(caseId)
      .then((data) => {
        setOrders(data.data);
        console.log(data.data);
        setShow(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Invalid CaseId");
      });
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
    const file = event.target.files[0];
    console.log(file, event.target.files);
    setFile(file);
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
    if (checkformError()) {
      console.log("mm");
      return;
    } else {
      let payload = new FormData();
      payload.append("comment", formData.comment);
      payload.append("totalAmount", formData.totalAmount);
      payload.append("quotationFile", file);
      payload.append("caseId", caseId);
      payload.append("deliveryDate", date);

      let token = auth.isAuthenticatedVendor().token;
      uploadQuotation()
        .then((res) => {
          toast.success("Quotation upload successfully");
          setFormData({
            comment: "",
            totalAmount: 0,
          });
          setFile();
          console.log(res, "resp upload");
          props.history.push("/vendor");
        })
        .catch((err) => {
          console.log("Payload From singleLog", payload, err.response);
          toast.error("An error occur");
        });
    }
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title className="d-flex justify-content-between">
                  <h4>Orders</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {orders.map((i) => {
                  return (
                    <>
                      <Row>
                        <Col>
                          <Card.Subtitle className="mb-3">{i.id}</Card.Subtitle>
                        </Col>
                      </Row>
                      <Row>
                        {i.items.map((k) => (
                          <Col>
                            <Card>
                              <Card.Header>
                                <Card.Title as="h6">{k.name}</Card.Title>
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <span className="mr-3">Quantity</span>
                                  <span className="font-weight-bold badge badge-primary text-light p-2">
                                    {k.quantity}
                                  </span>
                                </Card.Text>
                                <Card.Text>
                                  <span className="mr-3">Amount</span>
                                  <span className="font-weight-bold badge badge-success text-light p-2">
                                    {numberWithCommas(k.amount)}
                                  </span>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  );
                })}
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
                      style={{ display: "block", padding: "6 12" }}
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
              {caseError && <Form.Text>Invalid Case Id </Form.Text>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => submitCaseId()}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default UploadQuotation;
