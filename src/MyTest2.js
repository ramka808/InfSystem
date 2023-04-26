import React, { useState } from 'react'
import axios from 'axios'
import Test from './Test'

function MyTest2() {
	const options = []
	for (let i = 1; i <= 5; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		)
	}
	console.log(options)
	console.log(Test.a)
	return (
		<div>
			<select>{options}</select>
		</div>
	)
}

export default MyTest2
