import { CartItem } from "../redux/slices/cartSlice"

export function countTotalCount(items: CartItem[]) {
	return items.reduce((prev, obj) => prev + obj.count, 0)
}
