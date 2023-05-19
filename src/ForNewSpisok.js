import { useState } from 'react'
import Filter from './Filter'
import ThirdMain from './ThirdMain'

function ForNewSpisok() {
	const [filters, setFilters] = useState([])

	const addFilter = () => {
		setFilters([...filters, <ThirdMain />])
	}

	return (
		<div>
			<button onClick={addFilter}>Добавить группу</button>
			{filters.map((filter) => filter)}
		</div>
	)
}

export default ForNewSpisok
