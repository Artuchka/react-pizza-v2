import React, { useCallback, useRef, useState } from "react"

import styles from "./Search.module.scss"

import { setSearch } from "../../redux/slices/filterSlice"
import { useDispatch } from "react-redux"
import debounce from "lodash.debounce"

function Search() {
	const dispatch = useDispatch()
	const [value, setValue] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	function handleClear() {
		dispatch(setSearch(""))
		setValue("")
		inputRef.current?.focus()
	}
	const updateSearchValue = useCallback(
		debounce((str) => {
			console.log(`FETCHING ${str}`)
			dispatch(setSearch(str))
		}, 300),
		[]
	)
	function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}

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
				ref={inputRef}
				className={styles.input}
				value={value}
				onChange={handleInput}
				placeholder="Search for pizza"
			/>

			{value != "" && (
				<svg
					className={styles.closeIcon}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					onClick={handleClear}
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
