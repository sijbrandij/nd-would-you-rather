import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Question = ({ question, users, authedUser }) => {
	if (question === null) {
		return <p>This poll doesn't exist</p>
	}

	const { optionOne, optionTwo, author, timestamp, id } = question
	const user = users[author]

	return (
		<Link
			to={`/questions/${id}`}
			className='question' 
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
				<span className={optionTwo.votes.includes(authedUser) ? 'green' : ''}>
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
		</Link>
	)
}

function mapStateToProps ({ authedUser,users, questions }, { id }) {
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