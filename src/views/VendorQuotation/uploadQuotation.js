import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from "../../axios";
import auth from "../../auth/auth-helper";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

const UploadQuotation = () => {
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    comment: "",
    totalAmount: 0,
    caseId: "",
  });
  const [formError, setformError] = useState({
    comment: true,
    totalAmount: true,
    caseId: true,
    file: true,
  });

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
    if (formData.caseId.length < 2)
      setformError((prev) => ({ ...prev, caseId: true }));
    if (!file) setformError((prev) => ({ ...prev, file: true }));
    console.log(formError);
    if (
      formError.totalAmount ||
      formError.caseId ||
      formError.comment ||
      formError.file
    ) {
      return true;
    } else return false;
  };

  const onSubmit = () => {
    checkformError();
    if (checkformError()) {
      console.log("mm");
      return;
    } else {
      let payload = new FormData();
      payload.append("comment", formData.comment);
      payload.append("totalAmount", formData.totalAmount);
      payload.append("quotationFile", file);
      payload.append("caseId", formData.caseId);

      let token = auth.isAuthenticatedVendor().token;

      axios
        .post("/vendorQUpload", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          toast.success("Quotation upload successfully");
          setFormData({
            comment: "",
            totalAmount: 0,
            caseId: "",
          });
          setFile();
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
                      value={formData.caseId}
                      onChange={handleOnChange}
                    />
                    <ErrorMessage
                      status={formError.caseId}
                      message={"please input a valid Case Id"}
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
      </Container>
    </div>
  );
};

export default UploadQuotation;
