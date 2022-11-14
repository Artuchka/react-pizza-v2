import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import { Pizza } from "./types"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"
const sortNames = ["rating", "price", "title"]

export const fetchPizzas = createAsyncThunk<
	Pizza[],
	undefined,
	{
		state: RootState
	}
>("pizza/fetchPizzasStatus", async (_, { getState }) => {
	const { categoryId, sortId, order, page, search } = getState().filters

	const category = `&category=${categoryId == 0 ? "" : categoryId}`
	const sort = `&sortBy=${sortNames[sortId]}`
	const orderParam = `&order=${order}`
	// const searchParam = searchValue ? `&search=${searchValue}` : ""
	const pagination = `&limit=${4}&page=${page}`

	const { data } = await axios.get<Pizza[]>(
		`${apiurl}?${pagination}${category}${sort}${orderParam}`
	)

	if (data.length === 0) {
		throw new Error("Zero Pizzas")
	}
	return data
})
