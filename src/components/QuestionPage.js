import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveVote } from '../actions/questions'

class QuestionPage extends Component {
	state = {
		toHome: false
	}

	handleVote = (e) => {
		const { dispatch, question, authedUser } = this.props

		dispatch(handleSaveVote({
			authedUser,
			qid: question.id,
			answer: e.target.value
		}))

		this.setState({
			toHome: true
		})
	}

	render() {
		const { question, authedUser, users } = this.props
		const { toHome } = this.state

		if (authedUser === null) {
			return <Redirect to='/login' />
		}

		if (toHome === true) {
			return <Redirect to='/' />
		}

		const vote = users[authedUser].answers[question.id]
		const disabled = (vote !== undefined)

		return (
			<div className='center'>
				<h1>Would You Rather?</h1>
				<button
					className='btn'
					disabled={disabled}
					value='optionOne'
					selected={question.optionOne.text === vote}
					onClick={this.handleVote}
				>
					I'd rather {question.optionOne.text}
				</button>
				<button 
					className='btn'
					disabled={disabled} 
					value='optionTwo'
					selected={question.optionTwo.text === vote}
					onClick={this.handleVote}
				>
					I'd rather {question.optionTwo.text}
				</button>
			</div>
		)
	}
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