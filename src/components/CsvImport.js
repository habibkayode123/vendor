import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function CsvImport(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFileChange = event => {
        const file = event.target.files[0];
        props.setFile(file);
        // setCanSubmit(true);
    }

    return (
        <>
        <Button variant="info" onClick={handleShow}>
            Csv Import
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import Csv</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.File 
                        id="custom-file"
                        label="Upload File"
                        onChange={onFileChange}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.onUpload(handleClose)}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CsvImport;