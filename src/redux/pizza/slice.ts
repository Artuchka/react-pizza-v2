import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchPizzas } from "./asyncActions"
import { Pizza, PizzaSliceState, Status } from "./types"

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
