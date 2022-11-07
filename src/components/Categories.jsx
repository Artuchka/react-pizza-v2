import { useState } from "react"

const categories = [
	"Все",
	"Мясные",
	"Вегетарианская",
	"Гриль",
	"Острые",
	"Закрытые",
]
export default function Categories() {
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div className="categories">
			<ul>
				{categories.map((cat, index) => {
					return (
						<li
							key={index}
							className={index == activeIndex ? "active" : ""}
							onClick={() => setActiveIndex(index)}
						>
							{cat}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
