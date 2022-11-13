import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"
const sortNames = ["rating", "price", "title"]

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async (params, thunkApi) => {
		const { categoryId, sortId, order, page, search } =
			thunkApi.getState().filters

		const category = `&category=${categoryId == 0 ? "" : categoryId}`
		const sort = `&sortBy=${sortNames[sortId]}`
		const orderParam = `&order=${order}`
		// const searchParam = searchValue ? `&search=${searchValue}` : ""
		const pagination = `&limit=${4}&page=${page}`
		const { data } = await axios.get(
			`${apiurl}?${pagination}${category}${sort}${orderParam}`
		)

		if (data.length === 0) {
			return thunkApi.rejectWithValue("Zero Pizzas")
		}
		return thunkApi.fulfillWithValue(data)
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
			console.log(action, "fullfill")
			state.status = "success"
			state.items = action.payload
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			console.log(action, "reject")
			state.status = "error"
			state.items = []
			console.log("ашибачка")
			console.log(action.error)
		})
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
