const express = require('express')
const cors = require('cors')
const { PythonShell } = require('python-shell')
const sqlite3 = require('sqlite3').verbose()
const { Model, DataTypes } = require('sequelize')

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
	db.all('SELECT * FROM Student_bakalavr', (err, rows) => {
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
	// console.log(req.body.arrays)

	arrays = req.body.arrays
	const newArrays = arrays.flat()
	console.log(newArrays)
})

app.post('/api/formdata', (req, res) => {
	// const name = req.body.name
	// const email = req.body.email
	// const message = `Данные успешно получены: имя - ${name}, email - ${email}`

	// res.json({ message: message })
	console.log(req.body.arrays)
	arrays = req.body.arrays
	// const newArrays = arrays.map((array) => array.flat())
	const newArrays = arrays.flat()
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

app.get('/getMagistr', (req, res) => {
	db.all('SELECT * FROM Student_magistr', (err, rows) => {
		if (err) {
			console.error(err)
			res.status(500).send('Internal server error')
			return
		}
		// отправляем данные клиенту в формате JSON
		res.json(rows)
		console.log('Запрощены магситры')
	})
})

const port = 3100
app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})

const hello = [
	[
		['4419'],
		[
			1,
			'Ахметов Булат Маратович',
			'Система тестирования абитуриентов при выборе направления обучения',
			''
		],
		[
			2,
			'Байрашев Рустам Станиславович',
			'Мобильная система информационной поддержки работников торговой организации',
			''
		],
		[
			3,
			'Виноградов Михаил Алексеевич',
			'Информационная система поиска пожаров в лесных массивах',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		],
		[
			4,
			'Гайнутдинов Марсель Маратович',
			'Интернет-магазин по реализации автозапчастей',
			'Сытник А.С., канд.техн.наук, доцент каф. АСОИУ'
		]
	],
	[
		['4422'],
		[
			1,
			'Азизи Муджибуллах',
			'Приложение клиента к интернет-магазину по реализации продуктов питания',
			'Сытник А.С., канд.техн.наук, доцент каф. АСОИУ'
		],
		[
			2,
			'Андрюков Артем Александрович',
			'Разработка системы измерения количества и качества нефтепродуктов на предприятии нефтепереработки',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		]
	],
	[
		['4422'],
		[
			1,
			'Азизи Муджибуллах',
			'Приложение клиента к интернет-магазину по реализации продуктов питания',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		],
		[
			2,
			'Андрюков Артем Александрович',
			'Разработка системы измерения количества и качества нефтепродуктов на предприятии нефтепереработки',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		]
	],
	[
		['4419'],
		[
			1,
			'Ахметов Булат Маратович',
			'Система тестирования абитуриентов при выборе направления обучения',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		],
		[
			2,
			'Байрашев Рустам Станиславович',
			'Мобильная система информационной поддержки работников торговой организации',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		],
		[
			3,
			'Виноградов Михаил Алексеевич',
			'Информационная система поиска пожаров в лесных массивах',
			'Шлеймович М.П., канд.техн.наук, зав. каф. АСОИУ'
		],
		[
			4,
			'Гайнутдинов Марсель Маратович',
			'Интернет-магазин по реализации автозапчастей',
			'Эминов Ф.И., канд.техн.наук, доцент каф. АСОИУ'
		]
	]
]
