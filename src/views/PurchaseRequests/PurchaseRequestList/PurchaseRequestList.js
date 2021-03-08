import React from 'react';
import { Link } from 'react-router-dom';
import {numberWithCommas} from '../../../helpers'
import { Table, Button } from 'react-bootstrap';

const purchaseRequestList = (props) => (
	<Table responsive>
		<thead>
			<tr>
				<th>#</th>
				<th>Case ID</th>
				{/* <th>Items Count</th> */}
				<th>Review Status</th>
				<th>Amount</th>
				<th>Balance</th>
				<th>Created At</th>

				<th></th>
			</tr>
		</thead>
		<tbody>
			{props.requests.map((request, i) => (
				<tr key={request.id}>
					<td>{(props.currentPage - 1) * props.perPage + i + 1}</td>
					<td>{request.caseId}</td>
					{/* <td>{request.items.length}</td> */}
					<td>{request.reviewStatusReadable}</td>
					<td>{numberWithCommas(request.amount)}</td>
					<td>{numberWithCommas(request.balance)}</td>
					<td>{new Date(request.createdAt).toLocaleDateString()}</td>
					<td>
						<Link to={`/admin/purchase/requests/${request.id}`}>
							<Button size="sm">View</Button>
						</Link>
					</td>
				</tr>
			))}
		</tbody>
	</Table>
);

export default purchaseRequestList;