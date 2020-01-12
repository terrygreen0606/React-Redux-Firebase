import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';

const Navbar = () => {
	const auth = useSelector(state => state.firebase.auth);
	const profile = useSelector(state => state.firebase.profile);
	const links = auth.uid ? (
		<SigninLinks profile={profile} />
	) : (
		<SignoutLinks />
	);

	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					ProjectPlan
				</Link>
				{links}
			</div>
		</nav>
	);
};

export default Navbar;
