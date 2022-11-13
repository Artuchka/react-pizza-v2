import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	items: [],
	totalPrice: 0,
	totalCount: 0,
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const uniqeId = getUniqueId(action.payload)
			const foundItem = state.items.find((obj) => obj.id == uniqeId)
			if (foundItem) {
				foundItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1, id: uniqeId })
			}
			state.totalPrice = state.items.reduce(
				(prev, obj) => prev + obj.price * obj.count,
				0
			)
			state.totalCount = state.items.reduce(
				(prev, obj) => prev + obj.count,
				0
			)
		},

		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id != action.payload)

			state.totalPrice = state.items.reduce(
				(prev, obj) => prev + obj.price * obj.count,
				0
			)
			state.totalCount = state.items.reduce(
				(prev, obj) => prev + obj.count,
				0
			)
		},

		addCount(state, action) {
			const { id, amount } = action.payload
			const foundItem = state.items.find((obj) => obj.id == id)

			if (!foundItem) return

			foundItem.count += amount
			if (foundItem.count <= 0) {
				state.items = state.items.filter((obj) => obj.id != id)
			}

			state.totalPrice = state.items.reduce(
				(prev, obj) => prev + obj.price * obj.count,
				0
			)
			state.totalCount = state.items.reduce(
				(prev, obj) => prev + obj.count,
				0
			)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

export const selectCart = (state) => state.cart
export const selectCartItemById = (id, activeType, activeSize) => (state) => {
	// const found = state.cart.items.find(
	// 	(obj) => obj.id == getUniqueId({ id, activeType, activeSize })
	// )
	return state.cart.items
}

export const { addItem, removeItem, clearItems, addCount } = cartSlice.actions

export default cartSlice.reducer

function getUniqueId({ id, type, size }) {
	return `${id}${type}${size}`
}
