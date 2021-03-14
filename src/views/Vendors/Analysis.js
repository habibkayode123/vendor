import React, { useState, useEffect } from "react";
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
import { Bar } from "react-chartjs-2";
import { getVendorQuotationStatusCount } from "./vendor-api";
import { trackPromise } from "react-promise-tracker";

const Analysis = () => {
  const [approved, setApproved] = useState();
  const [rejected, setRejected] = useState();
  const [pending, setPending] = useState();
  //  const [datasets,setDatasets] = useState()

  let labels = ["Total", "Approved", "Pending", "Rejected"];

  let datasets = [
    {
      label: "Quotation",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#1FB5AA",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [approved + rejected + pending, approved, pending, rejected],
    },
  ];

  const getApprovedQuotation = () => {
    trackPromise(
      getVendorQuotationStatusCount("Approved")
        .then((data) => {
          if (data.message === "Success") setApproved(data.data);
          else {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  const getPendingQuotation = () => {
    trackPromise(
      getVendorQuotationStatusCount("Pending")
        .then((data) => {
          if (data.message === "Success") setRejected(data.data);
          else {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  const getRejectedQuotation = () => {
    trackPromise(
      getVendorQuotationStatusCount("Rejected")
        .then((data) => {
          if (data.message === "Success") setPending(data.data);
          else {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  useEffect(() => {
    getApprovedQuotation();
    getPendingQuotation();
    getRejectedQuotation();
  }, []);

  return (
    <Container>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <Card.Title as="h4">Quotation Analysis</Card.Title>
            </Card.Header>
            <Card.Body>
              {rejected && approved && pending && (
                <Bar
                  data={{ labels, datasets }}
                  options={{
                    title: {
                      display: true,
                      text: "Quotation",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analysis;
