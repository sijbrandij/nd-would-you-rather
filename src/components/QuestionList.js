import React from 'react'
import Question from './Question'

const QuestionList = ({ questionIds }) => {
	return (
		<ul>
			{questionIds.map((id) => (
				<li key={id}>
					<Question id={id} />
				</li>
			))}
		</ul>
	)
}

export default QuestionList