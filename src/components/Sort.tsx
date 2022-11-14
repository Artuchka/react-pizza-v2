import React, {
	EventHandler,
	MouseEvent,
	MouseEventHandler,
	useRef,
} from "react"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	selectOrder,
	selectSortId,
	setOrder,
	setSortId,
} from "../redux/slices/filterSlice"

type PopupClick = MouseEvent & {
	path: Node[]
}

const sortNames = ["популярности", "цене", "алфавиту"]

const Sort: FC = () => {
	const sortId = useSelector(selectSortId)
	const order = useSelector(selectOrder)

	const dispatch = useDispatch()

	const [open, setOpen] = React.useState<boolean>(false)
	const sortName = sortNames[sortId]
	const sortRef = useRef<HTMLDivElement>(null)

	const handleSelectSort = (ind: number) => {
		dispatch(setSortId(ind))
		setOpen(false)
	}

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _ev = event as PopupClick
			if (sortRef.current && !_ev.path.includes(sortRef.current)) {
				setOpen(false)
			}
		}
		document.body.addEventListener("click", (e: Event) => {
			const _ev = e as unknown as MouseEvent
			handleClickOutside(_ev)
		})
		return () => {
			document.body.removeEventListener("click", (e: Event) => {
				const _ev = e as unknown as MouseEvent
				handleClickOutside(_ev)
			})
		}
	}, [])

	return (
		<div className="sort">
			<div ref={sortRef} className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{ rotate: `${open ? "180deg" : "0deg"} ` }}
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen((prev) => !prev)}>{sortName}</span>
			</div>
			{open && (
				<div className="sort__popup">
					<ul>
						{sortNames.map((name, ind) => (
							<li
								key={ind}
								className={sortId === ind ? "active" : ""}
								onClick={() => handleSelectSort(ind)}
							>
								{name}
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="order__label">
				<b>Порядок: </b>
				<div className="buttons-container">
					<button
						className={order == "asc" ? "active" : ""}
						onClick={() => dispatch(setOrder("asc"))}
					>
						по возврастанию
					</button>
					<button
						className={order == "desc" ? "active" : ""}
						onClick={() => dispatch(setOrder("desc"))}
					>
						по убыванию
					</button>
				</div>
			</div>
		</div>
	)
}
export default Sort
