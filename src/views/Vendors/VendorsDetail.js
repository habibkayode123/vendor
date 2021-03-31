import auth from "auth/auth-helper";
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { getSingleVendorDetails } from "./vendor-api";
import { trackPromise } from "react-promise-tracker";

const VendorDetail = (prop) => {
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState({});

  useEffect(() => {
    trackPromise(
      getSingleVendorDetails()
        .then((data) => {
          setData(data.data);
          setLoading(false);
          toast.info("Detail Fectched");
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          toast.error("An Error occur");
        })
    );
  }, []);

  return (
    <Container>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h3">{data.title}</Card.Title>
            </Card.Header>

            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">{data.accountName}</Card.Title>
              <Card.Text>
                Status:
                <span
                  className={`ml-3 ${
                    data.approvalStatus === "pending"
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {data.approvalStatus}
                </span>
              </Card.Text>
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
                      <Card.Title as="h6">Bank Name</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.bankName}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Bank Code</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.bankCode}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Business Class</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.businessClass}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Company Type</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.companyType}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Cac Number</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.cacNumber}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Primary Business</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.primaryBusiness}
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
                      <Card.Title as="h6">Phone</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.phone}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">State</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.state}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">City</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.city}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">License Number</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.licenseNumber}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Website</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.websiteAdress}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h6">Address</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text className="font-weight-bold">
                        {data.address}
                      </Card.Text>
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
