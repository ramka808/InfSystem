import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

function CreateDocButton() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [nameDoc, setNameDoc] = useState('')
	const [path, setPath] = useState('')
	const [option, setOption] = useState([])

	const options = option.map((option) => ({
		value: option.id,
		label: `hello`
	}))

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get('https://jsonplaceholder.typicode.com/todos/') // изменить ссылку на свою (бэк)

			setOption(res.data)
		}

		getData()
	}, [])

	console.log(option)

	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='name'
			/>
			<br></br>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='email'
			/>
			<br></br>
			<input
				value={nameDoc}
				onChange={(e) => setNameDoc(e.target.value)}
				placeholder='name doc'
			/>

			<br></br>
			<input
				value={path}
				onChange={(e) => setPath(e.target.value)}
				placeholder='path'
			/>
			<button
				style={{ cursor: 'pointer' }}
				// onClick={() => sendReq(name, email, nameDoc, path)}
			>
				Отправить на сервер
			</button>

			<Select options={options} />
		</div>
	)
}

export default CreateDocButton
