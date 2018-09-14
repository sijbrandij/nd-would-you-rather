import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { Redirect } from 'react-router-dom'

const Leaderboard = ({ authedUser, userIds }) => {
	if (authedUser === null) {
		return <Redirect to='/login' />
	}

	return (
		<div className='center'>
			<h3>Leaderboard</h3>
			<ul>
				{userIds.map((id) =>
					<li key={id}>
						<User id={id} />
					</li>
				)}
			</ul>
		</div>
	)
}

function engagement (user) {
	return user.questions.length + Object.keys(user.answers).length
}

function mapStateToProps ({ authedUser, users }) {
	return {
		authedUser,
		userIds: Object.keys(users)
			.sort((a,b) => engagement(users[b]) - engagement(users[a]))
	}
}

export default connect(mapStateToProps)(Leaderboard)