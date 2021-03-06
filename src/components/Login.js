import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
	state = {
		selectedUser: null,
		redirectToReferrer: false
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
			redirectToReferrer: true
		})
	}

	render() {
		const { userIds } = this.props
		const { redirectToReferrer, selectedUser } = this.state
		const { from } = this.props.location.state || { from: { pathname: '/' } }


		if (redirectToReferrer === true) {
			return <Redirect to={from} />
		}

		return (
			<div className='center'>
				<h3>Login</h3>

				<form className='login' onSubmit={this.handleSubmit}>
					<div className='clearfix'>
						<select onChange={this.handleChange}>
							<option value=''>Choose a user</option>
							{userIds.map((userId) => (
								<option key={userId} value={userId}>{this.props.users[userId].name}</option>
							))}
						</select>
					</div>
					<button 
						type='submit'
						className='btn'
						disabled={selectedUser === null}
					>
						Login
					</button>
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