import React, { useState } from 'react'
import axios from 'axios'
import Item from 'antd/es/list/Item'

function FolderP() {
	const [data, setData] = useState('')
	const sendReq2 = async () => {
		const resul = await axios.get('https://jsonplaceholder.typicode.com/todos')
		setData(resul.data)
		console.log(data)
	}

	return (
		<div className='App'>
			<button onClick={sendReq2}></button>
		</div>
	)
}
export default FolderP
