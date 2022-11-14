import { CartItem } from "../redux/slices/cart/types"

export function countTotalPrice(items: CartItem[]) {
	return items.reduce((prev, obj) => prev + obj.price * obj.count, 0)
}
