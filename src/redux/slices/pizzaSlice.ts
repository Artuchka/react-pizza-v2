import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"
const sortNames = ["rating", "price", "title"]

export const fetchPizzas = createAsyncThunk<
	Pizza[],
	undefined,
	{
		state: RootState
	}
>("pizza/fetchPizzasStatus", async (_, { getState }) => {
	const { categoryId, sortId, order, page, search } = getState().filters

	const category = `&category=${categoryId == 0 ? "" : categoryId}`
	const sort = `&sortBy=${sortNames[sortId]}`
	const orderParam = `&order=${order}`
	// const searchParam = searchValue ? `&search=${searchValue}` : ""
	const pagination = `&limit=${4}&page=${page}`
	const { data } = await axios.get<Pizza[]>(
		`${apiurl}?${pagination}${category}${sort}${orderParam}`
	)

	if (data.length === 0) {
		throw new Error("Zero Pizzas")
	}
	return data
})

type Pizza = {
	id: string
	imageUrl: string
	name: string
	price: number
	category: number
	rating: number
	sizes: number[]
	types: number[]
}

enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

interface PizzaSliceState {
	items: Pizza[]
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING
			console.log("идет фечинг")
			state.items = []
		})
		builder.addCase(
			fetchPizzas.fulfilled,
			(state, action: PayloadAction<Pizza[]>) => {
				state.status = Status.SUCCESS
				state.items = action.payload
			}
		)
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR
			state.items = []
			console.log("ашибачка")
			console.log(action.error)
		})
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
