export type CartItem = {
	title: string
	id: string
	price: number
	size: number
	type: number
	count: number
	imageUrl: string
}

export interface CartSliceState {
	totalPrice: number
	totalCount: number
	items: CartItem[]
}
