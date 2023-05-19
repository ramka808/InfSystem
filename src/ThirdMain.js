import { useState, useEffect } from 'react'

import InputSet from './InputSet'

function ThirdMain({ id, onRemove }) {
	const [teachers, setTeachers] = useState(null)
	const [students, setStudents] = useState([])
	const [selectedValue, setSelectedValue] = useState('')
	const [selectedData, setSelectedData] = useState(null)
	const [count, setCount] = useState(1)
	const [inputSets, setInputSets] = useState([])
	const [arrEl, SetArrEl] = useState([])

	console.log(inputSets)
	const handleChange = (event) => {
		setSelectedValue(event.target.value)
		console.log('Selected value:', event.target.value)
	}

	useEffect(() => {
		fetchTeachers()
		fetchStudents()
	}, [])

	const fetchTeachers = async () => {
		const response = await fetch('http://localhost:3100/getTeachers')
		const data = await response.json()
		setTeachers(data)
	}
	const fetchStudents = async () => {
		const response = await fetch('http://localhost:3100/getStudents')
		const data = await response.json()
		setStudents(data)
	}
	//Составление списка групп
	const uniqueGroups = students.reduce((acc, curr) => {
		if (!acc.includes(curr.Group)) {
			return [...acc, curr.Group]
		}
		return acc
	}, [])

	// Обработчик изменения значения input

	const filteredData = students.filter((item) => item.Group === selectedValue)

	const handleChildData = (data) => {
		SetArrEl([...arrEl, data])
		console.log(arrEl) // выводим данные в консоль
	}

	return (
		<div>
			{/* <pre>{JSON.stringify(students, null, 2)}</pre> */}

			{/* <label>Выберите группу</label> */}
			<select value={selectedValue} onChange={handleChange}>
				<option>Группа</option>
				{uniqueGroups.map((item) => (
					<option>{item}</option>
				))}
			</select>
			{filteredData.map((item, index) => (
				<div>
					<InputSet key={index} student={item} onChildData={handleChildData} />
				</div>
			))}
		</div>
	)
}

export default ThirdMain
