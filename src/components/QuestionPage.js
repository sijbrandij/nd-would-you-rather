import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import VoteButton from './VoteButton'

const QuestionPage = ({ question, authedUser, users }) => {
	if (authedUser === null) {
		return <Redirect to='/login' />
	}

	const vote = users[authedUser].answers[question.id]
	const disabled = (vote !== undefined)

	return (
		<div className='center'>
			<h1>Would You Rather?</h1>
			<VoteButton 
				optionText={question.optionOne.text}
				disabled={disabled}
				selected={question.optionOne.text === vote}
			/>
			<VoteButton 
				optionText={question.optionTwo.text}
				disabled={disabled} 
				selected={question.optionTwo.text === vote}
			/>
		</div>
	)
}

function mapStateToProps ({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	return {
		question,
		authedUser, 
		users
	}
}

export default connect(mapStateToProps)(QuestionPage)