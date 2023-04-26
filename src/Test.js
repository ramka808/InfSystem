import React, { useRef, useState } from 'react'
import axios from 'axios'

function CreateDocButton() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [nameDoc, setNameDoc] = useState('')
	const [path, setPath] = useState('')

	const options2 = {
		users: [
			{ id: 1, name: 'John', age: 30 },
			{ id: 1, name: 'Sarah', age: 25 },
			{ id: 1, name: 'Mike', age: 40 }
		]
	}

	const options = useRef({
		users: [
			{ id: 1, name: 'John', age: 30 },
			{ id: 1, name: 'Sarah', age: 25 },
			{ id: 1, name: 'Mike', age: 40 }
		]
	})
	const sendReq = async (name1, email1, nameDoc1, path1) => {
		let res1
		// await fetch('http://localhost:3200/api/formdata', {
		// await fetch('http://localhost:3200/api/getData', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		name: name1,
		// 		email: email1,
		// 		nameDoc: nameDoc1,
		// 		path: path1
		// 	})
		// })
		// 	.then((response) => response.json())
		// 	.then((response) => {
		// 		res1 = response
		// 	})
		// options = res1.map((resEl) => {
		// 	return resEl.first_name
		options.current = 20
		console.log(options)
	}
	console.log(options.current.users)
	console.log(options2.users)

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
				onClick={() => sendReq(name, email, nameDoc, path)}
			>
				Отправить на сервер
			</button>
		</div>
	)
}

export default CreateDocButton
