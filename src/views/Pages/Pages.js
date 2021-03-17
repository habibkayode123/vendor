import React, { useState, useEffect } from "react";
import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';
import { Card, Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Pagination from '../../components/Pagination/Pagination'
import { toast } from "react-toastify";
import  Swal from 'sweetalert2';

function Pages() {
    const [pages, setPages] = useState([]);
    const [show, setShow] = useState(false);
    const [totalItems, setTotaltems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('');
    const [values, setValues] = useState({
        name: '',
        url: ''
    })
    const ITEMS_PER_PAGE = 10;

    const fetchPages = () => {
        trackPromise(
            axios.get('/v1/page').then(res => {
                setPages(res.data.data.data);
            })
        )
    }

    const handleEdit = (id) => {
        setValues(pages.find(r => r.id == id));
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
                axios.delete('v1/page/'+id).then(res => {
                    fetchPages();
                    Swal.fire(
                        'Deleted!',
                        res.data.message,
                        'success'
                      )
                })
            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                '',
                'error'
              )
            }
          })
    }

    useEffect(() => {
        fetchPages();
    }, [])

    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type != 'edit') {
            trackPromise(
                axios.post('/v1/page', [values]).then(res => {
                    toast.success(res.data.message)
                    fetchPages()
                    handleClose()
                }).catch(err => {
                    console.log(err.response);
                })
            )
        } else {
            trackPromise(
                axios.patch('/v1/page/'+values.id, {
                    name: values.name,
                    url: values.url
                }).then(res => {
                    toast.success(res.data.message)
                    fetchPages()
                    handleClose()
                }).catch(err => {
                    console.log(err.response);
                })
            )
        }
    }

    const handleClose = () => {
        setShow(false);
        setType('');
		setValues({
            name: '',
            url: ''
		});
    };

    const handleOnChange = ({ target }) => {
		setValues({ ...values, [target.name]: target.value });
	};

    return (
        <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Pages</Card.Title>
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
                                <th>Name</th>
                                <th>URL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((page, i) => (
                                <tr key={i}>
                                    <td>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                                    <td>{page.name}</td>
                                    <td>{page.url}</td>
                                    <td>
                                        <Button size="sm" onClick={() => handleEdit(page.id)}>Edit</Button>
                                        <Button size="sm" className="ml-1" variant="danger" onClick={() => handleDelete(page.id)}>Delete</Button>
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
                        <Modal.Title>{type == 'edit' ? 'Edit Page' : 'Add Page'}</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.name}
                                    onChange={handleOnChange}
                                    name="name"
                                />
                            </Form.Group>
                            <Form.Group controlId="url">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={values.url}
                                    onChange={handleOnChange}
                                    name="url"
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
    )
};

export default Pages;