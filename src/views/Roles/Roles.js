import React, { useState, useEffect } from "react";
import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';
import { Card, Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from '../../components/Pagination/Pagination'
import { numberWithCommas } from "helpers";
import { toast } from "react-toastify";
import  Swal from 'sweetalert2';

function Roles() {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [roles, setRoles] = useState([]);
    const [totalItems, setTotaltems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const [values, setValues] = useState({
        role: "",
        minimumExpenseApprovalCap: "",
        maximumExpenseApprovalCap: ""
    })

    const fetchRoles = () => {
        trackPromise(
            axios.get('/role').then(res => {
                setRoles(res.data.data);

                setTotaltems(res.data.data.length)
            })
        );
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        setType('');
		setValues({
			rolename: "",
            minimumExpenseApprovalCap: "",
            maximumExpenseApprovalCap: ""
		});
    };

    const handleEdit = (id) => {
        setValues(roles.find(r => r.id == id));
        setType('edit');
        handleShow();
    }
    
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover again!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                axios.delete('/role/'+id).then(res => {
                    fetchRoles();
                    Swal.fire(
                        'Deleted!',
                        res.data.message,
                        'success'
                      )
                })
              
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                '',
                'error'
              )
            }
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type != 'edit') {
            trackPromise(
                axios.post('/role', values).then(res => {
                    toast.success(res.data.message)
                    fetchRoles()
                    handleClose()
                }).catch(err => {
                    console.log(err.response);
                })
            );
        } else {
            trackPromise(
                axios.put('/role/changeapprovalcaplimit', {
                    roleId: values.id,
                    minimumExpenseApprovalCap: values.minimumExpenseApprovalCap,
                    maximumExpenseApprovalCap: values.maximumExpenseApprovalCap
                }).then(res => {
                    toast.success(res.data.message)
                    fetchRoles()
                    handleClose()
                }).catch(err => {
                    console.log(err.response);
                })
            );
        }
    }

    const handleOnChange = ({ target }) => {
		setValues({ ...values, [target.name]: target.value });
	};

    useEffect(() => {
        fetchRoles();
    }, [])

    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Roles</Card.Title>
                <Button size="sm" variant="info" onClick={handleShow}>
                    Add
                </Button>
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
                                <th>Role</th>
                                <th>Min Approval Cap</th>
                                <th>Max Approval Cap</th>
                                <th>Created At</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role, i) => (
                                <tr key={role.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                                    <td>{role.rolename}</td>
                                    <td>{numberWithCommas(role.minimumExpenseApprovalCap)}</td>
                                    <td>{numberWithCommas(role.maximumExpenseApprovalCap)}</td>
                                    <td>{new Date(role.createdOn).toLocaleDateString()}</td>
                                    <td>
                                        <Button size="sm" onClick={() => handleEdit(role.id)}>Edit</Button>
                                        <Button size="sm" className="ml-1" variant="danger" onClick={() => handleDelete(role.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                  </div>
                </div>
              </Card.Body>
            </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{type == 'edit' ? 'Edit Role' : 'Add Role'}</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.rolename}
                                    onChange={handleOnChange}
                                    name="rolename"
                                />
                            </Form.Group>
                            <Form.Group controlId="min">
                                <Form.Label>Minimum Expense Approval Cap</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.minimumExpenseApprovalCap}
                                    onChange={handleOnChange}
                                    name="minimumExpenseApprovalCap"
                                /> 
                            </Form.Group>
                            <Form.Group controlId="max">
                                <Form.Label>Maximim Expense Approval Cap</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.maximumExpenseApprovalCap}
                                    onChange={handleOnChange}
                                    name="maximumExpenseApprovalCap"
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

export default Roles;