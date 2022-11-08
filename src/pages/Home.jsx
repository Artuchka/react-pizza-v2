import React from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagintaion"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

const sortNames = ["rating", "price", "title"]

function Home({ searchValue }) {
	const [items, setItmes] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [categoryIndex, setCategoryIndex] = React.useState(0)
	const [sortIndex, setSortIndex] = React.useState(0)
	const [order, setOrder] = React.useState("asc")
	const [page, setPage] = React.useState(0)

	React.useEffect(() => {
		setIsLoading(true)
		const category = `&category=${categoryIndex == 0 ? "" : categoryIndex}`
		const sort = `&sortBy=${sortNames[sortIndex]}`
		const orderParam = `&order=${order}`
		const search = searchValue ? `&search=${searchValue}` : ""
		const pagination = `&limit=${4}&page=${page + 1}`

		fetch(`${apiurl}?${pagination}${category}${sort}${orderParam}`)
			.then((res) => res.json())
			.then((jsoned) => {
				console.log(jsoned)
				setItmes(jsoned)
			})
			.catch((err) => {
				console.warn(err)
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
				<Categories
					activeIndex={categoryIndex}
					setActiveIndex={setCategoryIndex}
				/>
				<Sort
					activeIndex={sortIndex}
					setActiveIndex={setSortIndex}
					order={order}
					setOrder={setOrder}
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeletons : pizzaz}
			</div>
			<Pagination setPage={setPage} />
		</div>
	)
}

export default Home
