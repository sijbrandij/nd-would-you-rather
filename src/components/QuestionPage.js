import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'

const QuestionPage = (props) => {
	const { 
		id, 
		optionOneVotes, 
		optionTwoVotes, 
		authedUser 
	} = props

	return (
		<div className='center'>
			<Question id={id} />
			{!optionOneVotes.includes(authedUser) && 
				!optionTwoVotes.includes(authedUser)
					? 'Vote!'
					: 'You already voted'
			}
		</div>
	)
}

function mapStateToProps ({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	return {
		id,
		authedUser,
		optionOneVotes: !questions[id]
			? []
			: questions[id].optionOne.votes,
		optionTwoVotes: !questions[id]
			? []
			: questions[id].optionTwo.votes
	}
}

export default connect(mapStateToProps)(QuestionPage)