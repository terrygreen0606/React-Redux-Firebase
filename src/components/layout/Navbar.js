import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import firebase from '../../config/firebase';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';

const Navbar = () => {
	const user = firebase.auth().currentUser;
	const profile = useSelector(state => state.firebase.profile);
	const links = user ? <SigninLinks profile={profile} /> : <SignoutLinks />;

	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					ProjectPlan
				</Link>
				<ul className="right">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					{links}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
