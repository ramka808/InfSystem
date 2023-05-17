const express = require('express')
const cors = require('cors')
const { PythonShell } = require('python-shell')
const sqlite3 = require('sqlite3').verbose()

const app = express()

app.use(express.json())
app.use(cors())

// создание подключения к базе данных
const db = new sqlite3.Database('./myDatabase.db', (err) => {
	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the database.')
})

app.get('/getUsers', (req, res) => {
	db.all('SELECT * FROM users', (err, rows) => {
		if (err) {
			console.error(err)
			res.status(500).send('Internal server error')
			return
		}
		// отправляем данные клиенту в формате JSON
		res.json(rows)
	})
})

app.get('/getTeachers', (req, res) => {
	db.all('SELECT * FROM Преподаватели', (err, rows) => {
		if (err) {
			console.error(err)
			res.status(500).send('Internal server error')
			return
		}
		// отправляем данные клиенту в формате JSON
		res.json(rows)
		console.log('Запрощены преподаватели')
	})
})

app.get('/getStudents', (req, res) => {
	db.all('SELECT * FROM Student', (err, rows) => {
		if (err) {
			console.error(err)
			res.status(500).send('Internal server error')
			return
		}
		// отправляем данные клиенту в формате JSON
		res.json(rows)
		console.log('Запрощены студенты')
	})
})

//Для вывода того, что приходит с клиента
app.post('/print', (req, res) => {
	console.log(req.body)
})

app.post('/api/formdata', (req, res) => {
	// const name = req.body.name
	// const email = req.body.email
	// const message = `Данные успешно получены: имя - ${name}, email - ${email}`

	// res.json({ message: message })
	console.log(req.body.arrays)
	arrays = req.body.arrays
	const newArrays = arrays.map((array) => array.flat())
	console.log(newArrays)
	options = {
		mode: 'text',
		args: newArrays
	}
	PythonShell.run('E:/PythonPr/main.py', options).then((messages) => {
		console.log('finished')
		console.log(messages)
	})
})

const port = 3100
app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
