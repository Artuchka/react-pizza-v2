import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	items: [],
	totalPrice: 0,
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// addItem(state, action) {
		// 	state.items.push(action.payload)
		// 	state.totalPrice += action.payload.price
		// },

		addItem(state, action) {
			const foundItem = state.items.find(
				(obj) => obj.id == action.payload.id
			)
			if (foundItem) {
				foundItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}
			state.totalPrice += action.payload.price
		},

		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id != action.payload)
		},
		clearItems(state) {
			state.items = []
		},
	},
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
