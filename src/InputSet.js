import React, { useState } from 'react'

function InputSet({ student, onChildData }) {
	const sendDataToParent = () => {
		onChildData(arr) // вызываем колбэк и передаем ему данные
	}

	const [id, setId] = useState(student.id)
	const [fio, setFio] = useState(student.Fio)
	const [theme, setTheme] = useState(student.Theme)
	const [group, setGroup] = useState(student.Group)

	// const [inputs, setInputs] = useState([{ id: id, fio: fio, theme: theme }])
	// console.log(inputs)

	const [arr, setArr] = useState([group, id, fio, theme])
	// console.log(arr)

	const handleIdChange = (event) => {
		setId(event.target.value)
		setArr([group, id, fio, theme])
	}

	const handleFioChange = (event) => {
		setFio(event.target.value)
		setArr([group, id, fio, theme])
	}

	const handleThemeChange = (event) => {
		setTheme(event.target.value)
		setArr([group, id, fio, theme])
	}

	return (
		<div>
			<input
				type='text'
				name='id'
				value={id}
				onChange={handleIdChange}
				size={1}
			/>
			<input
				type='text'
				name='Fio'
				value={fio}
				onChange={handleFioChange}
				size={30}
			/>
			<input
				type='text'
				name='Theme'
				value={theme}
				onChange={handleThemeChange}
				size={80}
			/>
			<button onClick={sendDataToParent}>
				Отправить данные в родительский компонент
			</button>
		</div>
	)
}

export default InputSet
