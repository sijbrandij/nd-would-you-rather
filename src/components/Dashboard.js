import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component { 
	render() {
		if (this.props.authedUser === null) {
			return <Redirect to='/login' />
		}

		return (
			<div className='center'>
				<h3>Would You Rather?</h3>
				<ul>
					{this.props.questionIds.map((id) => (
						<li key={id}>
							<Question id={id} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}

function mapStateToProps ({ authedUser, questions }) {
	return {
		authedUser,
		questionIds: Object.keys(questions)
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard)