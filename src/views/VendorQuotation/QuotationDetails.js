import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  ButtonGroup,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";
import { getSingleQuotation } from "./api-vendorQuotation";

let dummyObj = {
  caseId: "1425267uhk",
  orderId: "ioio90-ko00",
  amount: "1000000",
};

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

const QuotationDetails = (props) => {
  let { id: ID } = useParams("id");

  const [dummy, setDummy] = useState(dummyObj);
  useEffect(() => {
    trackPromise(
      getSingleQuotation(ID).then((data) => {
        console.log(data, "single qoutation");
        setDummy(data.data);
      })
    );
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">Quotations Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title
                        className="d-flex justify-content-center"
                        as="h6"
                      >
                        Document Info
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Case Id
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{dummy.caseId}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Order Id
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{dummy.orderId}</Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title
                        className="d-flex justify-content-center"
                        as="h6"
                      >
                        Dates Info
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Created At
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{`${String(
                            new Date(dummy.createdAt).getDate()
                          ).padStart(2, "0")} 
                        ${monthNames[new Date(dummy.createdAt).getMonth()]} 
                        ${new Date(dummy.createdAt).getFullYear()}`}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Delivery Date
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{`${String(
                            new Date(dummy.deliveryDate).getDate()
                          ).padStart(2, "0")} 
                        ${monthNames[new Date(dummy.deliveryDate).getMonth()]} 
                        ${new Date(
                          dummy.deliveryDate
                        ).getFullYear()}`}</Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title
                        className="d-flex justify-content-center"
                        as="h6"
                      >
                        Status Info
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Process Status PO
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">
                            {dummy.processStatusPO}
                          </Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Approved
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text>{dummy.isApproved}</Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title
                        className="d-flex justify-content-center"
                        as="h6"
                      >
                        Dates Info
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Created At
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{`${String(
                            new Date(dummy.createdAt).getDate()
                          ).padStart(2, "0")} 
                        ${monthNames[new Date(dummy.createdAt).getMonth()]} 
                        ${new Date(dummy.createdAt).getFullYear()}`}</Card.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            Delivery Date
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{`${String(
                            new Date(dummy.deliveryDate).getDate()
                          ).padStart(2, "0")} 
                        ${monthNames[new Date(dummy.deliveryDate).getMonth()]} 
                        ${new Date(
                          dummy.deliveryDate
                        ).getFullYear()}`}</Card.Text>
                        </Col>
                      </Row>
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

export default QuotationDetails;
