const form = document.querySelector('#myForm')
const message = document.querySelector('#message')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const name = form.elements.name.value
	const email = form.elements.email.value

	fetch('/api/formdata', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({ name: name, email: email })
	})
		.then((response) => response.json())
		.then((data) => {
			message.innerHTML = data.message
		})
})
