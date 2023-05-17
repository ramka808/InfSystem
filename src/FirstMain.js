import { useState, useEffect } from 'react'

function FirstMain() {
	const [teachers, setTeachers] = useState(null)
	const [students, setStudents] = useState([])
	const [selectedValue, setSelectedValue] = useState('')
	const [selectedData, setSelectedData] = useState(null)
	const [count, setCount] = useState(1)

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
	const handleInputChange = (e) => {
		const newData = { ...selectedData }
		newData[e.target.name] = e.target.value
		setSelectedData(newData)
	}
	const handleInputChange2 = (e, index) => {
		const newData = [...selectedData]
		newData[index][e.target.name] = e.target.value
		setSelectedData(newData)
	}
	const filteredData = students.filter((item) => item.Group === selectedValue)

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
					<input
						type='text'
						name='id'
						// value={item.id}
						value={count}
						onChange={handleInputChange}
						size={1}
					/>
					<input type='text' name='Fio' value={item.Fio} size={30} />
					<input
						type='text'
						name='Theme'
						value={item.Theme}
						onChange={handleInputChange}
						size={80}
					/>
				</div>
			))}
		</div>
	)
}

export default FirstMain
