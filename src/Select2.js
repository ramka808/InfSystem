import { Select, Input } from 'antd'
import { useState } from 'react'

const { Option } = Select

function EditableSelect({ options, defaultValue }) {
	const [value, setValue] = useState(defaultValue.value)
	const [isEditable, setIsEditable] = useState(defaultValue.editable)

	const handleChange = (newValue) => {
		setValue(newValue)
		setIsEditable(true)
	}

	const handleBlur = () => {
		setIsEditable(false)
	}

	return (
		<Select
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
			dropdownRender={(menu) => (
				<div>
					{menu}
					{isEditable ? (
						<Input value={value} onChange={(e) => setValue(e.target.value)} />
					) : (
						<a onClick={() => setIsEditable(true)}>Редактировать</a>
					)}
				</div>
			)}
		>
			{options.map((option) => (
				<Option key={option}>{option}</Option>
			))}
		</Select>
	)
}

export default EditableSelect
