import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const SignoutLinks = () => {
	return (
		<Fragment>
			<li>
				<NavLink to="/signup">Sign Up</NavLink>
			</li>
			<li>
				<NavLink to="/signin">Log In</NavLink>
			</li>
		</Fragment>
	);
};

export default SignoutLinks;
