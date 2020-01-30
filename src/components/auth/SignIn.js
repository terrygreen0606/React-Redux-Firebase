import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	signIn,
	googleSignIn,
	cleanupAuth
} from '../../store/actions/authActions';

const SignIn = () => {
	const dispatch = useDispatch();

	// Get logging status and disable buttons
	const authError = useSelector(state => state.auth.authError);
	const isLogging = useSelector(state => state.auth.isLogging);
	const [loggingStatus, setLoggingStatus] = useState('');
	useEffect(() => {
		isLogging ? setLoggingStatus('disabled') : setLoggingStatus('');
	}, [isLogging]);

	const inputData = { email: '', password: '' };
	const [loginData, setLoginData] = useState(inputData);

	const handleChange = e => {
		setLoginData({ ...loginData, [e.target.id]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(signIn(loginData));
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => dispatch(cleanupAuth());
	}, [dispatch]);

	const auth = useSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to="/projects" />;

	return (
		<div className="container white product-details">
			<div className="red-text center">
				{authError ? <p>{authError}</p> : null}
			</div>
			<form onSubmit={handleSubmit}>
				<h5>Log In</h5>
				<div className="input-field">
					<label htmlFor="email" data-error="Wrong email">
						Email
					</label>
					<input
						type="email"
						id="email"
						required
						autoFocus
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
				<div className="center">
					<button
						className={`btn pink lighten-1 z-depth-0 ${loggingStatus}`}
					>
						Log In With email
					</button>
				</div>
			</form>
			<div className="center">
				<button
					onClick={() => dispatch(googleSignIn())}
					className={`btn pink lighten-1 z-depth-0 ${loggingStatus}`}
				>
					<i className="material-icons left">add</i>
					Google Log In
				</button>
			</div>
		</div>
	);
};

export default SignIn;
