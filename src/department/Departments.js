import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { list } from "./api-dept.js";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import CsvImport from 'components/CsvImport';

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

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col md="12">
						<Card>
							<Card.Header className="d-flex justify-content-between">
								<Card.Title as="h4">Departments</Card.Title>
								<div className="buttons">
									<CsvImport />
								</div>
							</Card.Header>
							<Card.Body>
								{departments.map((department, i) => {
									return (
										<Link to={"/admin/department/" + department.id} key={i}>
											<Accordion
												expanded={expanded === "panel1"}
												onChange={handleChange("panel1")}
											>
												<AccordionSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls="panel1bh-content"
													id="panel1bh-header"
												>
													<Typography className={classes.heading}>
														{department.name}
													</Typography>
													<Typography className={classes.secondaryHeading}>
														{department.code}
													</Typography>
												</AccordionSummary>
												<AccordionDetails>
													<Typography>{department.description}</Typography>
												</AccordionDetails>
											</Accordion>
										</Link>
									);
								})}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
		// </div>
	);
}
