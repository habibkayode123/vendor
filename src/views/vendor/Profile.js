import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

export default function Profile() {
    return (
        <Container fluid>
            <Row>
                <Col md="6">Profile details here</Col>
                <Col md="6">
                    <h4>Change Password</h4>
                    <Form>
                        <Form.Group controlId="oldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        <Form.Group controlId="confirmNewPassword">
                            <Form.Label>New Password Again</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        <Button type="submit">Change Password</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}