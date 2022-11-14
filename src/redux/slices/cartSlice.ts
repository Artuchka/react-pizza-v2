import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

import { getCartFromLS } from "../../utils/getCartFromLS"
import { countTotalPrice } from "../../utils/countTotalPrice"
import { countTotalCount } from "../../utils/countTotalCount"

export type CartItem = {
	title: string
	id: string
	price: number
	size: number
	type: number
	count: number
	imageUrl: string
}

interface CartSliceState {
	totalPrice: number
	totalCount: number
	items: CartItem[]
}

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

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById =
	(id: string, activeType: number, activeSize: number) =>
	(state: RootState) => {
		// const found = state.cart.items.find(
		// 	(obj) => obj.id == getUniqueId({ id, activeType, activeSize })
		// )
		return state.cart.items
	}

export const { addItem, removeItem, clearItems, addCount } = cartSlice.actions

export default cartSlice.reducer

function getUniqueId({ id, type, size }: Record<string, number>) {
	return `${id}${type}${size}`
}
