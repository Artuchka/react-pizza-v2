import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async (params) => {
		const { category, sort, orderParam, search, pagination } = params
		const { data } = await axios.get(
			`${apiurl}?${pagination}${category}${sort}${orderParam}`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: "loading", // loading | success | error
}

export const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = "loading"
			console.log("идет фечинг")
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = "success"
			state.items = action.payload
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = "error"
			state.items = []
			console.log("ашибачка")
			console.log(action.error)
		})
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
