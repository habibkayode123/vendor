import React, {useState, useEffect, useMemo} from 'react';
import axios from '../../axios';
import {trackPromise} from 'react-promise-tracker';
import { Card, Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from '../../components/Pagination/Pagination'
import { numberWithCommas } from "helpers";
import { toast } from "react-toastify";
import  Swal from 'sweetalert2';

function Permissions() {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [totalItems, setTotaltems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const [values, setValues] = useState({
        roleId: "",
        roleName: ""
    })
    const [roles, setRoles] = useState([]);
    const [pages, setPages] = useState([]);
    const [data, setData] = useState([]);

    const fetchPermissions = () => {
        trackPromise(
            axios.get('/v1/permission').then(res => {
                setPermissions(res.data.data.data);
            })
        )
    }

    const fetchRoles = () => {
        axios.get('/role').then(res => {
            setRoles(res.data.data);
        });
    }

    const fetchPages = () => {
        axios.get('/v1/page').then(res => {
            setPages(res.data.data.data);
        });
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        setType('');
		setValues({
			roleId: "",
            roleName: ""
        });
        setData([]);
    };

    const handleEdit = (id) => {
        setValues(roles.find(r => r.id == id));
        setType('edit');
        handleShow();
    }

    const permissionsData = useMemo(() => {
        setTotaltems(permissions.length);
    
        return permissions
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
          );
      }, [permissions, currentPage]);
    
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
                axios.delete('/v1/permission/'+id).then(res => {
                    fetchPermissions();
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
            const payload = data.map(d => {
                const page = pages.find(p => p.id == d);
                return {
                    page: page.name,
                    url: page.url,
                    ...values,
                    isActive: true
                }
            })

            trackPromise(
                axios.post('/v1/permission', payload).then(res => {
                    toast.success(res.data.message)
                    fetchPermissions()
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
        if (target.name == 'roleId') {
            const role = roles.find(r => r.id == target.value);
            setValues({
                roleId: role.id,
                roleName: role.rolename
            });
        } else {
            const pages = [...data];
            if(pages.indexOf(target.value) == -1)
                pages.push(target.value);
            else
                pages.splice(pages.indexOf(target.value), 1);

            setData(pages);
        }
		
	};

    useEffect(() => {
        fetchPermissions();
        fetchRoles();
        fetchPages();
    }, [])

    return (
        <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Permissions</Card.Title>
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
                                <th>Permission</th>
                                {/* <th>Status</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissionsData.map((p, i) => (
                                <tr key={p.id}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                                    <td>{p.roleName}</td>
                                    <td>{p.page}</td>
                                    
                                    {/* <td>{p.active ? 'Active' : 'Inactive'}</td> */}
                                    <td>
                                        {/* <Button size="sm" onClick={() => handleEdit(p.id)}>Edit</Button> */}
                                        <Button size="sm" className="ml-1" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
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
                        <Modal.Title>{type == 'edit' ? 'Edit Permission' : 'Add Permission'}</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={values.roleId}
                                    onChange={handleOnChange}
                                    name="roleId"
                                >
                                    <option value="">Select Role</option>
                                    {roles &&
                                        roles.map((item, i) => (
                                            <option value={item.id} key={i}>
                                                {item.rolename}
                                            </option>
                                        ))}
                                    ;
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="pages">
                                <Form.Label>Pages</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={data}
                                    onChange={handleOnChange}
                                    name="pages"
                                    multiple
                                >
                                    <option value="">Select Pages</option>
                                    {pages &&
                                        pages.map((item, i) => (
                                            <option value={item.id} key={i}>
                                                {item.name}
                                            </option>
                                        ))}
                                    ;
                                </Form.Control>
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

export default Permissions;