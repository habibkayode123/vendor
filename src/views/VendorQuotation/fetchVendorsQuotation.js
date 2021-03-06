import React, { useEffect, useState } from "react";
import { list } from "./api-vendorQuotation";
import TableHeader from "../../components/TableHeader/TableHeader";
import CsvImport from "components/CsvImport";
import {
	Card,
	Container,
	Row,
	Col,
	Button,
	Table,
	ButtonGroup,
	Modal,
	Form,
} from "react-bootstrap";

const FetchVendorQuotation = () => {
	const [vendorQuotation, setVendorQuotation] = useState([]);
	const fetchVedorQuotation = () => {
		list().then((res) => {
			console.log("response", res);
            console.log("Vendor data", res.data);
			setVendorQuotation(res.data)
		});
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		fetchVedorQuotation(signal);
	}, []);

	const headers = [
		{ name: "No#", field: "id" },
		{ name: "Comments", field: "unit", sortable: true },
		{ name: "Vendor Email", field: "unit", sortable: true },
		{ name: "Total Amount", field: "hod", sortable: true },
		{ name: "Vendor Name", field: "hod", sortable: true },
		{ name: "CaseId", field: "", sortable: false },
		{ name: "Document", field: "hod", sortable: true },
	];
	return (
		<div>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<Card.Title as="h4">Vendors Quotations</Card.Title>
								<div className="buttons">
									<Button
										size="sm"
										className="mr-2"
										onClick={() => handleShow("add")}
									>
										Add
									</Button>
									{/* {
										<CsvImport
											setFile={setSelectedFile}
											onUpload={onFileUpload}
										/>
									} */}
								</div>
							</Card.Header>
							<Card.Body>
								<Table>
									<TableHeader
										headers={headers}
										onSorting={(field, order) => setSorting({ field, order })}
									/>
									<tbody></tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default FetchVendorQuotation;
