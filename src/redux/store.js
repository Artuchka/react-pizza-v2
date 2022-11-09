import { configureStore } from "@reduxjs/toolkit"
import filters from "./slices/filterSlice"
import cart from "./slices/cartSlice"

console.log()

export const store = configureStore({
	reducer: {
		filters,
		cart,
	},
})
