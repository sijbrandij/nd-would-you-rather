import React from 'react'
import { connect } from 'react-redux'

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
				className='avatar float-right'
			/>
			<div>
				{user.name}
				{' || '}
				{user.questions.length} questions asked
				{' || '}
				{Object.keys(user.answers).length} votes
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