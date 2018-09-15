import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION :
			const question = action.question

			return {
				...state,
				[question.id]: question,
			}
		case SAVE_QUESTION_ANSWER :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					optionOne: {
						votes: action.answer === state[action.id].optionOne.text
							? state[action.id].optionOne.votes.concat([action.authedUser])
							: state[action.id].optionOne.votes
					},
					optionTwo: {
						votes: action.answer === state[action.id].optionTwo.text
							? state[action.id].optionTwo.votes.concat([action.authedUser])
							: state[action.id].optionTwo.votes
					}
				}
			}

		default :
			return state
	}
}