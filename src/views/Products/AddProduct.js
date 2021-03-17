import React, { useEffect, useState} from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from '../../axios';
import { toast } from "react-toastify";

function AddProduct() {
    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        vendorId: '',
        name: '',
        price: '',
        quantity: '',
        description: ''
    });

    const handleOnChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    }

    const fetchVendors = () => {
        axios.get('/v1/vendor').then(res => {
            setVendors(res.data.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/v1/vendor/product/create', formData).then(res => {
            toast.success(res.data.message);
            setFormData({
                vendorId: '',
                name: '',
                price: '',
                quantity: '',
                description: ''
            })
        }).catch(err => {
            console.log(err.response)
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
							<Card.Header>
								<Card.Title as="h4">Create Product</Card.Title>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col md={{ span: 8, offset: 2 }}>
										<Form onSubmit={handleSubmit}>
											<Form.Group controlId="vendor">
												<Form.Label>Vendor</Form.Label>
												<Form.Control
													name="vendorId"
													as="select"
													onChange={handleOnChange}
													value={formData.vendorId}
												>
													<option value="">Select Vendor</option>
													{
														// vendors.map(vendor => (
														//     <option key={vendor.ID} value={vendor.id}>{vendor.Title}</option>
														// ))
														vendors.map((vendor) => (
															<option key={vendor.id} value={vendor.id}>
																{vendor.name}
															</option>
														))
													}
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="name">
												<Form.Label>Name</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter product name"
													name="name"
													onChange={handleOnChange}
													value={formData.name}
												/>
											</Form.Group>
											<Form.Group controlId="amount">
												<Form.Label>Price</Form.Label>
												<Form.Control
													type="number"
													name="price"
													placeholder="Enter product amount"
													onChange={handleOnChange}
													value={formData.price}
												/>
											</Form.Group>
											<Form.Group controlId="quantity">
												<Form.Label>Quantity</Form.Label>
												<Form.Control
													type="number"
													name="quantity"
													placeholder="Enter quantity"
													onChange={handleOnChange}
													value={formData.quantity}
												/>
											</Form.Group>
											<Form.Group controlId="description">
												<Form.Label>Description</Form.Label>
												<Form.Control
													onChange={handleOnChange}
													name="description"
													as="textarea"
													rows={3}
													value={formData.description}
												/>
											</Form.Group>

											<Button variant="primary" type="submit">
												Submit
											</Button>
										</Form>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
}

export default AddProduct;