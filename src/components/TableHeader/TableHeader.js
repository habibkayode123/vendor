import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const TableHeader = ({ headers, onSorting }) => {
	const [sortingField, setSortingField] = useState("");
	const [sortingOrder, setSortingOrder] = useState("asc");

	const onSortingChange = (field) => {
		const order =
			field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
		setSortingField(field);
		setSortingOrder(order);
		onSorting(field, order);
	};

	return (
		<thead>
			<tr>
				{headers.map(({ name, field, sortable }) => (
					<th
						key={name}
						onClick={() => (sortable ? onSortingChange(field) : null)}
					>
						{name}
						{sortingField && sortingField === field && (
							<i
								class={
									sortingOrder === "asc" ? "fa fa-arrow-down" : "fa fa-arrow-up"
								}
								aria-hidden="true"
							></i>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};
export default TableHeader;
