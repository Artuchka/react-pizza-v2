import React from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagintaion"

import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

const sortNames = ["rating", "price", "title"]

function Home() {
	const searchValue = useSelector((state) => state.filters.search)
	const categoryIndex = useSelector((state) => state.filters.categoryId)
	const sortIndex = useSelector((state) => state.filters.sortId)
	const order = useSelector((state) => state.filters.order)
	const page = useSelector((state) => state.filters.page)
	const dispatch = useDispatch()

	const [items, setItmes] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		setIsLoading(true)
		const category = `&category=${categoryIndex == 0 ? "" : categoryIndex}`
		const sort = `&sortBy=${sortNames[sortIndex]}`
		const orderParam = `&order=${order}`
		const search = searchValue ? `&search=${searchValue}` : ""
		const pagination = `&limit=${4}&page=${page}`

		axios
			.get(`${apiurl}?${pagination}${category}${sort}${orderParam}`)
			.then(({ data }) => {
				console.log(data)
				setItmes(data)
			})
			.catch((err) => {
				console.warn(err)
				alert(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryIndex, sortIndex, order, page])

	const pizzaz = items
		.filter(({ name }) => {
			return name.toLowerCase().includes(searchValue.toLowerCase())
		})
		.map((obj) => {
			return <PizzaBlock key={obj.id} {...obj} />
		})
	const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />)
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeletons : pizzaz}
			</div>
			<Pagination />
		</div>
	)
}

export default Home
