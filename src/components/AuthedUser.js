import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class AuthedUser extends Component {
	render() {
		if (this.props.authedUser === null) {
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
					Hi {this.props.authedUser}!
					<button>Logout</button>
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