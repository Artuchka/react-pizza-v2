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
			console.log(action.payload)
			const { page, sortIndex, categoryIndex, order } = action.payload

			state.page = page
			state.sortId = sortIndex
			state.categoryId = categoryIndex
			state.order = order
			console.log(state.page)
			console.log(state.sortId)
			console.log(state.categoryId)
			console.log(state.order)
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
