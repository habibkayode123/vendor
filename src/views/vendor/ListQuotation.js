import React, { useEffect, useState } from "react";
import { list } from "../VendorQuotation/api-vendorQuotation";
import TableHeader from "../../components/TableHeader/TableHeader";
import Pagination from "../../components/Pagination/Pagination";
import { numberWithCommas } from "../../helpers";
import { toast } from "react-toastify";
import { approveQuotation, rejectQuotation } from "./api-listQuotation";
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
import {trackPromise} from 'react-promise-tracker';

const STATUS = {
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ALL: "all",
  PENDING: "Pending",
};

let ITEMS_PER_PAGE = 10;

const headers = [
  { name: "SN", field: "id" },
  { name: "Case Id", field: "", sortable: false },
  { name: "Total Amount", field: "hod", sortable: true },
  //   { name: "Vendor Email", field: "unit", sortable: true },
  //   { name: "Vendor Name", field: "hod", sortable: true },
  { name: "Comments", field: "unit", sortable: true },
  { name: "Created Date", field: "hod", sortable: true },
  { name: "Actions/Status", field: "hod", sortable: true },
];

const ListQuotation = () => {
  const [vendorQuotation, setVendorQuotation] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalItems, setTotaltems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [approvalComment, setApprovalComment] = useState("");
  const [clickId, setClickId] = useState("");
  const [approvalCommentError, setApprovalCommentError] = useState(false);

  const fetchVedorQuotation = () => {
    trackPromise(
    list().then((res) => {
      console.log("response", res);
      console.log("Vendor list data", res.data);
      setVendorQuotation(res.data);
      setTotaltems(res.data.length);
    })
    )
  };

  const handleApprove = () => {
    if (approvalComment.length > 3) {
      let payload = {
        status: "Approved",
        approvalComment: approvalComment,
      };
      approveQuotation(clickId, payload)
        .then((res) => {
          console.log(res.data, "approved");
          toast.success("Quotation has been Approved successfully");
          setVendorQuotation((prev) => {
            let newState = prev.map((i) => {
              let newObj = i;
              if (newObj.id === clickId) {
                newObj.status = STATUS.APPROVED;
                console.log("ok i in");
              }
              return newObj;
            });
            return newState;
          });
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          toast.error("An Error Occur while rejecting");
          handleClose();
        });
    } else {
      setApprovalCommentError(true);
    }
  };

  const handleRejection = (item) => {
    let payload = {
      status: "Rejected",
      approvalComment: "...latessome comments",
      // approvalComment: approvalComment,
    };
    rejectQuotation(item.id, payload)
      .then((res) => {
        console.log(res.data);
        toast.success("Quotation has been Rejected");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("An Error occur while Rejecting");
        handleClose();
      });
  };

  const handleClose = () => {
    setClickId("");
    setApprovalComment("");
    setShow(false);
    setApprovalCommentError(false);
  };
  const approveClick = (id) => {
    setClickId(id);
    setShow(true);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchVedorQuotation(signal);
  }, []);

  useEffect(() => {
    let lastIndex = currentPage * ITEMS_PER_PAGE;
    let startIndex = lastIndex - ITEMS_PER_PAGE;
    let newData = vendorQuotation.slice(startIndex, lastIndex);
    setDisplayData(newData);
  }, [currentPage, vendorQuotation]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">List Of Quotations</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <Pagination
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
                <Table responsive>
                  <TableHeader
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {displayData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index +
                              1 * (ITEMS_PER_PAGE * (currentPage - 1)) +
                              1}
                          </td>
                          <td>{item.caseId}</td>
                          <td>{numberWithCommas(item.totalAmount)}</td>
                          {/* {<td>{item.createBy}</td>
                          <td>{item.name}</td>} */}
                          <td>{item.comment}</td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString()},{" "}
                            {new Date(item.createdAt).toLocaleTimeString()}
                          </td>

                          <td>
                            {item.status === STATUS.REJECTED && "Rejected"}
                            {item.status === STATUS.APPROVED && "Approved"}
                            {item.status !== STATUS.REJECTED &&
                              item.status !== STATUS.APPROVED && (
                                <>
                                  <Button
                                    variant="success"
                                    className="mr-4"
                                    onClick={() => approveClick(item.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleRejection(item)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            {/* {item.status === STATUS.APPROVED ? (
															"Approved"
														) : (
															<>
																<Button
																	variant="success"
																	className="mr-4"
																	onClick={() => approveClick(item.id)}
																>
																	Approve
																</Button>
																<Button
																	variant="danger"
																	onClick={() => handleRejection(item)}
																>
																	Reject
																</Button>
															</>
														)} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Approval Comment</Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>
              <Form.Group controlId="Approval Comment">
                <Form.Label>Approval Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  name="approvalComment"
                ></Form.Control>
                {approvalCommentError && (
                  <Form.Text className="text-danger">
                    please input an Approval comment
                  </Form.Text>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => handleApprove()}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default ListQuotation;
