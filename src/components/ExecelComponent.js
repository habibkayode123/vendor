import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelComponet = (props) => {
  return (
    <ExcelFile
      filename={props.name}
      element={<button className="btn btn-primary">Export to Excel</button>}
    >
      <ExcelSheet data={props.execelData} name="Quotation">
        <ExcelColumn label="Approval Comment" value="approvalComment" />
        <ExcelColumn label="Approval Date" value="approvalDate" />
        <ExcelColumn label="Approved By" value="approvedBy" />
        <ExcelColumn label="caseId" value="caseId" />
        <ExcelColumn label="Comment" value="comment" />
        <ExcelColumn label="Created At" value="createdAt" />
        <ExcelColumn label="Created By" value="createdBy" />
        <ExcelColumn label="created On" value="createdOn" />
        <ExcelColumn label="Total Amount" value="totalAmount" />
        <ExcelColumn label="Status" value="status" />
        <ExcelColumn label="orderId" value="orderId" />
        <ExcelColumn label="Paymnent Status" value="paymnentStatus" />
        <ExcelColumn
          label="Process Status Paymnent"
          value="processStatusPaymnent"
        />
        <ExcelColumn
          label="Process Status Receipt"
          value="processStatusReceipt"
        />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelComponet;
