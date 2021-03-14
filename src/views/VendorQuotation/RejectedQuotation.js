import React, { useEffect, useState } from "react";
import {
  getQuotationByVendor,
  getQuotationByVendorByStatus,
} from "./api-vendorQuotation";
import TableHeader from "../../components/TableHeader/TableHeader";
import CsvImport from "components/CsvImport";
import Pagination from "../../components/Pagination/Pagination";
import { numberWithCommas } from "../../helpers";
import ExcelComponet from "../../components/ExecelComponent";
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
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { trackPromise } from "react-promise-tracker";

const STATUS = {
  APPROVED: "aprroved",
  REJECTED: "Rejected",
  ALL: "all",
  PENDING: "Pending",
};

let ITEMS_PER_PAGE = 10;

const RejectedQuotation = () => {
  const [vendorQuotation, setVendorQuotation] = useState([]);
  const [variableData, setVariableData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [totalItems, setTotaltems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appprovedStatus, setApprovedStatus] = useState(STATUS.ALL);
  const [filterDate, setFileterDate] = useState(0);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [execelData, setExecelData] = useState();

  const fetchVedorQuotation = () => {
    trackPromise(
      getQuotationByVendorByStatus("Rejected")
        .then((res) => {
          console.log("response", res);
          console.log("Vendor data", res.data);
          setVendorQuotation(res.data);
          if (res.data) {
            let realData = res.data.map((i) => ({
              approvalComment: i.approvalComment,
              approvalDate: i.approvalDate,
              approvedBy: i.approvedBy,
              caseId: i.caseId,
              comment: i.comment,
              createdAt: i.createdAt,
              createdBy: i.createdBy,
              createdOn: i.createdOn,
              deliveryDate: i.deliveryDate,
              totalAmount: i.totalAmount,
              status: i.status,
              orderId: i.orderId,
              paymnentStatus: i.paymnentStatus,
              processStatus: i.processStatus,
              processStatusInvoice: i.processStatusInvoice,
              processStatusPaymnent: i.processStatusPaymnent,
            }));

            setExecelData(realData);
          }
          setVariableData(res.data);
        })
        .catch((error) => console.log(error, "err in fetch"))
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchVedorQuotation(signal);
    // setVendorQuotation(dummy);
  }, []);

  useEffect(() => {
    if (appprovedStatus === STATUS.ALL && filterDate === 0) {
      setVariableData(vendorQuotation);
      setTotaltems(vendorQuotation.length);
      return;
    } else if (appprovedStatus !== STATUS.All && filterDate === 0) {
      let newData = vendorQuotation.filter((i) => i.status === appprovedStatus);
      setVariableData(newData);
      setTotaltems(newData.length);
      return;
    } else if (appprovedStatus !== STATUS.All && filterDate !== 0) {
      let newData = vendorQuotation.filter((i) => i.status === appprovedStatus);
      let date = new Date();
      let days = date.getDate() - filterDate;
      date.setDate(days);
      let newData2 = newData.filter((k) => new Date(k) >= date);
      setVariableData(newData2);
      setTotaltems(newData2.length);
    }
  }, [appprovedStatus, vendorQuotation]);

  useEffect(() => {
    if (appprovedStatus === STATUS.ALL && filterDate === 0) {
      setVariableData(vendorQuotation);
      setTotaltems(vendorQuotation.length);
      return;
    } else if (appprovedStatus === STATUS.All && filterDate !== 0) {
      let newDate = new Date();
      let realDate = newDate.getDate() - fileterDate;
      newDate.setDate(realDate);
      let vData = vendorQuotation.filter((i) => new Date(i) >= newDate);
      setVariableData(vData);
      setTotaltems(vData.length);
      return;
    } else if (appprovedStatus === !STATUS.All && filterDate !== 0) {
      let newDate = new Date();
      let realDate = newDate.getDate() - fileterDate;
      newDate.setDate(realDate);
      let vData = vendorQuotation.filter((i) => new Date(i) >= newDate);
      vData2 = vData.filter((i) => i.status === appprovedStatus);
      setVariableData(vData2);
      setTotaltems(vData2.length);
      return;
    }
  }, [filterDate, vendorQuotation]);

  useEffect(() => {
    let lastIndex = currentPage * ITEMS_PER_PAGE;
    let startIndex = lastIndex - ITEMS_PER_PAGE;
    let newData = variableData.slice(startIndex, lastIndex);
    setDisplayData(newData);
  }, [currentPage, variableData, vendorQuotation]);

  const headers = [
    { name: "SN", field: "id" },
    { name: "Case Id", field: "", sortable: false },
    { name: "Total Amount", field: "hod", sortable: true },
    // { name: "Vendor Email", field: "unit", sortable: true },
    // { name: "Vendor Name", field: "hod", sortable: true },
    { name: "Comments", field: "unit", sortable: true },
    { name: "Created Date", field: "hod", sortable: true },
  ];
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Rejected Quotations</Card.Title>

                <ExcelComponet
                  execelData={execelData}
                  name={"Rejected Quotations"}
                />
              </Card.Header>
              <Card.Body>
                <p className="d-flex justify-content-center">Filter By</p>
                <Row className="d-flex justify-content-center">
                  <Col sm={6} md={3}>
                    <Form.Group>
                      <Form.Label>Dates</Form.Label>
                      <Form.Control
                        as="select"
                        value={filterDate}
                        onChange={(e) => {
                          setFileterDate(e.target.value);
                        }}
                      >
                        <option value={0}>All</option>
                        <option value={1}>One day ago</option>
                        <option value={3}>Three days ago</option>
                        <option value={7}>one week ago</option>
                        <option value={14}>two week ago</option>
                        <option value={30}>One month ago</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center"></div>
                <div className="d-flex justify-content-center">
                  <Pagination
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
                <Table responsive>
                  <TableHeader
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {displayData.map((item, index) => {
                      console.log(item);
                      return (
                        <tr key={index}>
                          <td>
                            {index +
                              1 * (ITEMS_PER_PAGE * (currentPage - 1)) +
                              1}
                          </td>
                          <td>{item.caseId}</td>
                          <td>{numberWithCommas(item.totalAmount)}</td>
                          {/* <td>{item.email}</td>
                          <td>{item.name}</td> */}
                          <td>{item.comment}</td>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RejectedQuotation;
