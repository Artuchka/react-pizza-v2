import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/filterSlice"

console.log()

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
})
