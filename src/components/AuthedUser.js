import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class AuthedUser extends Component {
	handleLogout = () => {
		const { dispatch } = this.props

		dispatch(handleSetAuthedUser(null))
	}

	render() {
		if (this.props.authedUser === null) {
			return (
				<li className='pull-right'>
					<NavLink to='/login' activeClassName='active'>
						<button>Login</button>
					</NavLink>
				</li>
			)
		} else {
			return (
				<li className='pull-right'>
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