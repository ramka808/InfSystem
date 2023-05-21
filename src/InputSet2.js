import { useState, useEffect } from 'react'

function InputSet({ student, onUpdate, teachers, count }) {
	const [id, setId] = useState(student.id)
	const [fio, setFio] = useState(student.Fio)
	const [theme, setTheme] = useState(student.Theme)
	const [selectedValue, setSelectedValue] = useState('')

	const [arr, setArr] = useState([count, fio, theme, selectedValue])

	useEffect(() => {
		onUpdate(arr)
	}, [])

	const handleIdChange = (event) => {
		setId(event.target.value)
	}
	const handleFioChange = (event) => {
		setFio(event.target.value)
		const newArr = [count, event.target.value, theme, selectedValue]
		setArr(newArr)
		onUpdate(newArr)
	}
	const handleThemeChange = (event) => {
		setTheme(event.target.value)
		const newArr = [count, fio, event.target.value, selectedValue]
		setArr(newArr)
		onUpdate(newArr)
	}

	const handleChange = (event) => {
		setSelectedValue(event.target.value)
		const newArr = [count, fio, theme, event.target.value]
		setArr(newArr)
		onUpdate(newArr)
	}

	return (
		<form>
			{count}
			<select value={selectedValue} onChange={handleChange}>
				<option>Руководитель</option>
				{teachers.map((item) => (
					<option>{item['ФИО и должность']}</option>
				))}
			</select>

			<input
				type='text'
				name='student'
				value={fio}
				onChange={handleFioChange}
			/>

			<input
				type='text'
				name='theme'
				value={theme}
				onChange={handleThemeChange}
			/>
		</form>
	)
}

export default InputSet
