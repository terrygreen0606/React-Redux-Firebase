import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendRecoveryPassword } from '../../store/actions/authActions';

const RecoverPassword = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	const handleChange = e => {
		setEmail({ [e.target.id]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(sendRecoveryPassword(email));
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="white">
				<h5 className="grey-text text-darken-3">Recover password</h5>
				<div className="input-field">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<button className="btn pink lighten-1 z-depth-0">
						Send recovery email
					</button>
				</div>
			</form>
		</div>
	);
};

export default RecoverPassword;
