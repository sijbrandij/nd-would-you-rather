import { RECEIVE_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER, ADD_QUESTION} from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case SAVE_QUESTION_ANSWER :
    	const hash = state[action.authedUser].answers
    	hash[action.qid] = [action.answer]
    	return {
    		...state,
    		[action.authedUser]: {
    			...state[action.authedUser],
    			answers: hash
    		}
    	}
    case ADD_QUESTION :
    	const { question } = action
    	const { author: authedUser } = question
    	const user = state[authedUser]
    	return {
    		...state,
    		[authedUser]: {
    			...user,
    			questions: user.questions.concat([question.id])
    		}
    	}
    default :
      return state
  }
}