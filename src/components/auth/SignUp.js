import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signUp, cleanupAuth } from '../../store/actions/authActions';

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

	// Get logging status and disable buttons
	const isLogging = useSelector(state => state.auth.isLogging);
	const [loggingStatus, setLoggingStatus] = useState('');
	useEffect(() => {
		isLogging ? setLoggingStatus('disabled') : setLoggingStatus('');
	}, [isLogging]);

	const handleChange = e => {
		setLoginData({ ...loginData, [e.target.id]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(signUp(loginData));
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => dispatch(cleanupAuth());
	}, [dispatch]);

	const auth = useSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to="/" />;

	return (
		<div className="container white product-details">
			<div className="red-text center">
				{authError ? <p>{authError}</p> : null}
			</div>
			<form onSubmit={handleSubmit}>
				<h5>Sign Up</h5>
				<div className="input-field">
					<label htmlFor="text" data-error="Incorrect first name">
						First Name
					</label>
					<input
						type="text"
						id="first_name"
						required
						autoFocus
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="text" data-error="Incorrect last name">
						Last Name
					</label>
					<input
						type="text"
						id="last_name"
						required
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="email" data-error="Wrong Email">
						Email
					</label>
					<input
						type="email"
						id="email"
						required
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="password" data-error="Wrong Password">
						Password
					</label>
					<input
						type="password"
						id="password"
						required
						onChange={handleChange}
					/>
				</div>
				<div className="input-field">
					<button
						className={`btn pink lighten-1 z-depth-0 ${loggingStatus}`}
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
