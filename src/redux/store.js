import { configureStore } from "@reduxjs/toolkit"
import filters from "./slices/filterSlice"

console.log()

export const store = configureStore({
	reducer: {
		filters,
	},
})
