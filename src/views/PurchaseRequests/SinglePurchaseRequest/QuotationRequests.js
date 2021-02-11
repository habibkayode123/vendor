import React from 'react';
import ItemsTable from './ItemsTable';

import {
    Form,
    Button,
    Modal
} from "react-bootstrap";

function quotationRequest(props) {

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Quotation Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="caseId">
                    <Form.Label>Case ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Case Id" 
                        name="caseId"
                        value={props.request.caseId}
                        readOnly
                    />
                </Form.Group>
                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="0.00" 
                        name="amount"
                        value={props.request.totalItemsAmount}
                        readOnly
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Items</Form.Label>
                    <ItemsTable items={props.request.items} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={props.submit}>
                Submit
            </Button>
        </Modal.Footer>
    </Modal>
    );
};

export default quotationRequest;