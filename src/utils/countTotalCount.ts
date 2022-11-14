import { CartItem } from "../redux/slices/cart/types"

export function countTotalCount(items: CartItem[]) {
	return items.reduce((prev, obj) => prev + obj.count, 0)
}
