import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';

const Navbar = () => {
	const auth = useSelector(state => state.firebase.auth);
	// console.log(auth);
	const links = auth.uid ? <SigninLinks /> : <SignoutLinks />;
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
