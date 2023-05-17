import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DropDown() {
	const [users, setUsers] = useState([])
	const [teachers, SetTeachers] = useState([])
	const [selectedUser, setSelectedUser] = useState('')
	const [selectedTeacher, setSelectedTeacher] = useState('')

	const sendToSrever = () => {
		fetch('http://localhost:3100/print', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ User: selectedUser, teacher: selectedTeacher })
		})
	}

	useEffect(() => {
		async function getUsers() {
			try {
				const response = await axios.get('http://localhost:3100/getUsers')
				setUsers(response.data)
			} catch (error) {
				console.log(error)
			}
		}

		async function getTeachers() {
			try {
				const response = await axios.get('http://localhost:3100/getTeachers')
				SetTeachers(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUsers()
		getTeachers()
	}, [])

	return (
		<div>
			<select
				value={selectedUser}
				onChange={(e) => setSelectedUser(e.target.value)}
			>
				<option value=''>Выберите пользователя</option>
				{users.map((user) => (
					<option key={user.id} value={user.username}>
						{user.username}
					</option>
				))}
			</select>
			<select
				value={selectedTeacher}
				onChange={(e) => setSelectedTeacher(e.target.value)}
			>
				<option value=''>Выберите пользователя</option>
				{teachers.map((teacher) => (
					<option key={teacher.id} value={teacher.fio}>
						{teacher.fio}
					</option>
				))}
			</select>

			<button onClick={sendToSrever}>Отправить на сервер</button>
		</div>
	)
}

export default DropDown
