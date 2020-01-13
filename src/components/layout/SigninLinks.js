import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

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
			<li>
				<NavLink to="/users">Users</NavLink>
			</li>
			<li>
				<NavLink to="/" onClick={() => dispatch(signOut())}>
					Log Out
				</NavLink>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating pink lighten-1">
					{props.profile.initials}
				</NavLink>
			</li>
		</Fragment>
	);
};

export default SigninLinks;
