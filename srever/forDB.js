const sqlite3 = require('sqlite3').verbose()

// создание подключения к базе данных
let db = new sqlite3.Database('./myDatabase.db', (err) => {
	if (err) {
		console.error(err.message)
	}
	console.log('Connected to the database.')
})

// создание таблицы
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
)`)

// db.run(
// 	`INSERT INTO users (username, email) VALUES (?, ?)`,
// 	['Studebt2', 'Student2@example.com'],
// 	function (err) {
// 		if (err) {
// 			return console.log(err.message)
// 		}
// 		console.log(`A row has been inserted with rowid ${this.lastID}`)
// 	}
// )

db.run(
	`ALTER TABLE users
 ADD group2 char(10)`,
	function (err) {
		if (err) {
			return console.log(err.message)
		}
	}
)

db.close((err) => {
	if (err) {
		console.error(err.message)
	}
	console.log('Close the database connection.')
})
