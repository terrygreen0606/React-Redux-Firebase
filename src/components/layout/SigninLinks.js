import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/actions/authActions';
import WithUserStatus from '../hocs/WithUserStatus';

const SigninLinks = props => {
	const dispatch = useDispatch();

	return (
		<Fragment>
			<li>
				<NavLink to="/projects">Projects</NavLink>
			</li>
			<li>
				<NavLink to="/create">New Project</NavLink>
			</li>
			{props.userStatus ? (
				<li>
					<NavLink to="/users">Users</NavLink>
				</li>
			) : null}
			<li>
				<NavLink to="/" onClick={() => dispatch(signOut())}>
					Log Out
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/"
					className="btn btn-floating pink lighten-1 name-badge"
				>
					{props.profile.initials}
				</NavLink>
			</li>
		</Fragment>
	);
};

export default WithUserStatus(SigninLinks);
