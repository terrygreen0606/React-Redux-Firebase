import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signUp } from '../../store/actions/authActions';

const SignUp = () => {
	const dispatch = useDispatch();
	const authError = useSelector(state => state.auth.authError);
	const inputData = {
		email: '',
		password: '',
		first_name: '',
		last_name: ''
	};
	const [loginData, setLoginData] = useState(inputData);

	const handleChange = e => {
		setLoginData({ ...loginData, [e.target.id]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(loginData);
		dispatch(signUp(loginData));
	};

	const auth = useSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to="/" />;

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="white">
				<h5 className="grey-text text-darken-3">Sign Up</h5>
				<div className="input-field">
					<label htmlFor="text">First Name</label>
					<input
						type="text"
						id="first_name"
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="text">Last Name</label>
					<input type="text" id="last_name" onChange={handleChange} />
				</div>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" onChange={handleChange} />
				</div>
				<div className="input-field">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<button className="btn pink lighten-1 z-depth-0">
						Sign Up
					</button>
					<div className="red-text center">
						{authError ? <p>{authError}</p> : null}
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
