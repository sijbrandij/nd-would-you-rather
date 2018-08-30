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
				<img
					src={user.avatarURL}
					alt={`avatar of ${author}`}
					className='avatar'
				/>
				<div>
					<span>{user.name}</span>
					<div>{formatDate(timestamp)}</div>
				</div>
				<div className='optionOne'>
					{optionOne.text}
					<FaCheck />
					{optionOne.votes.length}
				</div>
				<div className='optionTwo'>
					{optionTwo.text}
					<FaCheck />
					{optionTwo.votes.length}
				</div>
			</div>
		)
	}
}

function mapStateToProps ({users, questions}, { id }) {
	const question = questions[id]

	return {
		users,
		question: question
			? question
			: null
	}
}

export default connect(mapStateToProps)(Question)