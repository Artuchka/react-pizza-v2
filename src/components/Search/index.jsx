import React from "react"

import styles from "./Search.module.scss"
import { SearchContext } from "./../../App"

function Search() {
	const { searchValue, setSearchValue } = React.useContext(SearchContext)
	return (
		<div className={styles.root}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={styles.searchIcon}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>

			<input
				className={styles.input}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder="Search for pizza"
			/>

			{searchValue != "" && (
				<svg
					className={styles.closeIcon}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					onClick={() => setSearchValue("")}
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			)}
		</div>
	)
}

export default Search
