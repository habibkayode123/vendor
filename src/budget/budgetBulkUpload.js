import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FileUploaded from "./fileUploader";

export default function BulkBudget(){
	const [name, setName] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

    const submitForm = (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("name", name);
			formData.append("file", selectedFile);
			console.log("form data", formData)
			console.log("name","files");
			console.log("file",selectedFile);
			// axios
			// 	.post(UPLOAD_URL, formData)
			// 	.then((res) => {
			// 		alert("File Upload success");
			// 	})
			// 	.catch((err) => alert("File Upload Error"));
		};
	return (
		<>
			<Container fluid>
				<Row>
					<li className="nav-item">
						<NavLink to="#" className="nav-link" activeClassName="active">
							<i className={""} />
							<h3>Bulk Upload</h3>
						</NavLink>
					</li>
					<Col md="12">
						<Card>
							<Card.Header>
								<Card.Title as="h4">Budgets</Card.Title>
							</Card.Header>
							<Card.Body>
								<div className="App">
									<form>

										<FileUploaded
											onFileSelectSuccess={(file) => setSelectedFile(file)}
											onFileSelectError={({ error }) => alert(error)}
											onSubmit={(e)=>submitForm}
										/>

										<button onClick={submitForm}>Submit</button>
									</form>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

// export default Home;
