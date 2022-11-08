import "./scss/app.scss"

import React, { useEffect } from "react"

import Header from "./components/Header"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound"

import { Route, Routes } from "react-router-dom"

import { decrement, increment } from "./redux/slices/filterSlice"
import { useDispatch, useSelector } from "react-redux"

export const SearchContext = React.createContext()

function App() {
	const [searchValue, setSearchValue] = React.useState("")

	const count = useSelector((state) => state.counter.countValue)
	const dispatch = useDispatch()

	return (
		<div className="wrapper">
			<div>
				<div>
					<button
						aria-label="Increment value"
						onClick={() => dispatch(increment())}
					>
						Increment
					</button>
					<span>{count}</span>
					<button
						aria-label="Decrement value"
						onClick={() => dispatch(decrement())}
					>
						Decrement
					</button>
				</div>
			</div>
			{/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart items={[1, 2]} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider> */}
		</div>
	)
}

export default App
