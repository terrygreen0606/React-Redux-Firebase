import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import WithUserStatus from '../hocs/WithUserStatus';
import SigninLinks from './SigninLinks';
import SignoutLinks from './SignoutLinks';

const Navbar = props => {
	// For responsive Navbar
	useEffect(() => {
		const elem = document.querySelector('.sidenav');
		M.Sidenav.init(elem, {
			edge: 'left',
			inDuration: 250
		});
	}, []);
	// End Responsive Navbar import

	const profile = useSelector(state => state.firebase.profile);
	const links =
		props.userStatus === null ? (
			<SignoutLinks />
		) : (
			<SigninLinks profile={profile} />
		);

	return (
		<Fragment>
			<nav className="nav-extended">
				<div className="container nav-wrapper">
					<Link to="/" className="brand-logo">
						{props.userStatus === null
							? 'Please log in'
							: props.userStatus
							? 'Admin'
							: 'User'}
					</Link>
					<Link
						to="#"
						data-target="mobile-demo"
						className="sidenav-trigger"
					>
						<i className="material-icons">menu</i>
					</Link>
					<ul className="right hide-on-med-and-down">
						<li>
							<NavLink to="/" className="grey-text text-darken-3">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/products"
								className="grey-text text-darken-3"
							>
								Products
							</NavLink>
						</li>
						{links}
					</ul>
				</div>
			</nav>
			<ul className="sidenav" id="mobile-demo">
				<li>
					<NavLink to="/" className="grey-text text-darken-3">
						Home
					</NavLink>
				</li>
				{links}
			</ul>
		</Fragment>
	);
};

export default WithUserStatus(Navbar);
