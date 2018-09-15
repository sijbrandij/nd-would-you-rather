import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question,
	}
}

function saveVote ({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveVote (info) {
  return (dispatch, getState) => {
    dispatch(saveVote(info))
    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveVote: ', e)
        // dispatch action to remove question answer
        alert('There was an error saving your answer. Try again')
      })
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
  	const { authedUser } = getState()
  	dispatch(showLoading())

  	return saveQuestion({
  		optionOneText,
  		optionTwoText,
  		author: authedUser
  	})
  		.then((question) => dispatch(addQuestion(question)))
  		.then(() => dispatch(hideLoading()))
  }
}