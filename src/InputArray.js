import { useState, useEffect } from 'react'
import DataComponent from './DataComponent'
function InputArray() {
	const [options, setOptions] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users')
		const data = await response.json()

		const fetchedOptions = data.map((item) => ({
			value: item.id,
			label: item.username
		}))

		setOptions(fetchedOptions)
	}

	const [selects, setSelects] = useState([])

	const addSelects = () => {
		setSelects([...selects, { value: '', label: '' }])
	}

	const saveSelects = () => {
		console.log(selects)
		// здесь можно сохранить значения в массив или отправить на сервер
	}

	const handleSelectChange = (index, value) => {
		setSelects([
			...selects.slice(0, index),
			{ value, label: options.find((option) => option.value === value)?.label },
			...selects.slice(index + 1)
		])
	}

	const students = [
		{
			id: 1,
			Fio: 'Ахметов Булат Маратович',
			Theme:
				'Система тестирования абитуриентов при выборе направления обучения',
			Group: '4419'
		},
		{
			id: 2,
			Fio: 'Байрашев Рустам Станиславович',
			Theme:
				'Мобильная система информационной поддержки работников торговой организации',
			Group: '4419'
		},
		{
			id: 3,
			Fio: 'Виноградов Михаил Алексеевич',
			Theme: 'Информационная система поиска пожаров в лесных массивах',
			Group: '4419'
		},
		{
			id: 4,
			Fio: 'Гайнутдинов Марсель Маратович',
			Theme: 'Интернет-магазин по реализации автозапчастей',
			Group: '4419'
		},
		{
			id: 5,
			Fio: 'Азизи Муджибуллах',
			Theme:
				'Приложение клиента к интернет-магазину по реализации продуктов питания',
			Group: '4422'
		},
		{
			id: 6,
			Fio: 'Андрюков Артем Александрович',
			Theme:
				'Разработка системы измерения количества и качества нефтепродуктов на предприятии нефтепереработки',
			Group: '4422'
		},
		{
			id: 7,
			Fio: 'Бариев Карим Рашитович',
			Theme: `Информационная система оценки вклада клинических данных в степень поражения легких по компьютерной томографии`,
			Group: '4409'
		},
		{
			id: 8,
			Fio: `Ефимов 
			Тимур 
			Артурович
			`,
			Theme: `Информационная система организации парковки машин с прогнозированием заполняемости`,
			Group: '4409'
		},
		{
			id: 8,
			Fio: `Иванов 
			Данил Владимирович
			`,
			Theme: `Система хранения видеоинформации с использованием метода фрактального сжатия`,
			Group: '4409'
		}
	]

	const group = '4419'

	const filteredStudents = students.filter((student) => student.Group === group)

	console.log(filteredStudents)

	const renderSelects = () =>
		selects.map((select, index) => (
			<div>
				<select
					key={index}
					onChange={(e) => handleSelectChange(index, e.target.value)}
					value={select.value}
				>
					<option value=''>Выберите</option>
					{options.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
				</select>
			</div>
		))

	return (
		<div>
			{/* <button onClick={addSelects}>Добавить поля со списком</button>
			{renderSelects()} */}
			{<DataComponent data={filteredStudents} />}
			{/* <button onClick={saveSelects}>Сохранить в массив</button> */}
		</div>
	)
}

export default InputArray
