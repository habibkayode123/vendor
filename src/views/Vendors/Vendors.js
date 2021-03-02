import CsvImport from 'components/CsvImport';
import React, { useEffect, useState, useMemo } from 'react';
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from '../../axios';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination'

function Vendors() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [vendors, setVendors] = useState([]);
	const [totalItems, setTotaltems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;

    const onFileUpload = (close) => {
		let data = new FormData();
		data.append('files', selectedFile);
		axios.post('/v1/vendor/upload', data).then(res => {
			toast.success(res.data.message);
			// setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		}).catch(err => {
			toast.error(err.response.data.errors ? err.response.data.errors : 'An error occurred');
			// setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		})
    }

    const vendorsData = useMemo(() => {
        setTotaltems(vendors.length);
        let newVendors = vendors.filter(v => v.Title != null)
		return newVendors.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
    }, [vendors, currentPage])
    
    const fetchVendors = () => {
        axios.get('/v1/vendor').then(res => {
            setVendors(res.data.data);
        })
    }

    useEffect(() => {
        fetchVendors();
    }, [])

    return (
        <Container>
            <Row>
                <Col md="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <Card.Title as="h4">Vendors</Card.Title>
                            <CsvImport setFile={setSelectedFile} onUpload={onFileUpload} />
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md="12">
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
													placeholder="Search department"
												/> */}
											</div>
										</div>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            {/* <th></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vendorsData.map((vendor, i) => (
                                                    <tr key={vendor.id}>
                                                        <td>{((currentPage - 1) * ITEMS_PER_PAGE) + i + 1}</td>
                                                        <td>{vendor.Title}</td>
                                                        <td>{vendor["Phone Number"]}</td>
                                                        {/* <td>
                                                            <Link to={`/admin/vendor/${vendor.id}`}>
                                                                <Button size="sm">View</Button>
                                                            </Link>
                                                        </td> */}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Vendors;