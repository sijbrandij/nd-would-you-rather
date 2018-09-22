import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false,
	}

	handleChange = (e) => {
		const text = e.target.value
		const option = e.target.id
		this.setState({
			[option]: text
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOneText, optionTwoText } = this.state
		const { dispatch } = this.props

		dispatch(handleAddQuestion(optionOneText, optionTwoText))

		this.setState({
			optionOneText: '',
			optionTwoText: '',
			toHome: true,
		})
	}

	render() {
		if (this.props.authedUser === null) {
			return <Redirect to={{
				pathname: '/login',
				state: { from: this.props.location.pathname }
			}} />
		}

		const { optionOneText, optionTwoText, toHome } = this.state

		if (toHome === true) {
			return <Redirect to='/' />
		}

		return (
			<div className='center'>
				<h3>New Question</h3>
				<form className='new-question' onSubmit={this.handleSubmit}>
					<div className='clearfix'>
						<textarea
							id='optionOneText'
							placeholder='Enter first option'
							value={optionOneText}
							onChange={this.handleChange}
							className='textarea'
							maxLength={280}
						/>
						<textarea
							id='optionTwoText'
							placeholder='Enter second option'
							value={optionTwoText}
							onChange={this.handleChange}
							className='textarea'
							maxLength={280}
						/>
					</div>
					<button
						className='btn'
						type='submit'
						disabled={optionOneText === '' || optionTwoText === ''}
					>
						Submit
					</button>
				</form>
			</div>
		)
	}
}
function mapStateToProps ({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(NewQuestion)