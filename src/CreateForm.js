import React, { useState } from 'react'

function MyComponent() {
	// Состояние для хранения массива массивов
	const [arrays, setArrays] = useState([])

	// Состояния для хранения значений полей ввода
	const [input1Val, setInput1Val] = useState('')
	const [input2Val, setInput2Val] = useState('')
	const [input3Val, setInput3Val] = useState('')

	// Обработчик клика на кнопку "Добавить массив"
	const handleAddArrayClick = () => {
		// Создаем новый массив и добавляем его в основной массив
		const newArray = []
		setArrays([...arrays, newArray])

		// Показываем модальное окно для ввода данных
		setShowModal(true)
	}

	// Обработчик клика на кнопку "Сохранить"
	const handleSaveClick = () => {
		// Добавляем значения из полей в созданный массив
		const newValues = [input1Val, input2Val, input3Val]
		const lastArrayIndex = arrays.length - 1
		const updatedLastArray = [...arrays[lastArrayIndex], newValues]
		const updatedArrays = [...arrays.slice(0, lastArrayIndex), updatedLastArray]
		setArrays(updatedArrays)

		// Очищаем значения полей и закрываем модальное окно
		setInput1Val('')
		setInput2Val('')
		setInput3Val('')
		setShowModal(false)
	}

	// Обработчик изменения значения поля ввода номер 1
	const handleInput1Change = (event) => {
		setInput1Val(event.target.value)
	}

	// Обработчик изменения значения поля ввода номер 2
	const handleInput2Change = (event) => {
		setInput2Val(event.target.value)
	}
	console.log(arrays)

	// Обработчик изменения значения поля ввода номер 3
	const handleInput3Change = (event) => {
		setInput3Val(event.target.value)
	}

	// Состояние для отображения или скрытия модального окна
	const [showModal, setShowModal] = useState(false)

	return (
		<div>
			<button onClick={handleAddArrayClick}>Добавить массив</button>
			<div>
				{arrays.map((array, index) => (
					<div key={index}>
						{array.map((values, i) => (
							<p key={`${index}-${i}`}>{values.join(', ')}</p>
						))}
					</div>
				))}
			</div>

			{/* Модальное окно */}
			{showModal && (
				<div>
					<h2>Введите данные:</h2>
					<input type='text' value={input1Val} onChange={handleInput1Change} />
					<input type='text' value={input2Val} onChange={handleInput2Change} />
					<input type='text' value={input3Val} onChange={handleInput3Change} />
					<button onClick={handleSaveClick}>Сохранить</button>
				</div>
			)}
		</div>
	)
}

export default MyComponent
