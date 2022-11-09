import React, { useRef } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagintaion"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import qs from "qs"
import { setFilters } from "../redux/slices/filterSlice"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

const sortNames = ["rating", "price", "title"]

function Home() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const searchValue = useSelector((state) => state.filters.search)
	const categoryIndex = useSelector((state) => state.filters.categoryId)
	const sortIndex = useSelector((state) => state.filters.sortId)
	const order = useSelector((state) => state.filters.order)
	const page = useSelector((state) => state.filters.page)

	const [items, setItmes] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const hasCustomParams = useRef(false)
	const isMounted = useRef(false)

	const fetchPizza = () => {
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
	}

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.replace("?", ""))
			dispatch(setFilters(params))
			hasCustomParams.current = true
		}
	}, [])

	React.useEffect(() => {
		// data fetching
		if (!hasCustomParams.current) {
			fetchPizza()
		}
		hasCustomParams.current = false
		window.scrollTo(0, 0)
	}, [categoryIndex, sortIndex, order, page])

	React.useEffect(() => {
		//query string settingjjjjj
		const queryString = qs.stringify({
			categoryIndex,
			sortIndex,
			order,
			page,
		})

		if (isMounted.current) {
			// just setting url. not routing nor navigation!!!
			navigate(`?${queryString}`)
		}
		isMounted.current = true
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
