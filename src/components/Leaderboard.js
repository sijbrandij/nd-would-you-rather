import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
	render() {
		return (
			<div>
				<h3>Leaderboard</h3>
				<ul>
					{this.props.userIds.map((id) =>
						<li key={id}>
							{id}
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
			.sort((a,b) => (users[b].questions.length + users[b].answers.length) - (users[a].questions.length + users[a].answers.length))
	}
}

export default connect(mapStateToProps)(Leaderboard)