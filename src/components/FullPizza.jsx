import axios from "axios"
import { isEmpty } from "lodash"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const apiurl = "https://6367caaed1d09a8fa61a9d57.mockapi.io/react-pizza-v2"

function FullPizza() {
	const navigate = useNavigate()
	const [data, setData] = useState({})
	const { id } = useParams()
	const {
		name: title,
		price,
		imageUrl,
		rating,
		category,
		sizes,
		types,
	} = data
	React.useEffect(() => {
		axios
			.get(`${apiurl}/${id}`)
			.then(({ data }) => {
				console.log(data)
				setData(data)
			})
			.catch((err) => {
				console.log(err)
				alert("error while getting pizza data")
				navigate("/")
			})
	}, [])

	return (
		<>
			{isEmpty(data) ? (
				<h2>Loading...</h2>
			) : (
				<div className="pizza-block">
					<img
						className="pizza-block__image"
						src={imageUrl}
						alt="Pizza"
					/>
					<h4 className="pizza-block__title">{title}</h4>
					<div className="pizza-block__selector">
						<ul>
							{/* {types.map((typeId) => {
                    return (
                        <li
                            key={typeId}
                            className={
                                typeId === activeType ? "active" : ""
                            }
                            onClick={() => setActiveType(typeId)}
                        >
                            {typeNames[typeId]}
                        </li>
                    )
                })} */}
						</ul>
						<ul>
							{/* {sizes.map((size, sizeIndex) => (
                    <li
                        key={sizeIndex}
                        className={sizeIndex === activeSize ? "active" : ""}
                        onClick={() => setActiveSize(sizeIndex)}
                    >
                        {size} см.
                    </li>
                ))} */}
						</ul>
					</div>
					<div className="pizza-block__bottom">
						<div className="pizza-block__price">от {price} ₽</div>
						<button
							className="button button--outline button--add"
							// onClick={handleAdd}
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
									fill="white"
								/>
							</svg>
							<span>Добавить</span>
							{/* {count > 0 ? <i>{count}</i> : null} */}
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default FullPizza
