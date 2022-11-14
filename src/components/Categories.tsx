import React from "react"
import { useSelector } from "react-redux"
import { selectCategoryId } from "../redux/filter/selectors"

const categories = [
	"Все",
	"Мясные",
	"Вегетарианская",
	"Гриль",
	"Острые",
	"Закрытые",
]

type CategoriesProps = {
	onChangeCategory: (idx: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ onChangeCategory }) => {
	const categoryIndex = useSelector(selectCategoryId)

	return (
		<div className="categories">
			<ul>
				{categories.map((cat, index) => {
					return (
						<li
							key={index}
							className={index == categoryIndex ? "active" : ""}
							onClick={() => {
								onChangeCategory(index)
							}}
						>
							{cat}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
export default Categories
