import { RootState } from "../store"

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById =
	(id: string, activeType: number, activeSize: number) =>
	(state: RootState) => {
		// const found = state.cart.items.find(
		// 	(obj) => obj.id == getUniqueId({ id, activeType, activeSize })
		// )
		return state.cart.items
	}
