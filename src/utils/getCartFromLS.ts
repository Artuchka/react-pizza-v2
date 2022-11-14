import { CartItem } from "../redux/slices/cartSlice"
import { countTotalCount } from "./countTotalCount"
import { countTotalPrice } from "./countTotalPrice"

export function getCartFromLS() {
	const got = localStorage.getItem("cart")
	const unjsoned = got ? JSON.parse(got) : []
	const items = unjsoned ? unjsoned : []

	const totalPrice: number = countTotalPrice(items)
	const totalCount: number = countTotalCount(items)
	return { items, totalPrice, totalCount }
}
