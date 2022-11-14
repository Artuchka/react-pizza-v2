export type Pizza = {
	id: string
	imageUrl: string
	name: string
	price: number
	category: number
	rating: number
	sizes: number[]
	types: number[]
}

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

export interface PizzaSliceState {
	items: Pizza[]
	status: Status
}
