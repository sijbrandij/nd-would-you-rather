import React from 'react'
import { connect } from 'react-redux'
import { FaQuestion, FaCheck } from 'react-icons/fa'

const User = (props) => {
	const { user } = props

	if (user === null) {
		return <p>This user doesn't exist</p>
	}

	return (
		<div className='user'>
			<img
				src={user.avatarURL}
				alt={`avatar of ${user.name}`}
				className='avatar'
			/>
			<div>
				<span>{user.name}</span>
			</div>
			<div>
				<FaQuestion />
				{user.questions.length}
				<FaCheck />
				{Object.keys(user.answers).length}
			</div>
		</div>
	)
}

function mapStateToProps ({users}, { id }) {
	const user = users[id]

	return {
		user
	}
}

export default connect(mapStateToProps)(User)