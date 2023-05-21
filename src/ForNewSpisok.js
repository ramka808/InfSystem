import { useState } from 'react'
import Filter from './Filter'
import ThirdMain from './ThirdMain'
import ThirdMain2 from './ThirdMain2'

function ForNewSpisok() {
	const [countGroups, setCountGroups] = useState([])
	const [dataList, setDataList] = useState([])

	const addGroup = () => {
		setCountGroups([...countGroups, 1])
	}

	function handleUpdateData(index, newData) {
		setDataList((prevDataList) => {
			const newDataList = [...prevDataList]
			newDataList[index] = newData
			return newDataList
		})
	}

	async function sendToServer() {
		console.log(dataList)
		await fetch('http://localhost:3100/api/formdata', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ arrays: dataList })
		})
	}

	return (
		<div>
			<br></br>
			<button onClick={addGroup}>Добавить группу</button>
			{countGroups.map((group, index) => (
				<ThirdMain2 onUpdate={(newData) => handleUpdateData(index, newData)} />
			))}
			<button onClick={sendToServer}>Отправить на сервер</button>
		</div>
	)
}

export default ForNewSpisok
