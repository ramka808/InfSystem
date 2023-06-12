const express = require('express')
const cors = require('cors')
const { PythonShell } = require('python-shell')
const sqlite3 = require('sqlite3').verbose()
const { Model, DataTypes, Sequelize } = require('sequelize')
const csv = require('csv-parser')
const fs = require('fs')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'myDatabase.db'
})
class Students_bak extends Model {}
Students_bak.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Fio: DataTypes.TEXT,
		Theme: DataTypes.TEXT,
		Group: DataTypes.TEXT,
		graduation: DataTypes.TEXT,
		createdAt: DataTypes.DATE, // Добавляем поле времени создания
		updatedAt: DataTypes.DATE // Добавляем поле времени изменения
	},
	{ sequelize, modelName: 'student_bakalavr', tableName: 'student_bakalavr' }
)

class Students_mag extends Model {}
Students_mag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fio: DataTypes.TEXT,
		theme: DataTypes.TEXT,

		graduation: DataTypes.TEXT,

		group: DataTypes.TEXT,

		recensist: DataTypes.TEXT,
		createdAt: DataTypes.DATE, // Добавляем поле времени создания
		updatedAt: DataTypes.DATE // Добавляем поле времени изменения
	},
	{
		sequelize,
		modelName: 'Student_magistr',
		tableName: 'Student_magistr'
	}
)

class Teachers extends Model {}
Teachers.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fio_and_post: DataTypes.TEXT,
		createdAt: DataTypes.DATE, // Добавляем поле времени создания
		updatedAt: DataTypes.DATE
	},
	{
		sequelize,
		modelName: 'Преподаватели',
		tableName: 'Преподаватели'
	}
)

async function print() {
	const student = await Teachers.findAll()
	console.log(student)
}
print()

const app = express()

app.use(express.json())
app.use(cors())

//Из чата
app.post('/students', async (req, res) => {
	try {
		const student = await Students_bak.create(req.body)
		res.json(student)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при создании студента' })
	}
})

// редактируем студента(Из чата)
app.put('/students/:id', async (req, res) => {
	try {
		const student = await Students_bak.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Студент не найден' })
		}
		const updatedStudent = await student.update(req.body)
		res.json(updatedStudent)
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ message: 'Ошибка при обновлении информации о студенте' })
	}
})

// Удаляем студента (из чата)
app.delete('/students/:id', async (req, res) => {
	try {
		const student = await Students_bak.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Студент не найден' })
		}
		await student.destroy()
		res.json({ message: 'Студент удален' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при удалении студента' })
	}
})

// Обработка загрузки студентов из CSV файла (Из чата)
app.post('/students/csv', upload.single('file'), async (req, res) => {
	try {
		const file = req.file // получаем файл из FormData
		console.log(file)
		const students = [] // массив для новых студентов
		// Читаем CSV файл построчно и преобразуем строки в объекты Student
		fs.createReadStream(file.path)
			.pipe(csv({ separator: ';' }))
			.on('data', (row) => {
				const student = {
					Fio: row.name,
					Group: row.group,
					graduation: row.year,
					Theme: row.topic
				}
				console.log(student)
				students.push(student)
			})
			.on('end', async () => {
				// Добавляем новых студентов в базу данных
				await Students_bak.bulkCreate(students)
				res.json({ message: 'Студенты успешно добавлены' })
			})
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ message: 'Ошибка при добавлении студентов из CSV файла' })
	}
})

//магистры
app.get('/getMagistrs', async (req, res) => {
	try {
		const student = await Students_mag.findAll()
		res.json(student)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при создании студента' })
	}
})

app.post('/magistrs', async (req, res) => {
	try {
		const student = await Students_mag.create(req.body)
		res.json(student)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при создании студента' })
	}
})

app.put('/magistrs/:id', async (req, res) => {
	try {
		const student = await Students_mag.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Студент не найден' })
		}
		const updatedStudent = await student.update(req.body)
		res.json(updatedStudent)
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ message: 'Ошибка при обновлении информации о студенте' })
	}
})

// Удаляем магистра (из чата)
app.delete('/magistrs/:id', async (req, res) => {
	try {
		const student = await Students_mag.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Студент не найден' })
		}
		await student.destroy()
		res.json({ message: 'Студент удален' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при удалении студента' })
	}
})

//Преподаватели
app.get('/getTeachers', async (req, res) => {
	try {
		const teachers = await Teachers.findAll()
		console.log(teachers)
		res.json(teachers)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при создании студента' })
	}
})
app.post('/teachers', async (req, res) => {
	try {
		const student = await Teachers.create(req.body)
		res.json(student)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при создании студента' })
	}
})

app.put('/teachers/:id', async (req, res) => {
	try {
		const student = await Teachers.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Студент не найден' })
		}
		const updatedStudent = await student.update(req.body)
		res.json(updatedStudent)
	} catch (err) {
		console.error(err)
		res
			.status(500)
			.json({ message: 'Ошибка при обновлении информации о студенте' })
	}
})

// Удаляем преподавателя (из чата)
app.delete('/teachers/:id', async (req, res) => {
	try {
		const student = await Teachers.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ message: 'Преподаватель не найден' })
		}
		await student.destroy()
		res.json({ message: 'Студент удален' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Ошибка при удалении преподавателя' })
	}
})

// создание подключения к базе данных
const db = new sqlite3.Database('./myDatabase.db', (err) => {
	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the database.')
})

// app.get('/getTeachers', (req, res) => {
// 	db.all('SELECT * FROM Преподаватели', (err, rows) => {
// 		if (err) {
// 			console.error(err)
// 			res.status(500).send('Internal server error')
// 			return
// 		}
// 		// отправляем данные клиенту в формате JSON
// 		res.json(rows)
// 		console.log('Запрощены преподаватели')
// 	})
// })

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
