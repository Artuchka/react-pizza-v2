import React from "react"

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

function Home() {
	const [items, setItmes] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		fetch(apiurl)
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
	}, [])
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => {
							return <PizzaBlock key={obj.id} {...obj} />
					  })}
			</div>
		</div>
	)
}

export default Home
