import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Container, Row, Col, Button, Table, ButtonGroup, Modal, Form } from "react-bootstrap";
import CsvImport from 'components/CsvImport';
import axios from '../axios';
import { toast } from 'react-toastify';
import Pagination from "../components/Pagination/Pagination";
import Search from "../components/Search/Search";
import TableHeader from "../components/TableHeader/TableHeader";
import auth from "../auth/auth-helper";
import { create, readDepartment, update, remove, list } from "./api-dept";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function ControlledAccordions() {
	const [show, setShow] = useState(false);
	const classes = useStyles();
	const [departments, setDepartments] = useState([]);
	const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;
	const [selectedFile, setSelectedFile] = useState(null);
	const [needsReload, setNeedsReload] = useState(true);
	const [data, setData] = useState({
		name: "",
		hod: ""
	});
	const [type, setType] = useState("")
	const [open, setOpen] = useState(false);

	const handleOnChange = ({target}) => {
        setData({...data, [target.name]: target.value});
    };
	

	const handleClose = () => {
		setShow(false);
		setData({
			name: "",
			hod: ""
		});
	}
	const jwt = auth.isAuthenticated();

	const handleShow = (type, uuid = null) => {
		setType(type);
		if(type == 'edit') {
			readDepartment(
				{
					id: uuid,
				}
			).then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setData({
						name: data.name,
						hod:data.hod,
						id: data.id
					});
					setShow(true);
				}
			});
		} else {
			setShow(true);
		}
	}

	const handleShowDialog = (data) => {
		setOpen(true)
		setData({
			name: data.name,
			id: data.id
		})
	}

	const handleDialogClose = () => {
		setOpen(false);
		setData({
			name: "",
			hod: ""
		});
	}

	const deleteDepartment = () => {
		remove(
			{
				id: data.id,
			},
			{ t: jwt.token }
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				handleDialogClose();
				toast.success('Deleted successfully!');
				setNeedsReload(!needsReload);
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const departmentData = {
			name: data.name,
			hod: data.hod,
		};

		if (type == 'add'){
			create(
				{
					t: jwt.token,
				},
				departmentData
			).then((data) => {
				if (data.errors) {
					setValues({ ...values, error: data.errors });
				} else {
					toast.success(data.message);
					handleClose();
					setNeedsReload(!needsReload);
				}
			});
		} else {
			update(
				{
					id: data.id,
				},
				{
					t: jwt.token,
				},
				departmentData
			).then((data) => {
				if (data.errors) {
					setValues({ ...values, error: data.errors });
				} else {
					toast.success('Updated successfully!');
					handleClose();
					setNeedsReload(!needsReload);
				}
			});
		}
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		list(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setDepartments(data.data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [needsReload]);

	const onFileUpload = (close) => {
		let data = new FormData();
		data.append('files', selectedFile);
		axios.post('/businessUnitsUpload', data).then(res => {
			toast.success(res.data.message);
			setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		}).catch(err => {
			toast.error(err.response.data.errors ? err.response.data.errors : 'An error occurred');
			setNeedsReload(!needsReload);
			setSelectedFile(null);
			close();
		})
	}

	const headers = [
		{ name: "No#", field: "id" },
		{ name: "UNITS", field: "unit", sortable: true },
		{ name: "HOD/DESIGNATE", field: "hod", sortable: true },
		{ name: "Actions", field: "", sortable: false },
	];

	const departmentsData = useMemo(() => {
		let computedDepartments = departments;
		setTotaltems(computedDepartments.length);
		return computedDepartments.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [departments,currentPage]);

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<Card.Title as="h4">Departments</Card.Title>
								<div className="buttons">
									<Button size="sm" className="mr-2" onClick={() => handleShow("add")}>Add</Button>
									{ <CsvImport setFile={setSelectedFile} onUpload={onFileUpload} /> }
								</div>
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
													placeholder="Search department"
												/> */}
											</div>
										</div>
										<Table>
											<TableHeader
												headers={headers}
												onSorting={(field, order) =>
													setSorting({ field, order })
												}
											/>
											<tbody>
												{departmentsData.map((department, i) => (
													<tr key={i}>
														{/* <th scope="row">{department.id}</th> */}
														<td>{((currentPage - 1) * ITEMS_PER_PAGE) + i + 1}</td>

														<td>{department.name}</td>
														<td>{department.hod}</td>

														<td>

														<ButtonGroup aria-label="Basic example">
															<Button size="sm" variant="info" onClick={() => {handleShow('edit', department.id)}}>Edit</Button>
															<Button size="sm" variant="danger" onClick={() => {handleShowDialog(department)}}>Delete</Button>
														</ButtonGroup>
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
								<Modal.Title>{type == 'add' ? 'Add' : 'Edit'} Department</Modal.Title>
							</Modal.Header>

							<Form onSubmit={handleSubmit}>
							<Modal.Body>
									<Form.Group controlId="name">
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter department name"
											value={data.name}
											onChange={handleOnChange}
											name="name"
										/>
									</Form.Group>
									<Form.Group controlId="hod">
										<Form.Label>HOD</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter head of department"
											value={data.hod}
											onChange={handleOnChange}
											name="hod"
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
						<Dialog open={open} onClose={handleDialogClose}>
							<DialogTitle>{"Delete " + data.name + "?" }</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Confirm to delete the department {data.name}.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleDialogClose} color="primary">
									Cancel
								</Button>
								<Button
									onClick={deleteDepartment}
									color="secondary"
									autoFocus="autoFocus"
								>
									Confirm
								</Button>
							</DialogActions>
						</Dialog>
					</Col>
				</Row>
			</Container>
		</>
	
	);
}
