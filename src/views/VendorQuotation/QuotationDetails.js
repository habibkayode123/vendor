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

let dummyObj = {
  caseId: "1425267uhk",
  orderId: "ioio90-ko00",
  amount: "1000000",
};

const QuotationDetails = () => {
  const [dummy, setDummy] = useState(dummyObj);
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
                        Account Name
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Text className="font-weight-bold">
                            caseId
                          </Card.Text>
                        </Col>
                        <Col>
                          <Card.Text className="">{dummy.caseId}</Card.Text>
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
