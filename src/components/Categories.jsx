import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCategoryId, setCategoryId } from "../redux/slices/filterSlice"

const categories = [
	"Все",
	"Мясные",
	"Вегетарианская",
	"Гриль",
	"Острые",
	"Закрытые",
]
export default function Categories() {
	const categoryIndex = useSelector(selectCategoryId)
	const dispatch = useDispatch()

	return (
		<div className="categories">
			<ul>
				{categories.map((cat, index) => {
					return (
						<li
							key={index}
							className={index == categoryIndex ? "active" : ""}
							onClick={() => dispatch(setCategoryId(index))}
						>
							{cat}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
