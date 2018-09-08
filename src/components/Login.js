import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
	state = {
		selectedUser: null,
		toHome: false,
	}

	handleChange = (e) => {
		e.preventDefault()

		const selectedUser = e.target.value

		this.setState({
			selectedUser,
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { selectedUser } = this.state
		const { dispatch } = this.props

		dispatch(handleSetAuthedUser(selectedUser))

		this.setState({
			selectedUser: null,
			toHome: true,
		})
	}

	render() {
		const { userIds } = this.props
		const { toHome } = this.state

		if (toHome === true) {
			return <Redirect to='/' />
		}

		return (
			<div>
				<h3>Login</h3>

				<form className='login' onSubmit={this.handleSubmit}>
					<select onChange={this.handleChange}>
						{userIds.map((userId) => (
							<option key={userId} value={userId}>{this.props.users[userId].name}</option>
						))}
					</select>
					<button type='submit'>Login</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps ({ users }) {
	return {
		users,
		userIds: Object.keys(users)
			.sort((a,b) => users[b].name < users[a].name)
	}
}

export default connect(mapStateToProps)(Login)