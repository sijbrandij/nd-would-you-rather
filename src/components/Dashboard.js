import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'

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
		const { authedUser, users, questions } = this.props
		const { showAnswered } = this.state

		if (authedUser === null) {
			return <Redirect to='/login' />
		}

		const answeredQuestionIds = Object.keys(users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
		const unansweredQuestionIds = Object.keys(questions).filter((questionId) => !answeredQuestionIds.includes(questionId)).sort((a,b) => questions[b].timestamp - questions[a].timestamp)

		return (
			<div className='center'>
				<h1>Would You Rather?</h1>
				<h4>
					{showAnswered ? 'Answered Questions' : 'Unanswered Questions'}
				</h4>
				<a onClick={this.handleTabToggle}>
					{showAnswered ? 'Show unanswered questions' : 'Show answered questions'}
				</a>
				{showAnswered && <QuestionList questionIds={answeredQuestionIds} />}
				{!showAnswered && <QuestionList questionIds={unansweredQuestionIds} />}
			</div>
		)
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