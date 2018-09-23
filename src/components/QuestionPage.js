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

		if (question === undefined) {
			return (
				<div className='center'>
					<h2>Oops! That question does not exist</h2>
				</div>
			)
		}

		if (authedUser === null) {
			return <Redirect to={{
				pathname: '/login',
				state: { from: this.props.location.pathname }
			}} />
		}

		if (toHome === true) {
			return <Redirect to='/' />
		}

		const vote = users[authedUser].answers[question.id]
		const disabled = (vote !== undefined)
		const user = users[question.author]
		const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
		const { optionOne, optionTwo } = question

		return (
			<div className='center'>
				<h1>Would You Rather?</h1>
				<button
					className='btn'
					disabled={disabled}
					value='optionOne'
					selected={optionOne.text === vote}
					onClick={this.handleVote}
				>
					I'd rather {optionOne.text}
				</button>
				<button 
					className='btn'
					disabled={disabled} 
					value='optionTwo'
					selected={optionTwo.text === vote}
					onClick={this.handleVote}
				>
					I'd rather {optionTwo.text}
				</button>
				<div>
					<h4>Stats</h4>
					{optionOne.text}: ({optionOne.votes.length})
					{" "}
					{totalVotes === 0 ? 0 : Math.floor((optionOne.votes.length / totalVotes) * 100)} %
					{' || '}
					{optionTwo.text}: ({optionTwo.votes.length})
					{' '}
					{totalVotes === 0 ? 0 : Math.floor((optionTwo.votes.length / totalVotes) * 100)} %
				</div>
				<div>
					<h4>Author</h4>
					<img
						src={user.avatarURL}
						alt={`avatar of ${user.name}`}
						className='avatar'
					/>
					<div>{user.name}</div>
				</div>
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