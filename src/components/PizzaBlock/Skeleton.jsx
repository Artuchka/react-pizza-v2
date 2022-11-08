import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={1}
		width={400}
		height={460}
		viewBox="0 0 400 460"
		backgroundColor="#cc6228"
		foregroundColor="#d3c3c0"
		{...props}
	>
		<circle cx="102" cy="98" r="95" />
		<rect x="38" y="211" rx="2" ry="2" width="140" height="10" />
		<rect x="17" y="233" rx="2" ry="2" width="186" height="36" />
	</ContentLoader>
)

export default Skeleton
