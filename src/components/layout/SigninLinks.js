import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SigninLinks = () => {
	const dispatch = useDispatch();
	return (
		<ul className="right">
			<li>
				<NavLink to="/create">New Project</NavLink>
			</li>
			<li>
				<NavLink to="/" onClick={() => dispatch(signOut())}>
					Log Out
				</NavLink>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating pink lighten-1">
					TG
				</NavLink>
			</li>
		</ul>
	);
};

export default SigninLinks;
