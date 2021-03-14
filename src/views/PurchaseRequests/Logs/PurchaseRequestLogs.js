import React, { useEffect, useState, useMemo } from "react";
import { Card, Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import axios from "../../../axios";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../../helpers";
import { trackPromise } from 'react-promise-tracker';
import { toast } from "react-toastify";

function PurchaseRequestLogs() {
  const [logs, setLogs] = useState([]);
  const [totalItems, setTotaltems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({

  });

  const handleClose = () => {
    setEditing(false);
    setData({});
  }

  const handleEdit = (id) => {
    setData(logs.find(log => log.id == id));
    setEditing(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dat = {
      narration: data.narration,
      amount: data.amount
    };

    trackPromise(
      axios.patch(`/v1/log/${data.id}`, dat).then(res => {
        handleClose();
        toast.success(res.data.message);
        fetchLogs();
      }).catch(err => {
        console.log(err.response);
      })
    );
  }

  const handleDelete = (id) => {
    trackPromise(
      axios.delete(`/v1/log/${id}`).then(res => {
        toast.success(res.data.message);
        fetchLogs();
      }).catch(err => {
        console.log(err.response);
      })
    );
  }

  const handleInputChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const ITEMS_PER_PAGE = 10;

  const fetchLogs = () => {
    trackPromise (
      axios.get("/v1/log").then((res) => {
        console.log("v1/log", res.data.data);
        setLogs(res.data.data.data);
      })
    );
  };

  const logsData = useMemo(() => {
    setTotaltems(logs.length);

    return logs
      .reverse()
      .slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
  }, [logs, currentPage]);

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Purchase Requests Logs</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row w-100">
                <div className="col mb-3 col-12">
                  <div className="row">
                    <div className="col-md-6">
                      <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-row-reverse">
                      {/* <Search
                                                onSearch={(value) => {
                                                    setSearch(value);
                                                    setCurrentPage(1);
                                                }}
                                            /> */}
                    </div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Narration</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {logsData.map((request, i) => (
                        <tr key={request.id}>
                          <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                          <td>{request.narration}</td>
                          <td>{numberWithCommas(request.amount)}</td>
                          <td>
                            {new Date(request.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: `/admin/purchase/request/logs/${request.id}`,
                                state: {
                                  departmentId: request.departmentId,
                                  expenseTypeId: request.expenseTypeId,
                                },
                              }}
                            >
                              <Button size="sm">View</Button>
                            </Link>
                            <Button size="sm" variant="info" className="ml-1" onClick={() => handleEdit(request.id)}>Edit</Button>
                            <Button size="sm" variant="danger" className="ml-1" onClick={() => handleDelete(request.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Modal show={editing} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Edit Log</Modal.Title>
						</Modal.Header>

						<Form onSubmit={handleSubmit}>
							<Modal.Body>
								<Form.Group controlId="narration">
                        <Form.Label>Narration</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="narration"
                          value={data.narration}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Amount"
                          name="amount"
                          value={data.amount}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Modal.Footer>
						</Form>
					</Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default PurchaseRequestLogs;
