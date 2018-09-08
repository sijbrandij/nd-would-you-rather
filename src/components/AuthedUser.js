import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class AuthedUser extends Component {
	handleLogout = (e) => {
		e.preventDefault()

		const { dispatch } = this.props

		dispatch(handleSetAuthedUser(''))
	}

	render() {
		if (this.props.authedUser === "") {
			return (
				<li>
					<NavLink to='/login' activeClassName='active'>
						<button>Login</button>
					</NavLink>
				</li>
			)
		} else {
			return (
				<li>
					<button onClick={this.handleLogout}>
						Logout {this.props.authedUser}
					</button>
				</li>
			)
		}
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser,
	}
}

export default connect(mapStateToProps)(AuthedUser)