import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	countValue: 0,
	name: "im fucking counter",
}

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.countValue += 1
		},
		decrement: (state) => {
			state.countValue -= 1
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
