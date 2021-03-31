import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { uploadCredential } from "./api-profile";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";

const UploadCredential = (props) => {
  const [identificationDocument, setIdentificationDocument] = useState({
    value: undefined,
    error: true,
  });
  const [cacDocument, setCacDocument] = useState({
    value: undefined,
    error: true,
  });

  const sendCredential = () => {
    let doc;
    if (identificationDocument.error || cacDocument.error) {
      return;
    } else {
      doc = new FormData();

      doc.append("vendorDocument", identificationDocument.value);
      doc.append("vendorDocument", cacDocument.value);
      trackPromise(
        uploadCredential(doc)
          .then(() => {
            toast.success("Credential Uploaded");
            setIdentificationDocument({
              value: undefined,
              error: true,
            });
            setCacDocument({
              value: undefined,
              error: true,
            });
            let info = JSON.parse(sessionStorage.getItem("jwtVendor"));
            console.log(info, "old");
            let newInfo = {
              ...info,
              user: { ...info.user, uploadStatus: true },
            };
            console.log(newInfo, "new");
            sessionStorage.setItem("jwtVendor", JSON.stringify(newInfo));

            props.history.push("/vendor");
          })
          .catch((e) => {
            console.log(e);
            toast.error("An error occur please try again");
          })
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">Upload Credential</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendCredential();
                }}
              >
                <Form.Group controlId="cacDocument">
                  <Form.File
                    onChange={(e) => {
                      console.log(e);
                      if (e.target.files[0]) {
                        setCacDocument({
                          value: e.target.files[0],
                          error: false,
                        });
                      } else {
                        setCacDocument({
                          value: e.target.files[0],
                          error: true,
                        });
                      }
                    }}
                    id="cacDocument"
                    name="cacDocument"
                    label="CAC DOCUMENT"
                  />
                  {cacDocument.error && (
                    <Form.Text className="text-danger">
                      This field is required
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="identificationDocument">
                  <Form.File
                    name="identificationDocument"
                    id="identificationDocument"
                    label="Identification Document"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setIdentificationDocument({
                          value: e.target.files[0],
                          error: false,
                        });
                      } else {
                        setIdentificationDocument({
                          value: e.target.files[0],
                          error: true,
                        });
                      }
                    }}
                  />

                  {identificationDocument.error && (
                    <Form.Text className="text-danger">
                      This field is required
                    </Form.Text>
                  )}
                </Form.Group>

                <Button type="submit">Upload Document</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCredential;
