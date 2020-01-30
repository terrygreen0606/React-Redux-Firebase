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
				<NavLink to="/projects" className="grey-text text-darken-3">
					Projects
				</NavLink>
			</li>
			<li>
				<NavLink to="/create" className="grey-text text-darken-3">
					New Project
				</NavLink>
			</li>
			{props.userStatus ? (
				<li>
					<NavLink to="/users" className="grey-text text-darken-3">
						Users
					</NavLink>
				</li>
			) : null}
			<li>
				<NavLink
					to="/"
					className="grey-text text-darken-3"
					onClick={() => dispatch(signOut())}
				>
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
