import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Leaderboard extends Component {
	render() {
		return (
			<div className='center'>
				<h3>Leaderboard</h3>
				<ul>
					{this.props.userIds.map((id) =>
						<li key={id}>
							<User id={id} />
						</li>
					)}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({ users }) {
	return {
		userIds: Object.keys(users)
			.sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
	}
}

export default connect(mapStateToProps)(Leaderboard)