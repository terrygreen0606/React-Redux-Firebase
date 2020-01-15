import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { adminStatus } from '../../store/actions/usersAction';

const SigninLinks = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(adminStatus());
	}, [dispatch]);
	const userStatus = useSelector(state => state.users.isAdmin);

	return (
		<Fragment>
			<li>
				<NavLink to="/projects">Projects</NavLink>
			</li>
			<li>
				<NavLink to="/create">New Project</NavLink>
			</li>
			{userStatus ? (
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

export default SigninLinks;
