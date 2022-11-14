import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState } from "./types"

const initialState: FilterSliceState = {
	search: "",
	categoryId: 0,
	sortId: 0,
	page: 1,
	order: "asc",
}

export const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		},
		setCategoryId(state, action: PayloadAction<number>) {
			console.log(action)
			state.categoryId = action.payload
		},
		setSortId(state, action: PayloadAction<number>) {
			console.log(action)
			state.sortId = action.payload
		},
		setOrder(state, action: PayloadAction<string>) {
			console.log(action)
			state.order = action.payload
		},
		setPage(state, action: PayloadAction<number>) {
			console.log(action)
			state.page = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			const { page, categoryId, sortId, order } = action.payload
			state.page = page
			state.categoryId = categoryId
			state.sortId = sortId
			state.order = order
		},
	},
})

export const {
	setSearch,
	setCategoryId,
	setSortId,
	setOrder,
	setPage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
