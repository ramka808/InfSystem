import React, { useState } from 'react'

function FolderP() {
	const [folderPath, setFolderPath] = useState('')

	const handleFolderSelect = () => {
		const { dialog } = window.require('electron').remote
		const selectedFolder = dialog.showOpenDialogSync({
			properties: ['openDirectory']
		})
		if (selectedFolder) {
			setFolderPath(selectedFolder[0])
		}
	}

	return (
		<div className='App'>
			<form>
				<label>Select a folder: </label>
				<button onClick={handleFolderSelect}>Browse</button>
				<br />
				<input type='text' value={folderPath} readOnly />
			</form>
		</div>
	)
}
export default FolderP
