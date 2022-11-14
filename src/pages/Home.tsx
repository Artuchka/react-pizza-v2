import React, { useRef } from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagintaion"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FilterSliceState } from "../redux/slices/filterSlice"
import qs from "qs"
import {
	selectCategoryId,
	selectOrder,
	selectPage,
	selectSortId,
	setCategoryId,
	setFilters,
} from "../redux/slices/filterSlice"
import { fetchPizzas } from "../redux/slices/pizzaSlice"

const Home = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const categoryIndex = useSelector(selectCategoryId)
	const { items, status } = useSelector((state: any) => state.pizza)

	const sortIndex = useSelector(selectSortId)
	const order = useSelector(selectOrder)
	const page = useSelector(selectPage)

	const hasCustomParams = useRef<boolean>(false)
	const isMounted = useRef<boolean>(false)

	const getPizzas = async () => {
		//@ts-ignore
		dispatch(fetchPizzas())
	}

	React.useEffect(() => {
		if (window.location.search) {
			const paramsGot = qs.parse(window.location.search.replace("?", ""))
			const params: FilterSliceState = {
				search: "",
				sortId: sortIndex,
				categoryId: categoryIndex,
				page: page,
				order: order,
			}
			dispatch(setFilters(params))
			hasCustomParams.current = true
		}
	}, [])

	React.useEffect(() => {
		// data fetching
		if (!hasCustomParams.current) {
			getPizzas()
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
		// .filter(({ name }) => {
		// 	return name.toLowerCase().includes(searchValue.toLowerCase())
		// })
		.map((obj: any) => {
			return <PizzaBlock key={obj.id} {...obj} />
		})
	const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />)

	function onChangeCategory(index: number) {
		dispatch(setCategoryId(index))
	}
	return (
		<div className="container">
			<div className="content__top">
				<Categories onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status == "error" ? (
				<div className="content__error-info">
					<h2>Произошла ошибка!!</h2>
					<p>К сожалению не получили пиццы с сервака</p>
					<p>Попробуйте повторить позже</p>
				</div>
			) : (
				<div className="content__items">
					{status == "loading" ? skeletons : pizzaz}
				</div>
			)}

			<Pagination />
		</div>
	)
}

export default Home
