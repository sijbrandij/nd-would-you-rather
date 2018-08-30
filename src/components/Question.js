import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

class Question extends Component {
	toQuestion = (e, id) => {
		e.preventDefault()
		// Todo: redirect to question page
	}

	render() {
		const { question } = this.props

		if (question === null) {
			return <p>This poll doesn't exist</p>
		}

		const { optionOne, optionTwo, author, timestamp } = question
		const user = this.props.users[author]

		return (
			<div 
				className='question' 
				onClick={(e) => this.toQuestion(e, question.id)}
			>
				<div className='option-one'>
					{optionOne.text}
					<span>
						<FaCheck />
						{optionOne.votes.length}
					</span>
				</div>
				<div className='option-two'>
					{optionTwo.text}
					<span className={optionTwo.votes.includes(this.props.authedUser) ? 'green' : ''}>
						<FaCheck />
						{optionTwo.votes.length}
					</span>
				</div>
				<div className='user-info'>
					<img
						src={user.avatarURL}
						alt={`avatar of ${author}`}
						className='avatar-small'
					/>
					<span>{user.name}</span>
					<br />
					<span>{formatDate(timestamp)}</span>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({authedUser,users, questions}, { id }) {
	const question = questions[id]

	return {
		authedUser,
		users,
		question: question
			? question
			: null
	}
}

export default connect(mapStateToProps)(Question)