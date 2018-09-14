import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component { 
	state = {
		showAnswered: false,
	}

	handleTabToggle = () => {
		this.setState(prevState => ({
			showAnswered: !prevState.showAnswered
		}))
	}

	render() {
		const { authedUser, questionIds, users, questions } = this.props
		const showAnswered = this.state

		if (authedUser === null) {
			return <Redirect to='/login' />
		}

		const answeredQuestionIds = Object.keys(users[authedUser].answers)
		const unansweredQuestionIds = Object.keys(questions).filter((questionId) => !answeredQuestionIds.includes(questionId))

		console.log(showAnswered)
		if (showAnswered === true) {
			return (
				<div className='center'>
					<h3>Would You Rather?</h3>
					<h4>Answered questions</h4>
					<a onClick={this.handleTabToggle}>Show unanswered questions</a>
					<ul>
						{answeredQuestionIds.map((id) => (
							<li key={id}>
								<Question id={id} />
							</li>
						))}
					</ul>
				</div>
			)
		} else {
			return (
				<div className='center'>
					<h1>Would You Rather?</h1>
					<h4>Unanswered questions</h4>
					<a onClick={this.handleTabToggle}>Show answered questions</a>
					<ul>
						{unansweredQuestionIds.map((id) => (
							<li key={id}>
								<Question id={id} />
							</li>
						))}
					</ul>
				</div>
			)
		}
	}
}

function mapStateToProps ({ questions, users, authedUser }) {
	return {
		questions,
		users,
		authedUser,
		questionIds: Object.keys(questions)
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard)