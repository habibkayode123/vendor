import React from 'react';
import {Table} from 'react-bootstrap';
import {numberWithCommas} from '../../../helpers'

function itemsTable(props) {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    {/* <th>Vendor</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    props.items && props.items.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{numberWithCommas(parseFloat(item.amount).toFixed(2))}</td>
                            {/* <td>
                                {item.vendor}
                            </td> */}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}

export default itemsTable;