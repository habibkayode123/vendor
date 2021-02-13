import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { list } from "./api-dept.js";
import { Card, Container, Row, Col } from "react-bootstrap";
import Pagination from "../components/Pagination/Pagination";
import { useLocation, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../components/Search/Search";
import TableHeader from "../components/TableHeader/TableHeader";
import auth from "../auth/auth-helper";

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
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [departments, setDepartments] = useState([]);
	const [totalItems, setTotaltems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 4;

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		list(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data);
				setDepartments(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const headers = [
		{ name: "No#", field: "id" },
		{ name: "UNITS", field: "unit", sortable: true },
		{ name: "HOD/DESIGNATE", field: "hod", sortable: true },
		// { name: "Amount", field: "amount", sortable: false },
	];

	const departmentsData = useMemo(() => {
		let computedDepartments = departments;
		setTotaltems(computedDepartments.length);
		return computedDepartments.slice(
			(currentPage - 1) * ITEMS_PER_PAGE,
			(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		);
	}, [departments,currentPage]);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Departments</Card.Title>
							</Card.Header>
							<Card.Body>
								<div className="row w-100">
									<div className="col mb-3 col-12 text-center ">
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
										<table className="table table-striped">
											<TableHeader
												headers={headers}
												onSorting={(field, order) =>
													setSorting({ field, order })
												}
											/>
											<tbody>
												{departmentsData.map((department, i) => (
													<tr>
														{/* <th scope="row">{department.id}</th> */}
														<td scope="row">{i + 1}</td>

														<Link
															to={"/admin/department/" + department.id}
															key={i}
														>
															<td>{department.name}</td>
														</Link>
														<td>{department.hod}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);

	// return (
	// 	<>
	// 		<Container fluid>
	// 			<Row>
	// 				<Col md="12">
	// 					<Card>
	// 						<Card.Header>
	// 							<Card.Title as="h4">Business Unit</Card.Title>
	// 						</Card.Header>
	// 						<Card.Body>
	// 							<Link to={"#"}>
	// 								<Accordion
	// 									expanded={expanded === "panel1"}
	// 									// onChange={handleChange("panel1")}
	// 								>
	// 									<AccordionSummary
	// 										expandIcon={<ExpandMoreIcon />}
	// 										aria-controls="panel1bh-content"
	// 										id="panel1bh-header"
	// 									>
	// 										<Typography className={classes.heading}><h5>UNITS</h5></Typography>
	// 										<Typography className={classes.secondaryHeading}>
	// 											<h5>HOD/Designate</h5>
	// 										</Typography>
	// 									</AccordionSummary>
	// 									<AccordionDetails>
	// 										<Typography>Description</Typography>
	// 									</AccordionDetails>
	// 								</Accordion>
	// 							</Link>
	// 							{departments.map((department, i) => {
	// 								return (
	// 									<Link to={"/admin/department/" + department.id} key={i}>
	// 										<Accordion
	// 											expanded={expanded === "panel1"}
	// 											onChange={handleChange("panel1")}
	// 										>
	// 											<AccordionSummary
	// 												expandIcon={<ExpandMoreIcon />}
	// 												aria-controls="panel1bh-content"
	// 												id="panel1bh-header"
	// 											>
	// 												<Typography className={classes.heading}>
	// 													{department.name}
	// 												</Typography>
	// 												<Typography className={classes.secondaryHeading}>
	// 													{department.hod}
	// 												</Typography>
	// 											</AccordionSummary>
	// 											<AccordionDetails>
	// 												<Typography>{department.description}</Typography>
	// 											</AccordionDetails>
	// 										</Accordion>
	// 									</Link>
	// 								);
	// 							})}
	// 						</Card.Body>
	// 					</Card>
	// 				</Col>
	// 			</Row>
	// 		</Container>
	// 	</>
	// 	// </div>
	// );
}
