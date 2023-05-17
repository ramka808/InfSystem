import { useState } from 'react'
import Filter from './Filter'

function ForNewSpisok() {
	const [filters, setFilters] = useState([])

	const addFilter = () => {
		setFilters([...filters, <Filter />])
	}

	return (
		<div>
			<button onClick={addFilter}>Добавить группу</button>
			{filters.map((filter) => filter)}
		</div>
	)
}

export default ForNewSpisok
