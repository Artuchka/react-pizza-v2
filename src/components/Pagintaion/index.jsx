import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../redux/slices/filterSlice"

function Pagination() {
	const dispatch = useDispatch()
	const page = useSelector((state) => state.filters.page)
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				previousLabel="<"
				nextLabel=">"
				onPageChange={(e) => {
					// console.log(typeof e.selected)
					// console.log("setting page", e.selected + 1)
					dispatch(setPage(parseInt(e.selected) + 1))
				}}
				pageRangeDisplayed={8}
				pageCount={3}
				forcePage={page - 1}
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Pagination
