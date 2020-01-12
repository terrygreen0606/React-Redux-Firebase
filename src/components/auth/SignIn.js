import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

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

	const auth = useSelector(state => state.firebase.auth);
	if (auth.uid) return <Redirect to="/" />;

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="white">
				<h5 className="grey-text text-darken-3">Log In</h5>
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
						Log In
					</button>
					<div className="red-text center">
						{authError ? <p>{authError}</p> : null}
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
