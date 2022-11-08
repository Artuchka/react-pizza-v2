import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"

function Pagination({ setPage }) {
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				previousLabel="<"
				nextLabel=">"
				onPageChange={(e) => setPage(parseInt(e.selected))}
				pageRangeDisplayed={8}
				pageCount={3}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Pagination
