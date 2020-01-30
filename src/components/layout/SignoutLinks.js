import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const SignoutLinks = () => {
	return (
		<Fragment>
			<li>
				<NavLink to="/signup" className="grey-text text-darken-3">
					Sign Up
				</NavLink>
			</li>
			<li>
				<NavLink to="/signin" className="grey-text text-darken-3">
					Log In
				</NavLink>
			</li>
		</Fragment>
	);
};

export default SignoutLinks;
