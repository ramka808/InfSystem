import React, { useState } from 'react'

const RandomInput = () => {
	const [numberOfInputs, setNumberOfInputs] = useState(0)
	const [inputValues, setInputValues] = useState([])

	const handleInputValueChange = (event, index) => {
		const newInputValues = [...inputValues]
		newInputValues[index] = event.target.value
		setInputValues(newInputValues)
		console.log(newInputValues)
	}
	const generateInputs = () => {
		const newNumberOfInputs = Math.floor(Math.random() * 10) + 1 // генерация случайного числа от 1 до 10
		setNumberOfInputs(newNumberOfInputs)
		setInputValues(Array(newNumberOfInputs).fill(''))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(inputValues)
	}

	return (
		<div>
			<button onClick={generateInputs}>Generate inputs</button>
			{numberOfInputs > 0 && (
				<form onSubmit={handleSubmit}>
					{inputValues.map((value, index) => (
						<input
							key={index}
							value={inputValues[index]}
							onChange={(event) => handleInputValueChange(event, index)}
						/>
					))}
					<button type='submit'>Submit</button>
				</form>
			)}
		</div>
	)
}

export default RandomInput
