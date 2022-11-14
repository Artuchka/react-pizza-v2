import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.scss"
import { useSelector } from "react-redux"
import { selectPage, setPage } from "../../redux/slices/filterSlice"
import { useAppDispatch } from "../../redux/store"

type Page = {
	selected: number
}

const Pagination = () => {
	const dispatch = useAppDispatch()
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
