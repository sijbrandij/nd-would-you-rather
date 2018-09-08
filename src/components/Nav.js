import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthedUser from './AuthedUser'

export default function Nav () {
	return (
		<nav className='nav'>
			<ul>
				<li>
					<NavLink to='/' exact activeClassName='active'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/add' activeClassName='active'>
						New Question
					</NavLink>
				</li>
				<li>
					<NavLink to='/leaderboard' activeClassName='active'>
						Leaderboard
					</NavLink>
				</li>
				<AuthedUser />
			</ul>
		</nav>
	)
}