import { RECEIVE_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER } from '../actions/questions'

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
    			answers: hash
    		}
    	}
    default :
      return state
  }
}