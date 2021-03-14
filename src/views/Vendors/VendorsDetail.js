import auth from "auth/auth-helper";
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { getSingleVendorDetails } from "./vendor-api";
const VendorDetail = (prop) => {
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState({});

  useEffect(() => {
    getSingleVendorDetails()
      .then((data) => {
        setData(data.data);
        setLoading(false);
        toast.info("Detail Fectched");
      })
      .catch((error) => {
        setError(false);
        setLoading(false);
        toast.error("An Error occur");
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">{data.accountName}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Account Name</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.accountNumber}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Account Type</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.accountType}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Approval Status</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text
                        className={`${
                          data.approvalStatus === "pending"
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        {data.approvalStatus}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Email</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Bank Name</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{data.bankName}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VendorDetail;
