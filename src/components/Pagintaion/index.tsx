import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { selectPage, setPage } from "../../redux/slices/filterSlice"

type Page = {
	selected: number
}

const Pagination = () => {
	const dispatch = useDispatch()
	const page = useSelector(selectPage)
	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				previousLabel="<"
				nextLabel=">"
				onPageChange={(e: Page) => {
					console.log(e.selected)
					dispatch(setPage(e.selected + 1))
				}}
				pageRangeDisplayed={8}
				pageCount={3}
				forcePage={page - 1}
			/>
		</>
	)
}

export default Pagination
