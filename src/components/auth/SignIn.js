import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	signIn,
	googleSignIn,
	cleanupAuth
} from '../../store/actions/authActions';

const SignIn = props => {
	const dispatch = useDispatch();
	const authError = useSelector(state => state.auth.authError);

	const inputData = { email: '', password: '' };
	const [loginData, setLoginData] = useState(inputData);

	const handleChange = e => {
		setLoginData({ ...loginData, [e.target.id]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(loginData);
		dispatch(signIn(loginData));
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => dispatch(cleanupAuth());
	}, [dispatch]);

	const auth = useSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to="/projects" />;

	return (
		<div className="container">
			<div className="red-text center">
				{authError ? <p>{authError}</p> : null}
			</div>
			<form onSubmit={handleSubmit}>
				<h5 className="grey-text text-darken-3">Log In</h5>
				<div className="input-field">
					<label htmlFor="email" data-error="Wrong email">
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
				<div className="input-field center">
					<button className="btn pink lighten-1 z-depth-0">
						Log In With email
					</button>
				</div>
			</form>
			<div className="input-field center">
				<button
					onClick={() => dispatch(googleSignIn())}
					className="btn pink lighten-1 z-depth-0"
				>
					Google Log In
				</button>
			</div>
		</div>
	);
};

export default SignIn;
