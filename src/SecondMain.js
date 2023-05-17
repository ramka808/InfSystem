import { useState, useEffect } from 'react'

function SecondMain() {
	const [students, setStudents] = useState([])
	const [selectedValue, setSelectedValue] = useState('')
	const [selectedData, setSelectedData] = useState([])

	useEffect(() => {
		fetchStudents()
	}, [])

	const fetchStudents = async () => {
		const response = await fetch('http://localhost:3100/getStudents')
		const data = await response.json()
		setStudents(data)
	}

	// Составление списка групп
	const uniqueGroups = students.reduce((acc, curr) => {
		if (!acc.includes(curr.Group)) {
			return [...acc, curr.Group]
		}
		return acc
	}, [])

	// Обработчик изменения значения input

	const handleInputChange = (e, index) => {
		const newData = [...selectedData]
		if (!newData[index]) {
			// Проверяем, существует ли элемент массива
			newData[index] = { id: filteredData[index].id }
		}
		newData[index][e.target.name] = e.target.value
		setSelectedData(newData)
	}
	console.log(selectedData)
	// Фильтрация данных по выбранной группе
	const filteredData = students.filter((item) => item.Group === selectedValue)

	// Отображение input отфильтрованных элементов
	const renderFilteredData = () => {
		if (filteredData.length > 0) {
			return filteredData.map((item, index) => {
				return (
					<div key={item.id}>
						<input
							type='text'
							name='Fio'
							defaultValue={item.Fio}
							onBlur={(e) => handleInputChange(e, index)}
							size={30}
						/>
						<input
							type='text'
							name='Theme'
							defaultValue={item.Theme}
							onBlur={(e) => handleInputChange(e, index)}
							size={80}
						/>
					</div>
				)
			})
		} else {
			return <div>Нет данных для отображения</div>
		}
	}

	return (
		<div>
			<select
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
			>
				<option value=''>Выберите группу</option>
				{uniqueGroups.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			{renderFilteredData()}
		</div>
	)
}
export default SecondMain
