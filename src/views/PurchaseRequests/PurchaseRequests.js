import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../axios';
import Pagination from '../../components/Pagination/Pagination'
import PurchaseRequestList from './PurchaseRequestList/PurchaseRequestList';
import auth from '../../auth/auth-helper';
import {
	Card,
	Container,
	Row,
    Col
} from "react-bootstrap";

function PurchaseRequests() {
    const [requests, setRequests] = useState([]);
    const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    
    const requestData = useMemo(() => {
        setTotaltems(requests.length);
        
		return requests.reverse().slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [requests, currentPage]);

    const departmentId = auth.isAuthenticated().user.departmentId;
    const role = auth.isAuthenticated().user.role;
    const fetchRequests = () => {

        if (role == 'CFO') {
            axios.get('/v1/request')
            .then(res => {
                const data = res.data.data.map(request => {
                    let reviewStatusReadable;
                    const reviewStatus = request.reviewStatus;

                    if (reviewStatus == 1)
                        reviewStatusReadable = 'Reviewed'
                    else if(reviewStatus == 2)
                        reviewStatusReadable = 'Declined'
                    else
                        reviewStatusReadable = 'Awaiting'
                    return {...request, reviewStatusReadable}
                });

                setRequests(data);
            });
        } else {
            axios.get('/v1/request/getRequestBydepartmentId/'+departmentId)
            .then(res => {
                const data = res.data.data.data.map(request => {
                    let reviewStatusReadable;
                    const reviewStatus = request.reviewStatus;

                    if (reviewStatus == 1)
                        reviewStatusReadable = 'Reviewed'
                    else if(reviewStatus == 2)
                        reviewStatusReadable = 'Declined'
                    else
                        reviewStatusReadable = 'Awaiting'
                    return {...request, reviewStatusReadable}
                });

                
                setRequests(data);
            });
        }
        
    }

    useEffect(() => {
        fetchRequests();
    }, []);

        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Purchase Requests</Card.Title>
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
                                            <PurchaseRequestList
                                                requests={requestData}
                                                currentPage={currentPage}
                                                perPage={ITEMS_PER_PAGE}
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
}

export default PurchaseRequests;