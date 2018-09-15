import React from 'react'

const VoteButton = ({ optionText, disabled, selected }) => {
	if (optionText === '') {
		return null
	}

	return (
		<button
			className='btn'
			disabled={disabled}
			selected={selected}
		>
			I'd rather {optionText}
		</button>
	)
}

export default VoteButton