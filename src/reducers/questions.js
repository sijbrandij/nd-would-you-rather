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
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat([action.authedUser])
					},
				}
			}

		default :
			return state
	}
}