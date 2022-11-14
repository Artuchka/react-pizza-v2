import { createSlice } from "@reduxjs/toolkit"
import { countTotalCount } from "../../utils/countTotalCount"
import { countTotalPrice } from "../../utils/countTotalPrice"
import { getCartFromLS } from "../../utils/getCartFromLS"

import { CartSliceState } from "./types"

const { items, totalPrice, totalCount } = getCartFromLS()

const initialState: CartSliceState = {
	items,
	totalPrice,
	totalCount,
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

			state.totalPrice = countTotalPrice(state.items)
			state.totalCount = countTotalCount(state.items)
		},

		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id != action.payload)

			state.totalPrice = countTotalPrice(state.items)
			state.totalCount = countTotalCount(state.items)
		},

		addCount(state, action) {
			const { id, amount } = action.payload
			const foundItem = state.items.find((obj) => obj.id == id)

			if (!foundItem) return

			foundItem.count += amount
			if (foundItem.count <= 0) {
				state.items = state.items.filter((obj) => obj.id != id)
			}

			state.totalPrice = countTotalPrice(state.items)
			state.totalCount = countTotalCount(state.items)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

export const { addItem, removeItem, clearItems, addCount } = cartSlice.actions

export default cartSlice.reducer

function getUniqueId({ id, type, size }: Record<string, number>) {
	return `${id}${type}${size}`
}
