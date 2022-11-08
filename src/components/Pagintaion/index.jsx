import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useDispatch } from "react-redux"
import { setPage } from "../../redux/slices/filterSlice"

function Pagination() {
	const dispatch = useDispatch()
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				previousLabel="<"
				nextLabel=">"
				onPageChange={(e) => dispatch(setPage(parseInt(e.selected)))}
				pageRangeDisplayed={8}
				pageCount={3}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Pagination
