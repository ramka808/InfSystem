import React from 'react'

const data = [
	{
		id: 1,
		Fio: 'Ахметов Булат Маратович',
		Theme: 'Система тестирования абитуриентов при выборе направления обучения',
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
		Fio: `Ефимов Тимур Артурович`,
		Theme: `Информационная система организации парковки машин с прогнозированием заполняемости`,
		Group: '4409'
	},
	{
		id: 8,
		Fio: `Иванов Данил Владимирович`,
		Theme: `Система хранения видеоинформации с использованием метода фрактального сжатия`,
		Group: '4409'
	}
]
const DataComponent = () => {
	const [selectedData, setSelectedData] = React.useState(null)

	// Обработчик изменения значения input
	const handleInputChange = (e) => {
		const newData = { ...selectedData }
		newData[e.target.name] = e.target.value
		setSelectedData(newData)
	}

	return (
		<div>
			<select
				onChange={(e) =>
					setSelectedData(
						data.find((item) => item.id === parseInt(e.target.value))
					)
				}
			>
				<option>Выберите элемент</option>
				{data.map((item) => (
					<option key={item.id} value={item.id}>
						{item.Fio}
					</option>
				))}
			</select>
			{selectedData && (
				<div>
					<input
						type='text'
						name='id'
						value={selectedData.id}
						onChange={handleInputChange}
						size={1}
					/>
					<input
						type='text'
						name='Fio'
						value={selectedData.Fio}
						onChange={handleInputChange}
						size={30}
					/>
					<input
						type='text'
						name='Theme'
						value={selectedData.Theme}
						onChange={handleInputChange}
						size={80}
					/>
				</div>
			)}
		</div>
	)
}

export default DataComponent
