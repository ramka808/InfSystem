import React, { useState } from 'react'

function SecondMain() {
	const [inputValues, setInputValues] = useState([])
	const [arrayOfArrays, setArrayOfArrays] = useState([])

	function handleInputChange(index, value) {
		const newInputValues = [...inputValues]
		newInputValues[index] = value

		if ((index + 1) % 3 === 0) {
			const newArray = newInputValues.slice(index - 2, index + 1)
			setArrayOfArrays((prevArray) => [...prevArray, newArray])
		}

		setInputValues(newInputValues)
	}

	const randomNumberOfInputs = Math.floor(Math.random() * 10) * 3
	const inputs = []

	for (let i = 0; i < randomNumberOfInputs; i++) {
		inputs.push(
			<input
				key={i}
				onChange={(event) => handleInputChange(i, event.target.value)}
			/>
		)
	}

	return <div>{inputs}</div>
}
export default SecondMain
