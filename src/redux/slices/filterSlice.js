import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	search: "",
	categoryId: 0,
	sortId: 0,
	page: 0,
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
	},
})

export const { setSearch, setCategoryId, setSortId, setOrder, setPage } =
	filterSlice.actions

export default filterSlice.reducer
