import { configureStore } from "@reduxjs/toolkit"
import filters from "./filter/slice"
import cart from "./cart/slice"
import pizza from "./pizza/slice"
import { useDispatch } from "react-redux"

console.log()

export const store = configureStore({
	reducer: {
		filters,
		cart,
		pizza,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
