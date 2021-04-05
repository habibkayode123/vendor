import React from "react";
import { Table } from "react-bootstrap";
import { numberWithCommas } from "../../../helpers";

function VendorTable(props) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.vendors &&
          props.vendors.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              {/* <td>
                                {item.vendor}
                            </td> */}
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default VendorTable;
