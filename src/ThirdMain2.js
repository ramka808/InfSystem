import { useState, useEffect, useRef } from 'react'
import InputSet2 from './InputSet2'
import { prettyDOM } from '@testing-library/react'

function ThirdMain2({ onUpdate }) {
	const [dataList, setDataList] = useState([])
	const [teachers, setTeachers] = useState([])
	const [students, setStudents] = useState([])
	const [selectedValue, setSelectedValue] = useState('')

	// console.log(dataList)

	// Метод для добавления нового элемента в dataList
	function handleAddData() {
		setDataList((prevDataList) => [...prevDataList, {}])
	}

	useEffect(() => {
		fetchTeachers()
		fetchStudents()
		onUpdate(dataList)
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

	// Метод для обновления определенного элемента в dataList
	function handleUpdateData(index, newData) {
		setDataList((prevDataList) => {
			const newDataList = [...prevDataList]
			newDataList[index] = newData
			onUpdate(newDataList)
			return newDataList
		})
	}

	// Метод для обработки отправки данных
	async function handleSubmit(event) {
		event.preventDefault()
		await fetch('http://localhost:3100/api/formdata', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ arrays: dataList })
		})
	}
	// console.log(dataList)

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
		console.log('Selected value:', event.target.value)

		setDataList((prevDataList) => {
			const newArray = [...prevDataList]
			const tmp = []
			tmp.push(event.target.value)
			newArray[0] = tmp
			onUpdate(newArray)
			return newArray
		})
	}

	//Составление списка групп
	const uniqueGroups = students.reduce((acc, curr) => {
		if (!acc.includes(curr.Group)) {
			return [...acc, curr.Group]
		}
		return acc
	}, [])

	const filteredData = students.filter((item) => item.Group === selectedValue)

	return (
		<div>
			<select value={selectedValue} onChange={handleChange}>
				<option>Группа</option>
				{uniqueGroups.map((item) => (
					<option>{item}</option>
				))}
			</select>
			{/* Компоненты InputSet */}
			{filteredData.map((student, index) => (
				<InputSet2
					key={index}
					student={student}
					onUpdate={(newData) => handleUpdateData(index + 1, newData)}
					teachers={teachers}
					count={index + 1}
				/>
			))}
			<br></br>
			{/* Кнопка для отправки данных */}
			{/* <button onClick={handleSubmit}>Отправить данные</button> */}
		</div>
	)
}

export default ThirdMain2
