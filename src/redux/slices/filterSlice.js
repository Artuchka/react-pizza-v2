import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
		setSearch: (state, data) => {
			state.search = data.payload
		},
		setCategoryId(state, action) {
			console.log(action)
			state.categoryId = action.payload
		},
		setSortId(state, action) {
			console.log(action)
			state.sortId = action.payload
		},
		setOrder(state, action) {
			console.log(action)
			state.order = action.payload
		},
		setPage(state, action) {
			console.log(action)
			state.page = action.payload
		},
		setFilters(state, action) {
			const { page, categoryIndex, sortIndex, order } = action.payload
			state.page = page
			state.categoryId = categoryIndex
			state.sortId = sortIndex
			state.order = order
		},
	},
})

export const selectCategoryId = (state) => state.filters.categoryId
export const selectOrder = (state) => state.filters.order
export const selectSortId = (state) => state.filters.sortId
export const selectPage = (state) => state.filters.page

export const {
	setSearch,
	setCategoryId,
	setSortId,
	setOrder,
	setPage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
