const express = require('express')
const cors = require('cors')
const PizZip = require('pizzip')
const Docxtemplater = require('docxtemplater')
const axios = require('axios')
var bodyParser = require('body-parser')
var fs = require('fs')
const path = require('path')
const mysql = require('mysql')

// const con = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '12345678',
// 	database: 'mydb'
// })

// con.connect(function (err) {
// 	if (err) throw err
// 	console.log('Connected!')
// })

const app = express()
app.use(express.json())
app.use(cors())

// app.post('/api/getData', (req, res) => {
// 	// console.log(con)
// 	let sql = 'select * from employees'

// 	con.query('select * from employees', function (err, result, fields) {
// 		if (err) throw err
// 		console.log('Result:')

// 		console.log(result)
// 		res.send(result)
// 	})
// })

app.post('/api/formdata', (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const nameDoc = req.body.nameDoc
	const path1 = req.body.path
	const message = `Данные успешно получены: имя - ${name}, email - ${email}`

	res.json({ message: message })
	console.log(req.body)

	createDoc(name, nameDoc, path1)
})

const createDoc = (name2, nameDoc2, path1) => {
	const content = fs.readFileSync(
		path.resolve(__dirname, 'tag-example.docx'),
		'binary'
	)

	const zip = new PizZip(content)

	const doc = new Docxtemplater(zip, {
		paragraphLoop: true,
		linebreaks: true
	})

	doc.render({
		first_name: 'John',
		last_name: 'Doe',
		phone: '0652455478',
		description: 'New Website',
		name: name2
	})
	const buf = doc.getZip().generate({
		type: 'nodebuffer',
		// compression: DEFLATE adds a compression step.
		// For a 50MB output document, expect 500ms additional CPU time
		compression: 'DEFLATE'
	})
	fs.writeFileSync(path.resolve(path1, nameDoc2 + '.docx'), buf)
}
console.log(__dirname)
const port = 3201
app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
